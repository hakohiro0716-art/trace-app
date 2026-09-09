"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { FormSection } from "@/app/components/memo/FormSection";
import { CategoryPicker } from "./CategoryPicker";
import { CoverUploadArea } from "./CoverUploadArea";
import { FormTextArea, FormTextField } from "./FormField";
import { RatingPicker } from "./RatingPicker";
import { SaveBookButton } from "./SaveBookButton";
import { StatusPicker } from "./StatusPicker";
import type { BookDraft } from "@/app/lib/book-form";

export function EditBookForm({
  bookId,
  initialDraft,
}: {
  bookId: string;
  initialDraft: BookDraft;
}) {
  const router = useRouter();

  const [draft, setDraft] = useState<BookDraft>(initialDraft);

  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialDraft.coverUrl,
  );

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);

  const canSave =
    draft.title.trim().length > 0 &&
    draft.author.trim().length > 0 &&
    !saving;

  const handleSave = async () => {
    if (!canSave) return;

    setSaving(true);

    try {
      let coverUrl = draft.coverUrl;

      if (coverFile) {
        const fileName = `${Date.now()}-${coverFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from("book-covers")
          .upload(fileName, coverFile);

        if (uploadError) {
          console.error(uploadError);
          alert("画像アップロードに失敗しました");
          return;
        }

        const { data } = supabase.storage
          .from("book-covers")
          .getPublicUrl(fileName);

        coverUrl = data.publicUrl;
      }

      const { error } = await supabase
        .from("books")
        .update({
          title: draft.title.trim(),
          author: draft.author.trim(),
          status: draft.status,
          rating: draft.rating,
          memo: draft.note,
          category_id: draft.categoryId,
          started_at: draft.startedAt || null,
          finished_at: draft.finishedAt || null,
          cover_url: coverUrl,
        })
        .eq("id", bookId);

      if (error) {
        console.error(error);
        alert("本の更新に失敗しました");
        return;
      }

      router.push(`/books/${bookId}`);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-md space-y-7 pb-[calc(env(safe-area-inset-bottom)+100px)] pt-4">
        <FormSection title="表紙">
          <CoverUploadArea
            title={draft.title}
            previewUrl={coverPreview}
            onPreviewChange={setCoverPreview}
            onFileChange={setCoverFile}
          />
        </FormSection>

        <FormSection title="タイトル">
          <FormTextField
            value={draft.title}
            onChange={(title) =>
              setDraft((prev) => ({
                ...prev,
                title,
              }))
            }
            placeholder="本のタイトル"
          />
        </FormSection>

        <FormSection title="著者">
          <FormTextField
            value={draft.author}
            onChange={(author) =>
              setDraft((prev) => ({
                ...prev,
                author,
              }))
            }
            placeholder="著者名"
          />
        </FormSection>

        <FormSection title="カテゴリ">
          <CategoryPicker
            value={draft.categoryId}
            onChange={(categoryId) =>
              setDraft((prev) => ({
                ...prev,
                categoryId,
              }))
            }
          />
        </FormSection>

        <FormSection title="ステータス">
          <StatusPicker
            value={draft.status}
            onChange={(status) =>
              setDraft((prev) => ({
                ...prev,
                status,
              }))
            }
          />
        </FormSection>

        <FormSection title="開始日">
          <FormTextField
            type="date"
            value={draft.startedAt}
            onChange={(startedAt) =>
              setDraft((prev) => ({
                ...prev,
                startedAt,
              }))
            }
          />
        </FormSection>

        <FormSection title="読了日">
          <FormTextField
            type="date"
            value={draft.finishedAt}
            onChange={(finishedAt) =>
              setDraft((prev) => ({
                ...prev,
                finishedAt,
              }))
            }
          />
        </FormSection>

        <FormSection title="評価">
          <RatingPicker
            value={draft.rating}
            onChange={(rating) =>
              setDraft((prev) => ({
                ...prev,
                rating,
              }))
            }
          />
        </FormSection>

        <FormSection
          title="一言メモ"
          description="この本について残しておきたいこと"
        >
          <FormTextArea
            value={draft.note}
            onChange={(note) =>
              setDraft((prev) => ({
                ...prev,
                note,
              }))
            }
            placeholder="この本についてのメモ"
            rows={4}
          />
        </FormSection>
      </div>

      <SaveBookButton
        onClick={handleSave}
        disabled={!canSave}
      />
    </>
  );
}