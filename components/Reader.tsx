"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Illustration } from "@/components/Illustration";
import type { Scene, Sentence, Story } from "@/lib/stories";

type Props = {
  story: Story;
  scenes: Scene[];
  sentences: Sentence[];
};

/** How long a sentence shows its "playing" state, until real audio is wired. */
const PLAY_MS = 2600;

export function Reader({ story, scenes, sentences }: Props) {
  // `hover` wins for what the rail shows; `active` persists for arrow
  // stepping; `read` tracks the scroll-nearest sentence for progress when
  // nothing is hovered or focused.
  const [hover, setHover] = useState<number | null>(null);
  const [active, setActive] = useState(-1);
  const [read, setRead] = useState(0);
  const [scene, setScene] = useState(0);
  const [fade, setFade] = useState(0);
  const [showTr, setShowTr] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);

  const rafRef = useRef<number | null>(null);
  const playTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Arrow stepping needs the current indices synchronously, without making the
  // key handler re-subscribe on every scroll tick. Synced after commit — a
  // render-phase write gets clobbered when a scroll update re-renders with the
  // pre-step value, which silently drops a keypress.
  const activeRef = useRef(active);
  const readRef = useRef(read);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    readRef.current = read;
  }, [read]);

  const shown = hover != null ? hover : active;
  const readIdx = shown >= 0 ? shown : read;
  const pct = Math.round(((readIdx + 1) / sentences.length) * 100);

  const paragraphs = useMemo(
    () =>
      scenes.map((sc, i) => ({
        scene: sc,
        items: sentences
          .map((s, idx) => ({ ...s, idx }))
          .filter((s) => s.scene === i),
      })),
    [scenes, sentences],
  );

  // One rAF-throttled scroll handler drives both the active scene and the
  // plate's shrink/dim factor.
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const els = Array.from(
          document.querySelectorAll<HTMLElement>("[data-sentence]"),
        );
        if (els.length) {
          const mid = window.innerHeight * 0.42;
          let best = 0;
          let bestD = Infinity;
          els.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const d = Math.abs(r.top + r.height / 2 - mid);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          setRead(best);
          setScene(sentences[best]?.scene ?? 0);
        }

        const t = Math.max(
          0,
          Math.min(1, window.scrollY / (window.innerHeight * 0.8)),
        );
        setFade(t);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sentences]);

  // Arrow keys step sentence to sentence and move DOM focus; the rail follows.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const next = e.key === "ArrowDown" || e.key === "ArrowRight";
      const prev = e.key === "ArrowUp" || e.key === "ArrowLeft";
      if (!next && !prev) return;

      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-sentence]"),
      );
      if (!els.length) return;
      e.preventDefault();

      const current = activeRef.current;
      let i = current < 0 ? readRef.current : current + (next ? 1 : -1);
      i = Math.max(0, Math.min(els.length - 1, i));

      activeRef.current = i;
      setActive(i);
      setHover(null);
      setScene(sentences[i].scene);
      els[i]?.focus({ preventScroll: false });
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sentences]);

  // Focus is delegated on the document: per-element focus handlers proved
  // unreliable when focus moves between a sentence and its audio button.
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-sentence]",
      );
      if (!target) return;
      const i = Number(target.getAttribute("data-sentence"));
      if (Number.isNaN(i) || !sentences[i]) return;
      activeRef.current = i;
      setActive(i);
      setHover(null);
      setScene(sentences[i].scene);
    };

    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [sentences]);

  useEffect(() => {
    return () => {
      if (playTimer.current) clearTimeout(playTimer.current);
    };
  }, []);

  // Pointer tracking is delegated on the column rather than per sentence.
  const trackHover = useCallback(
    (e: React.MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.("[data-sentence]");
      if (!target) {
        setHover(null);
        return;
      }
      const i = Number(target.getAttribute("data-sentence"));
      if (Number.isNaN(i) || !sentences[i]) return;
      setHover(i);
      setScene(sentences[i].scene);
    },
    [sentences],
  );

  const play = useCallback((i: number) => {
    // TODO: wire native-speaker audio or TTS here. Until then this is the
    // visual state only — see design/HANDOFF.md, "Open items".
    if (playTimer.current) clearTimeout(playTimer.current);
    setPlaying(i);
    playTimer.current = setTimeout(() => setPlaying(null), PLAY_MS);
  }, []);

  return (
    // The chrome is fixed, so it takes no flow space. Without this offset the
    // plate's sticky top:45px shift would slide its bottom 45px — and the scene
    // caption with it — under the paper column at rest.
    <div className="pt-[45px]">
      {/* Chrome — 45px, and nothing more than reading needs. */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-b-[rgba(25,22,20,0.14)] bg-[rgba(233,229,216,0.94)] backdrop-blur-[6px]">
        <div className="flex items-center gap-6 px-8 py-3">
          <Link
            href="/"
            className="font-ui flex-none text-[12.5px] text-[rgba(25,22,20,0.68)] transition-colors duration-150 hover:text-hood"
          >
            ← Library
          </Link>
          <span className="font-display flex-none text-[20px]">{story.es}</span>
          <span className="flex flex-1 items-center gap-3">
            <span className="relative h-[2px] max-w-[420px] flex-1 bg-[rgba(25,22,20,0.15)]">
              <span
                className="bg-hood absolute inset-y-0 left-0 transition-[width] duration-200 ease-out"
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="font-ui text-[11px] tracking-[0.1em] text-[rgba(25,22,20,0.5)]">
              {pct}%
            </span>
          </span>
          <button
            onClick={() => setShowTr((v) => !v)}
            role="switch"
            aria-checked={showTr}
            className="font-ui flex flex-none items-center gap-[9px] text-[12.5px] text-[rgba(25,22,20,0.7)] transition-colors duration-150 hover:text-ink"
          >
            <span
              aria-hidden
              className={`relative inline-block h-[18px] w-[34px] border transition-colors duration-150 ${
                showTr ? "bg-forest border-forest" : "border-[rgba(25,22,20,0.4)]"
              }`}
            >
              <span
                className={`absolute top-[2px] h-3 w-3 transition-[left] duration-150 ${
                  showTr ? "bg-paper-light left-[18px]" : "bg-ink left-[2px]"
                }`}
              />
            </span>
            Always show translations
          </button>
        </div>
      </div>

      {/* The plate is a window the page recedes behind: it sticks under the
          chrome, then shrinks and dims as the story takes over. */}
      <div
        className="bg-forest-deep sticky top-[45px] z-5 h-[calc((44-16*var(--fade))*1vh)] overflow-hidden border-b border-b-[rgba(25,22,20,0.3)] opacity-[calc(1-0.45*var(--fade))] transition-[height,opacity] duration-[320ms] ease-out wide:h-[calc((56-24*var(--fade))*1vh)]"
        style={{ "--fade": fade } as CSSProperties}
      >
        {scenes.map((sc, i) => (
          <div
            key={sc.id}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{
              opacity: i === scene ? 1 : 0,
              transform: i === scene ? "scale(1.01)" : "scale(1.03)",
            }}
          >
            <Illustration placeholder={sc.placeholder} priority={i === 0} />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,24,19,0.35)_0%,rgba(11,24,19,0)_32%,rgba(11,24,19,0.55)_100%)]" />
        <div className="pointer-events-none absolute right-7 bottom-[26px] left-7">
          <div className="font-ui text-[10px] tracking-[0.2em] text-[rgba(233,229,216,0.6)] uppercase">
            Plate {scene + 1}
          </div>
          <div className="font-display text-paper-light mt-1 text-[26px]">
            {scenes[scene]?.title}
          </div>
        </div>
      </div>

      {/* Text column sits above the plate on paper. */}
      <div className="bg-paper relative z-6 flex flex-col justify-between">
        <div
          onMouseMove={trackHover}
          onMouseOver={trackHover}
          onMouseLeave={() => setHover(null)}
          className="mx-auto w-full max-w-[760px] px-6 pt-12 wide:max-w-[1040px] wide:px-14 wide:pt-[72px]"
        >
          <div className="mb-[52px] text-center">
            <div className="font-ui text-[10.5px] tracking-[0.22em] text-[rgba(25,22,20,0.45)] uppercase">
              {story.origin} · {story.level}
            </div>
            <h1 className="font-display mt-3 mb-0 text-[44px] leading-[1.05] font-semibold">
              {story.es}
            </h1>
            <div className="mx-auto mt-[22px] h-px w-11 bg-[rgba(25,22,20,0.35)]" />
          </div>

          {paragraphs.map(({ scene: sc, items }) => (
            <div key={sc.id} className="mb-10">
              <div className="mb-[30px] flex items-center gap-[14px]">
                <span className="h-px flex-1 bg-[rgba(25,22,20,0.2)]" />
                <span className="font-ui text-gilt text-[10.5px] tracking-[0.2em] uppercase">
                  {sc.title}
                </span>
                <span className="h-px flex-1 bg-[rgba(25,22,20,0.2)]" />
              </div>
              {/* Sentences flow as continuous prose — inline spans, not lines. */}
              <p className="font-body text-ink m-0 text-[21px] leading-[1.78] tracking-[0.002em] text-pretty wide:text-[24px]">
                {items.map((s) => {
                  const on = s.idx === shown;
                  const isPlaying = playing === s.idx;
                  return (
                    <span key={s.idx}>
                      <span
                        data-sentence={s.idx}
                        tabIndex={0}
                        className="inline cursor-default border-b-2 transition-[background-color,border-color] duration-150"
                        style={{
                          borderBottomColor: on ? "#A31621" : "transparent",
                          backgroundColor: on
                            ? "rgba(163,22,33,0.08)"
                            : "transparent",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            play(s.idx);
                          }}
                          aria-label={`Listen to: ${s.es}`}
                          className="mr-[7px] inline-flex h-[21px] w-[21px] flex-none translate-y-0 items-center justify-center rounded-full border align-[-0.18em] transition-[opacity,color,border-color,background-color] duration-150"
                          style={{
                            borderColor: isPlaying
                              ? "#A31621"
                              : on
                                ? "rgba(163,22,33,0.55)"
                                : "rgba(25,22,20,0.2)",
                            background: isPlaying ? "#A31621" : "transparent",
                            color: isPlaying
                              ? "#F3EFE3"
                              : on
                                ? "#A31621"
                                : "rgba(25,22,20,0.45)",
                            opacity: on || isPlaying ? 1 : 0.5,
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden>
                            <path d="M1 4.2h1.9L5.4 2v8L2.9 7.8H1z" fill="currentColor" />
                            <path
                              d="M7.6 3.6a3.4 3.4 0 0 1 0 4.8"
                              stroke="currentColor"
                              strokeWidth="1.1"
                              fill="none"
                            />
                          </svg>
                        </button>
                        {s.es}
                        {showTr && (
                          <span className="font-ui text-[0.62em] text-[rgba(25,22,20,0.5)]">
                            {" "}
                            {s.en}
                          </span>
                        )}
                      </span>{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          ))}

          <div className="pt-[70px] pb-10 text-center">
            <div className="font-display text-[22px] italic text-[rgba(25,22,20,0.6)]">
              Continúa…
            </div>
          </div>
          {/* Clearance so the last line never sits under the rail. */}
          <div className="h-[120px]" />
        </div>

        {/* The reserved translation rail. It never occludes the text and never
            reflows it — the eye path stays fixed. */}
        <div className="pointer-events-none sticky bottom-0 z-20 w-full px-6 pb-4 wide:px-14 wide:pb-[22px]">
          <div className="mx-auto max-w-[760px] wide:max-w-[1040px]">
            <div
              aria-live="polite"
              className="shadow-rail pointer-events-none flex min-h-[58px] items-start gap-[14px] border border-[rgb(20,26,23)] bg-[rgba(20,26,23,0.94)] px-[18px] py-[14px] transition-[opacity,transform] duration-[160ms] ease-out"
              style={{
                opacity: shown >= 0 ? 1 : 0,
                transform: shown >= 0 ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <span className="font-ui flex-none pt-1 text-[10px] tracking-[0.2em] text-[rgba(233,229,216,0.45)] uppercase">
                EN
              </span>
              <span className="font-ui text-[15.5px] leading-[1.5] text-[#EDE9DC]">
                {shown >= 0 ? sentences[shown].en : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
