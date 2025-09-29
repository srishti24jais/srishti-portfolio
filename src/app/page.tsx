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
  Clock,
  BookOpen,
  Link as LinkIcon,
  Star,
  CheckCircle,
  Zap,
  Users,
  Target
} from "lucide-react";

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

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-blue-600"
          >
            Srishti Jaiswal
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

// Tech Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Tech hexagons */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-cyan-500/20 animate-pulse" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 animate-pulse delay-1000" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
      <div className="absolute bottom-40 left-20 w-10 h-10 bg-purple-500/20 animate-pulse delay-2000" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-green-500/20 animate-pulse delay-500" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
      
      {/* Tech squares with glow */}
      <div className="absolute top-60 left-1/4 w-8 h-8 bg-orange-500/20 rotate-45 animate-pulse delay-1500 shadow-lg shadow-orange-500/20"></div>
      <div className="absolute bottom-60 right-1/4 w-10 h-10 bg-yellow-500/20 rotate-45 animate-pulse delay-3000 shadow-lg shadow-yellow-500/20"></div>
      
      {/* Circuit lines */}
      <div className="absolute top-32 left-1/3 w-24 h-0.5 bg-cyan-500/30 animate-pulse delay-500"></div>
      <div className="absolute bottom-32 right-1/3 w-20 h-0.5 bg-blue-500/30 animate-pulse delay-1500"></div>
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
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
           {/* Profile Photo */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="flex justify-center mb-8"
           >
             <div className="relative">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl">
        <Image
                   src="/images/profile-photo.jpg"
                   alt="Srishti Jaiswal"
                   width={288}
                   height={288}
                   className="w-full h-full object-cover"
          priority
        />
               </div>
               {/* Glowing ring effect */}
               <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20 animate-pulse"></div>
             </div>
           </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Srishti Jaiswal
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto drop-shadow-md"
          >
            Software Engineer | Full-Stack Developer | Building Intelligent Systems with AI
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto italic drop-shadow-md"
          >
            "I design and build scalable, intelligent systems by combining modern web development with AI/ML capabilities."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection("#projects")}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              View Projects
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-tech-pattern text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">About Me</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            I'm a recent B.Tech Computer Science graduate from SRM IST, Chennai (2021–2025) with experience in full-stack development, AI Integration, and scalable system design. Passionate about building impactful, team-driven solutions.
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
        "Built modules for MunshiJI.AI, an AI-powered store management platform, using React, TypeScript, Supabase, PostgreSQL, Redux Toolkit, and Cursor AI; improved performance by reducing page load time 50%",
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
    <section id="experience" className="py-20 bg-tech-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-700/50 cursor-pointer hover:border-cyan-500/50 hover:scale-[1.02]"
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
  const projects = [
    {
      title: "ISpent",
      description: "Real-time budget tracking application with intuitive expense management and financial insights.",
      technologies: ["React", "Redux", "Next.js", "Firebase"],
      github: "https://github.com/srishti24jais/ispent",
      demo: "#"
    },
    {
      title: "Events Portal",
      description: "Full-stack event management system with REST APIs, authentication, and responsive frontend.",
      technologies: ["React", "TypeScript", "Spring Boot", "Java"],
      github: "https://github.com/srishti24jais/events-portal",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-tech-pattern text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-700/50"
            >
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a
                  href={project.github}
            target="_blank"
            rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Github size={20} className="mr-2" />
                  Code
          </a>
          <a
                  href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
                  className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink size={20} className="mr-2" />
                  Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
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
    <section id="skills" className="py-20 bg-tech-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-700/50"
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
    <section id="certifications" className="py-20 bg-tech-pattern text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700/50"
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
    <section id="contact" className="py-20 bg-tech-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300">Let's work together on something amazing</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
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
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
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
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors resize-none text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-cyan-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
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
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
