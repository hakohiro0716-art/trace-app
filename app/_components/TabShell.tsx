import { BottomNav } from "./BottomNav";

export function TabShell({
  children,
  title,
  eyebrow,
}: {
  children: React.ReactNode;
  title: string;
  eyebrow?: string;
}) {
  return (
    <div className="trace-bg min-h-screen">
      <main className="mx-auto max-w-md px-5 pt-14 pb-32">
        <header className="mb-8">
          {eyebrow ? (
            <p className="text-[11px] tracking-[0.28em] text-emerald-200/80">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.02em]">
            {title}
          </h1>
        </header>
        <div className="animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

