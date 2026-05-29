"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FormSection } from "./FormSection";
import { InsightLevelPicker } from "./InsightLevelPicker";
import { QuoteDraftSection } from "./QuoteDraftSection";
import { SaveThoughtLogButton } from "./SaveThoughtLogButton";
import { TagSelector } from "./TagSelector";
import { TargetBookCard } from "./TargetBookCard";
import { ThoughtTextarea } from "./ThoughtTextarea";
import { defaultBookId, getAllBooks, getBookById } from "@/app/lib/books";
import {
  createEmptyThoughtLogDraft,
  type ThoughtLogDraft,
} from "@/app/lib/thought-log";

export function ThoughtLogForm(props: { initialBookId?: string }) {
  const router = useRouter();
  const books = useMemo(() => getAllBooks(), []);

  const resolvedBookId =
    props.initialBookId && getBookById(props.initialBookId)
      ? props.initialBookId
      : defaultBookId;

  const [draft, setDraft] = useState<ThoughtLogDraft>(() =>
    createEmptyThoughtLogDraft(resolvedBookId),
  );

  const book = getBookById(draft.bookId) ?? getBookById(defaultBookId)!;

  const cycleBook = () => {
    const index = books.findIndex((b) => b.id === draft.bookId);
    const next = books[(index + 1) % books.length];
    setDraft((prev) => ({ ...prev, bookId: next.id }));
  };

  const handleSave = () => {
    // 将来: Supabase に ThoughtLogDraft を persist
    console.info("[Trace] thought log draft", draft);
    router.push("/memo");
  };

  const canSave = draft.body.trim().length > 0;

  return (
    <>
      <div className="mx-auto max-w-md space-y-7 pb-[calc(env(safe-area-inset-bottom)+100px)] pt-2">
        <FormSection title="対象の本">
          <TargetBookCard book={book} onChange={cycleBook} />
        </FormSection>

        <FormSection
          title="今日考えたこと"
          description="未来の自分へ届ける、静かな記録"
        >
          <ThoughtTextarea
            value={draft.body}
            onChange={(body) => setDraft((prev) => ({ ...prev, body }))}
          />
        </FormSection>

        <FormSection title="引用" description="本からの一文を添えられます">
          <QuoteDraftSection
            quotes={draft.quotes}
            onChange={(quotes) => setDraft((prev) => ({ ...prev, quotes }))}
          />
        </FormSection>

        <FormSection title="タグ" description="複数選択できます">
          <TagSelector
            selected={draft.tagIds}
            onChange={(tagIds) => setDraft((prev) => ({ ...prev, tagIds }))}
          />
        </FormSection>

        <FormSection title="気付きレベル">
          <InsightLevelPicker
            value={draft.insightLevel}
            onChange={(insightLevel) =>
              setDraft((prev) => ({ ...prev, insightLevel }))
            }
          />
        </FormSection>
      </div>

      <SaveThoughtLogButton onClick={handleSave} disabled={!canSave} />
    </>
  );
}
