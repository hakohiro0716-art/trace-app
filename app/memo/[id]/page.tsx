import { notFound } from "next/navigation";
import { MemoActionsSection } from "@/app/components/memo/detail/MemoActionsSection";
import { MemoBodySection } from "@/app/components/memo/detail/MemoBodySection";
import { MemoCreatedAt } from "@/app/components/memo/detail/MemoCreatedAt";
import { MemoDetailBookCard } from "@/app/components/memo/detail/MemoDetailBookCard";
import { MemoDetailFooter } from "@/app/components/memo/detail/MemoDetailFooter";
import { MemoDetailHeader } from "@/app/components/memo/detail/MemoDetailHeader";
import { MemoInsightLevelDisplay } from "@/app/components/memo/detail/MemoInsightLevelDisplay";
import { MemoQuoteList } from "@/app/components/memo/detail/MemoQuoteList";
import { MemoTagList } from "@/app/components/memo/detail/MemoTagList";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { getBookById } from "@/app/lib/books";
import { getThoughtLogById } from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default async function MemoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const log = getThoughtLogById(id);

  if (!log) {
    notFound();
  }

  const book = getBookById(log.bookId);
  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />
        <div className="relative">
          <div className="mx-auto max-w-md">
            <MemoDetailHeader memoId={log.id} />
            <div className="px-5 pb-6 pt-2">
              <MemoDetailBookCard book={book} />
            </div>
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
            date={log.createdAtLabel.date}
            time={log.createdAtLabel.time}
          />
          <MemoBodySection body={log.body} />
          <MemoQuoteList quotes={log.quotes} />
          <MemoTagList tagIds={log.tagIds} />
          <MemoInsightLevelDisplay level={log.insightLevel} />
          <MemoActionsSection actions={log.actions} />
        </div>
      </div>

      <MemoDetailFooter memoId={log.id} />
    </div>
  );
}
