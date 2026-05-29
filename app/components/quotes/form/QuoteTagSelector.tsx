"use client";

import { QUOTE_TAGS, type QuoteTagId } from "@/app/lib/quote-form";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function QuoteTagSelector(props: {
  selected: QuoteTagId[];
  onChange: (selected: QuoteTagId[]) => void;
}) {
  const toggle = (id: QuoteTagId) => {
    if (props.selected.includes(id)) {
      props.onChange(props.selected.filter((t) => t !== id));
    } else {
      props.onChange([...props.selected, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {QUOTE_TAGS.map((tag) => {
        const active = props.selected.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggle(tag.id)}
            className={cn(
              "rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200",
              "active:scale-[0.97]",
              active
                ? "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_100%)] text-white/92 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                : "border border-black/8 bg-white/50 text-slate-600 hover:bg-white/80",
            )}
          >
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}
