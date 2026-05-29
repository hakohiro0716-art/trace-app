import Link from "next/link";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function BackHeader(props: { title?: string; href?: string }) {
  const href = props.href ?? "/";

  return (
    <header className="flex items-center gap-3 px-5 pt-[max(env(safe-area-inset-top),12px)] pb-2">
      <Link
        href={href}
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-2xl",
          "bg-white/10 ring-1 ring-white/10 backdrop-blur-xl",
          "text-white/85 transition-transform duration-200 active:scale-[0.98]",
        )}
        aria-label="戻る"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M14.5 5.5 8 12l6.5 6.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
      {props.title ? (
        <h1 className="truncate text-[17px] font-semibold tracking-[-0.01em] text-white/92">
          {props.title}
        </h1>
      ) : null}
    </header>
  );
}
