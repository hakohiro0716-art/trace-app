import { QuoteForm } from "@/app/components/quotes/form/QuoteForm";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { BackHeader } from "@/app/components/navigation/BackHeader";
import { defaultBookId, getBookById } from "@/app/lib/books";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default async function QuoteNewPage({
  searchParams,
}: {
  searchParams: Promise<{ bookId?: string }>;
}) {
  const { bookId } = await searchParams;
  const initialBookId =
    bookId && getBookById(bookId) ? bookId : defaultBookId;
  const backHref = bookId && getBookById(bookId) ? `/books/${bookId}` : "/library";

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />
        <div className="relative">
          <div className="mx-auto max-w-md">
            <BackHeader title="引用を残す" href={backHref} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-[linear-gradient(180deg,rgba(246,242,234,0.92)_0%,#F6F2EA_100%)]",
          "min-h-[calc(100vh-120px)]",
        )}
      >
        <div className="animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
          <QuoteForm initialBookId={initialBookId} backHref={backHref} />
        </div>
      </div>
    </div>
  );
}
