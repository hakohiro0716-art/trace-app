import { TabShell } from "@/app/components/layout/TabShell";

export default function ProfilePage() {
  return (
    <TabShell title="Profile" eyebrow="TRACE">
      <div className="space-y-3">
        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-300/20" />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold">あなた</p>
              <p className="mt-1 truncate text-[12px] text-white/55">
                読書の軌跡を、静かに積み上げる
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <p className="text-[11px] tracking-[0.22em] text-white/55">
            STREAK
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "連続", value: "6日" },
              { label: "今月", value: "12.5h" },
              { label: "総読了", value: "128冊" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4"
              >
                <p className="text-[12px] text-white/50">{s.label}</p>
                <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabShell>
  );
}

