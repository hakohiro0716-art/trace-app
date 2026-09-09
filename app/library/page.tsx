import { AddBookButton } from "@/app/components/library/AddBookButton";
import { BookListCard } from "@/app/components/library/BookListCard";
import { ReadingHistoryChart } from "@/app/components/library/ReadingHistoryChart";
import { TabShell } from "@/app/components/layout/TabShell";
import { supabase } from "@/app/lib/supabase";

const statusTitle: Record<string, string> = {
  backlog: "積読",
  reading: "読書中",
  finished: "読了した本",
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string | string[];
  }>;
}) {
  const params = await searchParams;

  const requestedStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status;

  const validStatus =
    requestedStatus === "backlog" ||
    requestedStatus === "reading" ||
    requestedStatus === "finished"
      ? requestedStatus
      : null;

  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("本一覧の取得に失敗しました:", error);
  }

  const allBooks = books ?? [];

  const filteredBooks = validStatus
    ? allBooks.filter((book) => book.status === validStatus)
    : allBooks;

  const mappedBooks = filteredBooks.map((book) => ({
    id: String(book.id),
    title: book.title,
    subtitle: "",
    author: book.author,
    cover_url: book.cover_url,
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
  }));

  const finishedDates = allBooks
    .filter(
      (book) =>
        book.status === "finished" &&
        Boolean(book.finished_at),
    )
    .map((book) => book.finished_at as string);

  const title = validStatus
    ? statusTitle[validStatus]
    : "本一覧";

  const description =
    validStatus === "backlog"
      ? "これから読む本の一覧です。"
      : validStatus === "reading"
        ? "現在読んでいる本の一覧です。"
        : validStatus === "finished"
          ? "これまでに読み終えた本の一覧です。"
          : "読んできた本、読んでいる本、これから読む本。あなたの人生に積み上がる記録です。";

  return (
    <TabShell
      title={title}
      eyebrow="TRACE"
      headerAction={<AddBookButton />}
    >
      <div className="space-y-4">
        <p className="text-[13px] leading-relaxed text-white/65">
          {description}
        </p>

        {validStatus === "finished" ? (
          <ReadingHistoryChart
            finishedDates={finishedDates}
          />
        ) : null}

        <div className="space-y-3">
          {mappedBooks.length > 0 ? (
            mappedBooks.map((book) => (
              <BookListCard
                key={book.id}
                book={book}
              />
            ))
          ) : (
            <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-[13px] text-white/55">
                該当する本はまだありません。
              </p>
            </div>
          )}
        </div>
      </div>
    </TabShell>
  );
}