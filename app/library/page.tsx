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

const categoryLabel: Record<string, string> = {
  all: "すべて",
  self_help: "自己啓発",
  psychology: "心理学",
  economics: "経済",
  philosophy: "哲学",
  literature: "文学",
  fiction: "小説",
  history: "歴史",
  other: "その他",
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string | string[];
    q?: string | string[];
    category?: string | string[];
    sort?: string | string[];
  }>;
}) {
  const params = await searchParams;

  const requestedStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status;

  const searchQuery = (
    Array.isArray(params.q) ? params.q[0] : params.q
  )?.trim() ?? "";

  const requestedCategory =
    (Array.isArray(params.category)
      ? params.category[0]
      : params.category) ?? "all";

  const requestedSort =
    (Array.isArray(params.sort)
      ? params.sort[0]
      : params.sort) ?? "newest";

  const validStatus =
    requestedStatus === "backlog" ||
    requestedStatus === "reading" ||
    requestedStatus === "finished"
      ? requestedStatus
      : null;

  const validCategory =
    requestedCategory in categoryLabel
      ? requestedCategory
      : "all";

  const validSort = [
    "newest",
    "finished_newest",
    "rating_high",
    "title",
  ].includes(requestedSort)
    ? requestedSort
    : "newest";

  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("本一覧の取得に失敗しました:", error);
  }

  const allBooks = books ?? [];

  let filteredBooks = [...allBooks];

  if (validStatus) {
    filteredBooks = filteredBooks.filter(
      (book) => book.status === validStatus,
    );
  }

  if (validCategory !== "all") {
    filteredBooks = filteredBooks.filter(
      (book) => book.category_id === validCategory,
    );
  }

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase();

    filteredBooks = filteredBooks.filter((book) => {
      const title = String(book.title ?? "").toLowerCase();
      const author = String(book.author ?? "").toLowerCase();

      return (
        title.includes(normalizedQuery) ||
        author.includes(normalizedQuery)
      );
    });
  }

  if (validSort === "finished_newest") {
    filteredBooks.sort((a, b) => {
      const aTime = a.finished_at
        ? new Date(a.finished_at).getTime()
        : 0;

      const bTime = b.finished_at
        ? new Date(b.finished_at).getTime()
        : 0;

      return bTime - aTime;
    });
  }

  if (validSort === "rating_high") {
    filteredBooks.sort(
      (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
    );
  }

  if (validSort === "title") {
    filteredBooks.sort((a, b) =>
      String(a.title ?? "").localeCompare(
        String(b.title ?? ""),
        "ja",
      ),
    );
  }

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

        <form
          action="/library"
          method="get"
          className="space-y-3 rounded-[22px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl"
        >
          <input
            type="search"
            name="q"
            defaultValue={searchQuery}
            placeholder="タイトル・著者から検索"
            className="h-11 w-full rounded-[16px] border border-white/10 bg-white/[0.07] px-4 text-[13px] text-white outline-none placeholder:text-white/35"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              name="status"
              defaultValue={validStatus ?? ""}
              className="h-10 rounded-[14px] border border-white/10 bg-[#173a32] px-3 text-[12px] text-white outline-none"
            >
              <option value="">すべての状態</option>
              <option value="backlog">積読</option>
              <option value="reading">読書中</option>
              <option value="finished">読了</option>
            </select>

            <select
              name="category"
              defaultValue={validCategory}
              className="h-10 rounded-[14px] border border-white/10 bg-[#173a32] px-3 text-[12px] text-white outline-none"
            >
              <option value="all">すべてのカテゴリ</option>
              <option value="self_help">自己啓発</option>
              <option value="psychology">心理学</option>
              <option value="economics">経済</option>
              <option value="philosophy">哲学</option>
              <option value="literature">文学</option>
              <option value="fiction">小説</option>
              <option value="history">歴史</option>
              <option value="other">その他</option>
            </select>
          </div>

          <select
            name="sort"
            defaultValue={validSort}
            className="h-10 w-full rounded-[14px] border border-white/10 bg-[#173a32] px-3 text-[12px] text-white outline-none"
          >
            <option value="newest">登録が新しい順</option>
            <option value="finished_newest">
              最近読み終えた順
            </option>
            <option value="rating_high">
              評価が高い順
            </option>
            <option value="title">
              タイトル順
            </option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="h-10 flex-1 rounded-[14px] bg-white text-[12px] font-semibold text-slate-900"
            >
              検索・絞り込み
            </button>

            <a
              href="/library"
              className="grid h-10 place-items-center rounded-[14px] border border-white/10 px-4 text-[12px] text-white/65"
            >
              リセット
            </a>
          </div>
        </form>

        {validStatus === "finished" ? (
          <ReadingHistoryChart
            finishedDates={finishedDates}
          />
        ) : null}

        <p className="text-[11px] text-white/40">
          {mappedBooks.length}冊表示
        </p>

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
                条件に一致する本はありません。
              </p>
            </div>
          )}
        </div>
      </div>
    </TabShell>
  );
}