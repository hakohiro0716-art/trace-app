import Link from "next/link";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function AddBookButton() {
  return (
    <Link
      href="/books/new"
      className={cn(
        "grid h-11 w-11 place-items-center rounded-2xl",
        "bg-white/10 ring-1 ring-white/10 backdrop-blur-xl",
        "text-[22px] font-light leading-none text-white/90",
        "transition-transform duration-200 active:scale-[0.96]",
      )}
      aria-label="本を追加"
    >
      +
    </Link>
  );
}
