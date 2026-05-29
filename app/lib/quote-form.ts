/**
 * 引用登録のドメイン型（将来 Supabase: quotes テーブルに対応）
 */

export type QuoteImportance = 1 | 2 | 3 | 4 | 5;

export type QuoteTagId =
  | "life"
  | "habit"
  | "learning"
  | "work"
  | "relationship"
  | "money"
  | "reading";

export type QuoteTag = {
  id: QuoteTagId;
  label: string;
};

export const QUOTE_TAGS: QuoteTag[] = [
  { id: "life", label: "人生" },
  { id: "habit", label: "習慣" },
  { id: "learning", label: "学び" },
  { id: "work", label: "仕事" },
  { id: "relationship", label: "人間関係" },
  { id: "money", label: "お金" },
  { id: "reading", label: "読書" },
];

export const QUOTE_IMPORTANCE_LEVELS: QuoteImportance[] = [1, 2, 3, 4, 5];

export function formatImportanceStars(level: QuoteImportance): string {
  return "★".repeat(level) + "☆".repeat(5 - level);
}

export type QuoteDraft = {
  bookId: string;
  text: string;
  page: string;
  reason: string;
  tagIds: QuoteTagId[];
  importance: QuoteImportance;
};

export const QUOTE_TEXT_PLACEHOLDER = "心に残った一節を書いてください";

export const QUOTE_REASON_PLACEHOLDER =
  "なぜこの言葉が印象に残ったのですか？";

export const QUOTE_PAGE_PLACEHOLDER = "P.124";

export function createEmptyQuoteDraft(bookId: string): QuoteDraft {
  return {
    bookId,
    text: "",
    page: "",
    reason: "",
    tagIds: [],
    importance: 3,
  };
}

export function getQuoteTagLabel(id: QuoteTagId): string {
  return QUOTE_TAGS.find((t) => t.id === id)?.label ?? id;
}
