import Link from "next/link";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type LifeStackBook = {
  id: string;
  title: string;
  coverUrl: string | null;
};

export function LifeStackBanner({
  finishedCount = 0,
  thoughtLogCount = 0,
  recentBooks = [],
}: {
  finishedCount?: number;
  thoughtLogCount?: number;
  recentBooks?: LifeStackBook[];
}) {
  return (
    <section className="px-5 pb-6">
      <Link
        href="/library?status=finished"
        className={cn(
          "relative block overflow-hidden rounded-[22px]",
          "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_45%,#17363f_100%)]",
          "shadow-[0_22px_70px_rgba(0,0,0,0.22)]",
          "transition-transform duration-200 active:scale-[0.985]",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(720px_280px_at_18%_20%,rgba(214,228,222,0.22),transparent_60%)] opacity-30" />

        <div className="relative min-h-[165px] p-5">
          <p className="text-[10px] tracking-[0.24em] text-white/45">
            LIFE STACK
          </p>

          <h3 className="mt-2 text-[14px] font-semibold tracking-[-0.01em] text-white/92">
            あなたの人生に積み上がった本
          </h3>

          <p className="mt-2 max-w-[230px] text-[12.5px] leading-relaxed text-white/65">
            読んできた本と、そこから生まれた思考があなたの軌跡になっていきます。
          </p>

          <div className="mt-5 flex gap-5">
            <div>
              <p className="text-[10px] text-white/40">
                読了
              </p>

              <p className="mt-1 text-[20px] font-semibold text-white">
                {finishedCount}
                <span className="ml-1 text-[11px] font-medium text-white/55">
                  冊
                </span>
              </p>
            </div>

            <div>
              <p className="text-[10px] text-white/40">
                思考ログ
              </p>

              <p className="mt-1 text-[20px] font-semibold text-white">
                {thoughtLogCount}
                <span className="ml-1 text-[11px] font-medium text-white/55">
                  件
                </span>
              </p>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-white/45">
            読了した本を見る ›
          </p>
        </div>

        {recentBooks.length > 0 ? (
          <div className="absolute bottom-5 right-4 flex items-end">
            {recentBooks.slice(0, 3).map((book, index) => (
              <div
                key={book.id}
                className={cn(
                  "relative h-[72px] w-[50px] overflow-hidden rounded-[9px]",
                  "border border-white/15 bg-white/10",
                  "shadow-[0_10px_25px_rgba(0,0,0,0.25)]",
                  index > 0 && "-ml-3",
                )}
                style={{
                  zIndex: index + 1,
                  transform: `translateY(${index * 3}px)`,
                }}
              >
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/10 p-1.5">
                    <p className="line-clamp-4 text-center text-[6px] font-medium leading-tight text-white/60">
                      {book.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </Link>
    </section>
  );
}