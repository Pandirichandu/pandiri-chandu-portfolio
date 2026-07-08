import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";
import ProjectModal from "./ProjectModal";
import {
  sectionVariants,
  staggerContainer,
  childVariants,
} from "../utils/motionVariants";
import intelliViewImg from "../assets/projects/intelliview.png";
import aiWarfareImg from "../assets/projects/aiwarfare.png";
import chessImg from "../assets/projects/chess.png";

const otherProjects = [
  {
    title: "PC CHESS — Grandmaster Engine Suite",
    description:
      "A high-performance chess platform featuring Stockfish 15 engine integration, real-time board evaluation, multiple game modes, and a full analysis sandbox.",
    fullDescription:
      "PC CHESS is an advanced, offline-first interactive chess application designed for gameplay, training, and deep board analysis. It features custom chess rules validation, a multi-skin interactive chessboard, and an analytics dashboard.",
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: chessImg,
    github: "https://github.com/Pandirichandu/Chess-Game",
    live: "https://chess-game-two-sigma.vercel.app/",
    architecture:
      "The application leverages a decoupled state management system interacting with a custom validation engine and notation parser. An asynchronous Web Worker handles CPU-heavy Stockfish engine calculations off the main thread to ensure high-performance UI rendering.",
    challenges: [
      "Executing CPU-heavy Stockfish evaluations in background Web Worker threads to preserve 60 FPS UI rendering.",
      "Developing a bug-free, pure TypeScript move validation engine handling en passant, castling rights, and complex draws.",
      "Designing a responsive, gesture-friendly chess grid supporting responsive layouts and tactile sound feedback.",
    ],
    features: [
      "Real-time Stockfish AI opponent matches",
      "Live centipawn evaluation & blunder categorization",
      "Analysis sandbox with FEN/PGN import/export",
      "PWA support for fully offline-first capabilities",
    ],
    scalability:
      "The stateless game controller and notation system support instant multiplayer syncing. Heavy assets and audio files are cached locally via a registered service worker for rapid loading.",
  },
  {
    title: "Intelli View (AI Mock Interview)",
    description:
      "An AI-based interview preparation platform using speech-to-text and NLP for communication analysis and personalized feedback.",
    fullDescription:
      "A comprehensive AI system that helps candidates prepare for interviews. It records audio, transcribes it using speech-to-text APIs, and analyzes the responses using NLP models to score communication skills, confidence, and relevance.",
    tech: ["React.js", "Python", "NLP APIs", "Speech Processing"],
    image: intelliViewImg,
    github: "https://github.com/Pandirichandu/Ai-powered-Mock-interview",
    live: "#",
    architecture:
      "Frontend built with React.js captures audio and streams it to a Python FastAPI backend. The backend processes the audio using Whisper API for transcription, and Hugging Face Transformers for sentiment and semantic analysis.",
    challenges: [
      "Minimizing audio processing latency to provide near real-time feedback.",
      "Ensuring accurate transcription for various accents and background noise levels.",
    ],
    features: [
      "Speech-to-text transcription",
      "Sentiment and confidence analysis",
      "Customized improvement suggestions",
    ],
    scalability:
      "Stateless backend APIs allow for easy scaling of the NLP processing nodes using Kubernetes.",
  },
  {
    title: "AI Warfare Dashboard",
    description:
      "AI-powered defense analytics system for automated threat detection and strategic decision-making using deep learning.",
    fullDescription:
      "An advanced analytics tool designed to process battlefield data, detect threats from satellite imagery and sensor inputs, and recommend strategic actions.",
    tech: ["Python", "Deep Learning", "AI Models", "Data Analytics"],
    image: aiWarfareImg,
    github: "https://github.com/Pandirichandu/AI-Warfare-Military-Application",
    live: null,
    architecture:
      "A data pipeline ingests multi-modal sensor data. Deep learning models (CNNs and RNNs) implemented in PyTorch analyze the data and feed insights into a command dashboard.",
    challenges: [
      "Handling massive amounts of high-resolution imagery in real-time.",
      "Achieving high precision in object detection to avoid false positives.",
    ],
    features: [
      "Automated threat detection",
      "Predictive resource allocation",
      "Interactive command dashboard",
    ],
    scalability:
      "Utilizes distributed GPU computing for training and inference to handle large-scale data streams.",
  },
  {
    title: "Smart Attendance System",
    description:
      "Automated attendance tracking using facial recognition and geolocation to ensure accurate and proxy-free logging.",
    fullDescription:
      "A dual-verification system that logs student attendance by matching their face via a webcam feed and validating their GPS location within the campus premises.",
    tech: ["Python", "OpenCV", "Django", "React"],
    github: "#",
    live: "#",
    architecture:
      "React Native frontend for mobile access, Django backend for data management. OpenCV and dlib are used for facial feature extraction and matching.",
    challenges: [
      "Ensuring facial recognition works accurately under varying lighting conditions.",
      "Preventing GPS spoofing on mobile devices.",
    ],
    features: [
      "Facial recognition attendance",
      "Geofencing validation",
      "Automated reports generation",
    ],
    scalability:
      "Database indexing and asynchronous task queues (Celery) are used to handle simultaneous attendance logging during peak hours.",
  },
  {
    title: "Automated College Placement Portal",
    description:
      "A centralized platform connecting students and recruiters with automated resume parsing and interview scheduling.",
    fullDescription:
      "A full-stack application that streamlines the college placement process. Students can upload resumes which are automatically parsed for skills and matching job profiles.",
    tech: ["MERN Stack", "Tailwind CSS", "AWS"],
    github: "#",
    live: "#",
    architecture:
      "Built on the MERN stack (MongoDB, Express, React, Node.js). Resume parsing is handled by an NLP microservice, and files are stored securely in AWS S3.",
    challenges: [
      "Building a robust resume parser capable of reading various PDF and Word formats.",
      "Creating an efficient interview scheduling algorithm to prevent overlapping time slots.",
    ],
    features: [
      "Automated resume parsing",
      "Smart job matching",
      "Integrated interview scheduler",
    ],
    scalability:
      "Microservices architecture allows the resume parsing engine to scale independently from the main web application.",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.section
      id="projects"
      className="py-24 relative"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            variants={childVariants}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            More Projects
          </motion.h2>
          <motion.div
            variants={childVariants}
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto"
          />
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={staggerContainer}
        >
          {otherProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={childVariants}
              onClick={() => setSelectedProject(project)}
              className="glass-card rounded-2xl border border-white/5 hover:-translate-y-2 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col h-full relative overflow-hidden cursor-pointer"
            >
              {project.image ? (
                <div className="w-full h-48 relative overflow-hidden border-b border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              ) : (
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 pointer-events-none z-0">
                  <FiFolder size={120} />
                </div>
              )}

              <div className="p-8 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-cyan-900/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-900/50 transition-colors">
                    <FiFolder size={24} />
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiGithub size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors relative z-10">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-8 flex-grow relative z-10">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={childVariants} className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors border-b border-cyan-400/30 hover:border-cyan-400 pb-1"
          >
            View full archive on GitHub <FiExternalLink />
          </a>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
};

export default Projects;
