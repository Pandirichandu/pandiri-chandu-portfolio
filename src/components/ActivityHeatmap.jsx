import { useState, useMemo } from "react";

/**
 * Pixel-Perfect Contribution Calendar Heatmap
 * Exactly matches GitHub / LeetCode / CodeChef contribution grids:
 * - 52 Sunday-to-Saturday week columns
 * - Month labels placed in absolute pixel alignment directly above their corresponding week column
 * - Mon, Wed, Fri day labels aligned to rows 1, 3, 5
 * - Precise tooltips showing exact contribution count and full formatted date
 * - Responsive horizontal scrolling with custom scrollbar
 * - Real activity only: empty days remain empty; no fake/mock entries.
 */

const CELL_SIZE = 11; // 11px cell width & height
const CELL_GAP = 3;  // 3px gap between cells
const COL_WIDTH = CELL_SIZE + CELL_GAP; // 14px per column
const DAY_LABEL_WIDTH = 30; // 30px width for Mon/Wed/Fri labels

const ActivityHeatmap = ({
  activityMap = {},
  isLoading = false,
  isError = false,
  colorLevels = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  unitName = "contributions",
  totalLabel = "",
  platform = "github",
}) => {
  const [tooltip, setTooltip] = useState(null);

  // Build calendar matrix ending on the current week's Saturday
  const { weeks, monthLabels, totalCount } = useMemo(() => {
    const safeMap = activityMap && typeof activityMap === "object" ? activityMap : {};
    const now = new Date();
    
    // Format YYYY-MM-DD in local time
    const formatYMD = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const todayStr = formatYMD(now);

    // End on Saturday of the current week (day 6)
    const endOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - now.getDay()));
    
    // 52 full weeks = 52 * 7 = 364 days.
    // Start date is (endOfWeek - 363 days), which is always a Sunday.
    const startDate = new Date(endOfWeek.getFullYear(), endOfWeek.getMonth(), endOfWeek.getDate() - 363);

    const weeksArr = [];
    let currentWeek = [];
    const months = [];
    let lastMonthNum = -1;
    let lastMonthCol = -999;
    let sumCount = 0;

    const cur = new Date(startDate.getTime());

    for (let dayIdx = 0; dayIdx < 364; dayIdx++) {
      const dateStr = formatYMD(cur);
      const isFuture = dateStr > todayStr;
      const rawCount = safeMap[dateStr];
      const count = !isFuture && typeof rawCount === "number" && !isNaN(rawCount) ? rawCount : 0;
      sumCount += count;

      const colIdx = weeksArr.length;
      const monthNum = cur.getMonth();

      // If month changes, check if we should add a label for this month
      if (monthNum !== lastMonthNum) {
        const daysUntilNextMonth = new Date(cur.getFullYear(), cur.getMonth() + 1, 1) - cur;
        const weeksUntilNextMonth = Math.floor(daysUntilNextMonth / (7 * 86400000));

        if (dayIdx === 0 && weeksUntilNextMonth < 2) {
          // Skip partial tail month at the very start
        } else if (colIdx - lastMonthCol >= 2 && colIdx < 51) {
          const isCurrentMonth = cur.getFullYear() === now.getFullYear() && monthNum === now.getMonth();
          const monthName = cur.toLocaleDateString("en-US", { month: "short" });
          months.push({
            name: isCurrentMonth ? `${monthName} '${String(cur.getFullYear()).slice(-2)}` : monthName,
            colIndex: colIdx,
            isCurrent: isCurrentMonth,
          });
          lastMonthCol = colIdx;
        }
        lastMonthNum = monthNum;
      }

      currentWeek.push({
        date: dateStr,
        count,
        isFuture,
        formattedDate: cur.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });

      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }

      cur.setDate(cur.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeksArr.push(currentWeek);
    }

    return {
      weeks: weeksArr,
      monthLabels: months,
      totalCount: sumCount,
    };
  }, [activityMap]);

  // Color intensity mapping
  const getColorLevel = (count, isFuture) => {
    if (isFuture || !count || count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  const totalGridWidth = weeks.length * COL_WIDTH;
  const hasData = Object.keys(activityMap || {}).length > 0;

  return (
    <div className={`w-full select-none transition-opacity duration-300 ${isLoading ? "opacity-60" : "opacity-100"}`}>
      {/* Mobile Swipe Hint */}
      <div className="sm:hidden text-[10px] text-gray-400 font-mono text-right mb-1.5 flex items-center justify-end gap-1">
        <span>← Swipe to see full year →</span>
      </div>

      {/* Synchronized Scroll Container */}
      <div className="overflow-x-auto custom-scrollbar w-full pb-2" style={{ WebkitOverflowScrolling: "touch" }}>
        <div style={{ width: totalGridWidth + DAY_LABEL_WIDTH + 16, minWidth: "100%" }}>
          
          {/* ── Month Labels Row (Pixel-Aligned to Week Columns) ── */}
          <div
            className="relative h-[16px] mb-1 font-mono text-[11px]"
            style={{ marginLeft: DAY_LABEL_WIDTH }}
          >
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className={`absolute top-0 transition-colors ${
                  m.isCurrent
                    ? "text-cyan-400 font-bold"
                    : "text-gray-400"
                }`}
                style={{
                  left: m.colIndex * COL_WIDTH,
                }}
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* ── Calendar Grid ── */}
          <div className="flex items-start">
            
            {/* Day of Week Labels (Mon, Wed, Fri) */}
            <div
              className="flex flex-col justify-between shrink-0 font-mono text-[10px] text-gray-400 pr-1.5 select-none"
              style={{
                width: DAY_LABEL_WIDTH,
                height: 7 * CELL_SIZE + 6 * CELL_GAP, // 7 cells + 6 gaps = 95px
                paddingTop: CELL_SIZE + CELL_GAP - 2, // Align Mon with row index 1
                paddingBottom: CELL_SIZE + CELL_GAP - 2, // Align Fri with row index 5
              }}
            >
              <span style={{ lineHeight: `${CELL_SIZE}px` }}>Mon</span>
              <span style={{ lineHeight: `${CELL_SIZE}px` }}>Wed</span>
              <span style={{ lineHeight: `${CELL_SIZE}px` }}>Fri</span>
            </div>

            {/* 52 Week Columns */}
            <div
              className="flex"
              style={{
                gap: `${CELL_GAP}px`,
                width: totalGridWidth,
              }}
            >
              {weeks.map((week, wIdx) => (
                <div
                  key={wIdx}
                  className="flex flex-col"
                  style={{ gap: `${CELL_GAP}px` }}
                >
                  {week.map((day, dIdx) => {
                    const level = getColorLevel(day.count, day.isFuture);
                    const bg = colorLevels[level] || colorLevels[0];

                    return (
                      <div
                        key={dIdx}
                        style={{
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          borderRadius: 2,
                          backgroundColor: bg,
                          outline: "1px solid rgba(255, 255, 255, 0.05)",
                          cursor: day.isFuture ? "default" : "pointer",
                          opacity: day.isFuture ? 0.3 : 1,
                        }}
                        className={`transition-transform duration-100 ${
                          !day.isFuture ? "hover:scale-125 hover:z-20" : ""
                        }`}
                        onMouseEnter={(e) => {
                          if (day.isFuture) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            count: day.count,
                            dateStr: day.formattedDate,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* ── Footer: Total count & Color Legend ── */}
          <div
            className="flex items-center justify-between mt-3 text-xs text-gray-400"
            style={{ marginLeft: DAY_LABEL_WIDTH, maxWidth: totalGridWidth }}
          >
            <span className="font-sans">
              {totalLabel || `${totalCount} ${unitName} in the last year`}
            </span>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
              <span>Less</span>
              <div className="flex gap-[3px]">
                {colorLevels.map((lvlColor, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      backgroundColor: lvlColor,
                      outline: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* ── Honest Live Sync Status Note if API is unavailable ── */}
          {isError && !hasData && (
            <div className="mt-2 text-[11px] text-amber-400/80 font-mono flex items-center gap-1.5" style={{ marginLeft: DAY_LABEL_WIDTH }}>
              <span>⚠️ Live activity sync temporarily unavailable from platform API.</span>
            </div>
          )}

        </div>
      </div>

      {/* ── Floating Tooltip (GitHub / LeetCode style) ── */}
      {tooltip && (
        <div
          className="fixed z-[99999] pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-[#1b1f23] border border-[#30363d] rounded-md px-2.5 py-1.5 text-xs text-[#e6edf3] shadow-2xl font-mono whitespace-nowrap flex flex-col items-center gap-0.5 backdrop-blur-md">
            <span className="font-semibold" style={{ color: colorLevels[4] }}>
              {tooltip.count > 0
                ? `${tooltip.count} ${unitName}`
                : `No ${unitName}`}
            </span>
            <span className="text-[10px] text-gray-400">
              {tooltip.dateStr}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmap;
