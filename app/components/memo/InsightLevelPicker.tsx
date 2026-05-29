"use client";

import { INSIGHT_LEVELS, type InsightLevel } from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function InsightLevelPicker(props: {
  value: InsightLevel;
  onChange: (level: InsightLevel) => void;
}) {
  return (
    <div className="space-y-2">
      {INSIGHT_LEVELS.map((item) => {
        const active = props.value === item.level;
        return (
          <button
            key={item.level}
            type="button"
            onClick={() => props.onChange(item.level)}
            className={cn(
              "flex w-full items-center gap-4 rounded-[18px] border px-4 py-3.5 text-left",
              "transition-all duration-200 active:scale-[0.99]",
              active
                ? "border-emerald-900/25 bg-[linear-gradient(180deg,rgba(41,79,85,0.12)_0%,rgba(31,68,76,0.08)_100%)] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                : "border-black/5 bg-white/45 hover:bg-white/70",
            )}
          >
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
                active
                  ? "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_100%)] text-white/92"
                  : "bg-white/80 text-slate-500 ring-1 ring-black/5",
              )}
            >
              {item.level}
            </span>
            <span
              className={cn(
                "text-[13px] font-medium",
                active ? "text-slate-900" : "text-slate-600",
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
