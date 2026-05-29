import Link from "next/link";
import { LeafMark } from "./icons";
import { getThoughtLogById } from "@/app/lib/thought-log";
import type { BookThoughtLog } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ThoughtLogCard(props: { items: BookThoughtLog[] }) {
  return (
    <section className="px-5">
      <div
        className={cn(
          "rounded-[24px]",
          "border border-black/5 bg-[#F6F2EA]",
          "shadow-[0_16px_40px_rgba(0,0,0,0.08)]",
        )}
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
            最近の思考ログ
          </h3>
          <Link
            href="/memo"
            className="text-[12px] text-slate-500 transition-colors hover:text-slate-700"
          >
            すべて見る ›
          </Link>
        </div>

        <div className="mt-4 divide-y divide-black/5 px-4 pb-3">
          {props.items.slice(0, 2).map((it) => {
            const log = getThoughtLogById(it.id);
            if (!log) return null;
            return (
              <Link
                key={it.id}
                href={`/memo/${it.id}`}
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
                    {it.title}
                  </span>
                  <span className="mt-1 block truncate text-[11px] text-slate-500">
                    {it.meta}
                  </span>
                </span>
                <span className="text-slate-400">›</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
