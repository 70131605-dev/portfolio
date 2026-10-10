import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ContributionCalendar } from "@/lib/github";
import { GithubIcon } from "@/components/ui/BrandIcons";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

/** GitHub-style profile header plus the year's contribution graph. */
export function GitHubProfileCard({
  name,
  login,
  avatar,
  url,
  calendar,
}: {
  name: string;
  login: string;
  avatar: string;
  url: string;
  calendar: ContributionCalendar;
}) {
  // Month label sits on the first week column that contains the 1st of that month.
  const monthCols = calendar.weeks.map((week) => {
    const first = week.find((d) => d && d.date.endsWith("-01"));
    return first ? MONTHS[Number(first.date.slice(5, 7)) - 1] : "";
  });

  return (
    <div className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[220px_1fr] lg:items-center lg:gap-10">
      {/* Profile */}
      <a href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 lg:flex-col lg:items-start">
        <Image
          src={avatar}
          alt={`${name} on GitHub`}
          width={120}
          height={120}
          className="size-16 rounded-full border border-line-2 object-cover lg:size-28"
        />
        <span>
          <span className="block text-[20px] font-semibold tracking-[-0.02em] text-fg">{name}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[14px] text-fg-2 transition-colors group-hover:text-fg">
            <GithubIcon className="size-3.5" aria-hidden /> {login}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" aria-hidden />
          </span>
        </span>
      </a>

      {/* Contribution graph */}
      <div className="min-w-0">
        <p className="text-[16px] font-medium text-fg">
          <span className="font-semibold">{calendar.total.toLocaleString()}</span> contributions in {calendar.year}
        </p>
        <div className="no-scrollbar mt-4 overflow-x-auto" dir="rtl">
          {/* rtl keeps the latest weeks in view on narrow screens */}
          <div dir="ltr" className="w-max">
            <div className="flex gap-[3px] pl-8 text-[11px] text-muted">
              {monthCols.map((m, i) => (
                <span key={i} className="w-[11px] shrink-0 overflow-visible whitespace-nowrap sm:w-[12px]">
                  {m}
                </span>
              ))}
            </div>
            <div className="mt-1.5 flex gap-[3px]">
              <div className="mr-1 grid w-7 grid-rows-7 gap-[3px] text-[10.5px] leading-none text-muted">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <span key={i} className="flex h-[11px] items-center sm:h-[12px]">
                    {d}
                  </span>
                ))}
              </div>
              <div
                className="grid grid-flow-col grid-rows-7 gap-[3px]"
                role="img"
                aria-label={`${calendar.total} contributions on GitHub in ${calendar.year}`}
              >
                {calendar.weeks.flatMap((week, w) =>
                  Array.from({ length: 7 }, (_, d) => {
                    const day = week[d];
                    return (
                      <span
                        key={`${w}-${d}`}
                        title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${fmt(day.date)}` : undefined}
                        className="size-[11px] rounded-[2px] sm:size-[12px]"
                        style={{ background: day ? `var(--gh-${day.level})` : "transparent" }}
                      />
                    );
                  }),
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end gap-1 text-[11.5px] text-muted">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="size-[11px] rounded-[2px]" style={{ background: `var(--gh-${l})` }} />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
