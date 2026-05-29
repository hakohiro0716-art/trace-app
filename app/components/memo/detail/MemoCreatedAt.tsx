export function MemoCreatedAt(props: {
  date: string;
  time: string;
}) {
  return (
    <div className="px-5">
      <p className="text-[11px] font-medium tracking-wide text-slate-500">
        記録した日時
      </p>
      <p className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-slate-900">
        {props.date}
      </p>
      <p className="mt-0.5 text-[15px] text-slate-600">{props.time}</p>
    </div>
  );
}
