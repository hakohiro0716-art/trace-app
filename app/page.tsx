import { BottomNav } from "./_components/BottomNav";
import { HeroBackground } from "./_components/home/HeroBackground";
import { HomeHeader } from "./_components/home/HomeHeader";
import { LifeStackBanner } from "./_components/home/LifeStackBanner";
import { NowReadingCard } from "./_components/home/NowReadingCard";
import { StatsRow } from "./_components/home/StatsRow";
import { ThoughtLogCard } from "./_components/home/ThoughtLogCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div className="relative">
        <HeroBackground />
        <div className="relative pb-6">
          <div className="mx-auto max-w-md">
            <HomeHeader />
            <div className="mt-7 animate-[trace-fade-up_700ms_cubic-bezier(0.2,0.9,0.2,1)_both]">
              <NowReadingCard
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

      {/* LIGHT SURFACE */}
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

      <BottomNav />
    </div>
  );
}