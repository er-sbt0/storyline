import Link from "next/link";
import type { Story } from "@/lib/stories";

/**
 * A card is a 3:4 cover plate in the story's tint, printed type-only until real
 * art is sourced, with the English title and metadata beneath it.
 */
export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/story/${story.slug}`}
      className="group flex flex-col gap-[14px]"
    >
      <div
        className="shadow-print-cover relative flex aspect-3/4 flex-col justify-between overflow-hidden border border-[rgba(25,22,20,0.28)] px-[18px] py-5 transition-opacity duration-150 group-hover:opacity-[0.96]"
        style={{ background: story.tint, color: story.tintText }}
      >
        <span className="font-ui text-[10px] tracking-[0.18em] uppercase opacity-[0.72]">
          {story.origin}
        </span>
        <span className="font-display text-[29px] leading-[1.08] text-balance">
          {story.es}
        </span>
        <span className="font-ui self-start border border-current px-[7px] py-[3px] text-[10px] tracking-[0.16em] uppercase opacity-[0.8]">
          {story.level}
        </span>
      </div>
      <div>
        <div className="font-body text-ink text-[15px] leading-[1.35] font-medium">
          {story.en}
        </div>
        <div className="font-ui mt-[5px] text-[12px] text-[rgba(25,22,20,0.55)]">
          {story.meta}
        </div>
      </div>
    </Link>
  );
}
