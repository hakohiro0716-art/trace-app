function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const inputClassName = cn(
  "w-full rounded-[18px] border border-black/5 bg-[#F6F2EA] px-4 py-3.5",
  "text-[15px] text-slate-800 placeholder:text-slate-400",
  "shadow-[0_10px_28px_rgba(0,0,0,0.04)]",
  "outline-none focus:border-emerald-900/20 focus:ring-2 focus:ring-emerald-900/10",
);

export function FormTextField(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "date";
}) {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className={inputClassName}
    />
  );
}

export function FormTextArea(props: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      rows={props.rows ?? 3}
      className={cn(inputClassName, "resize-none leading-relaxed")}
    />
  );
}
