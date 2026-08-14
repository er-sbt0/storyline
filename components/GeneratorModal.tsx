"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Illustration } from "@/components/Illustration";
import type { GenerationStep } from "@/lib/generate";
import { GENERATION_STEPS } from "@/lib/generate";

type Phase = "form" | "busy" | "done";
type Length = "Short" | "Medium";

const LEVELS = ["A1", "A2", "B1"] as const;
const LENGTHS: Length[] = ["Short", "Medium"];

function chipClass(on: boolean) {
  return [
    "font-ui text-[12px] tracking-[0.12em] uppercase px-[14px] py-2 border transition-colors duration-150",
    on
      ? "bg-ink border-ink text-paper-light"
      : "border-[rgba(25,22,20,0.3)] text-[rgba(25,22,20,0.72)] hover:border-ink hover:text-ink",
  ].join(" ");
}

export function GeneratorModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("form");
  const [prompt, setPrompt] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("A1");
  const [length, setLength] = useState<Length>("Short");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{ es: string; en: string } | null>(null);

  // Escape closes, from anywhere in the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Move focus into the dialog so the tab ring starts inside it.
  useEffect(() => {
    dialogRef.current?.querySelector("textarea")?.focus();
  }, []);

  const start = useCallback(async () => {
    setPhase("busy");
    setStep(0);

    // The endpoint streams one JSON event per step; the honest step list below
    // tracks real backend progress rather than guessing behind a spinner.
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ prompt, level, length }),
    });

    if (!res.body) {
      setPhase("form");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = JSON.parse(line) as
          | { type: "step"; step: number }
          | { type: "done"; story: { es: string; en: string } };
        if (event.type === "step") setStep(event.step);
        if (event.type === "done") {
          setResult(event.story);
          setPhase("done");
        }
      }
    }
  }, [prompt, level, length]);

  const echo = prompt || "A story about a lost cat in Madrid";

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-[rgba(22,20,18,0.55)] p-8"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="A story made for you"
        className="bg-paper border-ink shadow-print-modal max-h-[90vh] w-[min(760px,100%)] overflow-auto border"
      >
        <div className="bg-plate flex items-center justify-between gap-5 border-b border-b-[rgba(25,22,20,0.18)] px-[30px] py-5">
          <span className="font-ui text-[10.5px] tracking-[0.22em] text-[rgba(25,22,20,0.6)] uppercase">
            A story made for you
          </span>
          <button
            onClick={onClose}
            className="font-ui text-[13px] text-[rgba(25,22,20,0.6)] transition-colors duration-150 hover:text-hood"
          >
            Close
          </button>
        </div>

        {phase === "form" && (
          <div className="px-[30px] pt-[34px] pb-[30px]">
            <h2 className="font-display m-0 mb-[10px] text-[38px] leading-[1.08] font-semibold">
              What should this story be about?
            </h2>
            <p className="m-0 mb-[26px] max-w-[52ch] text-[16px] leading-[1.7] text-[rgba(25,22,20,0.7)]">
              Write it in English. We&rsquo;ll write the story in Spanish and
              illustrate it.
            </p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A story about a lost cat in Madrid"
              rows={3}
              aria-label="What should this story be about?"
              className="font-body bg-paper-light text-ink w-full resize-y border border-[rgba(25,22,20,0.35)] px-[18px] py-4 text-[17px] leading-[1.6] placeholder:text-[rgba(25,22,20,0.4)]"
            />
            <div className="mt-[26px] mb-8 flex flex-wrap gap-9">
              <div>
                <div className="font-ui mb-[10px] text-[10.5px] tracking-[0.18em] text-[rgba(25,22,20,0.55)] uppercase">
                  Level
                </div>
                <div className="flex gap-2">
                  {LEVELS.map((lv) => (
                    <button
                      key={lv}
                      onClick={() => setLevel(lv)}
                      aria-pressed={level === lv}
                      className={chipClass(level === lv)}
                    >
                      {lv}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-ui mb-[10px] text-[10.5px] tracking-[0.18em] text-[rgba(25,22,20,0.55)] uppercase">
                  Length
                </div>
                <div className="flex gap-2">
                  {LENGTHS.map((ln) => (
                    <button
                      key={ln}
                      onClick={() => setLength(ln)}
                      aria-pressed={length === ln}
                      className={chipClass(length === ln)}
                    >
                      {ln}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[18px] border-t border-t-[rgba(25,22,20,0.16)] pt-6">
              <button
                onClick={start}
                className="font-display bg-ink text-paper-light border-ink shadow-print hover:bg-forest hover:border-forest hover:shadow-print-tight border px-7 py-[13px] text-[23px] transition-all duration-150"
              >
                Write the story
              </button>
              <span className="font-ui max-w-[30ch] text-[12.5px] leading-[1.5] text-[rgba(25,22,20,0.55)]">
                Writing and illustrating takes about a minute.
              </span>
            </div>
          </div>
        )}

        {phase === "busy" && (
          <div className="px-[30px] py-[34px]">
            <h2
              className="font-display m-0 mb-[6px] text-[34px] leading-[1.1] font-semibold"
              aria-live="polite"
            >
              {GENERATION_STEPS[step]?.heading}
            </h2>
            <p className="font-ui m-0 mb-[30px] text-[13px] text-[rgba(25,22,20,0.6)]">
              {echo}
            </p>
            <div className="flex flex-col gap-[2px] border-t border-t-[rgba(25,22,20,0.16)]">
              {GENERATION_STEPS.map((s, i) => (
                <StepRow key={s.label} step={s} index={i} current={step} />
              ))}
            </div>
          </div>
        )}

        {phase === "done" && result && (
          <div className="px-[30px] py-[34px]">
            <div className="flex flex-wrap items-start gap-[26px]">
              <div className="bg-night shadow-print-cover relative aspect-3/4 w-[170px] overflow-hidden border border-[rgba(25,22,20,0.3)]">
                <Illustration placeholder="New cover" />
              </div>
              <div className="min-w-[260px] flex-1">
                <div className="font-ui text-[10.5px] tracking-[0.2em] text-[rgba(25,22,20,0.55)] uppercase">
                  Ready to read
                </div>
                <h2 className="font-display mt-[10px] mb-[6px] text-[38px] leading-[1.05] font-semibold">
                  {result.es}
                </h2>
                <div className="font-ui text-[13px] text-[rgba(25,22,20,0.6)]">
                  {result.en}
                </div>
                <div className="font-ui mt-5 mb-[22px] flex gap-2 text-[11px] tracking-[0.14em] uppercase">
                  <span className="border border-[rgba(25,22,20,0.35)] px-[9px] py-[5px]">
                    {level}
                  </span>
                  <span className="border border-[rgba(25,22,20,0.35)] px-[9px] py-[5px]">
                    {length === "Short" ? "20 sentences" : "40 sentences"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => router.push("/story/la-caperucita-roja/read")}
                    className="font-display bg-hood text-paper-light border-hood shadow-print hover:bg-hood-deep hover:border-hood-deep hover:shadow-print-tight border px-[26px] py-3 text-[23px] transition-all duration-150"
                  >
                    Start reading
                  </button>
                  <button
                    onClick={() => setPhase("form")}
                    className="font-ui border-b border-b-[rgba(25,22,20,0.3)] text-[13px] text-[rgba(25,22,20,0.6)] transition-colors duration-150 hover:text-hood"
                  >
                    Write another
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * One row of the generating state: a square mark, the label, a progress rule
 * that fills while the step is active, and an honest time estimate.
 */
function StepRow({
  step,
  index,
  current,
}: {
  step: GenerationStep;
  index: number;
  current: number;
}) {
  const done = index < current;
  const now = index === current;

  return (
    <div className="flex items-center gap-4 border-b border-b-[rgba(25,22,20,0.12)] px-1 py-4">
      <span
        className={[
          "font-ui flex h-5 w-5 flex-none items-center justify-center border text-[12px]",
          done
            ? "bg-forest border-forest text-paper-light"
            : now
              ? "border-ink text-ink"
              : "border-[rgba(25,22,20,0.25)]",
        ].join(" ")}
      >
        {done ? "✓" : now ? "·" : ""}
      </span>
      <span
        className={`font-body text-[16.5px] ${
          done || now ? "text-ink" : "text-[rgba(25,22,20,0.42)]"
        }`}
      >
        {step.label}
      </span>
      <span className="relative h-[2px] flex-1 overflow-hidden bg-[rgba(25,22,20,0.12)]">
        <span
          className={`absolute inset-y-0 left-0 ${done ? "bg-forest" : "bg-hood"}`}
          style={{
            width: done ? "100%" : now ? "62%" : "0%",
            transition: now ? "width 2400ms linear" : "width 400ms ease",
          }}
        />
      </span>
      <span className="font-ui min-w-[70px] text-right text-[11px] tracking-[0.1em] text-[rgba(25,22,20,0.45)]">
        {done ? "done" : now ? step.note : ""}
      </span>
    </div>
  );
}
