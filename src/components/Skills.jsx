import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiDjango,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
} from "react-icons/si";
import {
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaJava,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: SiPython, color: "text-blue-400" },
      { name: "Java", icon: FaJava, color: "text-red-400" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "SQL", icon: FaDatabase, color: "text-gray-300" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "text-cyan-400" },
      { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-300" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Django", icon: SiDjango, color: "text-green-500" },
      { name: "REST APIs", icon: FaServer, color: "text-gray-200" },
      { name: "MySQL", icon: SiMysql, color: "text-blue-400" },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: SiGit, color: "text-orange-600" },
      { name: "GitHub", icon: SiGithub, color: "text-white" },
      { name: "Postman", icon: SiPostman, color: "text-orange-400" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
    ],
  },
  {
    title: "Core CS Subjects",
    skills: [
      { name: "DSA", icon: FaNetworkWired, color: "text-purple-400" },
      { name: "DBMS", icon: FaDatabase, color: "text-cyan-400" },
      { name: "OS", icon: FaServer, color: "text-green-400" },
      {
        name: "Computer Networks",
        icon: FaNetworkWired,
        color: "text-blue-400",
      },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Neural Network Abstract Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 10% 20%, rgba(138,43,226,0.1) 0%, transparent 40%)`,
          backgroundSize: "100% 100%",
        }}
      >
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="net"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 60 M 0 0 L 60 60"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
            <circle cx="30" cy="30" r="1.5" fill="rgba(0,255,255,0.3)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#net)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Technical Arsenal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical capabilities, specializing
            in building modern web applications and AI-integrated systems.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:blur-3xl transition-all" />

              <h3 className="text-xl font-semibold mb-6 text-white border-b border-white/10 pb-2 inline-block">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 px-3 py-2 rounded-lg border border-white/5 hover:border-cyan-500/50 transition-colors cursor-default"
                  >
                    <skill.icon className={`text-xl ${skill.color}`} />
                    <span className="text-sm text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orbiting Tech Spheres Animation */}
        <div className="mt-20 relative h-[300px] hidden md:flex items-center justify-center overflow-hidden">
          <div className="absolute w-[200px] h-[200px] border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-[300px] h-[300px] border border-cyan-500/20 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute w-[400px] h-[400px] border border-purple-500/20 border-dotted rounded-full animate-[spin_20s_linear_infinite]" />

          <div className="w-20 h-20 rounded-full glass flex items-center justify-center z-10 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              PC
            </span>
          </div>

          {/* Orbiting items */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200px] h-[200px]"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black rounded-full p-1">
              <SiReact className="text-cyan-400 text-xl" />
            </div>
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px]"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black rounded-full p-2">
              <SiPython className="text-blue-400 text-2xl" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black rounded-full p-2">
              <SiDjango className="text-green-500 text-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
