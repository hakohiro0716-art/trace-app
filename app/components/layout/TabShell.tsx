import { BottomTabBar } from "../navigation/BottomTabBar";

export function TabShell({
  children,
  title,
  eyebrow,
  headerAction,
}: {
  children: React.ReactNode;
  title: string;
  eyebrow?: string;
  headerAction?: React.ReactNode;
}) {
  return (
    <div className="trace-bg min-h-screen">
      <main className="mx-auto max-w-md px-5 pt-14 pb-32">
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {eyebrow ? (
                <p className="text-[11px] tracking-[0.28em] text-emerald-200/80">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-[-0.02em]">
                {title}
              </h1>
            </div>
            {headerAction ? (
              <div className="shrink-0 pt-1">{headerAction}</div>
            ) : null}
          </div>
        </header>
        <div className="animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
          {children}
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
