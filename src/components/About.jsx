import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  sectionVariants,
  childVariants,
  staggerContainer,
} from "../utils/motionVariants";

const Counter = ({ from, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 },
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return (
    <span ref={nodeRef}>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-24 relative"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={childVariants}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            About Me
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={childVariants}
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
          >
            <p>
              I am a Computer Science Engineering student passionate about
              building scalable{" "}
              <span className="text-cyan-400 font-medium">
                AI-powered applications
              </span>{" "}
              and modern full-stack systems.
            </p>
            <p>
              I specialize in{" "}
              <span className="text-white font-medium">
                React.js, Django, REST APIs, AI integration,
              </span>{" "}
              and backend engineering. I enjoy creating impactful real-world
              products with clean architecture and modern user experiences.
            </p>
            <p>
              Driven by curiosity and a problem-solving mindset, I constantly
              explore new technologies to bridge the gap between complex
              algorithms and intuitive user interfaces.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {[
              {
                label: "Projects",
                value: 10,
                suffix: "+",
                color: "from-cyan-400 to-blue-500",
              },
              {
                label: "Users Served",
                value: 100,
                suffix: "+",
                color: "from-purple-400 to-pink-500",
              },
              {
                label: "Technologies",
                value: 5,
                suffix: "+",
                color: "from-green-400 to-emerald-500",
              },
              {
                label: "AI Systems Built",
                value: 3,
                suffix: "+",
                color: "from-yellow-400 to-orange-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                className="glass-card p-6 flex flex-col justify-center items-center text-center border border-white/5 hover:border-white/20 transition-colors group relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div
                  className={`text-4xl md:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-br ${stat.color}`}
                >
                  <Counter from={0} to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400 font-mono tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
