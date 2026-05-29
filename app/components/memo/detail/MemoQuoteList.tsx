import type { ThoughtLogQuote } from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoQuoteList(props: { quotes: ThoughtLogQuote[] }) {
  return (
    <section className="px-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        関連引用
      </h2>
      {props.quotes.length === 0 ? (
        <p className="mt-3 text-[13px] text-slate-500">
          関連する引用はありません。
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {props.quotes.map((q) => (
            <article
              key={q.id}
              className={cn(
                "rounded-[20px] border border-black/5 bg-[#F6F2EA] px-5 py-4",
                "shadow-[0_10px_28px_rgba(0,0,0,0.05)]",
              )}
            >
              <p className="text-[14px] leading-[1.7] text-slate-800">
                {q.text}
              </p>
              <p className="mt-3 text-[11px] text-slate-500">{q.page}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
