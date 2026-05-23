import { motion } from "framer-motion";

const Quote = () => {
  return (
    <section className="py-32 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-6xl text-cyan-500/50 font-serif leading-none absolute -top-8 -left-4">
            "
          </span>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-wide max-w-4xl mx-auto italic text-gray-300">
            Passionate about building scalable systems that combine{" "}
            <span className="text-white font-semibold">AI innovation</span> with{" "}
            <span className="text-cyan-400 font-semibold">
              real-world impact.
            </span>
          </h2>
          <span className="text-6xl text-purple-500/50 font-serif leading-none absolute -bottom-16 -right-4">
            "
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
