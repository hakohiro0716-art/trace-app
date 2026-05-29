import Link from "next/link";
import { BookmarkIcon } from "./icons";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ReadingCard(props: {
  href?: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  progressLabel: string;
  progress: number; // 0..1
}) {
  const p = Math.max(0, Math.min(1, props.progress));

  return (
    <section className="px-5">
      <div
        className={cn(
          "rounded-[26px]",
          "border border-white/10 bg-[rgba(12,42,48,0.72)] backdrop-blur-2xl",
          "shadow-[0_22px_70px_rgba(0,0,0,0.28)]",
        )}
      >
        <div className="grid grid-cols-[124px_1fr] gap-5 p-5">
          <div className="relative">
            <div className="absolute -left-1 -top-1 h-[168px] w-[122px] rounded-[18px] bg-white/10 blur-[10px]" />
            <div className="relative h-[168px] w-[122px] overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#f5f1e8_0%,#efe8dc_45%,#e7dfd2_100%)] shadow-[0_14px_34px_rgba(0,0,0,0.24)]">
              <div className="absolute inset-0 bg-[radial-gradient(120px_90px_at_30%_20%,rgba(20,94,79,0.18),transparent_60%)]" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.06)_100%)]" />
              <div className="absolute left-4 top-4 right-4">
                <p className="text-[12px] font-semibold tracking-[-0.01em] text-slate-900">
                  {props.title}
                </p>
                <p className="mt-2 text-[10px] leading-snug text-slate-600">
                  {props.subtitle}
                </p>
              </div>
              <div className="absolute bottom-3 left-4 right-4 text-[9px] text-slate-600">
                Trace
              </div>
            </div>
          </div>

          <div className="min-w-0 pt-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/85 ring-1 ring-white/10">
                {props.statusLabel}
              </span>
            </div>

            <h2 className="mt-4 truncate text-[18px] font-semibold tracking-[-0.01em] text-white/95">
              {props.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-white/70">
              {props.subtitle}
            </p>

            <div className="mt-5 flex items-center gap-2 text-[12px] text-white/65">
              <span>読み進捗</span>
              <span className="text-white/85">{props.progressLabel}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/14">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(214,228,222,0.55),rgba(130,195,173,0.35))]"
                style={{ width: `${Math.round(p * 100)}%` }}
              />
            </div>

            {props.href ? (
              <Link
                href={props.href}
                className={cn(
                  "mt-5 block w-full",
                  "rounded-[18px] border border-white/12 bg-white/6 px-4 py-3",
                  "text-center text-[13px] font-medium text-white/90",
                  "shadow-[0_10px_30px_rgba(0,0,0,0.20)]",
                  "transition-transform duration-200 active:scale-[0.985]",
                )}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <BookmarkIcon className="text-white/80" />
                  続きを読む
                </span>
              </Link>
            ) : (
              <button
                type="button"
                className={cn(
                  "mt-5 w-full",
                  "rounded-[18px] border border-white/12 bg-white/6 px-4 py-3",
                  "text-[13px] font-medium text-white/90",
                  "shadow-[0_10px_30px_rgba(0,0,0,0.20)]",
                  "transition-transform duration-200 active:scale-[0.985]",
                )}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <BookmarkIcon className="text-white/80" />
                  続きを読む
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

