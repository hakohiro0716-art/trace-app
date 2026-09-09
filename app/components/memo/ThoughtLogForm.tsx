"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FormSection } from "./FormSection";
import { InsightLevelPicker } from "./InsightLevelPicker";
import { QuoteDraftSection } from "./QuoteDraftSection";
import { SaveThoughtLogButton } from "./SaveThoughtLogButton";
import { TagSelector } from "./TagSelector";
import {
  TargetBookCard,
  type TargetBook,
} from "./TargetBookCard";
import { ThoughtTextarea } from "./ThoughtTextarea";

import { supabase } from "@/app/lib/supabase";

import {
  createEmptyThoughtLogDraft,
  type ThoughtLogDraft,
} from "@/app/lib/thought-log";

export function ThoughtLogForm(props: {
  initialBookId?: string;
}) {
  const router = useRouter();

  const [books, setBooks] = useState<TargetBook[]>([]);

  const [draft, setDraft] = useState<ThoughtLogDraft>(() =>
    createEmptyThoughtLogDraft(props.initialBookId ?? ""),
  );

  const [loadingBooks, setLoadingBooks] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("id, title, author, cover_url")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(
          "対象本の取得に失敗しました:",
          error,
        );

        setLoadingBooks(false);
        return;
      }

      const loadedBooks: TargetBook[] =
        data?.map((book) => ({
          id: String(book.id),
          title: book.title ?? "",
          author: book.author ?? "",
          cover_url: book.cover_url ?? null,
        })) ?? [];

      setBooks(loadedBooks);

      if (loadedBooks.length > 0) {
        const initialExists = loadedBooks.some(
          (book) => book.id === props.initialBookId,
        );

        const resolvedBookId = initialExists
          ? props.initialBookId!
          : loadedBooks[0].id;

        setDraft((prev) => ({
          ...prev,
          bookId: resolvedBookId,
        }));
      }

      setLoadingBooks(false);
    };

    loadBooks();
  }, [props.initialBookId]);

  const book =
    books.find((item) => item.id === draft.bookId) ??
    books[0] ??
    null;

  const cycleBook = () => {
    if (books.length === 0 || !book) {
      return;
    }

    const currentIndex = books.findIndex(
      (item) => item.id === book.id,
    );

    const nextIndex =
      (currentIndex + 1) % books.length;

    const nextBook = books[nextIndex];

    setDraft((prev) => ({
      ...prev,
      bookId: nextBook.id,
    }));
  };

  const canSave =
    draft.body.trim().length > 0 &&
    Boolean(book) &&
    !saving;

  const handleSave = async () => {
    if (!canSave || !book) {
      return;
    }

    setSaving(true);

    try {
      const body = draft.body.trim();

      const firstLine =
        body
          .split("\n")
          .find((line) => line.trim().length > 0)
          ?.trim() ?? "思考ログ";

      const title =
        firstLine.length > 80
          ? `${firstLine.slice(0, 80)}…`
          : firstLine;

      const savedQuotes = draft.quotes
        .filter((quote) => quote.text.trim().length > 0)
        .map((quote) => ({
          id: quote.id,
          text: quote.text.trim(),
          page: quote.page.trim(),
        }));

      const firstQuote =
        savedQuotes.length > 0
          ? savedQuotes[0].text
          : null;

      const { error } = await supabase
        .from("thought_logs")
        .insert({
          title,
          content: body,
          quote: firstQuote,
          quotes: savedQuotes,
          tags: draft.tagIds,
          book_id: Number(book.id),
          insight_level: draft.insightLevel,
        });

      if (error) {
        console.error(
          "思考ログの保存に失敗しました:",
          error,
        );

        alert("思考ログの保存に失敗しました");
        return;
      }

      router.push("/memo");
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md space-y-7 pb-[calc(env(safe-area-inset-bottom)+100px)] pt-2">
        <FormSection title="対象の本">
          {loadingBooks ? (
            <div className="rounded-[22px] border border-black/5 bg-[#F6F2EA] p-5 text-[13px] text-slate-500">
              本を読み込んでいます...
            </div>
          ) : book ? (
            <TargetBookCard
              book={book}
              onChange={cycleBook}
            />
          ) : (
            <div className="rounded-[22px] border border-black/5 bg-[#F6F2EA] p-5">
              <p className="text-[13px] text-slate-600">
                登録されている本がありません。
              </p>

              <p className="mt-1 text-[12px] text-slate-500">
                先に本一覧から本を登録してください。
              </p>
            </div>
          )}
        </FormSection>

        <FormSection
          title="今日考えたこと"
          description="未来の自分へ届ける、静かな記録"
        >
          <ThoughtTextarea
            value={draft.body}
            onChange={(body) =>
              setDraft((prev) => ({
                ...prev,
                body,
              }))
            }
          />
        </FormSection>

        <FormSection
          title="引用"
          description="本からの一文を添えられます"
        >
          <QuoteDraftSection
            quotes={draft.quotes}
            onChange={(quotes) =>
              setDraft((prev) => ({
                ...prev,
                quotes,
              }))
            }
          />
        </FormSection>

        <FormSection
          title="タグ"
          description="複数選択できます"
        >
          <TagSelector
            selected={draft.tagIds}
            onChange={(tagIds) =>
              setDraft((prev) => ({
                ...prev,
                tagIds,
              }))
            }
          />
        </FormSection>

        <FormSection title="気付きレベル">
          <InsightLevelPicker
            value={draft.insightLevel}
            onChange={(insightLevel) =>
              setDraft((prev) => ({
                ...prev,
                insightLevel,
              }))
            }
          />
        </FormSection>
      </div>

      <SaveThoughtLogButton
        onClick={handleSave}
        disabled={!canSave}
      />
    </>
  );
}