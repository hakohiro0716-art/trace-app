"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FormTextArea, FormTextField } from "@/app/components/books/form/FormField";
import { FormSection } from "@/app/components/memo/FormSection";
import { TargetBookCard } from "@/app/components/memo/TargetBookCard";
import { ImportancePicker } from "./ImportancePicker";
import { QuoteTagSelector } from "./QuoteTagSelector";
import { SaveQuoteButton } from "./SaveQuoteButton";
import { defaultBookId, getAllBooks, getBookById } from "@/app/lib/books";
import {
  createEmptyQuoteDraft,
  QUOTE_PAGE_PLACEHOLDER,
  QUOTE_REASON_PLACEHOLDER,
  QUOTE_TEXT_PLACEHOLDER,
  type QuoteDraft,
} from "@/app/lib/quote-form";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function QuoteForm(props: {
  initialBookId?: string;
  backHref?: string;
}) {
  const router = useRouter();
  const books = useMemo(() => getAllBooks(), []);

  const resolvedBookId =
    props.initialBookId && getBookById(props.initialBookId)
      ? props.initialBookId
      : defaultBookId;

  const [draft, setDraft] = useState<QuoteDraft>(() =>
    createEmptyQuoteDraft(resolvedBookId),
  );

  const book = getBookById(draft.bookId) ?? getBookById(defaultBookId)!;

  const cycleBook = () => {
    const index = books.findIndex((b) => b.id === draft.bookId);
    const next = books[(index + 1) % books.length];
    setDraft((prev) => ({ ...prev, bookId: next.id }));
  };

  const handleSave = () => {
    // 将来: Supabase quotes テーブルへ insert
    console.info("[Trace] quote draft", draft);
    const destination =
      props.backHref ?? `/books/${draft.bookId}`;
    router.push(destination);
  };

  const canSave = draft.text.trim().length > 0;

  return (
    <>
      <div className="mx-auto max-w-md space-y-7 pb-[calc(env(safe-area-inset-bottom)+100px)] pt-2">
        <FormSection title="対象の本">
          <TargetBookCard book={book} onChange={cycleBook} />
        </FormSection>

        <FormSection title="引用文">
          <textarea
            value={draft.text}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, text: e.target.value }))
            }
            placeholder={QUOTE_TEXT_PLACEHOLDER}
            rows={8}
            className={cn(
              "w-full resize-none rounded-[22px] border border-black/5 bg-[#F6F2EA] p-5",
              "text-[16px] leading-[1.75] text-slate-800 placeholder:text-slate-400",
              "shadow-[0_14px_34px_rgba(0,0,0,0.06)]",
              "outline-none focus:border-emerald-900/20 focus:ring-2 focus:ring-emerald-900/10",
            )}
          />
        </FormSection>

        <FormSection title="ページ数">
          <FormTextField
            value={draft.page}
            onChange={(page) => setDraft((prev) => ({ ...prev, page }))}
            placeholder={QUOTE_PAGE_PLACEHOLDER}
          />
        </FormSection>

        <FormSection title="なぜ残したのか">
          <FormTextArea
            value={draft.reason}
            onChange={(reason) => setDraft((prev) => ({ ...prev, reason }))}
            placeholder={QUOTE_REASON_PLACEHOLDER}
            rows={5}
          />
        </FormSection>

        <FormSection title="関連タグ" description="複数選択できます">
          <QuoteTagSelector
            selected={draft.tagIds}
            onChange={(tagIds) => setDraft((prev) => ({ ...prev, tagIds }))}
          />
        </FormSection>

        <FormSection title="重要度">
          <ImportancePicker
            value={draft.importance}
            onChange={(importance) =>
              setDraft((prev) => ({ ...prev, importance }))
            }
          />
        </FormSection>
      </div>

      <SaveQuoteButton onClick={handleSave} disabled={!canSave} />
    </>
  );
}
