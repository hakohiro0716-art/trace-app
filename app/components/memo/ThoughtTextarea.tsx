"use client";

import {
  THOUGHT_BODY_HINTS,
  THOUGHT_BODY_PLACEHOLDER,
} from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ThoughtTextarea(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const isEmpty = props.value.trim().length === 0;

  return (
    <div>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={THOUGHT_BODY_PLACEHOLDER}
        rows={10}
        className={cn(
          "w-full resize-none rounded-[22px] border border-black/5 bg-[#F6F2EA] p-5",
          "text-[15px] leading-[1.65] text-slate-800 placeholder:text-slate-400",
          "shadow-[0_14px_34px_rgba(0,0,0,0.06)]",
          "outline-none ring-0 focus:border-emerald-900/20 focus:ring-2 focus:ring-emerald-900/10",
        )}
      />
      {isEmpty ? (
        <ul className="mt-4 space-y-2 px-1" aria-hidden="true">
          {THOUGHT_BODY_HINTS.map((hint) => (
            <li
              key={hint}
              className="flex items-start gap-2 text-[12px] leading-relaxed text-slate-400"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-300" />
              {hint}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
