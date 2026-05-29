import type { BookQuote } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function QuoteList(props: { quotes: BookQuote[] }) {
  return (
    <section className="px-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        引用一覧
      </h2>
      {props.quotes.length === 0 ? (
        <p className="mt-3 text-[13px] leading-relaxed text-slate-500">
          まだ引用がありません。心に残った一文を記録してみましょう。
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {props.quotes.map((q) => (
            <article
              key={q.id}
              className={cn(
                "rounded-[20px] border border-black/5 bg-[#F6F2EA] px-4 py-4",
                "shadow-[0_10px_28px_rgba(0,0,0,0.06)]",
              )}
            >
              <p className="text-[13px] leading-relaxed text-slate-800">
                {q.text}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>{q.page}</span>
                <span>{q.addedAt}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
