import { motion } from "framer-motion";
import { SiGithub, SiLeetcode, SiCodechef } from "react-icons/si";
import { FiTrendingUp, FiStar, FiGitCommit } from "react-icons/fi";

const CodingStats = () => {
  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-4"
            >
              Developer Analytics
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-xl"
            >
              A snapshot of my open-source contributions, competitive
              programming progress, and coding activity.
            </motion.p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* GitHub Contributions Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 glass-card p-6 md:p-8 rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-3 mb-8">
              <SiGithub className="text-2xl text-white" />
              <h3 className="text-xl font-semibold">GitHub Activity</h3>
            </div>

            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[700px] flex items-center justify-center bg-gray-900/30 rounded-xl p-4 border border-white/5">
                <img
                  src="https://ghchart.rshah.org/22d3ee/pandirichandu"
                  alt="GitHub Contributions Chart"
                  className="w-full opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </motion.div>

          {/* GitHub Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {[
              {
                icon: FiGitCommit,
                label: "Total Commits",
                value: "120+",
                color: "text-blue-400",
              },
              {
                icon: FiStar,
                label: "Repositories",
                value: "7",
                color: "text-yellow-400",
              },
              {
                icon: FiTrendingUp,
                label: "Longest Streak",
                value: "14 days",
                color: "text-green-400",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-card p-5 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-4"
              >
                <div className={`p-3 rounded-lg bg-gray-800/50 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-xl font-bold">{stat.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* LeetCode Stats Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 mt-4 glass-card p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <SiLeetcode className="text-4xl text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  LeetCode Progress
                </h3>
                <p className="text-gray-400 text-sm">
                  Data Structures & Algorithms Problem Solving
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-8 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {[
                {
                  label: "Easy",
                  count: 120,
                  color: "text-cyan-400",
                  bg: "bg-cyan-500/20",
                  bar: "bg-cyan-500",
                },
                {
                  label: "Medium",
                  count: 85,
                  color: "text-yellow-400",
                  bg: "bg-yellow-500/20",
                  bar: "bg-yellow-500",
                },
                {
                  label: "Hard",
                  count: 15,
                  color: "text-red-400",
                  bg: "bg-red-500/20",
                  bar: "bg-red-500",
                },
              ].map((level) => (
                <div key={level.label} className="min-w-[120px]">
                  <div className="flex justify-between items-end mb-2">
                    <span className={`text-sm font-medium ${level.color}`}>
                      {level.label}
                    </span>
                    <span className="font-bold">{level.count}</span>
                  </div>
                  <div
                    className={`h-2 w-full rounded-full ${level.bg} overflow-hidden`}
                  >
                    <div
                      className={`h-full ${level.bar}`}
                      style={{ width: `${(level.count / 220) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CodeChef Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 glass-card p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#8B4513]/20 flex items-center justify-center border border-[#8B4513]/40">
                <SiCodechef className="text-4xl text-[#D2B48C]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">CodeChef Profile</h3>
                <p className="text-gray-400 text-sm">
                  Competitive Programming & Contests
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-8 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {[
                {
                  label: "Current Rating",
                  count: 1005,
                  color: "text-blue-400",
                  bg: "bg-blue-500/20",
                  bar: "bg-blue-500",
                  max: 2500,
                },
                {
                  label: "Highest Rating",
                  count: 1005,
                  color: "text-purple-400",
                  bg: "bg-purple-500/20",
                  bar: "bg-purple-500",
                  max: 2500,
                },
                {
                  label: "Problems Solved",
                  count: 500,
                  color: "text-green-400",
                  bg: "bg-green-500/20",
                  bar: "bg-green-500",
                  max: 1000,
                },
              ].map((stat) => (
                <div key={stat.label} className="min-w-[120px]">
                  <div className="flex justify-between items-end mb-2">
                    <span className={`text-sm font-medium ${stat.color}`}>
                      {stat.label}
                    </span>
                    <span className="font-bold">{stat.count}</span>
                  </div>
                  <div
                    className={`h-2 w-full rounded-full ${stat.bg} overflow-hidden`}
                  >
                    <div
                      className={`h-full ${stat.bar}`}
                      style={{ width: `${(stat.count / stat.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingStats;
