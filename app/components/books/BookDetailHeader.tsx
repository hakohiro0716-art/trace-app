import { BookCover } from "./BookCover";
import { readingStatusLabel, type BookDetail } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function BookDetailHeader(props: { book: BookDetail }) {
  const { book } = props;
  const statusLabel = readingStatusLabel[book.status];

  return (
    <div className="px-5 pb-2 pt-4 text-center">
      <BookCover title={book.title} subtitle={book.subtitle} />
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/85 ring-1 ring-white/10">
          {statusLabel}
        </span>
        <span className="rounded-full bg-white/6 px-3 py-1 text-[11px] text-white/70 ring-1 ring-white/8">
          {book.category}
        </span>
      </div>
      <h1 className="mt-4 text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-white/95">
        {book.title}
      </h1>
      <p className="mt-2 text-[13px] text-white/70">{book.author}</p>
      <p
        className={cn(
          "mx-auto mt-3 max-w-[280px] text-[12px] leading-relaxed text-white/55",
        )}
      >
        {book.subtitle}
      </p>
    </div>
  );
}
