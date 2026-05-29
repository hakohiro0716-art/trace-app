import Link from "next/link";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoDetailFooter(props: { memoId: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div
        className="h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(246,242,234,0.92)_45%,#F6F2EA_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-auto px-5 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <Link
            href={`/memo/new?from=${props.memoId}`}
            className={cn(
              "grid place-items-center rounded-[20px] border border-black/8 bg-[#F6F2EA] py-3.5",
              "text-[13px] font-semibold text-slate-800",
              "shadow-[0_12px_32px_rgba(0,0,0,0.10)]",
              "transition-transform duration-200 active:scale-[0.985]",
            )}
          >
            編集
          </Link>
          <button
            type="button"
            className={cn(
              "rounded-[20px] border border-black/8 bg-white/60 py-3.5",
              "text-[13px] font-semibold text-slate-600",
              "transition-transform duration-200 active:scale-[0.985]",
            )}
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
