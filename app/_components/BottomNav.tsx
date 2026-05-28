"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  label: string;
  icon: (props: { active: boolean }) => React.ReactNode;
  transitionTypes?: string[];
};

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const tabs: Tab[] = [
  {
    href: "/",
    label: "ホーム",
    transitionTypes: ["nav-back"],
    icon: ({ active }) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-200",
          active && "scale-[1.03]",
        )}
      >
        <path
          d="M10.7 2.9a2 2 0 0 1 2.6 0l7.1 6a2 2 0 0 1 .7 1.5v9.1A2.5 2.5 0 0 1 18.6 22H5.4A2.5 2.5 0 0 1 3 19.5v-9.1a2 2 0 0 1 .7-1.5l7-6Z"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 1 : 0.88}
        />
        <path
          d="M9 22v-7a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v7"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 1 : 0.78}
        />
      </svg>
    ),
  },
  {
    href: "/library",
    label: "本一覧",
    transitionTypes: ["nav-forward"],
    icon: ({ active }) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-200",
          active && "scale-[1.03]",
        )}
      >
        <path
          d="M6.5 4.5h10.2a2.8 2.8 0 0 1 2.8 2.8v12.1a1.6 1.6 0 0 1-1.6 1.6H7.2A2.7 2.7 0 0 1 4.5 18.3V7.3A2.8 2.8 0 0 1 7.3 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 1 : 0.88}
        />
        <path
          d="M7 8h8.2"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 0.95 : 0.6}
        />
        <path
          d="M7 11.5h6.6"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 0.92 : 0.55}
        />
      </svg>
    ),
  },
  {
    href: "/memo",
    label: "思考ログ",
    transitionTypes: ["nav-forward"],
    icon: ({ active }) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-200",
          active && "scale-[1.03]",
        )}
      >
        <path
          d="M7 3.8h7.7a3 3 0 0 1 3 3v11.9a1.6 1.6 0 0 1-1.6 1.6H7a3 3 0 0 1-3-3V6.8a3 3 0 0 1 3-3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 1 : 0.88}
        />
        <path
          d="M7.5 9h6.8"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 0.92 : 0.55}
        />
        <path
          d="M7.5 12.4h5.2"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 0.92 : 0.55}
        />
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "プロフィール",
    transitionTypes: ["nav-forward"],
    icon: ({ active }) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-200",
          active && "scale-[1.03]",
        )}
      >
        <path
          d="M12 12.2a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 1 : 0.88}
        />
        <path
          d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity={active ? 0.95 : 0.65}
        />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50",
        "px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3",
      )}
      aria-label="Primary"
    >
      <div
        className={cn(
          "mx-auto max-w-md",
          "rounded-[26px] border border-black/5 bg-[rgba(246,244,238,0.82)] backdrop-blur-2xl",
          "shadow-[0_18px_55px_rgba(0,0,0,0.14)]",
        )}
      >
        <div className="grid grid-cols-4">
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                transitionTypes={t.transitionTypes}
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-1",
                  "px-2 py-3 text-[11px] tracking-wide",
                  "transition-colors duration-200",
                  active
                    ? "text-emerald-900"
                    : "text-slate-500 hover:text-slate-700",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={cn(
                    "absolute top-2 h-8 w-12 rounded-2xl",
                    "bg-[rgba(18,122,95,0.12)] blur-[12px]",
                    "opacity-0 transition-opacity duration-200",
                    active && "opacity-100",
                  )}
                  aria-hidden="true"
                />
                <span className="relative">{t.icon({ active })}</span>
                <span className="relative">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

