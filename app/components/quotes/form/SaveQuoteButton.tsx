"use client";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function SaveQuoteButton(props: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div
        className="h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(246,242,234,0.92)_45%,#F6F2EA_100%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-auto px-5 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            onClick={props.onClick}
            disabled={props.disabled}
            className={cn(
              "w-full rounded-[22px] px-5 py-4",
              "bg-[linear-gradient(180deg,#294f55_0%,#1f444c_55%,#17363f_100%)]",
              "text-[15px] font-semibold tracking-[-0.01em] text-white/92",
              "shadow-[0_18px_50px_rgba(0,0,0,0.22)]",
              "transition-transform duration-200 active:scale-[0.985]",
              "disabled:cursor-not-allowed disabled:opacity-45",
            )}
          >
            人生に積み上げる
          </button>
        </div>
      </div>
    </div>
  );
}
