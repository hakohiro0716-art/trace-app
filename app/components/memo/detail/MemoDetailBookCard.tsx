import Link from "next/link";
import type { BookDetail } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoDetailBookCard(props: { book: BookDetail }) {
  const { book } = props;

  return (
    <Link
      href={`/books/${book.id}`}
      className={cn(
        "block rounded-[22px] border border-black/5 bg-[#F6F2EA] p-4",
        "shadow-[0_14px_34px_rgba(0,0,0,0.07)]",
        "transition-transform duration-200 active:scale-[0.99]",
      )}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "relative h-[96px] w-[68px] shrink-0 overflow-hidden rounded-[14px]",
            "bg-[linear-gradient(180deg,#f5f1e8_0%,#efe8dc_45%,#e7dfd2_100%)]",
            "shadow-[0_10px_24px_rgba(0,0,0,0.14)]",
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(80px_60px_at_30%_20%,rgba(20,94,79,0.18),transparent_60%)]" />
          <div className="absolute left-2 top-2 right-2">
            <p className="line-clamp-4 text-[8px] font-semibold leading-tight text-slate-900">
              {book.title}
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium tracking-wide text-slate-500">
            対象の本
          </p>
          <p className="mt-1 text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
            {book.title}
          </p>
          <p className="mt-0.5 text-[12px] text-slate-600">{book.author}</p>
        </div>

        <span className="shrink-0 text-slate-400" aria-hidden="true">
          ›
        </span>
      </div>
    </Link>
  );
}
