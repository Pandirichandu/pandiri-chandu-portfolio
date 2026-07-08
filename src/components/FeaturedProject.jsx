import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiExternalLink,
  FiGithub,
  FiUsers,
  FiShield,
} from "react-icons/fi";
import ProjectModal from "./ProjectModal";
import { sectionVariants, childVariants } from "../utils/motionVariants";
import mealMatrixImg from "../assets/projects/mealmatrix.png";

const FeaturedProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mealMatrixProject = {
    title: "Meal Matrix System",
    description:
      "An advanced system featuring QR-based attendance automation, real-time analytics dashboards, secure authentication, and a scalable backend.",
    fullDescription:
      "Meal Matrix System is a comprehensive platform designed to streamline meal booking and attendance tracking. It leverages modern web technologies to provide a seamless experience for both users and administrators.",
    tech: ["React.js", "Django", "MySQL", "REST APIs", "Framer Motion"],
    github:
      "https://github.com/Pandirichandu/MealMatrix_Smart_Food_Management_System",
    live: "https://meal-matrix-smart-food-management-s.vercel.app/",
    architecture:
      "The system is built on a distributed architecture. The React frontend communicates with a Django REST API backend. A MySQL database ensures data integrity, while a caching layer handles high-frequency reads for the analytics dashboard.",
    challenges: [
      "Implementing real-time QR generation and secure scanning mechanics to prevent proxy attendance.",
      "Optimizing database queries to support over 100 concurrent users during peak meal times.",
      "Designing a responsive, intuitive UI that works flawlessly on mobile devices for quick scanning.",
    ],
    features: [
      "Dynamic QR code attendance",
      "Real-time analytics & admin dashboards",
      "Secure JWT-based authentication",
      "Role-based access control",
    ],
    scalability:
      "The backend is stateless, allowing for easy horizontal scaling. Database indexing and query optimization ensure performance remains stable as the user base grows.",
  };

  return (
    <motion.section
      id="featured"
      className="py-24 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div variants={childVariants}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-cyan-400" />
              <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                Featured Case Study
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Meal Matrix System
            </h2>
          </motion.div>
          <motion.div variants={childVariants} className="hidden md:flex gap-4">
            <a
              href="https://github.com/Pandirichandu/MealMatrix_Smart_Food_Management_System"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <FiGithub size={18} /> View Source
            </a>
            <a
              href={mealMatrixProject.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Live Demo <FiExternalLink size={18} />
            </a>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Project Preview Image/Mockup */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-7 relative group perspective-1000 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="glass-card p-2 rounded-2xl border border-white/10 overflow-hidden transform transition-all duration-500 group-hover:rotate-y-2 group-hover:rotate-x-2 group-hover:border-cyan-500/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <span className="px-6 py-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white font-medium translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  View Case Study
                </span>
              </div>
              {/* Dashboard Image */}
              <div className="w-full aspect-video bg-gray-900 rounded-xl relative overflow-hidden border border-gray-800">
                <img
                  src={mealMatrixImg}
                  alt="Meal Matrix Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-6 -bottom-6 glass-card p-4 rounded-xl border border-white/10 shadow-2xl flex items-center gap-4 bg-black/80 z-20 pointer-events-none"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <FiUsers className="text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-mono">
                  Active Users
                </div>
                <div className="text-xl font-bold">100+</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            variants={childVariants}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px]" />

              <h3 className="text-2xl font-semibold mb-4">
                Smart Meal Booking & Attendance
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {mealMatrixProject.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 mb-8">
                {mealMatrixProject.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="mt-1 text-cyan-400">
                      <FiShield size={16} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {mealMatrixProject.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-cyan-900/30 text-cyan-300 border border-cyan-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                View Full Architecture
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden gap-4 mt-4">
              <a
                href="https://github.com/Pandirichandu/MealMatrix_Smart_Food_Management_System"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 text-center rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Source Code
              </a>
              <a
                href={mealMatrixProject.live}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 text-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
              >
                Live Demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <ProjectModal
        project={mealMatrixProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.section>
  );
};

export default FeaturedProject;
