"use client";

import { useState } from "react";
import { GeneratorModal } from "@/components/GeneratorModal";

/** The ink block on the Library hero that opens the generator. */
export function CreateStoryBlock() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-ink text-paper border-ink shadow-print-lg hover:bg-forest hover:border-forest flex flex-none items-center gap-4 border px-[22px] py-4 transition-all duration-150 hover:shadow-[3px_3px_0_rgba(25,22,20,0.2)]"
      >
        <span className="font-display text-[24px] leading-none">
          Create a story
        </span>
        <span className="font-ui border-l border-l-[rgba(233,229,216,0.3)] pl-4 text-[11px] tracking-[0.14em] text-[rgba(233,229,216,0.6)] uppercase">
          Written for
          <br />
          your level
        </span>
      </button>
      {open && <GeneratorModal onClose={() => setOpen(false)} />}
    </>
  );
}
