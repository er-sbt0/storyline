import Link from "next/link";
import { notFound } from "next/navigation";
import { Illustration } from "@/components/Illustration";
import { STORIES, getStory } from "@/lib/stories";

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/story/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  return {
    title: `${story.es} — Storyline`,
    description: story.blurb,
  };
}

/**
 * The moment before committing, and the one place English is generous. From
 * "Start reading" onward it is Spanish only.
 */
export default async function StoryLandingPage({
  params,
}: PageProps<"/story/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  return (
    <main>
      <div className="font-ui flex items-center gap-[18px] border-b border-b-[rgba(25,22,20,0.14)] px-7 py-5 text-[13px] wide:px-11">
        <Link
          href="/"
          className="text-[rgba(25,22,20,0.7)] transition-colors duration-150 hover:text-hood"
        >
          ← Library
        </Link>
        <span className="text-[rgba(25,22,20,0.3)]">/</span>
        <span>{story.es}</span>
      </div>

      <div className="grid min-h-0 items-stretch grid-cols-[minmax(0,1fr)] wide:min-h-[calc(100vh-54px)] wide:grid-cols-[minmax(320px,1.05fr)_minmax(0,1fr)]">
        <div className="relative min-h-[300px] overflow-hidden wide:min-h-[420px]">
          <Illustration
            placeholder={`Cover plate — ${story.es}`}
            priority
          />
          {/* Inset vignette so type never sits on a bright edge. */}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(10,20,16,0.55)]" />
        </div>

        <div className="flex max-w-[720px] flex-col px-7 pt-9 pb-14 wide:px-[60px] wide:pt-14 wide:pb-[70px]">
          <span className="font-ui text-[11px] tracking-[0.18em] text-[rgba(25,22,20,0.5)] uppercase">
            {story.origin}
          </span>
          <h1 className="font-display mt-[14px] mb-[6px] text-[44px] leading-[1.02] font-semibold tracking-[-0.015em] wide:text-[60px]">
            {story.es}
          </h1>
          <div className="font-ui text-[14px] tracking-[0.02em] text-[rgba(25,22,20,0.6)]">
            {story.en}
          </div>

          <div className="font-ui mt-[26px] mb-[30px] flex gap-[10px] text-[11px] tracking-[0.14em] uppercase">
            <span className="border border-[rgba(25,22,20,0.35)] px-[9px] py-[5px]">
              {story.level}
            </span>
            <span className="border border-[rgba(25,22,20,0.35)] px-[9px] py-[5px]">
              {story.meta}
            </span>
          </div>

          <p className="m-0 mb-[34px] max-w-[56ch] text-[18px] leading-[1.75] text-pretty text-[rgba(25,22,20,0.85)]">
            {story.blurb}
          </p>

          <div className="mb-9 border-t border-t-[rgba(25,22,20,0.16)] pt-[22px]">
            <h2 className="font-ui m-0 mb-[14px] text-[11px] tracking-[0.16em] text-[rgba(25,22,20,0.5)] uppercase">
              Grammar in this story
            </h2>
            <div className="flex flex-col gap-[10px]">
              {story.grammar.map((concept) => (
                <Link
                  key={concept.es}
                  href="/grammar"
                  className="group text-ink flex items-baseline gap-3 text-[16px] transition-colors duration-150 hover:text-hood"
                >
                  <span className="font-display text-[20px] italic">
                    {concept.es}
                  </span>
                  <span className="-translate-y-[4px] flex-1 border-b border-dotted border-b-[rgba(25,22,20,0.3)]" />
                  <span className="font-ui text-[12.5px] text-[rgba(25,22,20,0.6)] group-hover:text-hood">
                    {concept.en}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href={`/story/${story.slug}/read`}
              className="font-display bg-hood text-paper-light border-hood shadow-print hover:bg-hood-deep hover:border-hood-deep hover:shadow-print-tight border px-[30px] py-[14px] text-[24px] transition-all duration-150"
            >
              Start reading
            </Link>
            <span className="font-ui max-w-[24ch] text-[12.5px] leading-[1.5] text-[rgba(25,22,20,0.55)]">
              From here on, Spanish only. Hover any sentence for the English.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
