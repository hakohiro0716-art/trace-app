import { TabShell } from "../_components/TabShell";

export default function MemoPage() {
  return (
    <TabShell title="Memo" eyebrow="TRACE">
      <div className="space-y-3">
        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <p className="text-[13px] text-white/70">
            読書メモを「一文」から積み上げる画面を予定しています。
          </p>
          <div className="mt-4">
            <button className="w-full rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-left transition-transform duration-200 active:scale-[0.985]">
              <p className="text-[14px] font-semibold">新しいメモ</p>
              <p className="mt-1 text-[12px] text-white/55">
                引用・気づき・行動を書き留める
              </p>
            </button>
          </div>
        </div>

        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <p className="text-[11px] tracking-[0.22em] text-white/55">
            RECENT
          </p>
          <div className="mt-4 space-y-2">
            {["「自分の課題は、自分の勇気で引き受ける」", "集中は環境で設計できる"].map(
              (t) => (
                <div
                  key={t}
                  className="rounded-[18px] border border-white/10 bg-white/[0.05] px-4 py-3"
                >
                  <p className="text-[13px] text-white/70">{t}</p>
                  <p className="mt-1 text-[11px] text-white/40">5月</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </TabShell>
  );
}

