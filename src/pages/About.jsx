import { motion } from 'framer-motion';
import {
  Code2,
  Server,
  Database,
  Cloud,
  Palette,
  GitBranch,
  Briefcase,
  GraduationCap,
  Award,
  ShieldCheck,
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import CertificationSection from '../components/CertificationSection';
import './About.css';

const techStack = [
  { icon: <Code2 size={24} />, name: 'React', color: '#61DAFB' },
  { icon: <Code2 size={24} />, name: 'Next.js', color: '#fff' },
  { icon: <Code2 size={24} />, name: 'TypeScript', color: '#3178C6' },
  { icon: <Server size={24} />, name: 'Node.js', color: '#68A063' },
  { icon: <Server size={24} />, name: 'Express', color: '#fff' },
  { icon: <Database size={24} />, name: 'MongoDB', color: '#47A248' },
  { icon: <Database size={24} />, name: 'PostgreSQL', color: '#336791' },
  { icon: <GitBranch size={24} />, name: 'Git', color: '#F05032' },
];

const experience = [
  {
    year: '2023 — Present',
    role: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    desc: 'Leading development of enterprise SaaS platform with React and Node.js microservices. Improved system performance by 40% and mentored junior developers.',
  },
  {
    year: '2021 — 2023',
    role: 'Full Stack Developer',
    company: 'Digital Agency Pro',
    desc: 'Built 20+ client websites and web applications. Specialized in e-commerce platforms, real-time dashboards, and progressive web apps.',
  },
  {
    year: '2019 — 2021',
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    desc: 'Developed responsive UIs with React and Vue.js. Implemented design systems and component libraries used across 5 product teams.',
  },
];

const education = [
  {
    year: '2015 — 2019',
    degree: 'B.S. Computer Science',
    school: 'State University',
    desc: 'Graduated with honors. Focused on algorithms, data structures, and web technologies.',
  },
];

export default function About() {
  return (
    <div className="page-wrapper">
      {/* ===== Hero ===== */}
      <section className="about-hero section">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">About Me</span>
            <h1 className="section-title">
              Passionate About <span className="gradient-text">Crafting</span>
              <br />Digital Experiences
            </h1>
          </ScrollReveal>

          <div className="about-hero__content">
            <ScrollReveal variant="fade-right" delay={0.2}>
              <div className="about-hero__image-wrapper">
                <div className="about-hero__image">
                  <img
                    src="/profile.jpeg"
                    alt="Profile"
                    className="about-hero__image-img"
                  />
                </div>
                <div className="about-hero__image-border" />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={0.3}>
              <div className="about-hero__text">
                <p>
                  I'm a full-stack web developer with over 1 year of buliding projects, scalable web applications. I'm passionate about
                  clean code, thoughtful architecture, and creating seamless user
                  experiences.
                </p>
                <p>
                  My journey started with simple HTML pages and has evolved into
                  building complex full-stack applications with React, Node.js,
                  and cloud infrastructure. I believe in continuous learning and
                  staying at the forefront of web technology.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies,
                  contributing to open-source projects, or writing technical blog
                  posts to share my knowledge with the community.
                </p>
                {/* <div className="about-hero__highlights">
                  <div className="about-hero__highlight">
                    <Award size={20} />
                    <span></span>
                  </div>
                  <div className="about-hero__highlight">
                    <Briefcase size={20} />
                    <span></span>
                  </div>
                </div> */}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== Tech Stack ===== */}
      <section className="tech-stack section">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Tech Stack</span>
            <h2 className="section-title">
              Tools & <span className="gradient-text">Technologies</span>
            </h2>
          </ScrollReveal>

          <div className="tech-stack__grid">
            {techStack.map((tech, i) => (
              <ScrollReveal key={i} delay={i * 0.05} variant="scale-up">
                <motion.div
                  className="tech-stack__item glass-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="tech-stack__icon" style={{ color: tech.color }}>
                    {tech.icon}
                  </div>
                  <span className="tech-stack__name">{tech.name}</span>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>



      {/* ===== Certifications ===== */}
      <CertificationSection />
    </div>
  );
}
