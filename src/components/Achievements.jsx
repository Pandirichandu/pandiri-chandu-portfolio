import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiCheckCircle, FiUsers } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

const AnimatedCounter = ({ from, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = nodeRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setInView(true);
      },
      { threshold: 0.5 },
    );
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp = null;
    let frameId;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };
    frameId = window.requestAnimationFrame(step);
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [inView, from, to, duration]);

  return (
    <span ref={nodeRef}>
      {count}
      {suffix}
    </span>
  );
};

const generateParticles = () => {
  return [...Array(10)].map(() => ({
    yTarget: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    left: `${Math.random() * 100}%`
  }));
};

const Achievements = () => {
  const achievements = [
    {
      icon: FiAward,
      title: "AP EAMCET Rank",
      counter: { from: 10000, to: 8476, suffix: "" },
      desc: "Secured top rank out of 300,000+ candidates in the state engineering entrance exam.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
    },
    {
      icon: FiBookOpen,
      title: "Research Publication",
      counter: { from: 0, to: 1, suffix: "" },
      desc: "Published research paper on Artificial Intelligence in Warfare Military Applications.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      border: "border-purple-400/20",
    },
    {
      icon: FiCheckCircle,
      title: "ServiceNow CSA",
      counter: { from: 0, to: 1, suffix: "" },
      desc: "Certified System Administrator, demonstrating proficiency in cloud platform management.",
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/20",
    },
    {
      icon: FiUsers,
      title: "Scalable Systems Built",
      counter: { from: 0, to: 100, suffix: "+" },
      desc: "Developed architectures and applications successfully serving hundreds of concurrent users.",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/20",
    },
  ];

  const [particles] = useState(generateParticles);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 z-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              y: [p.yTarget, -10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
            style={{ left: p.left }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Milestones & Achievements
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-card p-8 rounded-2xl border ${item.border} hover:border-white/30 transition-all duration-300 group overflow-hidden relative`}
            >
              <div
                className={`absolute -right-10 -top-10 w-40 h-40 ${item.bg} rounded-full blur-[40px] group-hover:blur-[60px] transition-all`}
              />

              <div className="flex items-start gap-6 relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}
                >
                  <item.icon size={28} />
                </div>

                <div>
                  <div className={`text-4xl font-black mb-1 ${item.color}`}>
                    <AnimatedCounter
                      from={item.counter.from}
                      to={item.counter.to}
                      suffix={item.counter.suffix}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
