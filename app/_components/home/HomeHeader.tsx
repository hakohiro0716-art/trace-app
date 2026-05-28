import { BellIcon, LeafMark } from "./icons";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function HomeHeader() {
  return (
    <header className="px-5 pt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[28px] font-semibold tracking-[-0.02em] text-white/92">
            Trace
          </p>
          <LeafMark className="text-white/70" />
        </div>

        <button
          className={cn(
            "grid h-10 w-10 place-items-center rounded-2xl",
            "bg-white/10 ring-1 ring-white/10 backdrop-blur-xl",
            "text-white/85 transition-transform duration-200 active:scale-[0.98]",
          )}
          aria-label="通知"
        >
          <BellIcon />
        </button>
      </div>

      <p className="mt-8 text-[13px] text-white/70">おはよう、あなた</p>
      <h1 className="mt-2 text-[30px] font-semibold leading-[1.18] tracking-[-0.02em] text-white/95">
        本が、あなたをつくっていく。
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-white/72">
        読書は静かな積み上げ。今日も少しだけ、未来の自分へ。
      </p>
    </header>
  );
}

