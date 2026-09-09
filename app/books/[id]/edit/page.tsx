import { notFound } from "next/navigation";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { BackHeader } from "@/app/components/navigation/BackHeader";
import { EditBookForm } from "@/app/components/books/form/EditBookForm";
import { supabase } from "@/app/lib/supabase";
import type {
  BookCategoryId,
  BookDraft,
  BookRating,
} from "@/app/lib/book-form";
import type { ReadingStatus } from "@/app/lib/books";

export default async function EditBookPage({
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

  const initialDraft: BookDraft = {
    coverUrl: book.cover_url ?? null,
    title: book.title ?? "",
    author: book.author ?? "",
    categoryId:
      (book.category_id as BookCategoryId | null) ?? null,
    status:
      (book.status as ReadingStatus | null) ?? "backlog",
    startedAt: book.started_at ?? "",
    finishedAt: book.finished_at ?? "",
    rating:
      (book.rating as BookRating | null) ?? null,
    note: book.memo ?? "",
  };

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />

        <div className="relative">
          <div className="mx-auto max-w-md">
            <BackHeader href={`/books/${id}`} />

            <div className="px-4 pb-10 pt-2">
              <div className="mb-2">
                <p className="text-[11px] tracking-[0.28em] text-emerald-200/80">
                  TRACE
                </p>

                <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.02em] text-white">
                  本を編集
                </h1>
              </div>

              <EditBookForm
                bookId={id}
                initialDraft={initialDraft}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}