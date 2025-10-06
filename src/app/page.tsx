"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Cloud, 
  Award,
  ChevronRight,
  Menu,
  X,
  Calendar,
  MapPin,
  Briefcase,
  BookOpen,
  Star,
  CheckCircle,
  Sun,
  Moon,
  Download,
  ArrowDown
} from "lucide-react";

// Typing Animation Component
const TypingAnimation = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isClient]);

  if (!isClient) {
    return <span>{text}</span>;
  }

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-cyan-400"
      >
        |
      </motion.span>
    </span>
  );
};

// Scroll Progress Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

// ExperiencePopup Component
interface ExperiencePopupProps {
  isOpen: boolean;
  onClose: () => void;
  experience: {
    title: string;
    company: string;
    type: string;
    duration: string;
    location?: string;
    achievements: string[];
    technologies: string[];
    blogLink?: string;
    description: string;
  };
}

// ProjectPopup Component
interface ProjectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    technologies: string[];
    github: string;
    demo: string;
    features?: string[];
    challenges?: string[];
    role?: string;
  };
}

const ExperiencePopup = ({ isOpen, onClose, experience }: ExperiencePopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{experience.title}</h2>
                <div className="flex items-center gap-4 text-cyan-400">
                  <div className="flex items-center gap-2">
                    <Briefcase size={20} />
                    <span className="text-lg font-semibold">{experience.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span>{experience.duration}</span>
                  </div>
                </div>
                {experience.location && (
                  <div className="flex items-center gap-2 text-gray-300 mt-2">
                    <MapPin size={16} />
                    <span>{experience.location}</span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-300 text-lg leading-relaxed">{experience.description}</p>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="text-yellow-400" size={20} />
                Key Achievements
              </h3>
              <div className="space-y-3">
                {experience.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Code className="text-cyan-400" size={20} />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Blog Link */}
            {experience.blogLink && (
              <div className="pt-4 border-t border-gray-700">
                <a
                  href={experience.blogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  <BookOpen size={20} />
                  Read my detailed experience blog
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectPopup = ({ isOpen, onClose, project }: ProjectPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                {project.role && (
                  <div className="flex items-center gap-2 text-purple-400">
                    <Briefcase size={20} />
                    <span className="text-lg font-semibold">{project.role}</span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Features */}
            {project.features && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="text-yellow-400" size={20} />
                  Key Features
                </h3>
                <div className="space-y-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges */}
            {project.challenges && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="text-orange-400" size={20} />
                  Challenges & Solutions
                </h3>
                <div className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Code className="text-purple-400" size={20} />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="pt-4 border-t border-gray-700 flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                <Github size={20} />
                View Source Code
                <ExternalLink size={16} />
              </a>
              {project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                >
                  <ExternalLink size={20} />
                  Live Demo
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "experience", "projects", "skills", "certifications", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-black/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white"
          >
            Srishti Jaiswal
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`transition-all duration-200 font-medium text-lg px-3 py-1 rounded-md relative ${
                  activeSection === item.href.slice(1)
                    ? "text-cyan-400 bg-white/10"
                    : "text-white hover:text-cyan-400 hover:bg-white/10"
                }`}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-cyan-400/20 rounded-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-white hover:text-cyan-400 transition-colors duration-200 p-2 rounded-md hover:bg-white/10"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors duration-200 font-medium text-lg px-3 py-1 rounded-md hover:bg-white/10"
            >
              <Download size={16} />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-cyan-400 transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-700 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                  <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 font-medium ${
                      activeSection === item.href.slice(1)
                        ? "text-cyan-400 bg-gray-800"
                        : "text-white hover:text-cyan-400 hover:bg-gray-800"
                    }`}
                >
                  {item.name}
                  </motion.button>
                ))}
                
                {/* Mobile Dark Mode Toggle */}
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-white hover:text-cyan-400 hover:bg-gray-800 rounded-md transition-colors font-medium"
                >
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </motion.button>
                
                <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-white hover:text-cyan-400 hover:bg-gray-800 rounded-md transition-colors font-medium"
              >
                  <Download size={16} />
                Resume
                </motion.a>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Aesthetic Technical Background Component
const AestheticBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clean gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800"></div>
      
      {/* Subtle animated grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      
      {/* Minimal geometric elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-400/20 rounded-full"
        animate={{ 
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-slate-300/20 rounded-full"
        animate={{ 
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-slate-200/20 rounded-full"
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 4 }}
      />
      
      {/* Subtle line elements */}
      <motion.div 
        className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600/10 to-transparent"
        animate={{ 
          opacity: [0, 0.3, 0],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-500/10 to-transparent"
        animate={{ 
          opacity: [0, 0.2, 0],
          scaleX: [0.6, 1, 0.6]
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 6 }}
      />
      
      {/* Minimal corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-slate-700/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-600/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-slate-600/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-slate-700/5 to-transparent"></div>
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
           {/* Enhanced Profile Photo */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="flex justify-center mb-6 sm:mb-8"
           >
             <div className="relative group">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-cyan-400/20">
        <Image
                   src="/images/profile-photo.jpg"
                   alt="Srishti Jaiswal"
                   width={288}
                   height={288}
                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
               </div>
               {/* Enhanced glowing ring effect */}
               <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20 animate-pulse"></div>
               <div className="absolute inset-0 rounded-full border-2 border-cyan-400/10 animate-ping"></div>
             </div>
           </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg px-4">
            <TypingAnimation text="Srishti Jaiswal" speed={150} />
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-5xl mx-auto drop-shadow-md px-4"
          >
            <TypingAnimation text="Software Engineer | Full-Stack Developer | Building Intelligent Systems with AI" speed={50} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto italic drop-shadow-md px-4"
          >
            &ldquo;I design and build scalable, intelligent systems by combining modern web development with AI/ML capabilities.&rdquo;
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.button
              onClick={() => scrollToSection("#projects")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              View Projects
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Contact Me
            </motion.button>
          </motion.div>
          
          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-white/60 hover:text-white/80 transition-colors cursor-pointer"
              onClick={() => scrollToSection("#about")}
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <ArrowDown size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 text-white relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">About Me</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            I&apos;m a recent B.Tech Computer Science graduate from SRM IST, Chennai (2021–2025) with experience in full-stack development, AI Integration, and scalable system design. Passionate about building impactful, team-driven solutions.
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://linkedin.com/in/srishti-jaiswal24/"
            target="_blank"
            rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Linkedin size={32} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="https://github.com/srishti24jais"
            target="_blank"
            rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition-colors"
            >
              <Github size={32} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              href="mailto:srishtijaiswal3016@gmail.com"
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Mail size={32} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Cognibiz",
      type: "Startup",
      duration: "June 2025 – Present",
      location: "Remote",
      description: "Building innovative AI-powered solutions for store management platforms, focusing on scalable architecture and user experience optimization.",
      achievements: [
        "Built modules for Munshiji.AI, an AI-powered store management platform, using React, TypeScript, Supabase, PostgreSQL, Redux Toolkit, and Cursor AI; improved performance by reducing page load time 50%",
        "Spearheaded key features like store type management, Role-Based Access Control (RBAC), and vernacular language support via multilingual LLM APIs",
        "Developed and optimized Store Settings, improved UI/UX across all pages with responsive layouts",
        "Enhanced API efficiency by caching responses in Redux to reduce redundant LLM calls",
        "Collaborated with the founding team to redesign platform architecture and spearhead integration of Munshiji, an LLM-powered assistant"
      ],
      technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Redux Toolkit", "Cursor AI", "LLM APIs", "RBAC", "UI/UX Design"],
      blogLink: "https://medium.com/@srishtijaiswal49/learning-by-building-50ad0c5d3fee"
    },
    {
      title: "Data Analytics Intern",
      company: "AICTE OIB-SIP",
      type: "Government Initiative",
      duration: "Sept 2024 – Oct 2024",
      location: "Remote",
      description: "Developed machine learning models and data analysis solutions to solve real-world problems, focusing on fraud detection and predictive analytics.",
      achievements: [
        "Designed and implemented a fraud detection system using Random Forest and data preprocessing techniques; reduced false positives by 25%",
        "Developed wine quality prediction models using SVM and Decision Trees, achieving 80% accuracy",
        "Analyzed Google Play Store datasets to extract app market trends and user behavior patterns; delivered insights via interactive dashboards, improving stakeholder engagement by 40%",
        "Translated complex datasets into actionable insights across projects, supporting data-driven decision-making"
      ],
      technologies: ["Python", "Machine Learning", "Random Forest", "SVM", "Decision Trees", "Pandas", "Scikit-learn", "Data Visualization", "Statistical Analysis"],
      blogLink: "https://medium.com/@srishtijaiswal49/my-data-analytics-internship-experience-at-oasis-infobyte-ef2d31bdabb2"
    }
  ];

  const openPopup = (index: number) => {
    setSelectedExperience(index);
  };

  const closePopup = () => {
    setSelectedExperience(null);
  };

  return (
    <section id="experience" className="py-20 text-white relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
          <p className="text-lg text-gray-300">My professional journey in software development</p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800/40 backdrop-blur-md rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-slate-700/30 cursor-pointer hover:border-slate-500/50 hover:scale-[1.02] hover:bg-slate-800/50"
              onClick={() => openPopup(index)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                  <p className="text-xl text-cyan-400 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 font-medium">{exp.duration}</span>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/30"
                  >
                    {tech}
                  </span>
                ))}
                {exp.technologies.length > 4 && (
                  <span className="bg-gray-600/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                    +{exp.technologies.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
                  <BookOpen size={16} />
                  <span>Read detailed blog</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span>Click to view details</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Popup */}
        {selectedExperience !== null && (
          <ExperiencePopup
            isOpen={true}
            onClose={closePopup}
            experience={experiences[selectedExperience]}
          />
        )}
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "UrbanFlow",
      description: "A web application that visualizes and analyzes urban dynamics including traffic patterns, crowd movement, and spatial data flows. Built with modern web technologies and interactive mapping capabilities.",
      technologies: ["TypeScript", "React", "Node.js", "CSS", "JavaScript", "Maps", "Data Visualization", "APIs"],
      github: "https://github.com/srishti24jais/urbanflow",
      demo: "https://urbanflow-pied.vercel.app",
      role: "Full-Stack Developer",
      features: [
        "Interactive mapping and spatial data visualization",
        "Real-time urban dynamics analysis",
        "Responsive web interface with modern UI/UX",
        "Data processing and visualization capabilities"
      ],
      challenges: [
        "Optimized map rendering for large datasets",
        "Implemented efficient data processing pipelines",
        "Created responsive design for multiple device types"
      ]
    },
    {
      title: "ISpent Expense Tracker",
      description: "Full-stack expense tracking application with Next.js, React, Redux, and SQLite. Features comprehensive budget management, category-based expense tracking, and real-time financial insights.",
      technologies: ["Next.js", "React", "Redux Toolkit", "SQLite", "JavaScript", "Tailwind CSS", "API Routes"],
      github: "https://github.com/srishti24jais/ispent-expense-tracker",
      demo: "https://ispent-rnjq92ufb-srishti-jaiswals-projects.vercel.app",
      role: "Full-Stack Developer",
      features: [
        "Real-time expense tracking and budget management",
        "Category-based expense organization",
        "Interactive charts and financial insights",
        "Responsive design with modern UI components",
        "State management with Redux Toolkit",
        "SQLite database integration"
      ],
      challenges: [
        "Implemented optimistic updates for better UX",
        "Optimized bundle size and performance metrics",
        "Created comprehensive error handling and validation"
      ]
    },
    {
      title: "Events Portal",
      description: "Full-stack event management system with REST APIs, authentication, and responsive frontend. Built with Java Spring Boot backend and modern React frontend.",
      technologies: ["Java", "Spring Boot", "React", "TypeScript", "CSS", "REST APIs", "Authentication", "Docker"],
      github: "https://github.com/srishti24jais/my-events-portal",
      demo: "#",
      role: "Full-Stack Developer",
      features: [
        "Complete event management system",
        "User authentication and authorization",
        "RESTful API design and implementation",
        "Responsive frontend with modern UI",
        "Docker containerization for deployment"
      ],
      challenges: [
        "Designed scalable REST API architecture",
        "Implemented secure authentication system",
        "Created responsive design for all devices"
      ]
    },
    {
      title: "Pelvic Uretero Junction Obstruction Detection",
      description: "Deep learning pipeline for medical image classification using transfer learning from pre-trained CNN models (VGG16, InceptionV3, DenseNet121) to discriminate between PUJ obstruction and normal conditions.",
      technologies: ["Python", "Deep Learning", "CNN", "VGG16", "InceptionV3", "DenseNet121", "Transfer Learning", "Medical Imaging", "t-SNE", "TensorFlow"],
      github: "https://github.com/srishti24jais/Pelvic-Uretero-Junction-Obstruction",
      demo: "#",
      role: "AI/ML Engineer",
      features: [
        "Advanced medical image classification system",
        "Transfer learning implementation with multiple CNN models",
        "t-SNE visualization for feature embeddings",
        "Activation maps for model interpretability",
        "Comprehensive evaluation with F1-score metrics"
      ],
      challenges: [
        "Optimized model performance for medical imaging",
        "Implemented advanced visualization techniques",
        "Achieved high accuracy in medical diagnosis"
      ]
    },
    {
      title: "Face Recognition Attendance System",
      description: "An intelligent attendance management system using computer vision and face recognition technology. Features interactive GUI, password protection, and automated CSV-based attendance tracking with real-time updates.",
      technologies: ["Python", "OpenCV", "tkinter", "Computer Vision", "Face Recognition", "CSV", "Pandas", "NumPy", "LBPH Face Recognizer"],
      github: "https://github.com/srishti24jais/Image-Detection-Model",
      demo: "#",
      role: "Computer Vision Engineer",
      features: [
        "Real-time face recognition and detection",
        "Interactive GUI with tkinter",
        "Automated CSV-based attendance tracking",
        "Password protection for system security",
        "Live attendance updates with timestamps"
      ],
      challenges: [
        "Optimized face recognition accuracy",
        "Created user-friendly desktop interface",
        "Implemented secure data management system"
      ]
    }
  ];

  const openPopup = (index: number) => {
    setSelectedProject(index);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 text-white relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
          <p className="text-lg text-gray-300">Some of my recent work and side projects</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-slate-800/40 backdrop-blur-md rounded-xl shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 border border-slate-700/30 cursor-pointer hover:border-slate-500/50 hover:bg-slate-800/50"
              onClick={() => openPopup(index)}
            >
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="bg-gray-600/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} className="mr-2" />
                    Code
                  </a>
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={20} className="mr-2" />
                      Demo
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span>Click for details</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Popup */}
        {selectedProject !== null && (
          <ProjectPopup
            isOpen={true}
            onClose={closePopup}
            project={projects[selectedProject]}
          />
        )}
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="w-8 h-8 text-blue-600" />,
      skills: ["Java", "C", "C++", "Python", "JavaScript", "TypeScript", "SQL"]
    },
    {
      title: "Frameworks & Tools",
      icon: <Database className="w-8 h-8 text-green-600" />,
      skills: ["React", "Redux Toolkit", "Next.js", "Spring Boot", "Firebase", "Docker", "Git", "PostgreSQL", "MySQL"]
    },
    {
      title: "AI/ML & Cloud",
      icon: <Cloud className="w-8 h-8 text-purple-600" />,
      skills: ["Python ML libraries", "scikit-learn", "PyTorch", "TensorFlow", "LLM APIs", "LangChain", "RAG", "Azure", "AWS"]
    },
    {
      title: "Practices",
      icon: <Award className="w-8 h-8 text-orange-600" />,
      skills: ["Agile", "TDD", "CI/CD"]
    }
  ];

  return (
    <section id="skills" className="py-20 text-white relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills</h2>
          <p className="text-lg text-gray-300">Technologies and tools I work with</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800/40 backdrop-blur-md rounded-xl shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-shadow duration-300 border border-slate-700/30 hover:border-slate-500/30"
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-bold text-white ml-3">{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="text-gray-300 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Certifications Section
const CertificationsSection = () => {
  const certifications = [
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      year: "2025",
      issuer: "Microsoft"
    },
    {
      title: "Oracle Certified Java SE 11 Developer",
      year: "2025",
      issuer: "Oracle"
    },
    {
      title: "AWS Academy Machine Learning Foundations",
      year: "2023",
      issuer: "Amazon Web Services"
    }
  ];

  return (
    <section id="certifications" className="py-20 text-white relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-lg text-gray-300">Professional certifications and achievements</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-800/40 backdrop-blur-md rounded-xl shadow-xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 border border-slate-700/30 hover:border-slate-500/30"
            >
              <div className="text-center">
                <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-cyan-400 font-semibold mb-1">{cert.issuer}</p>
                <p className="text-gray-400">{cert.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 text-white relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300">Let&apos;s work together on something amazing</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <a
                    href="mailto:srishtijaiswal3016@gmail.com"
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    srishtijaiswal3016@gmail.com
          </a>
        </div>
                <div className="flex items-center space-x-4">
                  <Linkedin className="w-6 h-6 text-cyan-400" />
        <a
                    href="https://linkedin.com/in/srishti-jaiswal24/"
          target="_blank"
          rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    linkedin.com/in/srishti-jaiswal24/
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Github className="w-6 h-6 text-gray-400" />
                  <a
                    href="https://github.com/srishti24jais"
          target="_blank"
          rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    github.com/srishti24jais
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/40 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors text-white placeholder-slate-400 text-sm sm:text-base backdrop-blur-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/40 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors text-white placeholder-slate-400 text-sm sm:text-base backdrop-blur-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/40 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-colors resize-none text-white placeholder-slate-400 text-sm sm:text-base backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-slate-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-slate-600 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base backdrop-blur-sm"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <AestheticBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Srishti Jaiswal</h3>
          <p className="text-gray-400 mb-6">Software Engineer & AI Developer</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://linkedin.com/in/srishti-jaiswal24/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
        </a>
        <a
              href="https://github.com/srishti24jais"
          target="_blank"
          rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="mailto:srishtijaiswal3016@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Srishti Jaiswal. All rights reserved.
          </p>
        </div>
      </div>
      </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
