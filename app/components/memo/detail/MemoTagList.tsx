import { getTagLabel, type ThoughtLogTagId } from "@/app/lib/thought-log";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function MemoTagList(props: { tagIds: ThoughtLogTagId[] }) {
  if (props.tagIds.length === 0) return null;

  return (
    <section className="px-5">
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        タグ
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {props.tagIds.map((id) => (
          <span
            key={id}
            className={cn(
              "rounded-full border border-black/8 bg-white/55 px-4 py-2",
              "text-[13px] font-medium text-slate-700",
            )}
          >
            {getTagLabel(id)}
          </span>
        ))}
      </div>
    </section>
  );
}
