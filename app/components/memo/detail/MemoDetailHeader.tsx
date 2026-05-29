import Link from "next/link";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoDetailHeader(props: {
  memoId: string;
  backHref?: string;
}) {
  const backHref = props.backHref ?? "/memo";

  return (
    <header className="flex items-center justify-between gap-3 px-5 pt-[max(env(safe-area-inset-top),12px)] pb-2">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Link
          href={backHref}
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
        <p className="truncate text-[13px] text-white/65">思考ログ</p>
      </div>

      <Link
        href={`/memo/new?from=${props.memoId}`}
        className={cn(
          "shrink-0 rounded-full bg-white/10 px-4 py-2",
          "text-[13px] font-medium text-white/88 ring-1 ring-white/10",
          "backdrop-blur-xl transition-transform duration-200 active:scale-[0.98]",
        )}
      >
        編集
      </Link>
    </header>
  );
}
