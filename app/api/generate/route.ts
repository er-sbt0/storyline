import {
  GENERATION_DONE_AT,
  GENERATION_STEPS,
  type GenerationEvent,
  type GenerationRequest,
} from "@/lib/generate";

export const dynamic = "force-dynamic";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Streams newline-delimited JSON progress events while a story is generated.
 *
 * This is a stub: it replays the prototype's step timings so the client's
 * generating state can be exercised end to end. Replace the timers with real
 * progress from the model calls — the event shape is what the UI depends on,
 * and it should not need to change.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as GenerationRequest;
  const prompt = body.prompt?.trim() || "A story about a lost cat in Madrid";

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event: GenerationEvent) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));

      let elapsed = 0;
      for (let i = 0; i < GENERATION_STEPS.length; i++) {
        await sleep(GENERATION_STEPS[i].startsAt - elapsed);
        elapsed = GENERATION_STEPS[i].startsAt;
        send({ type: "step", step: i });
      }

      await sleep(GENERATION_DONE_AT - elapsed);
      send({
        type: "done",
        story: {
          es: body.prompt?.trim()
            ? "Una historia nueva"
            : "El gato perdido de Madrid",
          en: prompt,
        },
      });

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
