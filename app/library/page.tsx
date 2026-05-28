import { TabShell } from "../_components/TabShell";

export default function LibraryPage() {
  return (
    <TabShell title="Library" eyebrow="TRACE">
      <div className="space-y-3">
        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <p className="text-[13px] text-white/70">
            本棚は準備中です。ここに「読了 / 読書中 / 積読」などの棚が並びます。
          </p>
        </div>
        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <p className="text-[11px] tracking-[0.22em] text-white/55">
            QUICK ACTIONS
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-left transition-transform duration-200 active:scale-[0.985]">
              <p className="text-[14px] font-semibold">本を追加</p>
              <p className="mt-1 text-[12px] text-white/55">
                読書の積み上げを開始
              </p>
            </button>
            <button className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-left transition-transform duration-200 active:scale-[0.985]">
              <p className="text-[14px] font-semibold">検索</p>
              <p className="mt-1 text-[12px] text-white/55">タイトル・著者</p>
            </button>
          </div>
        </div>
      </div>
    </TabShell>
  );
}

