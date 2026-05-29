"use client";

import {
  formatImportanceStars,
  QUOTE_IMPORTANCE_LEVELS,
  type QuoteImportance,
} from "@/app/lib/quote-form";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ImportancePicker(props: {
  value: QuoteImportance;
  onChange: (value: QuoteImportance) => void;
}) {
  return (
    <div className="space-y-2">
      {QUOTE_IMPORTANCE_LEVELS.map((level) => {
        const active = props.value === level;
        return (
          <button
            key={level}
            type="button"
            onClick={() => props.onChange(level)}
            className={cn(
              "flex w-full items-center justify-between gap-4 rounded-[18px] border px-4 py-3.5",
              "transition-all duration-200 active:scale-[0.99]",
              active
                ? "border-emerald-900/25 bg-[linear-gradient(180deg,rgba(41,79,85,0.12)_0%,rgba(31,68,76,0.08)_100%)] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                : "border-black/5 bg-white/45 hover:bg-white/70",
            )}
          >
            <span
              className={cn(
                "text-[15px] tracking-[0.12em]",
                active ? "text-emerald-900" : "text-slate-500",
              )}
              aria-hidden="true"
            >
              {formatImportanceStars(level)}
            </span>
            <span
              className={cn(
                "text-[12px] font-medium tabular-nums",
                active ? "text-slate-800" : "text-slate-500",
              )}
            >
              {level}
            </span>
          </button>
        );
      })}
    </div>
  );
}
