import Link from "next/link";
import { LeafMark } from "@/app/components/home/icons";
import {
  getTagLabel,
  type ThoughtLogTagId,
} from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type ThoughtLogListData = {
  id: string;

  title?: string;
  content?: string;

  // 古いダミーデータ用
  body?: string;

  tags?: string[];

  // 古いダミーデータ用
  tagIds?: string[];

  createdAt?: string;

  createdAtLabel?: {
    date: string;
    time: string;
  };

  bookTitle?: string | null;
};

function formatDate(dateString?: string) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function ThoughtLogListItem(props: {
  log: ThoughtLogListData;
  variant?: "dark" | "light";
}) {
  const variant = props.variant ?? "dark";

  const body =
    props.log.content ??
    props.log.body ??
    "";

  const title =
    props.log.title ||
    body
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ||
    "思考ログ";

  const dateLabel =
    props.log.createdAtLabel?.date ||
    formatDate(props.log.createdAt);

  const meta = props.log.bookTitle
    ? `${props.log.bookTitle}より・${dateLabel}`
    : dateLabel;

  const tags =
    props.log.tags ??
    props.log.tagIds ??
    [];

  const tagPreview = tags
    .slice(0, 2)
    .map((id) =>
      getTagLabel(id as ThoughtLogTagId),
    )
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

      {meta ? (
        <p className="mt-2 text-[11px] text-white/45">
          {meta}
        </p>
      ) : null}

      {tagPreview ? (
        <p className="mt-1 text-[10px] text-white/35">
          {tagPreview}
        </p>
      ) : null}
    </Link>
  );
}