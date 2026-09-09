import { notFound } from "next/navigation";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { BackHeader } from "@/app/components/navigation/BackHeader";
import { supabase } from "@/app/lib/supabase";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const statusLabel: Record<string, string> = {
  backlog: "積読",
  reading: "読書中",
  finished: "読了",
};

const categoryLabel: Record<string, string> = {
  self_help: "自己啓発",
  psychology: "心理学",
  economics: "経済",
  philosophy: "哲学",
  literature: "文学",
  fiction: "小説",
  history: "歴史",
  other: "その他",
};

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !book) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />

        <div className="relative">
          <div className="mx-auto max-w-md">
            <BackHeader href="/library" />

            <div className="px-4 pb-10 pt-2">
              <div className="flex gap-5">
                <div
                  className={cn(
                    "relative h-[180px] w-[126px] shrink-0 overflow-hidden rounded-[20px]",
                    "shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
                  )}
                >
                  {book.cover_url ? (
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#eee7db] p-4">
                      <p className="text-center text-[13px] font-semibold text-slate-900">
                        {book.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-[11px] tracking-[0.28em] text-emerald-200/80">
                    TRACE
                  </p>

                  <h1 className="mt-3 text-[27px] font-semibold leading-tight tracking-[-0.02em] text-white">
                    {book.title}
                  </h1>

                  <p className="mt-3 text-[13px] text-white/55">
                    {book.author}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80 ring-1 ring-white/10">
                      {statusLabel[book.status] ?? book.status}
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80 ring-1 ring-white/10">
                      {categoryLabel[book.category_id] ?? "未分類"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-[11px] tracking-[0.18em] text-white/40">
                    評価
                  </p>

                  <p className="mt-2 text-[20px] tracking-[0.12em] text-amber-200">
                    {book.rating
                      ? "★".repeat(book.rating) + "☆".repeat(5 - book.rating)
                      : "未評価"}
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-[11px] tracking-[0.18em] text-white/40">
                    読書期間
                  </p>

                  <p className="mt-2 text-[13px] text-white/80">
                    開始日：{book.started_at ?? "未設定"}
                  </p>

                  <p className="mt-1 text-[13px] text-white/80">
                    読了日：{book.finished_at ?? "未設定"}
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-[11px] tracking-[0.18em] text-white/40">
                    一言メモ
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-white/80">
                    {book.memo || "メモはまだありません"}
                  </p>
                </div>
              </div>

              <a
                href={`/books/${id}/edit`}
                className={cn(
                  "mt-6 flex h-12 w-full items-center justify-center",
                  "rounded-[18px]",
                  "border border-white/10 bg-white/[0.08]",
                  "text-[14px] font-medium text-white/90",
                  "transition-transform duration-200 active:scale-[0.98]",
                )}
              >
                編集する
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}