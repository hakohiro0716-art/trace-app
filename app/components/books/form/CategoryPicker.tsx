"use client";

import {
  BOOK_CATEGORIES,
  type BookCategoryId,
} from "@/app/lib/book-form";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CategoryPicker(props: {
  value: BookCategoryId | null;
  onChange: (value: BookCategoryId) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {BOOK_CATEGORIES.map((cat) => {
        const active = props.value === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => props.onChange(cat.id)}
            className={cn(
              "rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200",
              "active:scale-[0.97]",
              active
                ? "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_100%)] text-white/92 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                : "border border-black/8 bg-white/50 text-slate-600 hover:bg-white/80",
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
