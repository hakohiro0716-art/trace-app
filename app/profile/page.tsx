import Link from "next/link";
import { TabShell } from "@/app/components/layout/TabShell";
import { supabase } from "@/app/lib/supabase";

export default async function ProfilePage() {
  const { data: finishedBooks, error } = await supabase
    .from("books")
    .select("id, finished_at")
    .eq("status", "finished");

  if (error) {
    console.error(
      "プロフィール用の読了データ取得に失敗しました:",
      error,
    );
  }

  const books = finishedBooks ?? [];

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const totalFinished = books.length;

  const thisYearFinished = books.filter((book) => {
    if (!book.finished_at) return false;

    const date = new Date(book.finished_at);

    return date.getFullYear() === currentYear;
  }).length;

  const thisMonthFinished = books.filter((book) => {
    if (!book.finished_at) return false;

    const date = new Date(book.finished_at);

    return (
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth
    );
  }).length;

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
            READING
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Link
              href="/library?status=finished"
              className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 transition-transform duration-200 active:scale-[0.97]"
            >
              <p className="text-[12px] text-white/50">
                今月読了
              </p>

              <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em]">
                {thisMonthFinished}冊
              </p>
            </Link>

            <Link
              href="/library?status=finished"
              className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 transition-transform duration-200 active:scale-[0.97]"
            >
              <p className="text-[12px] text-white/50">
                今年読了
              </p>

              <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em]">
                {thisYearFinished}冊
              </p>
            </Link>

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