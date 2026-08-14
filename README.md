# storyline

Learn languages through AI-generated kids' stories.

## Purpose

`storyline` teaches languages using AI-generated children's stories. Simple,
engaging narratives provide comprehensible input — the natural way both kids
and language learners acquire a new language.

- **Story-based learning** — short, illustrated kids' stories as the vehicle
  for vocabulary and grammar.
- **AI generated** — stories (and ideally illustrations/audio) are produced by
  AI, tailored to level and target language.
- **Comprehensible input** — level-appropriate language that learners can
  mostly understand, growing in difficulty over time.

## Goals

- Make early language learning fun and low-pressure.
- Generate endless, personalized story content across languages and levels.

## Status

First surface is built: Spanish reading, five screens, from the design handoff
in `design/`. Content is static; story generation is a streaming stub.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Routes

| Route                    | Screen                                          |
| ------------------------ | ----------------------------------------------- |
| `/`                      | Library — 10 stories grouped by CEFR level       |
| `/story/[slug]`          | Story landing — blurb, grammar, "Start reading"  |
| `/story/[slug]/read`     | Reader — the core screen                         |
| `/grammar`               | Grammar lessons hub                              |
| `/api/generate`          | Story generation, streams NDJSON step progress   |

## Layout

```
app/            routes; globals.css holds the design tokens
components/     Reader, GeneratorModal, StoryCard, SiteHeader, Illustration
lib/stories.ts  STORIES / SCENES / SENTENCES / LESSONS — the content model
lib/generate.ts generation step definitions shared by client and route handler
design/         the design handoff this was built from
```

## Design

`design/HANDOFF.md` is the source of truth for colors, type scale, spacing and
motion; `design/Storyline.dc.html` is the original prototype. Tokens live in
`app/globals.css` under `@theme` — six named colors, three faces (Cormorant
Garamond for display, Literata for Spanish, Archivo for every word of English),
radius 0 everywhere, and hard offset print shadows.

The reader's translation rail is the product's signature: hovering or focusing
a sentence fades its English into a reserved rail at the bottom of the column,
so nothing occludes the text and nothing reflows.

## Not done yet

- **Story text** — only *La Caperucita Roja* is written. Every other story
  currently renders that text in the reader. Sentences must be translated
  one-to-one at authoring time; the rail assumes clean 1:1 alignment.
- **Illustrations** — none sourced. `components/Illustration.tsx` renders the
  brief on the plate ground and takes a `src` the day art exists.
- **Audio** — the per-sentence ring is visual state only; no playback is wired.
- **Generation** — `app/api/generate/route.ts` replays the prototype's timings.
  Swap the timers for real model progress; the event shape should not change.
- **Source text licensing** — adapt public-domain originals or write original
  retellings.
- **Mobile** — the layout holds to 768px; below that is a later pass.
