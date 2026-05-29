function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoBodySection(props: { body: string }) {
  return (
    <section className="px-5">
      <div
        className={cn(
          "rounded-[24px] border border-black/5 bg-[#F6F2EA] px-6 py-7",
          "shadow-[0_16px_40px_rgba(0,0,0,0.06)]",
        )}
      >
        <p className="whitespace-pre-wrap text-[17px] leading-[1.85] tracking-[-0.01em] text-slate-800">
          {props.body}
        </p>
      </div>
    </section>
  );
}
