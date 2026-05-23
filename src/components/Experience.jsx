import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar } from "react-icons/fi";

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Professional Experience
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated Timeline Path */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent z-0"
          />

          {/* Experience Item */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between mb-12">
            {/* Left side (empty on desktop for alignment) */}
            <div className="hidden md:block md:w-5/12" />

            {/* Glowing Node */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute left-[16px] md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-black border-4 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)] z-20 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </motion.div>

            {/* Right side content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full md:w-5/12 pl-16 md:pl-0 mt-8 md:mt-0"
            >
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all duration-300 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-3">
                  <FiCalendar />
                  <span>2023 - Present</span>
                </div>

                <h3 className="text-2xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                  Full Stack Developer Intern
                </h3>
                <h4 className="text-lg text-gray-300 font-medium mb-4 flex items-center gap-2">
                  <FiBriefcase className="text-gray-500" /> Hippocloud
                  Technologies
                </h4>

                <ul className="space-y-3 text-gray-400 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    Developed and maintained robust backend APIs using Django
                    and Django REST Framework.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    Integrated machine learning workflows to enhance application
                    intelligence and automation.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    Optimized backend database queries and application
                    performance for real-time systems.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">▹</span>
                    Collaborated on debugging and resolving critical issues in
                    production environments.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
