function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function FormSection(props: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("px-5", props.className)}>
      <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-slate-900">
        {props.title}
      </h2>
      {props.description ? (
        <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
          {props.description}
        </p>
      ) : null}
      <div className="mt-4">{props.children}</div>
    </section>
  );
}
