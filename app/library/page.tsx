import { AddBookButton } from "@/app/components/library/AddBookButton";
import { BookListCard } from "@/app/components/library/BookListCard";
import { TabShell } from "@/app/components/layout/TabShell";
import { supabase } from "@/app/lib/supabase";

export default async function LibraryPage() {
  const { data: books } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  const mappedBooks =
    books?.map((book) => ({
      id: String(book.id),
      title: book.title,
      subtitle: "",
      author: book.author,
      category_id: book.category_id,
      status: book.status ?? "backlog",
      progress: book.status === "finished" ? 1 : 0,
      startedAt: book.started_at,
      finishedAt: book.finished_at,
      takeaways: {
        learnings: [],
        insights: [],
        memorable: [],
      },
      quotes: [],
      thoughtLogs: [],
    })) ?? [];

  return (
    <TabShell
      title="本一覧"
      eyebrow="TRACE"
      headerAction={<AddBookButton />}
    >
      <div className="space-y-3">
        <p className="text-[13px] leading-relaxed text-white/65">
          読んできた本、読んでいる本、これから読む本。あなたの人生に積み上がる記録です。
        </p>

        {mappedBooks.map((book) => (
          <BookListCard key={book.id} book={book} />
        ))}
      </div>
    </TabShell>
  );
}