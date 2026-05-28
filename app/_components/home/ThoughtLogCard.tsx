import { LeafMark } from "./icons";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export type ThoughtLogItem = {
  id: string;
  title: string;
  meta: string;
};

export function ThoughtLogCard(props: { items: ThoughtLogItem[] }) {
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
          <button className="text-[12px] text-slate-500 hover:text-slate-700 transition-colors">
            すべて見る ›
          </button>
        </div>

        <div className="mt-4 divide-y divide-black/5 px-4 pb-3">
          {props.items.slice(0, 2).map((it) => (
            <button
              key={it.id}
              className={cn(
                "w-full rounded-[18px] px-3 py-3 text-left",
                "transition-colors hover:bg-white/35",
                "flex items-center gap-3",
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
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

