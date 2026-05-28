function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function LifeStackBanner() {
  return (
    <section className="px-5 pb-6">
      <div
        className={cn(
          "relative overflow-hidden rounded-[22px]",
          "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_45%,#17363f_100%)]",
          "shadow-[0_22px_70px_rgba(0,0,0,0.22)]",
        )}
      >
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(720px_280px_at_18%_20%,rgba(214,228,222,0.22),transparent_60%)]" />
        <div className="relative p-5">
          <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-white/92">
            あなたの人生に積み上がった本
          </h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/70">
            読んできた本が、あなたの軌跡になっていきます。
          </p>
        </div>

        {/* stack silhouette */}
        <div className="absolute bottom-0 right-0 h-24 w-40 opacity-70">
          <div className="absolute bottom-4 right-7 h-5 w-24 rounded-[12px] bg-white/18" />
          <div className="absolute bottom-7 right-6 h-6 w-28 rounded-[12px] bg-white/14" />
          <div className="absolute bottom-11 right-5 h-6 w-30 rounded-[12px] bg-white/10" />
          <div className="absolute bottom-16 right-4 h-7 w-32 rounded-[12px] bg-white/8" />
        </div>
      </div>
    </section>
  );
}

