import { HeroBackground } from "@/app/components/home/HeroBackground";
import { HomeHeader } from "@/app/components/home/HomeHeader";
import { LifeStackBanner } from "@/app/components/home/LifeStackBanner";
import { ReadingCard } from "@/app/components/home/ReadingCard";
import { StatsRow } from "@/app/components/home/StatsRow";
import {
  ThoughtLogCard,
  type HomeThoughtLog,
} from "@/app/components/home/ThoughtLogCard";
import { BottomTabBar } from "@/app/components/navigation/BottomTabBar";
import { supabase } from "@/app/lib/supabase";

function formatThoughtLogDate(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function Home() {
  const [
    booksResult,
    thoughtLogCountResult,
    recentThoughtLogsResult,
  ] = await Promise.all([
    supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false }),

    supabase
      .from("thought_logs")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("thought_logs")
      .select(`
        id,
        title,
        created_at,
        book_id,
        books (
          title
        )
      `)
      .order("created_at", { ascending: false })
      .limit(2),
  ]);

  if (booksResult.error) {
    console.error(
      "ホーム用の本データ取得に失敗しました:",
      booksResult.error,
    );
  }

  if (thoughtLogCountResult.error) {
    console.error(
      "思考ログ件数の取得に失敗しました:",
      thoughtLogCountResult.error,
    );
  }

  if (recentThoughtLogsResult.error) {
    console.error(
      "最近の思考ログ取得に失敗しました:",
      recentThoughtLogsResult.error,
    );
  }

  const allBooks = booksResult.data ?? [];

  const backlogCount = allBooks.filter(
    (book) => book.status === "backlog",
  ).length;

  const finishedCount = allBooks.filter(
    (book) => book.status === "finished",
  ).length;

  const readingBook = allBooks.find(
    (book) => book.status === "reading",
  );

  const thoughtLogCount =
    thoughtLogCountResult.count ?? 0;

  const recentThoughtLogs: HomeThoughtLog[] =
    recentThoughtLogsResult.data?.map((log) => {
      const relatedBook = Array.isArray(log.books)
        ? log.books[0]
        : log.books;

      const dateLabel = formatThoughtLogDate(
        log.created_at,
      );

      const meta = relatedBook?.title
        ? `${relatedBook.title}より・${dateLabel}`
        : dateLabel;

      return {
        id: String(log.id),
        title: log.title ?? "思考ログ",
        meta,
      };
    }) ?? [];

  const recentFinishedBooks = allBooks
    .filter(
      (book) =>
        book.status === "finished" &&
        Boolean(book.finished_at),
    )
    .sort((a, b) => {
      const aTime = new Date(
        a.finished_at,
      ).getTime();

      const bTime = new Date(
        b.finished_at,
      ).getTime();

      return bTime - aTime;
    })
    .slice(0, 3)
    .map((book) => ({
      id: String(book.id),
      title: book.title ?? "",
      coverUrl: book.cover_url ?? null,
    }));

  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />

        <div className="relative pb-6">
          <div className="mx-auto max-w-md">
            <HomeHeader />

            <div className="mt-7 animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
              {readingBook ? (
                <ReadingCard
                  href={`/books/${readingBook.id}`}
                  title={readingBook.title}
                  subtitle={readingBook.author}
                  statusLabel="読書中"
                  progressLabel="読書中"
                  progress={0}
                />
              ) : (
                <ReadingCard
                  href="/library"
                  title="現在読書中の本はありません"
                  subtitle="本一覧から読書を始められます"
                  statusLabel="未設定"
                  progressLabel="0%"
                  progress={0}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(246,242,234,0.92)_0%,#F6F2EA_100%)]">
        <div className="mx-auto max-w-md space-y-5 pb-28 pt-5">
          <ThoughtLogCard
            items={recentThoughtLogs}
          />

          <StatsRow
            backlogCount={backlogCount}
            finishedCount={finishedCount}
            thoughtLogCount={thoughtLogCount}
          />

          <LifeStackBanner
            finishedCount={finishedCount}
            thoughtLogCount={thoughtLogCount}
            recentBooks={recentFinishedBooks}
          />
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}