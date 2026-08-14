import Link from "next/link";

type Props = {
  active: "library" | "grammar";
};

const navLink =
  "font-ui text-[13px] pb-[3px] border-b-2 border-b-transparent no-underline transition-colors duration-150";

/** The Library and Grammar screens share this bar exactly. */
export function SiteHeader({ active }: Props) {
  return (
    <header className="flex items-baseline justify-between gap-6 border-b border-b-[rgba(25,22,20,0.14)] px-7 pt-[26px] pb-[22px] wide:px-11">
      <div className="flex items-baseline gap-[14px]">
        <Link
          href="/"
          className="font-display text-ink text-[30px] leading-none font-semibold tracking-[0.01em]"
        >
          Storyline
        </Link>
        <span className="font-ui text-[11px] tracking-[0.16em] text-[rgba(25,22,20,0.5)] uppercase">
          Español · lectura
        </span>
      </div>
      <nav className="flex items-center gap-[26px]">
        <Link
          href="/"
          className={`${navLink} ${
            active === "library"
              ? "text-ink border-b-hood"
              : "text-[rgba(25,22,20,0.62)] hover:text-ink hover:border-b-[rgba(25,22,20,0.3)]"
          }`}
        >
          Library
        </Link>
        <Link
          href="/grammar"
          className={`${navLink} ${
            active === "grammar"
              ? "text-ink border-b-hood"
              : "text-[rgba(25,22,20,0.62)] hover:text-ink hover:border-b-[rgba(25,22,20,0.3)]"
          }`}
        >
          Grammar lessons
        </Link>
      </nav>
    </header>
  );
}
