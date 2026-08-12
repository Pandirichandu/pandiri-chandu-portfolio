import { useState, useMemo } from "react";

/**
 * Custom 52-Week Activity Heatmap Calendar Grid
 * Generates an interactive GitHub-style contribution matrix for LeetCode, CodeChef, GitHub, etc.
 */
const ActivityHeatmap = ({
  activityMap = {},
  colorLevels = ["#161b22", "#0e3a43", "#007085", "#06b6d4", "#22d3ee"],
  unitName = "submissions",
  totalLabel = "",
}) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 52 weeks of dates ending at today
  const { weeks, monthLabels, totalCountCalculated } = useMemo(() => {
    const today = new Date();
    // Move to end of current week (Saturday)
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + (6 - today.getDay()));

    // 52 weeks = 364 days
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 363);

    const weeksArr = [];
    let currentWeek = [];
    const months = [];
    let lastMonth = -1;
    let sumCount = 0;

    const cur = new Date(startDate);

    while (cur <= endDate) {
      const dateStr = cur.toISOString().split("T")[0];
      const count = activityMap[dateStr] || 0;
      sumCount += count;

      const monthNum = cur.getMonth();
      if (monthNum !== lastMonth) {
        months.push({
          name: cur.toLocaleDateString("en-US", { month: "short" }),
          weekIndex: weeksArr.length,
        });
        lastMonth = monthNum;
      }

      currentWeek.push({
        date: dateStr,
        count,
        formattedDate: cur.toLocaleDateString("en-US", {
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
      totalCountCalculated: sumCount,
    };
  }, [activityMap]);

  // Determine color index (0 to 4) based on activity count
  const getColorLevel = (count) => {
    if (!count || count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Month Labels Header */}
      <div className="w-full flex justify-between text-[11px] text-gray-400 mb-2 px-1 font-mono">
        {monthLabels.slice(0, 12).map((m, idx) => (
          <span key={idx} className="truncate">
            {m.name}
          </span>
        ))}
      </div>

      {/* Grid Container */}
      <div className="relative overflow-x-auto custom-scrollbar w-full pb-2">
        <div className="flex gap-[3.5px] items-center min-w-[650px] justify-between">
          {/* Day Labels Column */}
          <div className="flex flex-col justify-between text-[10px] text-gray-500 font-mono pr-2 h-[88px] shrink-0">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* 52 Weeks Grid Columns */}
          <div className="flex gap-[3.5px] flex-grow justify-between">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3.5px]">
                {week.map((day, dIdx) => {
                  const level = getColorLevel(day.count);
                  const bg = colorLevels[level] || colorLevels[0];

                  return (
                    <div
                      key={dIdx}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredCell({
                          ...day,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 10,
                        });
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                      className="w-[11px] h-[11px] rounded-[2.5px] transition-all duration-200 hover:scale-125 hover:z-20 cursor-pointer shadow-sm"
                      style={{
                        backgroundColor: bg,
                        boxShadow:
                          level > 0
                            ? `0 0 6px ${bg}60`
                            : "none",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info: Total Count & Color Legend */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-3 text-xs text-gray-400 gap-2">
        <span>
          {totalLabel || `${totalCountCalculated} ${unitName} in the last year`}
        </span>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-mono">
          <span>Less</span>
          <div className="flex gap-1">
            {colorLevels.map((lvlColor, idx) => (
              <div
                key={idx}
                className="w-2.5 h-2.5 rounded-[2px]"
                style={{ backgroundColor: lvlColor }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-[99999] pointer-events-none whitespace-nowrap bg-gray-900/95 text-white text-xs px-3 py-2 rounded-xl shadow-2xl border border-cyan-500/40 backdrop-blur-md font-sans flex flex-col items-center gap-0.5"
          style={{
            left: `${hoveredCell.x}px`,
            top: `${hoveredCell.y - 6}px`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <span className="font-semibold text-cyan-300">
            {hoveredCell.count > 0
              ? `${hoveredCell.count} ${unitName}`
              : `No ${unitName}`}
          </span>
          <span className="text-[10px] text-gray-400">{hoveredCell.formattedDate}</span>
        </div>
      )}
    </div>
  );
};

export default ActivityHeatmap;
