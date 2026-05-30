import { notFound } from "next/navigation";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { BackHeader } from "@/app/components/navigation/BackHeader";
import { supabase } from "@/app/lib/supabase";

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

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />

        <div className="relative">
          <div className="mx-auto max-w-md">
            <BackHeader href="/library" />

            <div className="px-4 pb-8 pt-4">
              <div
                className={cn(
                  "rounded-[24px]",
                  "border border-white/10",
                  "bg-white/[0.06]",
                  "p-5",
                  "backdrop-blur-2xl",
                )}
              >
                <h1 className="text-2xl font-bold text-white">
                  {book.title}
                </h1>

                <p className="mt-2 text-white/70">
                  {book.author}
                </p>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    {statusLabel[book.status] ?? "不明"}
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    {categoryLabel[book.category_id] ?? "未分類"}
                  </span>
                </div>

                {book.memo && (
                  <div className="mt-6">
                    <p className="text-sm text-white/70">
                      {book.memo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}