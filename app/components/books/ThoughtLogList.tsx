import { ThoughtLogListItem } from "@/app/components/memo/ThoughtLogListItem";
import { getThoughtLogById } from "@/app/lib/thought-log";
import type { BookThoughtLog } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ThoughtLogList(props: { items: BookThoughtLog[] }) {
  return (
    <section className="px-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        思考ログ一覧
      </h2>
      {props.items.length === 0 ? (
        <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
          この本に紐づく思考ログはまだありません。
        </p>
      ) : (
        <div
          className={cn(
            "mt-3 overflow-hidden rounded-[24px]",
            "border border-black/5 bg-[#F6F2EA]",
            "shadow-[0_16px_40px_rgba(0,0,0,0.08)]",
          )}
        >
          <div className="divide-y divide-black/5 px-2 py-1">
            {props.items.map((it) => {
              const log = getThoughtLogById(it.id);
              if (!log) return null;
              return (
                <ThoughtLogListItem
                  key={it.id}
                  log={log}
                  variant="light"
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
