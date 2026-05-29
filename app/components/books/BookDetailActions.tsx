import Link from "next/link";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function BookDetailActions(props: { bookId: string }) {
  const quoteNewHref = `/quotes/new?bookId=${props.bookId}`;
  const memoNewHref = `/memo/new?bookId=${props.bookId}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <Link
          href={quoteNewHref}
          className={cn(
            "grid place-items-center rounded-[20px] border border-black/8 bg-[#F6F2EA] px-4 py-3.5 text-center",
            "text-[13px] font-semibold text-slate-800",
            "shadow-[0_12px_32px_rgba(0,0,0,0.10)]",
            "transition-transform duration-200 active:scale-[0.985]",
          )}
        >
          引用を追加
        </Link>
        <Link
          href={memoNewHref}
          className={cn(
            "grid place-items-center rounded-[20px] px-4 py-3.5 text-center",
            "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_55%,#17363f_100%)]",
            "text-[13px] font-semibold text-white/92",
            "shadow-[0_18px_50px_rgba(0,0,0,0.22)]",
            "transition-transform duration-200 active:scale-[0.985]",
          )}
        >
          思考ログを追加
        </Link>
      </div>
    </div>
  );
}
