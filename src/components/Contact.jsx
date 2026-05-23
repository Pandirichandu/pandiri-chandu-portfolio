import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiSend,
  FiCopy,
  FiCheck,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {
  sectionVariants,
  childVariants,
  staggerContainer,
} from "../utils/motionVariants";

const COOLDOWN_SECONDS = 60;

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const formRef = useRef();
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  // Validation State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(() => {
    const lastSent = localStorage.getItem("lastEmailSent");
    if (lastSent) {
      const timePassed = Math.floor((Date.now() - parseInt(lastSent)) / 1000);
      if (timePassed < COOLDOWN_SECONDS) {
        return COOLDOWN_SECONDS - timePassed;
      }
    }
    return 0;
  });

  // Validate form
  const validateForm = (data) => {
    let newErrors = {};
    if (!data.name.trim()) newErrors.name = "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email format.";
    }
    
    if (!data.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    } else if (data.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Auto-validate on change if already touched
    if (touched[name]) {
      validateForm({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm(formData);
  };

  // Cooldown timer logic

  useEffect(() => {
    let timer;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("chandupandiri265@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    // Check for Environment Variables Gracefully
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service not configured. Please contact directly via email.");
      if (import.meta.env.DEV) {
         console.error("EmailJS Error: Missing environment variables. Please check your .env file.");
      }
      return;
    }

    if (cooldownTime > 0) {
      toast.error(`Please wait ${cooldownTime} seconds before sending again.`);
      return;
    }

    // Mark all as touched
    setTouched({ name: true, email: true, message: true });
    
    if (!validateForm(formData)) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Sending message...");

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        { publicKey }
      );
      
      toast.success("Message sent successfully!", { id: toastId });
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
      formRef.current.reset();
      
      // Start cooldown
      localStorage.setItem("lastEmailSent", Date.now().toString());
      setCooldownTime(COOLDOWN_SECONDS);
      
    } catch (error) {
      // Show exact error message for debugging
      let errorMessage = "Failed to send message.";
      if (error?.text) {
         errorMessage = `EmailJS Error: ${error.text}`;
      } else if (error?.message) {
         errorMessage = `Error: ${error.message}`;
      }
      
      toast.error(errorMessage, { id: toastId, duration: 6000 });
      
      if (import.meta.env.DEV) {
        console.error("EmailJS Submission Failed:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-24 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-900/20 to-transparent blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div variants={childVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Connect
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Currently open to new opportunities. Whether you have a question or
            just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={childVariants}
            className="glass-card p-8 rounded-3xl border border-white/10 relative"
          >
            <form ref={formRef} onSubmit={sendEmail} className="space-y-8" noValidate>
              <div className="space-y-2 relative">
                <label htmlFor="name" className="text-sm text-gray-400 font-medium ml-1 block">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  autoComplete="name"
                  aria-invalid={!!errors.name && touched.name}
                  aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                  className={`w-full bg-gray-900/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                    errors.name && touched.name
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                      : "border-white/10 focus:border-cyan-400 focus:ring-cyan-400"
                  }`}
                />
                {errors.name && touched.name && (
                  <p id="name-error" className="text-red-400 text-xs mt-1 flex items-center gap-1 absolute -bottom-6">
                    <FiAlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2 relative">
                <label htmlFor="email" className="text-sm text-gray-400 font-medium ml-1 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputMode="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  aria-invalid={!!errors.email && touched.email}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                  className={`w-full bg-gray-900/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all disabled:opacity-50 ${
                    errors.email && touched.email
                      ? "border-red-500/50 focus:border-purple-500 focus:ring-purple-500"
                      : "border-white/10 focus:border-purple-400 focus:ring-purple-400"
                  }`}
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="text-red-400 text-xs mt-1 flex items-center gap-1 absolute -bottom-6">
                    <FiAlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2 relative">
                <label htmlFor="message" className="text-sm text-gray-400 font-medium ml-1 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Hello Pandiri..."
                  aria-invalid={!!errors.message && touched.message}
                  aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                  disabled={isSubmitting}
                  className={`w-full bg-gray-900/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all resize-none disabled:opacity-50 ${
                    errors.message && touched.message
                      ? "border-red-500/50 focus:border-cyan-400 focus:ring-cyan-400"
                      : "border-white/10 focus:border-cyan-400 focus:ring-cyan-400"
                  }`}
                ></textarea>
                {errors.message && touched.message && (
                  <p id="message-error" className="text-red-400 text-xs mt-1 flex items-center gap-1 absolute -bottom-6">
                    <FiAlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting || cooldownTime > 0}
                aria-label={isSubmitting ? "Sending message" : "Send message"}
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold tracking-wide hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : cooldownTime > 0 ? (
                  <>
                    <span className="text-sm">Please wait {cooldownTime}s</span>
                  </>
                ) : (
                  <>
                    Send Message{" "}
                    <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={staggerContainer}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6 mt-8 lg:mt-0">
              <motion.div
                variants={childVariants}
                className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-colors"
              >
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Email Address
                  </div>
                  <div className="text-lg font-medium">
                    chandupandiri265@gmail.com
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-300"
                  title="Copy Email"
                  aria-label="Copy Email Address"
                >
                  {copied ? (
                    <span className="text-green-400 text-sm font-medium flex flex-col items-center gap-1">
                      <FiCheck size={16} />
                      Copied!
                    </span>
                  ) : (
                    <FiCopy size={20} />
                  )}
                </button>
              </motion.div>

              <motion.div
                variants={childVariants}
                className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-purple-500/30 transition-colors"
              >
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="text-lg font-medium">India</div>
                </div>
              </motion.div>
            </div>

            <motion.div variants={childVariants} className="mt-12">
              <h3 className="text-xl font-semibold mb-6">Social Profiles</h3>
              <div className="flex gap-4">
                {[
                  {
                    name: "GitHub",
                    icon: FiGithub,
                    href: "https://github.com/Pandirichandu",
                    color: "hover:text-white hover:border-white",
                  },
                  {
                    name: "LinkedIn",
                    icon: FiLinkedin,
                    href: "https://linkedin.com/in/pandirichandu",
                    color: "hover:text-blue-400 hover:border-blue-400",
                  },
                  {
                    name: "LeetCode",
                    icon: SiLeetcode,
                    href: "https://leetcode.com/u/Pandiri_Chandu/",
                    color: "hover:text-orange-500 hover:border-orange-500",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit my ${social.name} profile`}
                    className={`p-4 glass-card rounded-2xl border border-white/10 text-gray-400 transition-all duration-300 ${social.color} hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                  >
                    <social.icon size={24} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
