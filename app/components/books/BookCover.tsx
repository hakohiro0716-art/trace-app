function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function BookCover(props: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-[148px]", props.className)}>
      <div className="absolute -inset-1 rounded-[20px] bg-white/10 blur-[12px]" />
      <div
        className={cn(
          "relative aspect-[2/3] w-full overflow-hidden rounded-[20px]",
          "bg-[linear-gradient(180deg,#f5f1e8_0%,#efe8dc_45%,#e7dfd2_100%)]",
          "shadow-[0_18px_48px_rgba(0,0,0,0.28)]",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(140px_100px_at_30%_20%,rgba(20,94,79,0.18),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.06)_100%)]" />
        <div className="absolute left-4 top-5 right-4">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900">
            {props.title}
          </p>
          <p className="mt-2 text-[10px] leading-snug text-slate-600">
            {props.subtitle}
          </p>
        </div>
        <div className="absolute bottom-4 left-4 text-[9px] text-slate-600">
          Trace
        </div>
      </div>
    </div>
  );
}
