import Link from "next/link";
import { BackHeader } from "@/app/components/navigation/BackHeader";

export default function MemoNotFound() {
  return (
    <div className="trace-bg min-h-screen">
      <div className="mx-auto max-w-md">
        <BackHeader href="/memo" />
        <main className="px-5 pt-8 pb-20">
          <p className="text-[13px] text-white/60">
            思考ログが見つかりませんでした。
          </p>
          <Link
            href="/memo"
            className="mt-6 inline-block text-[13px] text-emerald-300/90"
          >
            思考ログ一覧へ戻る ›
          </Link>
        </main>
      </div>
    </div>
  );
}
