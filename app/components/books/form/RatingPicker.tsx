"use client";

import type { BookRating } from "@/app/lib/book-form";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function RatingPicker(props: {
  value: BookRating | null;
  onChange: (value: BookRating | null) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {([1, 2, 3, 4, 5] as BookRating[]).map((star) => {
        const active = props.value !== null && star <= props.value;
        return (
          <button
            key={star}
            type="button"
            onClick={() =>
              props.onChange(props.value === star ? null : star)
            }
            className={cn(
              "grid h-11 w-11 place-items-center rounded-2xl transition-all duration-200",
              "active:scale-[0.95]",
              active
                ? "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_100%)] text-white/90 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                : "border border-black/8 bg-white/50 text-slate-400 hover:bg-white/80",
            )}
            aria-label={`${star}つ星`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={active ? "currentColor" : "none"}
              aria-hidden="true"
            >
              <path
                d="M12 3.2l2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 15.9l-4.7 2.47.9-5.23-3.8-3.7 5.25-.76L12 3.2Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
