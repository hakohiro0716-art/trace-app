import {
  getInsightLevelLabel,
  INSIGHT_LEVELS,
  type InsightLevel,
} from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoInsightLevelDisplay(props: { level: InsightLevel }) {
  const label = getInsightLevelLabel(props.level);

  return (
    <section className="px-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        気付きレベル
      </h2>
      <div
        className={cn(
          "mt-3 rounded-[22px] border border-black/5 bg-[#F6F2EA] p-5",
          "shadow-[0_14px_34px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="flex items-center gap-2">
          {INSIGHT_LEVELS.map((item) => {
            const filled = item.level <= props.level;
            return (
              <div
                key={item.level}
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  filled
                    ? "bg-[linear-gradient(90deg,#3d6b72,#294f55)]"
                    : "bg-black/8",
                )}
                aria-hidden="true"
              />
            );
          })}
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-[28px] font-semibold leading-none tracking-[-0.03em] text-slate-900">
            {props.level}
          </span>
          <span className="text-[13px] text-slate-500">/ 5</span>
        </div>
        <p className="mt-2 text-[14px] font-medium text-slate-800">{label}</p>
      </div>
    </section>
  );
}
