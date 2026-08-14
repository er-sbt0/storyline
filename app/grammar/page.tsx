import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { LESSONS, STORIES } from "@/lib/stories";

export const metadata = {
  title: "Grammar, as the stories use it — Storyline",
  description:
    "Seven short lessons, each pointing back to the sentences where you already met the rule.",
};

/** First story named in a lesson's story list, so the row can link back. */
function firstStoryHref(stories: string) {
  const first = stories.split("·")[0]?.trim();
  const match = STORIES.find((s) => s.es === first);
  return match ? `/story/${match.slug}` : "/";
}

export default function GrammarPage() {
  return (
    <main>
      <SiteHeader active="grammar" />

      <div className="max-w-[1080px] px-7 pt-[52px] pb-[90px] wide:px-11">
        <h1 className="font-display m-0 mb-3 text-[44px] leading-[1.05] font-semibold">
          Grammar, as the stories use it
        </h1>
        <p className="m-0 mb-11 max-w-[58ch] text-[17px] leading-[1.7] text-pretty text-[rgba(25,22,20,0.72)]">
          Seven short lessons. Each one points back to the sentences where you
          already met it, so the rule arrives after the reading, not before.
        </p>

        <div className="border-t border-t-[rgba(25,22,20,0.2)]">
          {LESSONS.map((lesson) => (
            <Link
              key={lesson.slug}
              href={firstStoryHref(lesson.stories)}
              className="text-ink grid grid-cols-[minmax(0,1fr)] items-baseline gap-7 border-b border-b-[rgba(25,22,20,0.14)] py-[26px] pr-3 pl-1 transition-colors duration-150 hover:bg-[rgba(25,22,20,0.045)] wide:grid-cols-[minmax(240px,1.1fr)_minmax(0,1.4fr)_minmax(160px,0.8fr)]"
            >
              <div>
                <div className="font-display text-[27px] leading-[1.15]">
                  {lesson.es}
                </div>
                <div className="font-ui text-gilt mt-[7px] text-[11px] tracking-[0.14em] uppercase">
                  {lesson.tag}
                </div>
              </div>
              <div className="text-[16px] leading-[1.65] text-pretty text-[rgba(25,22,20,0.78)]">
                {lesson.en}
              </div>
              <div className="font-ui text-[12.5px] leading-[1.6] text-[rgba(25,22,20,0.55)]">
                {lesson.stories}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
