import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiGithub,
  FiExternalLink,
  FiServer,
  FiLayers,
  FiAlertCircle,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { modalVariants } from "../utils/motionVariants";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card bg-gray-950/90 rounded-3xl border border-white/10 shadow-2xl z-10 custom-scrollbar"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-950/80 backdrop-blur-md border-b border-white/5 p-6 flex justify-between items-center z-20">
              <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-12">
              {/* Overview & Links */}
              <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <FiGithub /> Source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] text-white font-medium transition-all"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Architecture & Tech Stack Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-cyan-900/10 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <FiServer className="text-cyan-400 text-xl" />
                    <h4 className="text-xl font-semibold">
                      System Architecture
                    </h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.architecture ||
                      "Microservices-based architecture with separated frontend and backend clusters, utilizing RESTful APIs and real-time WebSockets for communication."}
                  </p>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-purple-900/10 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <FiLayers className="text-purple-400 text-xl" />
                    <h4 className="text-xl font-semibold">Tech Stack</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div className="glass-card p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <FiAlertCircle className="text-yellow-400 text-xl" />
                  <h4 className="text-xl font-semibold">Challenges Solved</h4>
                </div>
                <ul className="space-y-4">
                  {(
                    project.challenges || [
                      "Optimized database queries reducing load times by 40%.",
                      "Implemented secure authentication to prevent unauthorized access.",
                      "Handled real-time data synchronization across multiple clients.",
                    ]
                  ).map((challenge, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-gray-400 text-sm leading-relaxed"
                    >
                      <span className="text-yellow-500 mt-1">•</span>{" "}
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features & Scalability */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <FiStar className="text-pink-400 text-xl" />
                    <h4 className="text-xl font-semibold">Key Features</h4>
                  </div>
                  <ul className="space-y-2">
                    {(
                      project.features || [
                        "User Authentication",
                        "Real-time updates",
                        "Analytics Dashboard",
                        "Responsive UI",
                      ]
                    ).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />{" "}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <FiTrendingUp className="text-green-400 text-xl" />
                    <h4 className="text-xl font-semibold">Scalability</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.scalability ||
                      "Designed to scale horizontally with load balancers and caching mechanisms (Redis) to support a growing user base efficiently without performance degradation."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
