"use client";

import type { ThoughtLogQuoteDraft } from "@/app/lib/thought-log";
import { createQuoteDraft } from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function QuoteDraftSection(props: {
  quotes: ThoughtLogQuoteDraft[];
  onChange: (quotes: ThoughtLogQuoteDraft[]) => void;
}) {
  const addQuote = () => {
    props.onChange([...props.quotes, createQuoteDraft()]);
  };

  const updateQuote = (
    id: string,
    field: "text" | "page",
    value: string,
  ) => {
    props.onChange(
      props.quotes.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  const removeQuote = (id: string) => {
    props.onChange(props.quotes.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={addQuote}
        className={cn(
          "w-full rounded-[20px] border border-dashed border-black/12 bg-white/40 px-4 py-3.5",
          "text-[13px] font-medium text-slate-700",
          "transition-colors hover:bg-white/70 active:scale-[0.985]",
        )}
      >
        ＋ 引用を追加
      </button>

      {props.quotes.length === 0 ? (
        <p className="text-center text-[12px] text-slate-500">
          心に残った一文があれば、ここに添えておきましょう。
        </p>
      ) : (
        <ul className="space-y-2">
          {props.quotes.map((q, index) => (
            <li
              key={q.id}
              className={cn(
                "rounded-[20px] border border-black/5 bg-[#F6F2EA] p-4",
                "shadow-[0_10px_28px_rgba(0,0,0,0.05)]",
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">
                  引用 {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeQuote(q.id)}
                  className="text-[11px] text-slate-400 hover:text-slate-600"
                >
                  削除
                </button>
              </div>
              <textarea
                value={q.text}
                onChange={(e) => updateQuote(q.id, "text", e.target.value)}
                placeholder="引用文を入力"
                rows={3}
                className={cn(
                  "w-full resize-none rounded-[14px] border border-black/5 bg-white/50 px-3 py-2.5",
                  "text-[13px] leading-relaxed text-slate-800 placeholder:text-slate-400",
                  "outline-none focus:border-emerald-900/20 focus:ring-1 focus:ring-emerald-900/10",
                )}
              />
              <input
                type="text"
                value={q.page}
                onChange={(e) => updateQuote(q.id, "page", e.target.value)}
                placeholder="ページ（例: p.42）"
                className={cn(
                  "mt-2 w-full rounded-[14px] border border-black/5 bg-white/50 px-3 py-2",
                  "text-[12px] text-slate-700 placeholder:text-slate-400",
                  "outline-none focus:border-emerald-900/20 focus:ring-1 focus:ring-emerald-900/10",
                )}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
