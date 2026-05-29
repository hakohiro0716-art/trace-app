import type { BookDetail } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ReadingProgressSection(props: { book: BookDetail }) {
  const progressPercent = Math.round(props.book.progress * 100);

  return (
    <section className="px-5">
      <div
        className={cn(
          "rounded-[22px] border border-white/10 bg-[rgba(12,42,48,0.55)] p-5 backdrop-blur-xl",
        )}
      >
        <p className="text-[12px] font-medium tracking-wide text-white/60">
          読書進捗
        </p>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-white/95">
            {progressPercent}
            <span className="ml-0.5 text-[16px] font-medium text-white/75">%</span>
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/14">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,rgba(214,228,222,0.55),rgba(130,195,173,0.35))]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <dt className="text-[11px] text-white/50">開始日</dt>
            <dd className="mt-1 text-[13px] text-white/85">
              {props.book.startedAt ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] text-white/50">読了日</dt>
            <dd className="mt-1 text-[13px] text-white/85">
              {props.book.finishedAt ?? "—"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
