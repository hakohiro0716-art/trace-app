import Link from "next/link";
import { LeafMark } from "@/app/components/home/icons";
import {
  getTagLabel,
  getThoughtLogPreviewTitle,
  type ThoughtLogDetail,
} from "@/app/lib/thought-log";
import { getBookById } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ThoughtLogListItem(props: {
  log: ThoughtLogDetail;
  variant?: "dark" | "light";
}) {
  const variant = props.variant ?? "dark";
  const book = getBookById(props.log.bookId);
  const title = getThoughtLogPreviewTitle(props.log);
  const meta = book
    ? `${book.title}より・${props.log.createdAtLabel.date}`
    : props.log.createdAtLabel.date;
  const tagPreview = props.log.tagIds
    .slice(0, 2)
    .map((id) => getTagLabel(id))
    .join(" · ");

  if (variant === "light") {
    return (
      <Link
        href={`/memo/${props.log.id}`}
        className={cn(
          "flex w-full items-center gap-3 rounded-[18px] px-3 py-3",
          "transition-colors hover:bg-white/35",
        )}
      >
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white/55 ring-1 ring-black/5">
          <LeafMark className="text-emerald-900/75" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-slate-900">
            {title}
          </span>
          <span className="mt-1 block truncate text-[11px] text-slate-500">
            {meta}
          </span>
        </span>
        <span className="text-slate-400">›</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/memo/${props.log.id}`}
      className={cn(
        "block rounded-[18px] border border-white/10 bg-white/[0.05] px-4 py-3",
        "transition-transform duration-200 active:scale-[0.985]",
      )}
    >
      <p className="line-clamp-2 text-[13px] leading-relaxed text-white/75">
        {title}
      </p>
      <p className="mt-2 text-[11px] text-white/45">{meta}</p>
      {tagPreview ? (
        <p className="mt-1 text-[10px] text-white/35">{tagPreview}</p>
      ) : null}
    </Link>
  );
}
