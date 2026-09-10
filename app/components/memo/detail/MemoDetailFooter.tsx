"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { supabase } from "@/app/lib/supabase";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoDetailFooter(props: { memoId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "この思考ログを削除しますか？\n\nこの操作は元に戻せません。",
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const { error } = await supabase
        .from("thought_logs")
        .delete()
        .eq("id", props.memoId);

      if (error) {
        console.error(
          "思考ログの削除に失敗しました:",
          error,
        );

        alert("思考ログの削除に失敗しました");
        return;
      }

      router.push("/memo");
      router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div
        className="h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(246,242,234,0.92)_45%,#F6F2EA_100%)]"
        aria-hidden="true"
      />

      <div className="pointer-events-auto px-5 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
          <Link
            href={`/memo/${props.memoId}/edit`}
            className={cn(
              "grid place-items-center rounded-[20px] border border-black/8 bg-[#F6F2EA] py-3.5",
              "text-[13px] font-semibold text-slate-800",
              "shadow-[0_12px_32px_rgba(0,0,0,0.10)]",
              "transition-transform duration-200 active:scale-[0.985]",
            )}
          >
            編集
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className={cn(
              "rounded-[20px] border border-red-900/10 bg-red-50/70 py-3.5",
              "text-[13px] font-semibold text-red-700",
              "transition-transform duration-200 active:scale-[0.985]",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {deleting ? "削除中..." : "削除"}
          </button>
        </div>
      </div>
    </div>
  );
}