import { notFound } from "next/navigation";

import { EditThoughtLogForm } from "@/app/components/memo/EditThoughtLogForm";
import type { TargetBook } from "@/app/components/memo/TargetBookCard";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { BackHeader } from "@/app/components/navigation/BackHeader";

import { supabase } from "@/app/lib/supabase";

import type {
  InsightLevel,
  ThoughtLogDraft,
  ThoughtLogQuoteDraft,
  ThoughtLogTagId,
} from "@/app/lib/thought-log";

export default async function EditThoughtLogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [logResult, booksResult] = await Promise.all([
    supabase
      .from("thought_logs")
      .select("*")
      .eq("id", id)
      .single(),

    supabase
      .from("books")
      .select("id, title, author, cover_url")
      .order("created_at", { ascending: false }),
  ]);

  const log = logResult.data;

  if (logResult.error || !log) {
    notFound();
  }

  if (booksResult.error) {
    console.error(
      "編集画面用の本一覧取得に失敗しました:",
      booksResult.error,
    );
  }

  const books: TargetBook[] =
    booksResult.data?.map((book) => ({
      id: String(book.id),
      title: book.title ?? "",
      author: book.author ?? "",
      cover_url: book.cover_url ?? null,
    })) ?? [];

  const quotes: ThoughtLogQuoteDraft[] =
    Array.isArray(log.quotes)
      ? log.quotes.map((quote: any, index: number) => ({
          id: String(quote.id ?? index),
          text: String(quote.text ?? ""),
          page: String(quote.page ?? ""),
        }))
      : [];

  const resolvedBookId =
    log.book_id != null
      ? String(log.book_id)
      : books[0]?.id ?? "";

  const initialDraft: ThoughtLogDraft = {
    bookId: resolvedBookId,
    body: log.content ?? "",
    quotes,
    tagIds: Array.isArray(log.tags)
      ? (log.tags as ThoughtLogTagId[])
      : [],
    insightLevel:
      (log.insight_level as InsightLevel | null) ?? 3,
  };

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />

        <div className="relative">
          <div className="mx-auto max-w-md">
            <BackHeader
              title="思考ログを編集"
              href={`/memo/${id}`}
            />
          </div>
        </div>
      </div>

      <div className="min-h-[calc(100vh-120px)] bg-[linear-gradient(180deg,rgba(246,242,234,0.92)_0%,#F6F2EA_100%)]">
        <div className="animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
          <EditThoughtLogForm
            memoId={id}
            initialDraft={initialDraft}
            books={books}
          />
        </div>
      </div>
    </div>
  );
}