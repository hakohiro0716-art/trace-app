import { BookForm } from "@/app/components/books/form/BookForm";
import { HeroBackground } from "@/app/components/home/HeroBackground";
import { BackHeader } from "@/app/components/navigation/BackHeader";

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function BookNewPage() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />
        <div className="relative">
          <div className="mx-auto max-w-md">
            <BackHeader title="本を追加する" href="/library" />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "bg-[linear-gradient(180deg,rgba(246,242,234,0.92)_0%,#F6F2EA_100%)]",
          "min-h-[calc(100vh-120px)]",
        )}
      >
        <div className="animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
          <BookForm />
        </div>
      </div>
    </div>
  );
}
