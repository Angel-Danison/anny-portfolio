import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Layers,
  Zap,
  ExternalLink,
  ChevronDown,
  FileText,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import ImageSequence from '../components/ImageSequence';
import CertificationSection from '../components/CertificationSection';
import './Home.css';

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'Node.js / Express', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'MongoDB / PostgreSQL', level: 85 },
  { name: 'CSS / Tailwind', level: 92 },
  // { name: 'Docker / AWS', level: 78 },
];

const services = [
  {
    icon: <Code2 size={28} />,
    title: 'Frontend Development',
    desc: 'Building responsive, high-performance UIs with React, Next.js, and modern CSS frameworks.',
  },
  {
    icon: <Layers size={28} />,
    title: 'Backend Development',
    desc: 'Scalable APIs and microservices with Node.js, Express, and cloud-native architecture.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Full Stack Solutions',
    desc: 'End-to-end web applications from database design to deployment and CI/CD pipelines.',
  },
];

const featuredProjects = [
  {
    title: 'Game developer Portfolio',
    desc: 'Using reactjs and nodejs for creating his Portfolio',
    image: '/game-portfolio.png',
    tags: ['React', 'Nodejs', 'MongoDb'],
    github: 'https://github.com/Angel-Danison/gamerport.git',
    live: 'https://princejhaaportfolio.netlify.app/',
  },
  {
    title: 'Chatbot',
    desc: 'An AI chatbot with openai and gemini api with reactjs and nodejs',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Angel-Danison/mini-bookstore.git',
    live: 'https://github.com/Angel-Danison/mini-bookstore',
  },

  {
    title: 'User Management CRUD App',
    desc: 'A full-stack CRUD application for managing users with React and Node.js.',
    image: '/node-crud.jpg',
    tags: ['React', 'Node.js', 'Express'],
    github: 'https://github.com/Angel-Danison/node-crud.git',
    live: '#',
  },
];

const words = ['Web Developer', 'Full Stack Engineer'];

function TypingEffect() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentWord.length) {
            setCharIndex((prev) => prev + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((prev) => prev - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <span className="typing-text">
      {words[wordIndex].substring(0, charIndex)}
      <span className="typing-cursor">|</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="page-wrapper">
      <ImageSequence />
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* ===== Hero Section ===== */}
        <section className="hero">
          <div className="hero__particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="hero__particle"
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                }}
              />
            ))}
          </div>

          <div className="container hero__content">
            <motion.div
              className="hero__badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="hero__badge-dot" />
              Available for freelance work
            </motion.div>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I'm <span className="gradient-text">Angel Danison</span>
              <br />
              <TypingEffect />
            </motion.h1>

            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I build modern, scalable websites as a full-stack developer,
              specializing in React.js and Node.js, with a focus on clean code and seamless user experiences.

            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/projects" className="btn-primary">
                View My Work <ArrowRight size={18} />
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <FileText size={18} /> View Resume
              </a>
              <Link to="/contact" className="btn-outline">
                Get In Touch
              </Link>
            </motion.div>

            <motion.div
              className="hero__socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a href="https://github.com/Angel-Danison" className="hero__social-link" aria-label="GitHub">
                <GithubIcon size={20} />
              </a>
              <a href="https://www.linkedin.com/in/angel-danison-535847361/" className="hero__social-link" aria-label="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero__scroll-hint"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </section>
        {/* ===== Services Section ===== */}
        <section className="services section">
          <div className="container">
            <ScrollReveal>
              <span className="section-label">What I Do</span>
              <h2 className="section-title">
                <span className="gradient-text">Expertise</span>
              </h2>
            </ScrollReveal>

            <div className="services__grid">
              {services.map((service, i) => (
                <ScrollReveal key={i} delay={i * 0.15} variant="fade-up">
                  <div className="services__card glass-card">
                    <div className="services__icon">{service.icon}</div>
                    <h3 className="services__card-title">{service.title}</h3>
                    <p className="services__card-desc">{service.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Skills Section ===== */}
        <section className="skills section">
          <div className="container">
            <div className="skills__layout">
              <ScrollReveal variant="fade-right">
                <div className="skills__info">
                  <span className="section-label">My Skills</span>
                  <h2 className="section-title">
                    Technologies I <span className="gradient-text">Master</span>
                  </h2>
                  <p className="section-subtitle">
                    I continuously expand my skill set to stay on the cutting edge
                    of modern web development.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-left" delay={0.2}>
                <div className="skills__bars">
                  {skills.map((skill, i) => (
                    <div key={i} className="skills__bar-item">
                      <div className="skills__bar-header">
                        <span className="skills__bar-name">{skill.name}</span>
                        <span className="skills__bar-value">{skill.level}%</span>
                      </div>
                      <div className="skills__bar-track">
                        <motion.div
                          className="skills__bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ===== Featured Projects ===== */}
        <section className="featured section">
          <div className="container">
            <ScrollReveal>
              <span className="section-label"></span>
              <h2 className="section-title">
                Recent <span className="gradient-text">Projects</span>
              </h2>
            </ScrollReveal>

            <div className="featured__grid">
              {featuredProjects.map((project, i) => (
                <ScrollReveal key={i} delay={i * 0.15} variant="scale-up">
                  <div
                    className="featured__card glass-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const link = project.github && project.github !== '#' ? project.github : (project.live !== '#' ? project.live : null);
                      if (link) window.open(link, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <div className="featured__card-image">
                      <img src={project.image} alt={project.title} />
                      <div className="featured__card-overlay">
                        {project.github && project.github !== '#' && (
                          <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ color: 'white', marginRight: '16px' }} aria-label="GitHub">
                            <GithubIcon size={24} />
                          </a>
                        )}
                        {project.live && project.live !== '#' && (
                          <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }} aria-label="Live Preview">
                            <ExternalLink size={24} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="featured__card-body">
                      <h3 className="featured__card-title">{project.title}</h3>
                      <p className="featured__card-desc">{project.desc}</p>
                      <div className="featured__card-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="featured__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="featured__cta">
                <Link to="/projects" className="btn-primary">
                  View All Projects <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== Certifications Section ===== */}
        <CertificationSection title="My Credentials" />

        {/* ===== CTA Section ===== */}
        <section className="cta section">
          <div className="container">
            <ScrollReveal variant="scale-up">
              <div className="cta__card glass-card">
                <h2 className="cta__title">
                  Let's Build Something <span className="gradient-text">Amazing</span>
                </h2>
                <p className="cta__text">
                  Have a project idea? I'd love to hear about it. Let's discuss how
                  we can work together to bring your vision to life.
                </p>
                <Link to="/contact" className="btn-primary">
                  Start a Conversation <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
