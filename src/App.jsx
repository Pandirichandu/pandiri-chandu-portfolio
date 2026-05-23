import { Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6">
      <div className="glass-card p-8 rounded-3xl border border-red-500/20 max-w-lg text-center">
        <h2 className="text-3xl font-bold text-red-400 mb-4">
          System Anomaly Detected
        </h2>
        <p className="text-gray-400 mb-6">
          A critical error occurred in the interface. Please try reloading the
          system.
        </p>
        <pre className="text-sm text-red-300/70 bg-red-900/10 p-4 rounded-xl text-left overflow-auto mb-6">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-all"
        >
          Reboot System
        </button>
      </div>
    </div>
  );
}

// Lazy load sections below the fold for better performance
const FeaturedProject = lazy(() => import("./components/FeaturedProject"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const CodingStats = lazy(() => import("./components/CodingStats"));
const Experience = lazy(() => import("./components/Experience"));
const Achievements = lazy(() => import("./components/Achievements"));
const Education = lazy(() => import("./components/Education"));
const Quote = lazy(() => import("./components/Quote"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="bg-[#050505] text-white min-h-screen selection:bg-cyan-500/30">
          <Helmet>
            <title>Pandiri Chandu | Full Stack Developer & AI Enthusiast</title>
            <meta
              name="description"
              content="Portfolio of Pandiri Chandu, building scalable AI-powered web applications and modern full-stack systems."
            />
            <meta
              property="og:title"
              content="Pandiri Chandu | Developer Portfolio"
            />
            <meta
              property="og:description"
              content="Building scalable AI-powered web applications and modern full-stack systems."
            />
            <meta property="og:type" content="website" />
            <meta name="theme-color" content="#050505" />
          </Helmet>

          <Preloader />
          <CustomCursor />
          <ScrollProgress />
          <ParticleBackground />

          <Navbar />

          <main>
            <Hero />

            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center text-cyan-500">
                  Loading...
                </div>
              }
            >
              <FeaturedProject />
              <About />
              <Skills />
              <Projects />
              <CodingStats />
              <Experience />
              <Achievements />
              <Education />
              <Quote />
              <Contact />
            </Suspense>
          </main>

          <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
            <p>
              © {new Date().getFullYear()} Pandiri Chandu. All rights reserved.
            </p>
            <p className="mt-2 text-xs">
              Designed with React, Tailwind & Framer Motion.
            </p>
          </footer>
        </div>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111827', // Tailwind gray-900
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#4ade80',
                secondary: '#111827',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#111827',
              },
            },
          }}
        />
        <Analytics />
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
