"use client";

import { BOOK_STATUS_OPTIONS } from "@/app/lib/book-form";
import type { ReadingStatus } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function StatusPicker(props: {
  value: ReadingStatus;
  onChange: (value: ReadingStatus) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {BOOK_STATUS_OPTIONS.map((opt) => {
        const active = props.value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => props.onChange(opt.value)}
            className={cn(
              "rounded-[16px] border px-2 py-3 text-[13px] font-medium transition-all duration-200",
              "active:scale-[0.98]",
              active
                ? "border-emerald-900/25 bg-[linear-gradient(180deg,rgba(41,79,85,0.12)_0%,rgba(31,68,76,0.08)_100%)] text-slate-900"
                : "border-black/5 bg-white/45 text-slate-600 hover:bg-white/70",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
