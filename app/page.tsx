import { HeroBackground } from "@/app/components/home/HeroBackground";
import { HomeHeader } from "@/app/components/home/HomeHeader";
import { LifeStackBanner } from "@/app/components/home/LifeStackBanner";
import { ReadingCard } from "@/app/components/home/ReadingCard";
import { StatsRow } from "@/app/components/home/StatsRow";
import { ThoughtLogCard } from "@/app/components/home/ThoughtLogCard";
import { BottomTabBar } from "@/app/components/navigation/BottomTabBar";
import { defaultBookId } from "@/app/lib/books";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <HeroBackground />
        <div className="relative pb-6">
          <div className="mx-auto max-w-md">
            <HomeHeader />
            <div className="mt-7 animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
              <ReadingCard
                href={`/books/${defaultBookId}`}
                title="エッセンシャル思考"
                subtitle="最少の時間で成果を最大にする"
                statusLabel="読書中"
                progressLabel="48%"
                progress={0.48}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(246,242,234,0.92)_0%,#F6F2EA_100%)]">
        <div className="mx-auto max-w-md space-y-5 pt-5 pb-28">
          <ThoughtLogCard
            items={[
              {
                id: "t1",
                title: "「やらないこと」を決める勇気",
                meta: "エッセンシャル思考より・今日 10:32",
              },
              {
                id: "t2",
                title: "自分の時間を取り戻すには",
                meta: "エッセンシャル思考より・昨日 22:15",
              },
            ]}
          />

          <StatsRow />
          <LifeStackBanner />
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
