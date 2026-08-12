import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiLeetcode, SiCodechef } from "react-icons/si";
import {
  FiTrendingUp,
  FiStar,
  FiGitCommit,
  FiRefreshCw,
  FiExternalLink,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiAward,
  FiCode,
  FiCalendar,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { fetchLiveStats, DEFAULT_STATS } from "../utils/statsFetcher";
import ActivityHeatmap from "./ActivityHeatmap";

const CodingStats = () => {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);

  const loadData = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const liveData = await fetchLiveStats();
      setStats(liveData);
      if (isManual) {
        toast.success("Synced live stats & contribution heatmaps across all 3 platforms!", {
          id: "stats-sync-toast",
        });
      }
    } catch (err) {
      console.error("Failed to fetch live stats:", err);
      if (isManual) {
        toast.error("Using cached developer stats", { id: "stats-sync-toast" });
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchLiveStats().then((liveData) => {
      if (isMounted && liveData) {
        setStats(liveData);
      }
    });

    const interval = setInterval(() => {
      fetchLiveStats().then((liveData) => {
        if (isMounted && liveData) {
          setStats(liveData);
        }
      });
    }, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-900/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                Real-Time API Sync • GitHub • LeetCode • CodeChef
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-4 text-white"
            >
              Developer Analytics
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-xl text-sm md:text-base"
            >
              Real-time activity heatmaps, open-source contribution calendars, competitive programming statistics, and problem-solving metrics across platforms.
            </motion.p>
          </div>

          {/* Sync Button & Timestamp */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {stats.lastUpdated && (
              <span className="text-xs text-gray-500 self-center">
                Last synced: <span className="text-gray-300 font-mono">{stats.lastUpdated}</span>
              </span>
            )}
            <button
              onClick={() => loadData(true)}
              disabled={isRefreshing}
              className="glass-card px-4 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/40 text-sm font-medium flex items-center justify-center gap-2 hover:bg-cyan-500/10 text-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/5 active:scale-95 disabled:opacity-50"
            >
              <FiRefreshCw className={`text-base ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync Live Data"}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ======================================================== */}
          {/* 1. GITHUB ACTIVITY SECTION */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-card p-6 md:p-8 rounded-2xl border border-white/5 relative group hover:border-cyan-500/20 transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <SiGithub className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    GitHub Activity Graph
                  </h3>
                  <a
                    href={`https://github.com/${stats.github.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                  >
                    @{stats.github.username} <FiExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 bg-gray-900/60 px-3 py-1.5 rounded-lg border border-white/5 text-xs text-gray-400">
                <FiCheckCircle className="text-emerald-400" />
                <span>{stats.github.totalCommits}+ Contributions past year</span>
              </div>
            </div>

            {/* GitHub 52-Week Heatmap Calendar */}
            <div className="bg-gray-950/40 rounded-xl p-5 border border-white/5">
              <ActivityHeatmap
                activityMap={stats.github.activityMap}
                colorLevels={["#161b22", "#0e3a43", "#007085", "#06b6d4", "#22d3ee"]}
                unitName="contributions"
                totalLabel={`${stats.github.totalCommits}+ contributions in the last year`}
              />
            </div>
          </motion.div>

          {/* GitHub Side Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
          >
            {[
              {
                icon: FiGitCommit,
                label: "Total Commits",
                value: `${stats.github.totalCommits}+`,
                color: "text-blue-400",
                bgColor: "bg-blue-500/10 border-blue-500/20",
                description: "Open-source commits & contributions",
              },
              {
                icon: FiStar,
                label: "Repositories",
                value: `${stats.github.repositories}`,
                color: "text-yellow-400",
                bgColor: "bg-yellow-500/10 border-yellow-500/20",
                description: "Public repositories created",
              },
              {
                icon: FiTrendingUp,
                label: "Longest Streak",
                value: `${stats.github.longestStreak} days`,
                color: "text-emerald-400",
                bgColor: "bg-emerald-500/10 border-emerald-500/20",
                description: "Continuous daily code activity",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-card p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 flex items-center gap-4 group"
              >
                <div className={`p-3.5 rounded-xl border ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                  <div className="text-2xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{stat.description}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ======================================================== */}
          {/* 2. LEETCODE ACTIVITY & PROGRESS SECTION */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-orange-500/20 transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                  <SiLeetcode className="text-4xl text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">
                      LeetCode Submission Activity
                    </h3>
                    <a
                      href={`https://leetcode.com/u/${stats.leetcode.username}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-400 hover:underline flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-full"
                    >
                      @{stats.leetcode.username} <FiExternalLink size={10} />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    Data Structures & Algorithms Problem Solving • Global Rank:{" "}
                    <span className="text-orange-400 font-semibold">
                      #{stats.leetcode.ranking?.toLocaleString() || "1,804,668"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Solved Levels (Easy, Medium, Hard) */}
              <div className="flex gap-4 sm:gap-8 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
                {[
                  {
                    label: "Easy",
                    count: stats.leetcode.easySolved,
                    max: stats.leetcode.totalEasy || 958,
                    color: "text-cyan-400",
                    bg: "bg-cyan-500/20",
                    bar: "bg-cyan-400",
                  },
                  {
                    label: "Medium",
                    count: stats.leetcode.mediumSolved,
                    max: stats.leetcode.totalMedium || 2098,
                    color: "text-yellow-400",
                    bg: "bg-yellow-500/20",
                    bar: "bg-yellow-400",
                  },
                  {
                    label: "Hard",
                    count: stats.leetcode.hardSolved,
                    max: stats.leetcode.totalHard || 962,
                    color: "text-red-400",
                    bg: "bg-red-500/20",
                    bar: "bg-red-400",
                  },
                ].map((level) => {
                  const percentage = Math.min(
                    100,
                    Math.max(5, (level.count / (stats.leetcode.totalSolved || 100)) * 100)
                  );

                  return (
                    <div key={level.label} className="min-w-[130px]">
                      <div className="flex justify-between items-end mb-2">
                        <span className={`text-sm font-medium ${level.color}`}>
                          {level.label}
                        </span>
                        <span className="font-bold text-white">{level.count}</span>
                      </div>
                      <div
                        className={`h-2.5 w-full rounded-full ${level.bg} overflow-hidden p-0.5`}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${level.bar}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dedicated LeetCode 52-Week Activity Heatmap (Matches GitHub design in Orange) */}
            <div className="bg-gray-950/40 rounded-xl p-5 border border-white/5 mb-6">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-orange-400 uppercase tracking-wider">
                <FiCalendar /> LeetCode Daily Problem Solving Matrix
              </div>
              <ActivityHeatmap
                activityMap={stats.leetcode.activityMap}
                colorLevels={["#18130c", "#572702", "#9a3412", "#ea580c", "#f97316"]}
                unitName="problems solved"
                totalLabel={`${stats.leetcode.totalSolved} total DSA problems solved on LeetCode`}
              />
            </div>

            {/* Total Solved Summary Bar & Drawer Toggle */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <FiCode className="text-orange-400" /> Total Solved:{" "}
                  <strong className="text-orange-400">{stats.leetcode.totalSolved}</strong> problems
                </span>
                <span>•</span>
                <span>Acceptance Rate: <strong className="text-white">{stats.leetcode.acceptanceRate}</strong></span>
              </div>

              {stats.leetcode.recentSubmissions && stats.leetcode.recentSubmissions.length > 0 && (
                <button
                  onClick={() => setShowSubmissions(!showSubmissions)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-colors"
                >
                  <span>{showSubmissions ? "Hide Recent Solved" : "View Recent Solved Problems"}</span>
                  {showSubmissions ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              )}
            </div>

            {/* Recent Solved Submissions Drawer */}
            <AnimatePresence>
              {showSubmissions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-950/60 p-4 rounded-xl border border-white/5 mt-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FiCheckCircle className="text-emerald-400" /> Recent Accepted Submissions (Live)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {stats.leetcode.recentSubmissions.map((sub, i) => (
                        <div
                          key={i}
                          className="bg-gray-900/60 p-3 rounded-lg border border-white/5 hover:border-orange-500/30 transition-colors"
                        >
                          <div className="text-xs font-medium text-white truncate mb-1" title={sub.title}>
                            {sub.title}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-gray-400">
                            <span className="text-emerald-400 font-medium">{sub.statusDisplay}</span>
                            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1.5 rounded text-[10px]">
                              {sub.lang}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ======================================================== */}
          {/* 3. CODECHEF ACTIVITY & PROFILE SECTION */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-amber-700/20 transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#8B4513]/20 flex items-center justify-center border border-[#8B4513]/40 shrink-0">
                  <SiCodechef className="text-4xl text-[#D2B48C]" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">CodeChef Contest & Activity Grid</h3>
                    <a
                      href={`https://www.codechef.com/users/${stats.codechef.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#D2B48C] hover:underline flex items-center gap-1 bg-[#8B4513]/20 border border-[#8B4513]/40 px-2.5 py-0.5 rounded-full"
                    >
                      @{stats.codechef.username} <FiExternalLink size={10} />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                    Competitive Programming & Contests
                    <span className="text-[#D2B48C] bg-[#8B4513]/30 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                      <FiAward size={12} /> {stats.codechef.stars} ({stats.codechef.globalRank})
                    </span>
                  </p>
                </div>
              </div>

              {/* CodeChef Rating & Problem Progress Bars */}
              <div className="flex gap-4 sm:gap-8 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
                {[
                  {
                    label: "Current Rating",
                    count: stats.codechef.currentRating,
                    max: 2000,
                    color: "text-blue-400",
                    bg: "bg-blue-500/20",
                    bar: "bg-blue-500",
                  },
                  {
                    label: "Highest Rating",
                    count: stats.codechef.highestRating,
                    max: 2000,
                    color: "text-purple-400",
                    bg: "bg-purple-500/20",
                    bar: "bg-purple-500",
                  },
                  {
                    label: "Problems Solved",
                    count: stats.codechef.problemsSolved,
                    max: 1000,
                    color: "text-emerald-400",
                    bg: "bg-emerald-500/20",
                    bar: "bg-emerald-500",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="min-w-[130px]">
                    <div className="flex justify-between items-end mb-2">
                      <span className={`text-sm font-medium ${stat.color}`}>
                        {stat.label}
                      </span>
                      <span className="font-bold text-white">{stat.count}</span>
                    </div>
                    <div
                      className={`h-2.5 w-full rounded-full ${stat.bg} overflow-hidden p-0.5`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, Math.max(10, (stat.count / stat.max) * 100))}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${stat.bar}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dedicated CodeChef 52-Week Activity Heatmap (Matches GitHub design in Bronze/Gold) */}
            <div className="bg-gray-950/40 rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#D2B48C] uppercase tracking-wider">
                <FiCalendar /> CodeChef Contest & Submission Matrix
              </div>
              <ActivityHeatmap
                activityMap={stats.codechef.activityMap}
                colorLevels={["#17130b", "#452906", "#854d0e", "#ca8a04", "#eab308"]}
                unitName="contest problems solved"
                totalLabel={`${stats.codechef.problemsSolved} problems solved on CodeChef`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;
