"use client";

import { useRef } from "react";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CoverUploadArea(props: {
  title: string;
  previewUrl: string | null;
  onPreviewChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayTitle = props.title.trim() || "タイトル";

  const handleFile = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    props.onPreviewChange(url);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "group relative mx-auto w-[148px]",
          "transition-transform duration-200 active:scale-[0.98]",
        )}
        aria-label="表紙画像を選択"
      >
        <div className="absolute -inset-1 rounded-[20px] bg-white/10 blur-[12px]" />
        <div
          className={cn(
            "relative aspect-[2/3] w-full overflow-hidden rounded-[20px]",
            "border border-dashed border-black/12",
            "shadow-[0_18px_48px_rgba(0,0,0,0.14)]",
            props.previewUrl
              ? "bg-slate-200"
              : "bg-[linear-gradient(180deg,#f5f1e8_0%,#efe8dc_45%,#e7dfd2_100%)]",
          )}
        >
          {props.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={props.previewUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(140px_100px_at_30%_20%,rgba(20,94,79,0.18),transparent_60%)]" />
              <div className="absolute left-4 top-5 right-4">
                <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900">
                  {displayTitle}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-medium text-slate-600 ring-1 ring-black/5">
                  書影を追加
                </span>
              </div>
            </>
          )}
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          handleFile(file);
          e.target.value = "";
        }}
      />

      <p className="mt-4 text-center text-[12px] text-slate-500">
        タップして書影をアップロード
        <br />
        <span className="text-slate-400">（未選択時は仮の表紙を表示）</span>
      </p>
    </div>
  );
}
