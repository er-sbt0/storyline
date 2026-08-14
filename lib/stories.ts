/**
 * Content for Storyline.
 *
 * Copied verbatim from the design prototype (`design/Storyline.dc.html`).
 * In a real build this is the shape the API should return: a story list, a
 * per-story record, and a sentence array where translation is stored per
 * sentence and aligned 1:1 at authoring time.
 */

export type Level = "A1" | "A2" | "B1";

export type GrammarConcept = {
  /** The concept in Spanish, e.g. "el imperfecto". */
  es: string;
  /** The English gloss or the phrase it shows up as. */
  en: string;
};

export type Story = {
  slug: string;
  es: string;
  en: string;
  level: Level;
  origin: string;
  meta: string;
  /** Cover plate tint and the text color that sits on it. */
  tint: string;
  tintText: string;
  blurb: string;
  grammar: GrammarConcept[];
};

export type Scene = {
  id: string;
  title: string;
  /** What the illustration should show, until real art is sourced. */
  placeholder: string;
};

export type Sentence = {
  /** Index of the scene this sentence belongs to. */
  scene: number;
  es: string;
  en: string;
};

export type Lesson = {
  slug: string;
  es: string;
  tag: string;
  en: string;
  stories: string;
};

export const LEVELS: Level[] = ["A1", "A2", "B1"];

export const LEVEL_GROUPS: Record<Level, { label: string; note: string }> = {
  A1: {
    label: "A1 — first stories",
    note: "Short sentences, present and simple past. Start anywhere.",
  },
  A2: {
    label: "A2 — longer, more past tense",
    note: "Two past tenses working together, more dialogue.",
  },
  B1: {
    label: "B1 — full fairy tales",
    note: "Subjunctive, conditional, and the long middle sections.",
  },
};

export const STORIES: Story[] = [
  {
    slug: "la-caperucita-roja",
    es: "La Caperucita Roja",
    en: "Little Red Riding Hood",
    level: "A1",
    origin: "Perrault",
    meta: "38 sentences · 9 min",
    tint: "#A31621",
    tintText: "#F3EFE3",
    blurb:
      "A girl in a red hood carries a cake through a forest that is darker than her mother promised. The wolf she meets on the path is polite, and asks her only one question. You know the rest — which is exactly why you can read it in Spanish.",
    grammar: [
      { es: "el imperfecto", en: "Había una vez" },
      { es: "ser / estar", en: "era oscuro, estaba silencioso" },
      { es: "pronombres de objeto", en: "todos la llamaban" },
    ],
  },
  {
    slug: "los-tres-cerditos",
    es: "Los Tres Cerditos",
    en: "The Three Little Pigs",
    level: "A1",
    origin: "Folk tale",
    meta: "34 sentences · 8 min",
    tint: "#C97F5A",
    tintText: "#20140F",
    blurb:
      "Three brothers, three houses, one hungry visitor. The repetition is the lesson: the same sentences come back three times, so the third time you read them you already know them.",
    grammar: [
      { es: "-ito / -ita", en: "diminutives everywhere" },
      { es: "el futuro simple", en: "soplaré y soplaré" },
    ],
  },
  {
    slug: "la-liebre-y-la-tortuga",
    es: "La Liebre y la Tortuga",
    en: "The Hare and the Tortoise",
    level: "A1",
    origin: "Aesop",
    meta: "22 sentences · 5 min",
    tint: "#5C7A4A",
    tintText: "#F3EFE3",
    blurb:
      "The shortest story in the library, and a good first one. Two animals, one race, one flat sentence of a moral at the end.",
    grammar: [
      { es: "comparativos", en: "más rápido que" },
      { es: "el pretérito", en: "things that happened" },
    ],
  },
  {
    slug: "ricitos-de-oro",
    es: "Ricitos de Oro",
    en: "Goldilocks",
    level: "A1",
    origin: "Folk tale",
    meta: "30 sentences · 7 min",
    tint: "#B98A3C",
    tintText: "#20140F",
    blurb:
      "Too hot, too cold, just right. Adjectives arrive in threes, which makes them stick without any drilling.",
    grammar: [
      { es: "adjetivos", en: "demasiado / muy" },
      { es: "artículos", en: "el, la, los, las" },
    ],
  },
  {
    slug: "el-patito-feo",
    es: "El Patito Feo",
    en: "The Ugly Duckling",
    level: "A2",
    origin: "Andersen",
    meta: "41 sentences · 11 min",
    tint: "#3E5C6B",
    tintText: "#F3EFE3",
    blurb:
      "A long winter told mostly in the imperfect, because nothing happens quickly in it. The last page changes tense, and you will feel it.",
    grammar: [
      { es: "pretérito vs. imperfecto", en: "scene versus event" },
      { es: "-ito / -ita", en: "patito" },
    ],
  },
  {
    slug: "hansel-y-gretel",
    es: "Hansel y Gretel",
    en: "Hansel and Gretel",
    level: "A2",
    origin: "Grimm",
    meta: "46 sentences · 12 min",
    tint: "#4A3A2C",
    tintText: "#F3EFE3",
    blurb:
      "Two children, a trail of breadcrumbs, and a house that is too sweet to be safe. Almost all the dialogue is commands, which is how fairy tales talk.",
    grammar: [
      { es: "el imperativo", en: "Lleva, Abre, Ven" },
      { es: "el pretérito", en: "one thing after another" },
    ],
  },
  {
    slug: "juan-y-los-frijoles-magicos",
    es: "Juan y los Frijoles Mágicos",
    en: "Jack and the Beanstalk",
    level: "A2",
    origin: "Folk tale",
    meta: "39 sentences · 10 min",
    tint: "#3F6B4A",
    tintText: "#F3EFE3",
    blurb:
      "A cow traded for beans, and a plant that goes somewhere. Vertical vocabulary: up, down, above, below, and a giant who counts his money out loud.",
    grammar: [
      { es: "preposiciones", en: "arriba, debajo, hacia" },
      { es: "el imperfecto", en: "vivía con su madre" },
    ],
  },
  {
    slug: "el-traje-nuevo-del-emperador",
    es: "El Traje Nuevo del Emperador",
    en: "The Emperor's New Clothes",
    level: "B1",
    origin: "Andersen",
    meta: "52 sentences · 14 min",
    tint: "#7A2E3B",
    tintText: "#F3EFE3",
    blurb:
      "Everyone in the city says the same untrue thing until a child says the true one. The comedy lives in the subjunctive, so this one is for later.",
    grammar: [
      { es: "el subjuntivo", en: "para que nadie lo vea" },
      { es: "se impersonal", en: "se dice que…" },
    ],
  },
  {
    slug: "blancanieves",
    es: "Blancanieves",
    en: "Snow White",
    level: "B1",
    origin: "Grimm",
    meta: "58 sentences · 16 min",
    tint: "#2A3550",
    tintText: "#F3EFE3",
    blurb:
      "A mirror that answers questions, seven names to keep straight, and three attempts on one life. The longest story here, and the one with the most dialogue.",
    grammar: [
      { es: "el imperfecto", en: "érase una vez" },
      { es: "comparativos", en: "la más hermosa" },
    ],
  },
  {
    slug: "el-flautista-de-hamelin",
    es: "El Flautista de Hamelín",
    en: "The Pied Piper of Hamelin",
    level: "B1",
    origin: "Grimm",
    meta: "44 sentences · 12 min",
    tint: "#6B5230",
    tintText: "#F3EFE3",
    blurb:
      "A town that does not pay its debts, and a musician who collects anyway. Numbers, money, and a bargain — plus the coldest last page in the library.",
    grammar: [
      { es: "el condicional", en: "pagaríamos mañana" },
      { es: "números", en: "mil florines" },
    ],
  },
];

/**
 * Scenes and sentences for the sample story. Only La Caperucita Roja has text
 * in the prototype; every story falls back to it until real content is
 * authored, so the reader can be exercised from any card.
 */
export const SCENES: Scene[] = [
  {
    id: "reader-scene-1",
    title: "La capa roja",
    placeholder: "Scene 1 — the girl and the red cape",
  },
  {
    id: "reader-scene-2",
    title: "El bosque",
    placeholder: "Scene 2 — the dark forest",
  },
  {
    id: "reader-scene-3",
    title: "El lobo",
    placeholder: "Scene 3 — the wolf on the path",
  },
];

export const SENTENCES: Sentence[] = [
  {
    scene: 0,
    es: "Había una vez una niña muy pequeña y muy bonita.",
    en: "Once upon a time there was a very small and very pretty girl.",
  },
  {
    scene: 0,
    es: "Su abuela le regaló una capa roja con capucha.",
    en: "Her grandmother gave her a red cape with a hood.",
  },
  {
    scene: 0,
    es: "Por eso todos la llamaban Caperucita Roja.",
    en: "That's why everyone called her Little Red Riding Hood.",
  },
  {
    scene: 0,
    es: "Un día su madre le dijo: «Lleva este pastel a tu abuela».",
    en: "One day her mother said to her: “Take this cake to your grandmother.”",
  },
  {
    scene: 0,
    es: "La niña puso el pastel en una cesta y salió de casa.",
    en: "The girl put the cake in a basket and left the house.",
  },
  {
    scene: 1,
    es: "El bosque era oscuro y estaba muy silencioso.",
    en: "The forest was dark and was very quiet.",
  },
  {
    scene: 1,
    es: "Entre los árboles había flores blancas y azules.",
    en: "Among the trees there were white and blue flowers.",
  },
  {
    scene: 1,
    es: "Caperucita caminaba despacio y cantaba en voz baja.",
    en: "Little Red Riding Hood walked slowly and sang quietly.",
  },
  {
    scene: 2,
    es: "De pronto, un lobo salió de entre los árboles.",
    en: "Suddenly, a wolf came out from among the trees.",
  },
  {
    scene: 2,
    es: "—¿Adónde vas, niña? —preguntó el lobo.",
    en: "“Where are you going, little girl?” asked the wolf.",
  },
  {
    scene: 2,
    es: "—Voy a casa de mi abuela —respondió Caperucita.",
    en: "“I'm going to my grandmother's house,” Little Red Riding Hood replied.",
  },
  {
    scene: 2,
    es: "El lobo sonrió y le mostró el camino de las flores.",
    en: "The wolf smiled and showed her the path of the flowers.",
  },
  {
    scene: 2,
    es: "Después corrió por el atajo hacia la casa de la abuela.",
    en: "Then he ran along the shortcut toward the grandmother's house.",
  },
];

export const LESSONS: Lesson[] = [
  {
    slug: "habia-una-vez",
    es: "Había una vez",
    tag: "el imperfecto",
    en: "Every fairy tale opens in the imperfect: the tense for how things were, not for what happened.",
    stories: "La Caperucita Roja · Blancanieves",
  },
  {
    slug: "preterito-y-imperfecto",
    es: "Pretérito y imperfecto",
    tag: "dos pasados",
    en: "Scene-setting versus things that happen. The single hardest thing about narrating in Spanish.",
    stories: "El Patito Feo · Hansel y Gretel",
  },
  {
    slug: "ito-ita",
    es: "-ito / -ita",
    tag: "diminutivos",
    en: "Read the titles again: Caperucita, Cerditos, Patito, Ricitos. Children's stories are built out of diminutives.",
    stories: "Los Tres Cerditos · El Patito Feo",
  },
  {
    slug: "ser-y-estar",
    es: "Ser y estar",
    tag: "dos maneras de ser",
    en: "El bosque era oscuro — that is what the forest is like. Estaba silencioso — that is how it was that day.",
    stories: "La Caperucita Roja",
  },
  {
    slug: "el-imperativo",
    es: "Lleva, abre, ven",
    tag: "el imperativo",
    en: "Fairy-tale dialogue is mostly orders. Learn the commands and you can read the conversations.",
    stories: "Hansel y Gretel · Los Tres Cerditos",
  },
  {
    slug: "genero-y-articulos",
    es: "El lobo, la niña, los árboles",
    tag: "género y artículos",
    en: "Gender is easiest to absorb from nouns you already picture. Start with the animals in the wood.",
    stories: "La Caperucita Roja · La Liebre y la Tortuga",
  },
  {
    slug: "pronombres-de-objeto",
    es: "Todos la llamaban",
    tag: "pronombres de objeto",
    en: "La, lo, le: the small words that stand in for whoever the story is about.",
    stories: "La Caperucita Roja",
  },
];

export function getStory(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}

export function storiesByLevel(level: Level): Story[] {
  return STORIES.filter((s) => s.level === level);
}
