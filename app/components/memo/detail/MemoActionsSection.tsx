function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoActionsSection(props: { actions: string[] }) {
  return (
    <section className="px-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        この思考から生まれた行動
      </h2>
      <p className="mt-1 text-[12px] text-slate-500">
        記録から生まれた、小さな一歩
      </p>
      {props.actions.length === 0 ? (
        <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
          まだ行動は記録されていません。
        </p>
      ) : (
        <ul
          className={cn(
            "mt-4 space-y-2 rounded-[22px] border border-black/5 bg-[#F6F2EA] p-4",
            "shadow-[0_14px_34px_rgba(0,0,0,0.06)]",
          )}
        >
          {props.actions.map((action) => (
            <li
              key={action}
              className="flex items-start gap-3 text-[14px] leading-relaxed text-slate-800"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-800/70" />
              {action}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
