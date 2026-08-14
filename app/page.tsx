import { CreateStoryBlock } from "@/components/CreateStoryBlock";
import { SiteHeader } from "@/components/SiteHeader";
import { StoryCard } from "@/components/StoryCard";
import { LEVELS, LEVEL_GROUPS, storiesByLevel } from "@/lib/stories";

export default function LibraryPage() {
  return (
    <main>
      <SiteHeader active="library" />

      <div className="flex max-w-[1440px] flex-wrap items-end justify-between gap-8 px-7 pt-11 pb-[34px] wide:px-11">
        <div className="max-w-[560px]">
          <h1 className="font-display m-0 mb-[14px] text-[46px] leading-[1.06] font-semibold tracking-[-0.01em]">
            Read a story you already know,
            <br />
            in Spanish only
          </h1>
          <p className="m-0 max-w-[52ch] text-[17px] leading-[1.7] text-pretty text-[rgba(25,22,20,0.72)]">
            You know how these end. That is the point: you can keep reading past
            the words you don&rsquo;t have yet. English waits in the margin
            until you ask for it.
          </p>
        </div>
        <CreateStoryBlock />
      </div>

      {/* Grouping is by CEFR level — the committed primary axis. */}
      <div className="max-w-[1440px] px-7 pb-[90px] wide:px-11">
        {LEVELS.map((level) => (
          <section key={level} className="mb-14">
            <div className="mb-[26px] flex items-baseline gap-[18px] border-b border-b-[rgba(25,22,20,0.16)] pb-[14px]">
              <h2 className="font-display m-0 text-[28px] font-semibold">
                {LEVEL_GROUPS[level].label}
              </h2>
              <span className="font-ui text-[12px] tracking-[0.04em] text-[rgba(25,22,20,0.55)]">
                {LEVEL_GROUPS[level].note}
              </span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-[26px] gap-y-[30px]">
              {storiesByLevel(level).map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
