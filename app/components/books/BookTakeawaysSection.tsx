import type { BookTakeaways } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function TakeawayGroup(props: {
  label: string;
  items: string[];
}) {
  if (props.items.length === 0) return null;

  return (
    <div>
      <h3 className="text-[12px] font-semibold tracking-wide text-slate-600">
        {props.label}
      </h3>
      <ul className="mt-2 space-y-2">
        {props.items.map((item: string, i: number) => (
          <li
            key={i}
            className={cn(
              "rounded-[16px] border border-black/5 bg-white/45 px-4 py-3",
              "text-[13px] leading-relaxed text-slate-800",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BookTakeawaysSection(props: { takeaways: BookTakeaways }) {
  const { learnings, insights, memorable } = props.takeaways;
  const isEmpty =
    learnings.length === 0 &&
    insights.length === 0 &&
    memorable.length === 0;

  return (
    <section className="px-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        この本から得たこと
      </h2>
      <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
        読書を通じて、人生に積み上がった記録
      </p>
      <div
        className={cn(
          "mt-4 space-y-5 rounded-[24px] border border-black/5 bg-[#F6F2EA] p-5",
          "shadow-[0_16px_40px_rgba(0,0,0,0.08)]",
        )}
      >
        {isEmpty ? (
          <p className="text-[13px] leading-relaxed text-slate-500">
            まだ記録がありません。読了後や読書中に、学びや気づきを書き留めてみましょう。
          </p>
        ) : (
          <>
            <TakeawayGroup label="学び" items={learnings} />
            <TakeawayGroup label="気付き" items={insights} />
            <TakeawayGroup label="印象に残ったこと" items={memorable} />
          </>
        )}
      </div>
    </section>
  );
}
