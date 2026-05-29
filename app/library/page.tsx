import { AddBookButton } from "@/app/components/library/AddBookButton";
import { BookListCard } from "@/app/components/library/BookListCard";
import { TabShell } from "@/app/components/layout/TabShell";
import { getAllBooks } from "@/app/lib/books";

export default function LibraryPage() {
  const books = getAllBooks();

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
        {books.map((book) => (
          <BookListCard key={book.id} book={book} />
        ))}
      </div>
    </TabShell>
  );
}
