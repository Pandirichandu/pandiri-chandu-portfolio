import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowRight, FiGithub, FiMail } from "react-icons/fi";
import { SiReact, SiDjango, SiPython, SiTailwindcss } from "react-icons/si";

const roles = [
  "Full Stack Developer",
  "AI Enthusiast",
  "React & Django Developer",
  "Problem Solver",
];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [text, setText] = useState("");

  // Terminal typing effect logic
  useEffect(() => {
    const role = roles[currentRoleIndex];

    if (isTyping) {
      if (text.length < role.length) {
        const timeout = setTimeout(() => {
          setText(role.slice(0, text.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setIsTyping(true);
        }, 50);
        return () => clearTimeout(timeout);
      }
    }
  }, [text, isTyping, currentRoleIndex]);

  const floatingIcons = [
    { Icon: SiReact, color: "#61DAFB", delay: 0, x: -160, y: -130 },
    { Icon: SiDjango, color: "#092E20", delay: 0.2, x: 170, y: -110 },
    { Icon: SiPython, color: "#3776AB", delay: 0.4, x: -140, y: 150 },
    { Icon: SiTailwindcss, color: "#06B6D4", delay: 0.6, x: 150, y: 140 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="font-mono text-sm md:text-base text-gray-400 glass inline-block w-max px-4 py-2 rounded-lg border border-white/5">
            <span className="text-cyan-400">{">"}</span> Initializing
            Portfolio...
            <br />
            <span className="text-purple-400">{">"}</span> Status:{" "}
            <span className="text-green-400">Ready</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Pandiri Chandu
            </span>
          </h1>

          <div className="text-2xl md:text-3xl font-light text-gray-300 h-10 flex items-center gap-2">
            <span>I am a</span>
            <span className="font-semibold text-white">{text}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1 h-8 bg-cyan-400 inline-block"
            />
          </div>

          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Building scalable AI-powered web applications and modern full-stack
            systems with real-world impact.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="#projects"
              className="interactive relative px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden group transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects{" "}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="interactive px-8 py-3 glass-card text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 hover:border-cyan-400 transition-all flex items-center gap-2"
            >
              <FiDownload /> Download Resume
            </a>
            <div className="flex gap-4 ml-2">
              <a
                href="#contact"
                className="interactive p-3 glass-card rounded-full hover:text-cyan-400 transition-colors border border-white/10 hover:border-cyan-400"
              >
                <FiMail size={22} />
              </a>
              <a
                href="https://github.com/Pandirichandu"
                target="_blank"
                rel="noreferrer"
                className="interactive p-3 glass-card rounded-full hover:text-purple-400 transition-colors border border-white/10 hover:border-purple-400"
              >
                <FiGithub size={22} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center h-[400px] md:h-[500px]"
        >
          {/* Animated Glow Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-cyan-500/30 border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-purple-500/20 border-dotted"
          />

          {/* Profile Image Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-cyan-400 to-purple-600 shadow-[0_0_40px_rgba(0,255,255,0.3)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 flex justify-center items-center border-4 border-black">
              <img
                src="/Chandu.png"
                alt="Pandiri Chandu"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Floating Icons */}
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -15, 0],
                x: [0, item.x > 0 ? 10 : -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                delay: item.delay,
                ease: "easeInOut",
              }}
              className="absolute glass p-3 rounded-2xl border border-white/10 shadow-lg"
              style={{
                top: `calc(50% + ${item.y}px)`,
                left: `calc(50% + ${item.x}px)`,
              }}
            >
              <item.Icon size={32} color={item.color} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-gray-500 uppercase font-mono">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gray-800 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-cyan-400 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
