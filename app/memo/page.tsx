import Link from "next/link";
import { TabShell } from "@/app/components/layout/TabShell";
import {
  ThoughtLogListItem,
  type ThoughtLogListData,
} from "@/app/components/memo/ThoughtLogListItem";
import { supabase } from "@/app/lib/supabase";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default async function MemoPage() {
  const { data: logs, error } = await supabase
    .from("thought_logs")
    .select(`
      id,
      title,
      content,
      tags,
      created_at,
      book_id,
      books (
        title
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("思考ログ一覧の取得に失敗しました:", error);
  }

  const mappedLogs: ThoughtLogListData[] =
    logs?.map((log) => {
      const relatedBook = Array.isArray(log.books)
        ? log.books[0]
        : log.books;

      return {
        id: String(log.id),
        title: log.title ?? "",
        content: log.content ?? "",
        tags: log.tags ?? [],
        createdAt: log.created_at,
        bookTitle: relatedBook?.title ?? null,
      };
    }) ?? [];

  return (
    <TabShell title="思考ログ" eyebrow="TRACE">
      <div className="space-y-3">
        <p className="text-[13px] leading-relaxed text-white/65">
          読書から生まれた考えを、未来の自分のために静かに残します。
        </p>

        <Link
          href="/memo/new"
          className={cn(
            "block rounded-[22px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl",
            "transition-transform duration-200 active:scale-[0.985]",
          )}
        >
          <p className="text-[14px] font-semibold">
            思考ログを残す
          </p>

          <p className="mt-1 text-[12px] text-white/55">
            気づき・引用・タグを記録する
          </p>
        </Link>

        <div className="rounded-[var(--trace-radius)] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
          <p className="text-[11px] tracking-[0.22em] text-white/55">
            RECENT
          </p>

          <div className="mt-4 space-y-2">
            {mappedLogs.length > 0 ? (
              mappedLogs.map((log) => (
                <ThoughtLogListItem
                  key={log.id}
                  log={log}
                  variant="dark"
                />
              ))
            ) : (
              <p className="text-[12px] text-white/45">
                思考ログはまだありません。
              </p>
            )}
          </div>
        </div>
      </div>
    </TabShell>
  );
}