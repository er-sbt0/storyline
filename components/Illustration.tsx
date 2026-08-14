import Image from "next/image";

type Props = {
  /** What this plate should show. Doubles as alt text once art lands. */
  placeholder: string;
  /** Real artwork, when it exists. Until then the ground shows the brief. */
  src?: string;
  className?: string;
  priority?: boolean;
};

/**
 * The illustration ground. No art has been sourced yet (see design/HANDOFF.md,
 * "Open items"), so this renders the forest-deep plate with the scene brief on
 * it. Pass `src` and it becomes a real cover-fitted image with no other change.
 */
export function Illustration({
  placeholder,
  src,
  className = "",
  priority = false,
}: Props) {
  return (
    <div
      className={`bg-forest-deep relative h-full w-full overflow-hidden ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={placeholder}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <span className="font-ui max-w-[28ch] text-center text-[11px] leading-[1.7] tracking-[0.18em] text-[rgba(243,239,227,0.34)] uppercase">
            {placeholder}
          </span>
        </div>
      )}
    </div>
  );
}
