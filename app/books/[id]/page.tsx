import { notFound } from "next/navigation";
import { BookDetailActions } from "@/app/components/books/BookDetailActions";
import { BookDetailHeader } from "@/app/components/books/BookDetailHeader";
import { BookTakeawaysSection } from "@/app/components/books/BookTakeawaysSection";
import { QuoteList } from "@/app/components/books/QuoteList";
import { ReadingProgressSection } from "@/app/components/books/ReadingProgressSection";
import { ThoughtLogList } from "@/app/components/books/ThoughtLogList";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { BackHeader } from "@/app/components/navigation/BackHeader";
import { getBookById } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = getBookById(id);

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
            <div className="animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both] pb-8">
              <BookDetailHeader book={book} />
              <div className="mt-6">
                <ReadingProgressSection book={book} />
              </div>
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
        <div className="mx-auto max-w-md space-y-7 pt-7">
          <BookTakeawaysSection takeaways={book.takeaways} />
          <QuoteList quotes={book.quotes} />
          <ThoughtLogList items={book.thoughtLogs} />
        </div>
      </div>

      <BookDetailActions bookId={book.id} />
    </div>
  );
}
