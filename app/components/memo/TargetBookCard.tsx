"use client";

import type { BookDetail } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function TargetBookCard(props: {
  book: BookDetail;
  onChange: () => void;
}) {
  const { book } = props;

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-[22px] border border-black/5 bg-[#F6F2EA] p-4",
        "shadow-[0_14px_34px_rgba(0,0,0,0.07)]",
      )}
    >
      <div
        className={cn(
          "relative h-[88px] w-[62px] shrink-0 overflow-hidden rounded-[14px]",
          "bg-[linear-gradient(180deg,#f5f1e8_0%,#efe8dc_45%,#e7dfd2_100%)]",
          "shadow-[0_10px_24px_rgba(0,0,0,0.14)]",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(80px_60px_at_30%_20%,rgba(20,94,79,0.18),transparent_60%)]" />
        <div className="absolute left-2 top-2 right-2">
          <p className="line-clamp-3 text-[8px] font-semibold leading-tight text-slate-900">
            {book.title}
          </p>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium tracking-wide text-slate-500">
          対象の本
        </p>
        <p className="mt-1 truncate text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
          {book.title}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-slate-600">
          {book.author}
        </p>
      </div>

      <button
        type="button"
        onClick={props.onChange}
        className={cn(
          "shrink-0 rounded-full border border-black/8 bg-white/60 px-3 py-1.5",
          "text-[12px] font-medium text-slate-700",
          "transition-colors hover:bg-white/90 active:scale-[0.98]",
        )}
      >
        変更
      </button>
    </div>
  );
}
