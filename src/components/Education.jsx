import { motion } from "framer-motion";

const educationData = [
  {
    institution: "GMR Institute of Technology",
    degree: "B.Tech in Computer Science and Engineering",
    score: "CGPA: 8.5525",
    year: "2022 – 2026",
    color: "from-cyan-400 to-blue-500",
  },
  {
    institution: "Tirumala Junior College",
    degree: "Intermediate Education",
    score: "71.3%",
    year: "Graduated",
    color: "from-purple-400 to-pink-500",
  },
  {
    institution: "VVK Sisumandir High School",
    degree: "Secondary Education",
    score: "69.16%",
    year: "Graduated",
    color: "from-green-400 to-emerald-500",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 mb-16 justify-end">
          <div className="h-[1px] flex-1 bg-gradient-to-l from-purple-500/50 to-transparent" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Education
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="glass-card p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all duration-300 relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl pointer-events-none`}
              />

              <div className="mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-4 bg-gray-800 border border-gray-700 bg-clip-text text-transparent bg-gradient-to-r ${edu.color}`}
                >
                  {edu.year}
                </span>
                <h3 className="text-2xl font-bold mb-2">{edu.institution}</h3>
                <h4 className="text-gray-400 font-medium">{edu.degree}</h4>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm text-gray-500 uppercase tracking-widest">
                  Score
                </span>
                <span className="font-mono text-lg text-white font-bold">
                  {edu.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
