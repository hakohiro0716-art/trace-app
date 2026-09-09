import Link from "next/link";
import { TabShell } from "@/app/components/layout/TabShell";
import { supabase } from "@/app/lib/supabase";

export default async function ProfilePage() {
  const { count: finishedCount, error } = await supabase
    .from("books")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("status", "finished");

  if (error) {
    console.error("読了冊数の取得に失敗しました:", error);
  }

  const totalFinished = finishedCount ?? 0;

  return (
    <TabShell title="Profile" eyebrow="TRACE">
      <div className="space-y-3">
        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-300/20" />

            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold">
                あなた
              </p>

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
            <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
              <p className="text-[12px] text-white/50">
                連続
              </p>

              <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em]">
                6日
              </p>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
              <p className="text-[12px] text-white/50">
                今月
              </p>

              <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em]">
                12.5h
              </p>
            </div>

            <Link
              href="/library?status=finished"
              className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 transition-transform duration-200 active:scale-[0.97]"
            >
              <p className="text-[12px] text-white/50">
                総読了
              </p>

              <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em]">
                {totalFinished}冊
              </p>
            </Link>
          </div>
        </div>
      </div>
    </TabShell>
  );
}