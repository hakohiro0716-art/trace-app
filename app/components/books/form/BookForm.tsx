"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormSection } from "@/app/components/memo/FormSection";
import { CategoryPicker } from "./CategoryPicker";
import { CoverUploadArea } from "./CoverUploadArea";
import { FormTextArea, FormTextField } from "./FormField";
import { RatingPicker } from "./RatingPicker";
import { SaveBookButton } from "./SaveBookButton";
import { StatusPicker } from "./StatusPicker";
import {
  createEmptyBookDraft,
  type BookDraft,
} from "@/app/lib/book-form";

export function BookForm() {
  const router = useRouter();
  const [draft, setDraft] = useState<BookDraft>(createEmptyBookDraft);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const canSave =
    draft.title.trim().length > 0 && draft.author.trim().length > 0;

  const handleSave = () => {
    const payload = {
      ...draft,
      coverUrl: coverPreview ?? draft.coverUrl,
    };
    // 将来: Supabase Storage + books テーブルへ insert
    console.info("[Trace] book draft", payload);
    router.push("/library");
  };

  return (
    <>
      <div className="mx-auto max-w-md space-y-7 pb-[calc(env(safe-area-inset-bottom)+100px)] pt-4">
        <FormSection title="表紙">
          <CoverUploadArea
            title={draft.title}
            previewUrl={coverPreview}
            onPreviewChange={setCoverPreview}
          />
        </FormSection>

        <FormSection title="タイトル">
          <FormTextField
            value={draft.title}
            onChange={(title) => setDraft((prev) => ({ ...prev, title }))}
            placeholder="本のタイトル"
          />
        </FormSection>

        <FormSection title="著者">
          <FormTextField
            value={draft.author}
            onChange={(author) => setDraft((prev) => ({ ...prev, author }))}
            placeholder="著者名"
          />
        </FormSection>

        <FormSection title="カテゴリ">
          <CategoryPicker
            value={draft.categoryId}
            onChange={(categoryId) =>
              setDraft((prev) => ({ ...prev, categoryId }))
            }
          />
        </FormSection>

        <FormSection title="ステータス">
          <StatusPicker
            value={draft.status}
            onChange={(status) => setDraft((prev) => ({ ...prev, status }))}
          />
        </FormSection>

        <FormSection title="開始日">
          <FormTextField
            type="date"
            value={draft.startedAt}
            onChange={(startedAt) =>
              setDraft((prev) => ({ ...prev, startedAt }))
            }
          />
        </FormSection>

        <FormSection title="読了日">
          <FormTextField
            type="date"
            value={draft.finishedAt}
            onChange={(finishedAt) =>
              setDraft((prev) => ({ ...prev, finishedAt }))
            }
          />
        </FormSection>

        <FormSection title="評価">
          <RatingPicker
            value={draft.rating}
            onChange={(rating) => setDraft((prev) => ({ ...prev, rating }))}
          />
        </FormSection>

        <FormSection
          title="一言メモ"
          description="なぜこの本を読むのか"
        >
          <FormTextArea
            value={draft.note}
            onChange={(note) => setDraft((prev) => ({ ...prev, note }))}
            placeholder="この本に出会った理由、読みたい理由を短く残しておく"
            rows={4}
          />
        </FormSection>
      </div>

      <SaveBookButton onClick={handleSave} disabled={!canSave} />
    </>
  );
}
