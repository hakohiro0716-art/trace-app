import Link from "next/link";
import { readingStatusLabel, type BookDetail } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function BookListCard(props: { book: BookDetail }) {
  const { book } = props;
  const progressPercent = Math.round(book.progress * 100);
  const statusLabel = readingStatusLabel[book.status];

  return (
    <Link
      href={`/books/${book.id}`}
      className={cn(
        "block rounded-[22px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl",
        "transition-transform duration-200 active:scale-[0.985]",
      )}
    >
      <div className="flex gap-4">
        <div
          className={cn(
            "relative h-[88px] w-[62px] shrink-0 overflow-hidden rounded-[14px]",
            "bg-[linear-gradient(180deg,#f5f1e8_0%,#efe8dc_45%,#e7dfd2_100%)]",
            "shadow-[0_10px_24px_rgba(0,0,0,0.20)]",
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
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold tracking-[-0.01em]">
                {book.title}
              </p>
              <p className="mt-1 truncate text-[12px] text-white/55">
                {book.author}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/80 ring-1 ring-white/10">
              {statusLabel}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-white/45">{book.category}</p>
          {book.status !== "backlog" ? (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] text-white/50">
                <span>進捗</span>
                <span className="text-white/70">{progressPercent}%</span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(214,228,222,0.45),rgba(130,195,173,0.30))]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
