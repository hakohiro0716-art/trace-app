function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function TinyStackArt() {
  return (
    <div className="relative h-12 w-16">
      <div className="absolute bottom-0 left-0 h-6 w-14 rounded-[10px] bg-[#cfd8d2] shadow-[0_8px_18px_rgba(0,0,0,0.08)]" />
      <div className="absolute bottom-3 left-2 h-5 w-12 rounded-[10px] bg-[#b8c7c0] shadow-[0_8px_18px_rgba(0,0,0,0.08)]" />
      <div className="absolute bottom-6 left-4 h-4 w-10 rounded-[10px] bg-[#a8bbb2] shadow-[0_8px_18px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function TinyBars() {
  return (
    <div className="flex items-end gap-1.5">
      {[2, 3, 5, 4, 7].map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-full bg-[#9eb8ad]"
          style={{ height: `${h * 6}px`, opacity: 0.55 + i * 0.08 }}
        />
      ))}
    </div>
  );
}

function TinyMemoArt() {
  return (
    <div className="relative h-12 w-16">
      <div className="absolute bottom-0 right-0 h-8 w-12 rounded-[12px] bg-[#d7ddd6] shadow-[0_10px_22px_rgba(0,0,0,0.08)]" />
      <div className="absolute bottom-3 right-2 h-7 w-11 rounded-[12px] bg-[#b9c7c0] shadow-[0_10px_22px_rgba(0,0,0,0.08)]" />
      <div className="absolute bottom-6 right-4 h-6 w-10 rounded-[12px] bg-[#a9bbb3] shadow-[0_10px_22px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function StatCard(props: {
  label: string;
  value: string;
  suffix: string;
  footer: string;
  art: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-black/5 bg-[#F6F2EA] p-4",
        "shadow-[0_14px_34px_rgba(0,0,0,0.07)]",
      )}
    >
      <p className="text-[12px] font-semibold text-slate-700">{props.label}</p>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-[28px] font-semibold tracking-[-0.03em] text-slate-900">
            {props.value}
            <span className="ml-1 text-[14px] font-medium text-slate-700">
              {props.suffix}
            </span>
          </p>
        </div>
        <div className="opacity-90">{props.art}</div>
      </div>
      <button className="mt-4 text-[12px] text-slate-600 hover:text-slate-800 transition-colors">
        {props.footer} ›
      </button>
    </div>
  );
}

export function StatsRow() {
  return (
    <section className="px-5">
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="積読"
          value="12"
          suffix="冊"
          footer="一覧を見る"
          art={<TinyStackArt />}
        />
        <StatCard
          label="読了した本"
          value="23"
          suffix="冊"
          footer="読み返す"
          art={<TinyBars />}
        />
        <StatCard
          label="思考ログ"
          value="87"
          suffix="件"
          footer="振り返る"
          art={<TinyMemoArt />}
        />
      </div>
    </section>
  );
}

