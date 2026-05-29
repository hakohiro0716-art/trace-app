import type { ReadingStatus } from "@/app/lib/books";

/** 本カテゴリ（将来 Supabase: book_categories） */
export type BookCategoryId =
  | "self_help"
  | "psychology"
  | "economics"
  | "philosophy"
  | "literature"
  | "fiction"
  | "history"
  | "other";

export type BookRating = 1 | 2 | 3 | 4 | 5;

export type BookCategory = {
  id: BookCategoryId;
  label: string;
};

export const BOOK_CATEGORIES: BookCategory[] = [
  { id: "self_help", label: "自己啓発" },
  { id: "psychology", label: "心理学" },
  { id: "economics", label: "経済" },
  { id: "philosophy", label: "哲学" },
  { id: "literature", label: "文学" },
  { id: "fiction", label: "小説" },
  { id: "history", label: "歴史" },
  { id: "other", label: "その他" },
];

export const BOOK_STATUS_OPTIONS: {
  value: ReadingStatus;
  label: string;
}[] = [
  { value: "backlog", label: "積読" },
  { value: "reading", label: "読書中" },
  { value: "finished", label: "読了" },
];

/**
 * 本追加フォームの入力状態（将来 Supabase: books テーブルに insert）
 */
export type BookDraft = {
  /** 将来: Supabase Storage の公開 URL */
  coverUrl: string | null;
  title: string;
  author: string;
  categoryId: BookCategoryId | null;
  status: ReadingStatus;
  startedAt: string;
  finishedAt: string;
  rating: BookRating | null;
  note: string;
};

export function createEmptyBookDraft(): BookDraft {
  return {
    coverUrl: null,
    title: "",
    author: "",
    categoryId: null,
    status: "backlog",
    startedAt: "",
    finishedAt: "",
    rating: null,
    note: "",
  };
}

export function getCategoryLabel(id: BookCategoryId): string {
  return BOOK_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
