"use client";

import { useMemo, useState } from "react";

type ChartMode = "monthly" | "yearly";

export function ReadingHistoryChart({
  finishedDates,
}: {
  finishedDates: string[];
}) {
  const [mode, setMode] = useState<ChartMode>("monthly");

  const validDates = useMemo(
    () =>
      finishedDates
        .map((date) => new Date(date))
        .filter((date) => !Number.isNaN(date.getTime())),
    [finishedDates],
  );

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(validDates.map((date) => date.getFullYear())),
    );

    return uniqueYears.sort((a, b) => b - a);
  }, [validDates]);

  const [selectedYear, setSelectedYear] = useState(
    years[0] ?? new Date().getFullYear(),
  );

  const monthlyData = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => {
      const count = validDates.filter(
        (date) =>
          date.getFullYear() === selectedYear &&
          date.getMonth() === index,
      ).length;

      return {
        month: index + 1,
        count,
      };
    });
  }, [validDates, selectedYear]);

  const yearlyData = useMemo(() => {
    return [...years]
      .sort((a, b) => a - b)
      .map((year) => ({
        year,
        count: validDates.filter(
          (date) => date.getFullYear() === year,
        ).length,
      }));
  }, [validDates, years]);

  const monthlyMax = Math.max(
    ...monthlyData.map((item) => item.count),
    1,
  );

  const yearlyMax = Math.max(
    ...yearlyData.map((item) => item.count),
    1,
  );

  const selectedYearTotal = monthlyData.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-white/45">
            READING HISTORY
          </p>

          <h2 className="mt-2 text-[16px] font-semibold text-white">
            読書の推移
          </h2>
        </div>

        <div className="flex rounded-full border border-white/10 bg-black/10 p-1">
          <button
            type="button"
            onClick={() => setMode("monthly")}
            className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${
              mode === "monthly"
                ? "bg-white text-slate-900"
                : "text-white/55"
            }`}
          >
            月別
          </button>

          <button
            type="button"
            onClick={() => setMode("yearly")}
            className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${
              mode === "yearly"
                ? "bg-white text-slate-900"
                : "text-white/55"
            }`}
          >
            年別
          </button>
        </div>
      </div>

      {validDates.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-[13px] text-white/45">
            読了日が登録された本はまだありません。
          </p>
        </div>
      ) : mode === "monthly" ? (
        <>
          <div className="mt-5 flex items-center justify-between">
            <select
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(Number(event.target.value))
              }
              className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[12px] text-white outline-none"
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                  className="text-slate-900"
                >
                  {year}年
                </option>
              ))}
            </select>

            <p className="text-[12px] text-white/50">
              {selectedYear}年{" "}
              <span className="font-semibold text-white">
                {selectedYearTotal}冊
              </span>
            </p>
          </div>

          <div className="mt-6 flex h-[150px] items-end justify-between gap-1">
            {monthlyData.map((item) => {
              const height =
                item.count === 0
                  ? 4
                  : Math.max(
                      (item.count / monthlyMax) * 110,
                      14,
                    );

              return (
                <div
                  key={item.month}
                  className="flex min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-1 text-[9px] text-white/45">
                    {item.count > 0 ? item.count : ""}
                  </span>

                  <div
                    className="w-full max-w-[18px] rounded-t-full bg-emerald-300/55"
                    style={{ height: `${height}px` }}
                  />

                  <span className="mt-2 text-[9px] text-white/40">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-2 text-center text-[10px] text-white/30">
            月
          </p>
        </>
      ) : (
        <>
          <div className="mt-6 flex h-[170px] items-end justify-center gap-5">
            {yearlyData.map((item) => {
              const height =
                item.count === 0
                  ? 4
                  : Math.max(
                      (item.count / yearlyMax) * 125,
                      16,
                    );

              return (
                <div
                  key={item.year}
                  className="flex min-w-[46px] flex-col items-center justify-end"
                >
                  <span className="mb-1 text-[10px] text-white/50">
                    {item.count}冊
                  </span>

                  <div
                    className="w-7 rounded-t-full bg-emerald-300/55"
                    style={{ height: `${height}px` }}
                  />

                  <span className="mt-2 text-[10px] text-white/40">
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      <p className="mt-4 text-[10px] leading-relaxed text-white/30">
        読了日が設定されている本をもとに集計しています。
      </p>
    </section>
  );
}