import Link from "next/link";
import { BackHeader } from "@/app/components/navigation/BackHeader";

export default function BookNotFound() {
  return (
    <div className="trace-bg min-h-screen">
      <div className="mx-auto max-w-md">
        <BackHeader href="/library" />
        <main className="px-5 pt-8 pb-20">
          <p className="text-[13px] text-white/60">本が見つかりませんでした。</p>
          <Link
            href="/library"
            className="mt-6 inline-block text-[13px] text-emerald-300/90"
          >
            本一覧へ戻る ›
          </Link>
        </main>
      </div>
    </div>
  );
}
