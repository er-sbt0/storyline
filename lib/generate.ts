export type GenerationStep = {
  /** Heading shown while this step is the current one. */
  heading: string;
  /** Row label in the step list. */
  label: string;
  /** Honest time estimate — not a spinner. */
  note: string;
  /** Milliseconds from the start of generation until this step begins. */
  startsAt: number;
};

/**
 * The three steps of story generation, in order. Timings come from the design
 * prototype; once a real model is wired in, emit these events from actual
 * backend progress and delete the timers in `app/api/generate/route.ts`.
 */
export const GENERATION_STEPS: GenerationStep[] = [
  {
    heading: "Reading your request",
    label: "Reading your request",
    note: "about 5 s",
    startsAt: 0,
  },
  {
    heading: "Writing your story",
    label: "Writing the story in Spanish",
    note: "about 30 s",
    startsAt: 2600,
  },
  {
    heading: "Illustrating your story",
    label: "Illustrating the scenes",
    note: "about 25 s",
    startsAt: 5600,
  },
];

/** When the last step finishes and the ready state appears. */
export const GENERATION_DONE_AT = 11000;

export type GenerationRequest = {
  prompt: string;
  level: "A1" | "A2" | "B1";
  length: "Short" | "Medium";
};

export type GenerationEvent =
  | { type: "step"; step: number }
  | { type: "done"; story: { es: string; en: string } };
