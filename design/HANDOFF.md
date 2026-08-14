# Handoff: Storyline — Spanish reading app (Library, Story, Reader, Generator, Grammar)

## Overview
Storyline is a web app for learning Spanish by reading famous children's stories in Spanish only — no English scaffolding in the reading flow. Learners already know the plot, so they can tolerate not understanding every word. This bundle covers five surfaces: **Library**, **Story landing**, **Story reader** (the core screen), **AI story generator modal**, and **Grammar lessons hub**. UI language is English; content language is Spanish. LTR only. Designed for desktop web at 1440px, holding together to 768px. No auth, settings, or dashboard.

## About the Design Files
`Storyline.dc.html` in this folder is a **design reference created in HTML** — a prototype showing intended look and behavior, not production code to copy. It is a single self-contained streaming component file (template + a logic class) plus `image-slot.js`, a drag-and-drop image placeholder used where real illustrations will go.

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, SwiftUI, native, etc.) using its established patterns, component library, and routing. If no environment exists yet, pick the most appropriate framework and implement there. Do not ship the prototype HTML.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, motion timings, and interaction behavior are all specified below and implemented in the prototype. Recreate the UI closely; substitute the codebase's primitives (buttons, modal, chips) where they exist, but keep the exact type scale, palette, and the reader's translation-rail interaction, which is the product's signature.

---

## Design Tokens

### Color (6 named values; everything derives from these)
| Token | Hex | Use |
|---|---|---|
| Hood red | `#A31621` | Primary accent: active sentence underline + wash, progress fill, primary CTA, focus ring. Hover/pressed: `#7E1019` |
| Ink | `#191614` | Body text, dark buttons, borders at low alpha |
| Paper | `#E9E5D8` | Page background everywhere |
| Plate (deckle) | `#DBD5C4` | Modal header band |
| Forest deep | `#16302A` | Illustration panel ground |
| Forest | `#24463A` | Secondary button hover, "done" step marks |
| Night | `#2A3550` | Cover tint (Blancanieves, generated story) |
| Gilt | `#B98A3C` | Scene labels, lesson tags |
| Paper light | `#F3EFE3` | Text on dark, input field fill |

Derived alphas in use: `rgba(25,22,20,0.14)` rules, `rgba(25,22,20,0.2 / 0.25 / 0.3 / 0.35)` borders, `rgba(25,22,20,0.5 / 0.55 / 0.6 / 0.72 / 0.85)` secondary text, `rgba(163,22,33,0.08)` sentence highlight wash, `rgba(20,26,23,0.94)` translation rail ground.

Per-story cover tints (with their text color): `#A31621`/`#F3EFE3`, `#C97F5A`/`#20140F`, `#5C7A4A`/`#F3EFE3`, `#B98A3C`/`#20140F`, `#3E5C6B`/`#F3EFE3`, `#4A3A2C`/`#F3EFE3`, `#3F6B4A`/`#F3EFE3`, `#7A2E3B`/`#F3EFE3`, `#2A3550`/`#F3EFE3`, `#6B5230`/`#F3EFE3`.

### Typography (3 faces, Google Fonts)
- **Display — Cormorant Garamond** 500/600/700 + italic 500. Wordmark 30px/600; page H1 44–46px/600, line-height 1.05; story title on landing 60px/600, letter-spacing −0.015em; reader title 44px; section headings 27–28px; buttons 23–24px.
- **Body (Spanish) — Literata** 400/500/600 + italic. Reader body **24px** wide / **21px** below 1120px, line-height **1.78**, letter-spacing 0.002em. Landing blurb 18px/1.75. Library card English title 15px/500.
- **Utility + all English — Archivo** 400/500/600. Translation rail 15.5px/1.5. Metadata 12–14px. Chips/labels 10–12px, letter-spacing 0.14–0.22em, uppercase.

**The most important type rule:** Spanish is always Literata; every word of English (rail, blurb metadata, chips, nav) is Archivo, smaller and lower-contrast. The reader must never leave doubt which language the eye is in.

### Spacing, radius, shadow
- Page gutters: 44px (56px inside the reader column), 24–28px below 1120px.
- Section rhythm: 26–56px; paragraph blocks 40px apart; scene divider 30px below.
- Radius: **0 everywhere** except the 21px audio ring (50%) and the switch knob (square).
- Shadow: hard offset print blocks only — `5px 5px 0 rgba(25,22,20,0.18)` on buttons (→ `2px 2px 0` on hover), `6px 6px 0 rgba(25,22,20,0.16)` on the Create-a-story block, `5px 5px 0 rgba(25,22,20,0.1)` on covers, `14px 14px 0 rgba(25,22,20,0.28)` on the modal, `0 10px 30px rgba(20,26,23,0.22)` under the translation rail. No blurred UI shadows elsewhere.
- Focus: `outline: 2px solid #A31621; outline-offset: 3px` on `:focus-visible`, globally.

---

## Screens / Views

### 1. Library
**Purpose:** browse and pick a story; launch the generator.

**Layout:** header bar (26px 44px 22px, 1px bottom rule) with wordmark + "ESPAÑOL · LECTURA" eyebrow left, nav right (Library active = 2px `#A31621` underline; Grammar lessons muted). Below: a hero row (44px 44px 34px, max-width 1440px) with H1 "Read a story you already know, / in Spanish only" (46px display, two lines) + a 52ch paragraph left, and the **Create a story** block right — an ink `#191614` block, paper text, 16px 22px, display 24px label, plus a divider and a 2-line Archivo caption "Written for / your level". Hover: background → `#24463A`, shadow tightens.

**Grouping is by CEFR level** (the primary axis, committed): three groups A1 / A2 / B1, each with a display heading + one-line Archivo note, a 1px rule, then a card grid `repeat(auto-fill, minmax(230px, 1fr))`, gap 30px/26px.
- A1 — "first stories" · "Short sentences, present and simple past. Start anywhere."
- A2 — "longer, more past tense" · "Two past tenses working together, more dialogue."
- B1 — "full fairy tales" · "Subjunctive, conditional, and the long middle sections."

**Card:** 3:4 cover plate in the story's tint with a 1px `rgba(25,22,20,0.28)` border and print shadow; inside, three rows — origin eyebrow (10px, 0.18em, uppercase), Spanish title (29px display, line-height 1.08, `text-wrap: balance`), level chip (10px caps, 1px currentColor border, 3px 7px). Below the plate: English title (Literata 15px/500) and meta line (Archivo 12px, e.g. "38 sentences · 9 min"). Whole card is a button (`role="button"`, `tabindex="0"`, Enter/Space).

**Content (10 stories):** La Caperucita Roja / Little Red Riding Hood / A1 / Perrault / 38 sentences · 9 min · Los Tres Cerditos / The Three Little Pigs / A1 / Folk tale / 34 · 8 min · La Liebre y la Tortuga / The Hare and the Tortoise / A1 / Aesop / 22 · 5 min · Ricitos de Oro / Goldilocks / A1 / Folk tale / 30 · 7 min · El Patito Feo / The Ugly Duckling / A2 / Andersen / 41 · 11 min · Hansel y Gretel / Hansel and Gretel / A2 / Grimm / 46 · 12 min · Juan y los Frijoles Mágicos / Jack and the Beanstalk / A2 / Folk tale / 39 · 10 min · El Traje Nuevo del Emperador / The Emperor's New Clothes / B1 / Andersen / 52 · 14 min · Blancanieves / Snow White / B1 / Grimm / 58 · 16 min · El Flautista de Hamelín / The Pied Piper of Hamelin / B1 / Grimm / 44 · 12 min. Blurbs and per-story grammar lists are in the `STORIES` array in the prototype's logic class — copy them verbatim.

### 2. Story landing
**Purpose:** the moment before committing; the one place English is generous.

**Layout:** slim breadcrumb bar ("← Library / <Spanish title>", Archivo 13px). Then a two-column grid `minmax(320px,1.05fr) minmax(0,1fr)`, min-height `calc(100vh - 54px)` — full-bleed cover illustration left on `#16302A` with an inset vignette `inset 0 0 120px rgba(10,20,16,0.55)`; content right, padding 56px 60px 70px, max-width 720px. Below 1120px it stacks to one column (art min-height 300px, padding 36px 28px 56px).

**Content order:** origin eyebrow → Spanish title 60px → English title (Archivo 14px) → two chips (level, "38 sentences · 9 min") → English blurb 18px/1.75, max 56ch → rule → "GRAMMAR IN THIS STORY" label + 2–3 dotted-leader rows (Spanish concept in display italic 20px, dotted rule, English gloss Archivo 12.5px) each linking to the Grammar hub, hover turns `#A31621` → primary CTA **Start reading** (`#A31621`, paper text, display 24px, 14px 30px) with a 24ch Archivo note beside it: "From here on, Spanish only. Hover any sentence for the English."

### 3. Story reader — the core screen
**Layout — horizontal split.** A single column. The illustration is a **full-width plate across the top**, `position: sticky; top: 45px`, height **56vh** (44vh narrow), ground `#16302A`, 1px bottom border, `z-index: 5`. As the reader scrolls it **shrinks to 32vh (28vh narrow) and dims to 0.55 opacity** — height and opacity interpolate on a scroll factor `t = clamp(scrollY / (0.8 × innerHeight), 0, 1)`, transition 320ms ease — so the story takes over the page. The text column sits below on paper at `z-index: 6`, so the plate reads as a window receding behind the page.

**Chrome (fixed top, 45px):** paper at 0.94 alpha + 6px backdrop blur, 1px bottom rule. Left "← Library"; story title (display 20px); a progress rule (2px, max 420px, `rgba(25,22,20,0.15)` track, `#A31621` fill, 200ms) with a percentage label; right a square-knob toggle **"Always show translations"** (34×18 box, forest fill when on). Nothing else — the screen should feel like reading, not operating software.

**Plate overlay:** a top-to-bottom scrim `rgba(11,24,19,0.35) → 0 at 32% → rgba(11,24,19,0.55)`, and a bottom-left caption — "PLATE 1" (Archivo 10px, 0.2em) + scene title (display 26px, `#F3EFE3`). Body text is never set over the image.

**Scenes:** three plates stacked absolutely, crossfading on **opacity 900ms ease** with a 1.03 → 1.01 scale settle. The active scene is derived on scroll: the sentence nearest 42% of viewport height wins, and its scene index drives the panel. Scenes: 1 "La capa roja", 2 "El bosque", 3 "El lobo".

**Text column:** max-width **1040px** (760px narrow), centered, padding 72px 56px 0 (48px 24px 0 narrow) — ~72 characters per line at 24px. One `<p>` per scene, preceded by a centered scene divider (1px rules either side of a gilt 10.5px 0.2em uppercase label). **Sentences flow as continuous prose** — each sentence is an inline `<span>` inside the paragraph, wrapping naturally; they are not line-per-sentence.

**Sentence interaction (the signature):**
- Each sentence is an inline span with `data-sentence="<index>"` and `tabindex="0"`.
- **Hover or focus** → the sentence gets a quiet highlight: wash `rgba(163,22,33,0.08)` + 2px `#A31621` bottom border (transparent 2px border at rest, so nothing shifts), 140ms.
- The **English appears in a reserved rail** stuck to the bottom of the text column (`position: sticky; bottom: 0`, matched to the column's max-width, ground `rgba(20,26,23,0.94)`, padding 14px 18px, min-height 58px, `pointer-events: none`): a small "EN" label (Archivo 10px, 0.2em, 45% alpha) and the sentence's translation in Archivo 15.5px `#EDE9DC`. It **fades in only while a sentence is hovered or focused** (opacity 0→1 + 8px rise, 160ms) and fades out otherwise. Nothing occludes the text, no reflow, and the reader's eye path stays fixed.
- **Audio button per sentence:** a 21px ring with a small speaker glyph, inline at the sentence start with **reserved space** (`margin-right: 7px`, `vertical-align: -0.18em`) — 50% opacity and `rgba(25,22,20,0.2)` border at rest, full opacity with a hood-red ring when its sentence is hovered/focused, and filled `#A31621` with paper glyph for ~2.6s while "playing". Because the space is reserved it never overlaps the line above and never reflows. Playback itself is not wired in the prototype; see Open items.
- **Keyboard:** ArrowDown/ArrowRight and ArrowUp/ArrowLeft step sentence to sentence, move DOM focus, and the rail follows focus. `focusin` is delegated on the document (per-element focus handlers were unreliable); pointer tracking is delegated `mousemove`/`mouseover` on the column with `mouseleave` clearing it.
- **Always show translations** on → each sentence's English renders inline right after it, Archivo at `0.62em` and 50% ink, for the child-with-parent case.

**Sample content (13 sentences, 3 scenes) — use verbatim; Spanish punctuation matters (em-dash speech, angle quotes):**
1. Había una vez una niña muy pequeña y muy bonita. — Once upon a time there was a very small and very pretty girl.
2. Su abuela le regaló una capa roja con capucha. — Her grandmother gave her a red cape with a hood.
3. Por eso todos la llamaban Caperucita Roja. — That's why everyone called her Little Red Riding Hood.
4. Un día su madre le dijo: «Lleva este pastel a tu abuela». — One day her mother said to her: "Take this cake to your grandmother."
5. La niña puso el pastel en una cesta y salió de casa. — The girl put the cake in a basket and left the house.
6. El bosque era oscuro y estaba muy silencioso. — The forest was dark and was very quiet.
7. Entre los árboles había flores blancas y azules. — Among the trees there were white and blue flowers.
8. Caperucita caminaba despacio y cantaba en voz baja. — Little Red Riding Hood walked slowly and sang quietly.
9. De pronto, un lobo salió de entre los árboles. — Suddenly, a wolf came out from among the trees.
10. —¿Adónde vas, niña? —preguntó el lobo. — "Where are you going, little girl?" asked the wolf.
11. —Voy a casa de mi abuela —respondió Caperucita. — "I'm going to my grandmother's house," Little Red Riding Hood replied.
12. El lobo sonrió y le mostró el camino de las flores. — The wolf smiled and showed her the path of the flowers.
13. Después corrió por el atajo hacia la casa de la abuela. — Then he ran along the shortcut toward the grandmother's house.

Story end mark: centered "Continúa…" in display italic 22px at 60% ink, then 120px of clearance above the rail.

### 4. AI story generator (modal from Library)
Overlay `rgba(22,20,18,0.55)`; dialog width `min(760px, 100%)`, max-height 90vh, paper ground, 1px ink border, `14px 14px 0` print shadow. Header band on `#DBD5C4`: "A STORY MADE FOR YOU" (10.5px, 0.22em) left, "Close" right. Escape closes. No sparkles, no gradient AI badge.

**Form state:** H2 "What should this story be about?" (display 38px); helper "Write it in English. We'll write the story in Spanish and illustrate it."; a 3-row textarea (Literata 17px, fill `#F3EFE3`, 1px `rgba(25,22,20,0.35)`, placeholder "A story about a lost cat in Madrid"); **Level** chips A1/A2/B1 and **Length** chips Short/Medium (Archivo 12px caps, 8px 14px; selected = ink fill + paper text, unselected = 1px 30%-ink border); a rule, then primary **Write the story** (ink block) and the note "Writing and illustrating takes about a minute."

**Generating state (honest, not a spinner):** heading tracks the step ("Reading your request" → "Writing your story" → "Illustrating your story") with the user's request echoed beneath. Three rows, each with a 20px square mark (empty → ink outline while active → forest fill with ✓ when done), a Literata 16.5px label, a 2px progress rule that animates to 62% over 2400ms linear while active and 100% when done, and an honest time note ("about 5 s" / "about 30 s" / "about 25 s"). Prototype timings: step 2 at 2.6s, step 3 at 5.6s, done at 11s. Wire these to real backend progress events.

**Ready state:** 170px 3:4 cover on `#2A3550`, "READY TO READ" eyebrow, generated Spanish title 38px + English one beneath, level and length chips ("20 sentences" / "40 sentences"), primary **Start reading**, secondary text link "Write another".

### 5. Grammar lessons hub
Header identical to Library with Grammar active. H1 "Grammar, as the stories use it"; standfirst "Seven short lessons. Each one points back to the sentences where you already met it, so the rule arrives after the reading, not before." (58ch). Then a list — the most structured screen in the app, still on paper, no cards: rows of `minmax(240px,1.1fr) minmax(0,1.4fr) minmax(160px,0.8fr)`, gap 28px, padding 26px, 1px bottom rules, hover `rgba(25,22,20,0.045)`. Column 1: Spanish concept (display 27px) + gilt tag (11px, 0.14em caps). Column 2: plain-English one-liner (16px/1.65). Column 3: the stories it appears in (Archivo 12.5px). Rows link back to the stories.

Seven lessons: **Había una vez** (el imperfecto) — "Every fairy tale opens in the imperfect: the tense for how things were, not for what happened." — La Caperucita Roja · Blancanieves; **Pretérito y imperfecto** (dos pasados) — "Scene-setting versus things that happen. The single hardest thing about narrating in Spanish." — El Patito Feo · Hansel y Gretel; **-ito / -ita** (diminutivos) — "Read the titles again: Caperucita, Cerditos, Patito, Ricitos. Children's stories are built out of diminutives." — Los Tres Cerditos · El Patito Feo; **Ser y estar** (dos maneras de ser) — "El bosque era oscuro — that is what the forest is like. Estaba silencioso — that is how it was that day." — La Caperucita Roja; **Lleva, abre, ven** (el imperativo) — "Fairy-tale dialogue is mostly orders. Learn the commands and you can read the conversations." — Hansel y Gretel · Los Tres Cerditos; **El lobo, la niña, los árboles** (género y artículos) — "Gender is easiest to absorb from nouns you already picture. Start with the animals in the wood." — La Caperucita Roja · La Liebre y la Tortuga; **Todos la llamaban** (pronombres de objeto) — "La, lo, le: the small words that stand in for whoever the story is about." — La Caperucita Roja.

---

## Interactions & Behavior
- **Navigation:** Library → story card → Story landing → "Start reading" → Reader. "← Library" returns from landing and reader. Grammar reachable from the header and from a landing page's grammar rows. Each navigation resets scroll to 0 and clears the active sentence. In a real app these are routes: `/`, `/story/:slug`, `/story/:slug/read`, `/grammar`.
- **Generator:** opens as a modal over the Library, closes on "Close" or Escape; "Write another" returns to the form; "Start reading" opens the reader.
- **Reader scroll:** one `requestAnimationFrame`-throttled scroll handler drives both the scene index and the plate's shrink/dim factor.
- **Motion:** scene crossfade 900ms ease; plate height/opacity 320ms; sentence highlight 140ms; rail 160ms; progress 200ms. Nothing else animates. `@media (prefers-reduced-motion: reduce)` collapses all transitions and animations to ~0ms.
- **Responsive:** a resize listener sets a `narrow` flag below **1120px** (the prototype's inline-style constraint; in a real codebase use media queries at the same breakpoint). Narrow: reader and landing become single-column, body text 21px, column cap 760px, gutters 24–28px, plate 44vh → 28vh. Holds to 768px with ~64 characters per line. Mobile is a later pass.
- **Accessibility:** every control is a real tab stop with Enter/Space activation (use native `<button>` in production); the hovered/focused sentence carries the same visible highlight; translations are reachable by keyboard via arrow-key stepping; `:focus-visible` ring is hood red at 3px offset; text is never set over a busy image.

## State Management
- `screen` (`library | story | reader | grammar`) — replace with routing.
- `story` — the selected story record.
- `hover` (sentence index or null), `active` (keyboard-focused index or −1) — `hover` wins for what the rail shows; `active` persists for arrow stepping. `read` tracks the scroll-nearest sentence for progress when nothing is hovered.
- `scene` (0–2), `fade` (0–1 scroll factor).
- `showTr` (always-show-translations toggle; a real app should persist this per user), `playing` (sentence index or null, cleared after 2.6s).
- `genOpen`, `genPhase` (`form | busy | done`), `genPrompt`, `genLevel`, `genLength`, `genStep`.
- **Data fetching:** story list + per-story record (title pair, level, origin, counts, blurb, grammar concepts), sentence array of `{ es, en, sceneIndex }` (translation is stored per sentence — align 1:1 at authoring time), scene illustrations per story, lessons list, and a generation endpoint that streams step progress.

## Assets
- **Fonts:** Cormorant Garamond, Literata, Archivo — Google Fonts. Self-host in production.
- **Illustrations:** none supplied. The prototype uses `<image-slot>` placeholders — reader scenes (`reader-scene-1..3`), story cover (`story-cover`), generated cover (`gen-cover`) — and prints library covers as tinted type-only plates. Real art must be sourced (commissioned, public-domain engravings, or generated) with consistent character and style; that choice will constrain the palette.
- **Icons:** one inline SVG (12×12 speaker) for sentence audio. No icon library.

## Open items for the build
1. **Audio/narration** is visual-state only in the prototype (no playback). If native-speaker audio or TTS ships, it affects the reader layout — sentence playback controls, possibly karaoke highlighting.
2. **Source text licensing:** adapt from public-domain originals or write simplified retellings; modern translations and studio versions are not free to use.
3. **Sentence alignment:** the rail assumes clean 1:1 Spanish↔English sentences. Translate sentence-by-sentence rather than aligning existing prose.
4. **Out of scope by decision:** saved words, SRS, streaks, progress dashboards. Storyline is a reading app.

## Files
- `Storyline.dc.html` — the full prototype: all five surfaces, sample story, all interactions.
- `image-slot.js` — the image-placeholder web component the prototype uses for illustrations (design tooling only; not needed in production).
