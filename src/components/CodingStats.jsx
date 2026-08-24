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
  const [activeTab, setActiveTab] = useState("github"); // "github" | "leetcode" | "codechef"
  const [showSubmissions, setShowSubmissions] = useState(false);

  const loadData = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const liveData = await fetchLiveStats();
      setStats(liveData);
      if (isManual) {
        toast.success("Synced live stats & contribution heatmaps across all platforms!", {
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

  const tabs = [
    {
      id: "github",
      name: "GitHub",
      icon: SiGithub,
      badge: `${stats.github.totalCommits}+ Commits`,
      color: "text-emerald-400",
      activeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      glow: "shadow-emerald-500/10",
    },
    {
      id: "leetcode",
      name: "LeetCode",
      icon: SiLeetcode,
      badge: `${stats.leetcode.totalSolved} Solved`,
      color: "text-orange-400",
      activeBg: "bg-orange-500/10 border-orange-500/30 text-orange-300",
      glow: "shadow-orange-500/10",
    },
    {
      id: "codechef",
      name: "CodeChef",
      icon: SiCodechef,
      badge: `★ ${stats.codechef.currentRating} (${stats.codechef.problemsSolved})`,
      color: "text-yellow-400",
      activeBg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
      glow: "shadow-yellow-500/10",
    },
  ];

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-900/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                Real-Time API Sync • Live Heatmaps
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white"
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
              Interactive activity heatmaps, live commit graphs, and problem-solving analytics across platforms.
            </motion.p>
          </div>

          {/* Sync Button & Timestamp */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {stats.lastUpdated && (
              <span className="text-xs text-gray-500 self-center">
                Synced: <span className="text-gray-300 font-mono">{stats.lastUpdated}</span>
              </span>
            )}
            <button
              onClick={() => loadData(true)}
              disabled={isRefreshing}
              className="glass-card px-4 py-2 rounded-xl border border-white/10 hover:border-cyan-500/40 text-sm font-medium flex items-center justify-center gap-2 hover:bg-cyan-500/10 text-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/5 active:scale-95 disabled:opacity-50"
            >
              <FiRefreshCw className={`text-base ${isRefreshing ? "animate-spin" : ""}`} />
              <span>{isRefreshing ? "Syncing..." : "Sync Live Data"}</span>
            </button>
          </div>
        </div>

        {/* ── Tab Switcher Bar ── */}
        <div className="flex items-center gap-2.5 p-1.5 bg-gray-950/70 rounded-2xl border border-white/10 max-w-2xl mb-8 backdrop-blur-md overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 min-w-[150px] flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? `${tab.activeBg} shadow-lg ${tab.glow}`
                    : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`text-base ${isActive ? tab.color : "text-gray-400"}`} />
                <span>{tab.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-normal ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-gray-800/80 text-gray-400"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Tab Content (Smooth Fade & Slide) ── */}
        <AnimatePresence mode="wait">
          {/* ======================================================== */}
          {/* 1. GITHUB TAB */}
          {/* ======================================================== */}
          {activeTab === "github" && (
            <motion.div
              key="github"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* GitHub Heatmap Card */}
              <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-2xl border border-white/5 relative group hover:border-emerald-500/20 transition-all duration-500">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <SiGithub className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        GitHub Activity Graph
                      </h3>
                      <a
                        href={`https://github.com/${stats.github.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      >
                        @{stats.github.username} <FiExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-xs text-emerald-400">
                    <FiCheckCircle />
                    <span>{stats.github.totalCommits}+ Contributions past year</span>
                  </div>
                </div>

                {/* Heatmap Grid */}
                <div className="bg-[#0d1117] rounded-xl p-5 border border-[#30363d]">
                  <ActivityHeatmap
                    activityMap={stats.github.activityMap}
                    isLoading={isRefreshing}
                    isError={stats.github.activityError}
                    colorLevels={["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]}
                    unitName="contributions"
                    totalLabel={`${stats.github.totalCommits}+ contributions in the last year`}
                    platform="github"
                  />
                </div>
              </div>

              {/* GitHub Side Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                {[
                  {
                    icon: FiGitCommit,
                    label: "Total Commits",
                    value: `${stats.github.totalCommits}+`,
                    color: "text-emerald-400",
                    bgColor: "bg-emerald-500/10 border-emerald-500/20",
                    description: "Verified commits & contributions",
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
                    color: "text-cyan-400",
                    bgColor: "bg-cyan-500/10 border-cyan-500/20",
                    description: "Continuous code activity",
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
              </div>
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* 2. LEETCODE TAB */}
          {/* ======================================================== */}
          {activeTab === "leetcode" && (
            <motion.div
              key="leetcode"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-orange-500/20 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shrink-0">
                    <SiLeetcode className="text-3xl text-orange-500" />
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
                      DSA Problem Solving • Global Rank:{" "}
                      <span className="text-orange-400 font-semibold">
                        #{stats.leetcode.ranking?.toLocaleString() || "1,808,653"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Solved Levels (Easy, Medium, Hard) */}
                <div className="flex gap-4 sm:gap-6 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
                  {[
                    {
                      label: "Easy",
                      count: stats.leetcode.easySolved,
                      color: "text-cyan-400",
                      bg: "bg-cyan-500/20",
                      bar: "bg-cyan-400",
                    },
                    {
                      label: "Medium",
                      count: stats.leetcode.mediumSolved,
                      color: "text-yellow-400",
                      bg: "bg-yellow-500/20",
                      bar: "bg-yellow-400",
                    },
                    {
                      label: "Hard",
                      count: stats.leetcode.hardSolved,
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
                      <div key={level.label} className="min-w-[110px]">
                        <div className="flex justify-between items-end mb-1.5">
                          <span className={`text-xs font-medium ${level.color}`}>
                            {level.label}
                          </span>
                          <span className="font-bold text-sm text-white">{level.count}</span>
                        </div>
                        <div className={`h-2 w-full rounded-full ${level.bg} overflow-hidden p-0.5`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-full rounded-full ${level.bar}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#3c3c3c] mb-6">
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  <FiCalendar /> LeetCode Daily Problem Solving Matrix
                </div>
                <ActivityHeatmap
                  activityMap={stats.leetcode.activityMap}
                  isLoading={isRefreshing}
                  isError={stats.leetcode.activityError}
                  colorLevels={["#282828", "#7c4a1e", "#b45309", "#d97706", "#f59e0b"]}
                  unitName="submissions"
                  totalLabel={`${stats.leetcode.totalSolved} problems solved on LeetCode`}
                  platform="leetcode"
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
          )}

          {/* ======================================================== */}
          {/* 3. CODECHEF TAB */}
          {/* ======================================================== */}
          {activeTab === "codechef" && (
            <motion.div
              key="codechef"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8 rounded-2xl border border-white/5 hover:border-amber-700/20 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#8B4513]/20 flex items-center justify-center border border-[#8B4513]/40 shrink-0">
                    <SiCodechef className="text-3xl text-[#D2B48C]" />
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
                    <p className="text-gray-400 text-sm mt-1 flex flex-wrap items-center gap-2">
                      Competitive Programming & Contests
                      <span className="text-[#D2B48C] bg-[#8B4513]/30 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                        <FiAward size={12} /> {stats.codechef.stars} ({stats.codechef.division || "Div 4"} • Rank #{stats.codechef.globalRank})
                      </span>
                    </p>
                  </div>
                </div>

                {/* CodeChef Rating Progress Bars */}
                <div className="flex gap-4 sm:gap-6 w-full lg:w-auto overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
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
                    <div key={stat.label} className="min-w-[110px]">
                      <div className="flex justify-between items-end mb-1.5">
                        <span className={`text-xs font-medium ${stat.color}`}>
                          {stat.label}
                        </span>
                        <span className="font-bold text-sm text-white">{stat.count}</span>
                      </div>
                      <div className={`h-2 w-full rounded-full ${stat.bg} overflow-hidden p-0.5`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, Math.max(10, (stat.count / stat.max) * 100))}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${stat.bar}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="bg-[#1a1200] rounded-xl p-5 border border-[#3d3000]">
                <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-yellow-500 uppercase tracking-wider">
                  <FiCalendar /> CodeChef Submission Activity
                </div>
                <ActivityHeatmap
                  activityMap={stats.codechef.activityMap}
                  isLoading={isRefreshing}
                  isError={stats.codechef.activityError}
                  colorLevels={["#2a2000", "#5c3d00", "#926200", "#c98a00", "#ffb700"]}
                  unitName="problems solved"
                  totalLabel={`${stats.codechef.problemsSolved} problems solved on CodeChef`}
                  platform="codechef"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CodingStats;
