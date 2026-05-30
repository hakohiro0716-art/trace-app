import Link from "next/link";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const statusLabel: Record<string, string> = {
  backlog: "積読",
  reading: "読書中",
  finished: "読了",
};

const categoryLabel: Record<string, string> = {
  self_help: "自己啓発",
  psychology: "心理学",
  economics: "経済",
  philosophy: "哲学",
  literature: "文学",
  fiction: "小説",
  history: "歴史",
  other: "その他",
};

export function BookListCard(props: { book: any }) {
  const { book } = props;

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
            "shadow-[0_10px_24px_rgba(0,0,0,0.20)]",
          )}
        >
          {book.cover_url ? (
            <img
              src={book.cover_url}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={cn(
                "h-full w-full",
                "bg-[linear-gradient(180deg,#f5f1e8_0%,#efe8dc_45%,#e7dfd2_100%)]",
              )}
            >
              <div className="absolute left-2 top-2 right-2">
                <p className="line-clamp-3 text-[8px] font-semibold leading-tight text-slate-900">
                  {book.title}
                </p>
              </div>
            </div>
          )}
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
              {statusLabel[book.status] ?? book.status}
            </span>
          </div>

          <p className="mt-2 text-[11px] text-white/45">
            {categoryLabel[book.category_id] ?? "未分類"}
          </p>

          <p className="mt-2 text-[10px] text-red-400 break-all">
            {book.cover_url ?? "cover_urlなし"}
          </p>
        </div>
      </div>
    </Link>
  );
}