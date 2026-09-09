import { notFound } from "next/navigation";

import { MemoActionsSection } from "@/app/components/memo/detail/MemoActionsSection";
import { MemoBodySection } from "@/app/components/memo/detail/MemoBodySection";
import { MemoCreatedAt } from "@/app/components/memo/detail/MemoCreatedAt";
import {
  MemoDetailBookCard,
  type MemoDetailBook,
} from "@/app/components/memo/detail/MemoDetailBookCard";
import { MemoDetailFooter } from "@/app/components/memo/detail/MemoDetailFooter";
import { MemoDetailHeader } from "@/app/components/memo/detail/MemoDetailHeader";
import { MemoInsightLevelDisplay } from "@/app/components/memo/detail/MemoInsightLevelDisplay";
import { MemoQuoteList } from "@/app/components/memo/detail/MemoQuoteList";
import { MemoTagList } from "@/app/components/memo/detail/MemoTagList";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { supabase } from "@/app/lib/supabase";

import type {
  InsightLevel,
  ThoughtLogQuote,
  ThoughtLogTagId,
} from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function formatCreatedAt(dateString: string) {
  const date = new Date(dateString);

  const dateLabel = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const timeLabel = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return {
    date: dateLabel,
    time: timeLabel,
  };
}

export default async function MemoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: log, error: logError } = await supabase
    .from("thought_logs")
    .select("*")
    .eq("id", id)
    .single();

  if (logError) {
    console.error(
      "思考ログ詳細の取得に失敗しました:",
      logError,
    );
  }

  if (!log) {
    notFound();
  }

  let book: MemoDetailBook | null = null;

  if (log.book_id) {
    const { data: bookData, error: bookError } =
      await supabase
        .from("books")
        .select("id, title, author, cover_url")
        .eq("id", log.book_id)
        .single();

    if (bookError) {
      console.error(
        "思考ログに紐づく本の取得に失敗しました:",
        bookError,
      );
    }

    if (bookData) {
      book = {
        id: String(bookData.id),
        title: bookData.title ?? "",
        author: bookData.author ?? "",
        cover_url: bookData.cover_url ?? null,
      };
    }
  }

  const quotes: ThoughtLogQuote[] = Array.isArray(log.quotes)
    ? log.quotes.map((quote: any, index: number) => ({
        id: String(quote.id ?? index),
        text: String(quote.text ?? ""),
        page: String(quote.page ?? ""),
      }))
    : [];

  const tagIds: ThoughtLogTagId[] = Array.isArray(log.tags)
    ? (log.tags as ThoughtLogTagId[])
    : [];

  const insightLevel =
    (log.insight_level as InsightLevel | null) ?? 3;

  const createdAt = formatCreatedAt(log.created_at);

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />

        <div className="relative">
          <div className="mx-auto max-w-md">
            <MemoDetailHeader memoId={String(log.id)} />

            {book ? (
              <div className="px-5 pb-6 pt-2">
                <MemoDetailBookCard book={book} />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-[linear-gradient(180deg,rgba(246,242,234,0.92)_0%,#F6F2EA_100%)]",
          "pb-[calc(env(safe-area-inset-bottom)+100px)]",
        )}
      >
        <div className="mx-auto max-w-md space-y-8 pt-6 animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
          <MemoCreatedAt
            date={createdAt.date}
            time={createdAt.time}
          />

          <MemoBodySection
            body={log.content ?? ""}
          />

          <MemoQuoteList
            quotes={quotes}
          />

          <MemoTagList
            tagIds={tagIds}
          />

          <MemoInsightLevelDisplay
            level={insightLevel}
          />

          <MemoActionsSection
            actions={[]}
          />
        </div>
      </div>

      <MemoDetailFooter memoId={String(log.id)} />
    </div>
  );
}