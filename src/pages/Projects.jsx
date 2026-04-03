import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import ScrollReveal from '../components/ScrollReveal';
import './Projects.css';

const categories = ['All', 'React', 'Node.js', 'Full Stack'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback data if server not running
        setProjects([
          {
            id: 1,
            title: 'Chatbot',
            description: 'An AI chatbot with openai and gemini api with reactjs and nodejs',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
            category: 'fullstack',
            tags: ['React', 'Node.js', 'MongoDB'],
            github: 'https://github.com/Angel-Danison/mini-bookstore.git',
            live: 'https://github.com/Angel-Danison/mini-bookstore',
          },
          {
            id: 2,
            title: 'Game Developer Portfolio',
            description: 'Portfolio for a game developer.Using technologies like React,JWT,Node.js,Express.',
            image: '/game-portfolio.png',
            tags: ['React', 'JWT', 'Node.js', 'Express'],
            category: 'fullstack',
            github: 'https://github.com/Angel-Danison/gamerport.git',
            live: 'https://princejhaaportfolio.netlify.app/',
          },
          {
            id: 3,
            title: 'User Management CRUD App',
            description: 'A full-stack CRUD application for managing users with a beautiful UI. Built with React and Node.js.',
            image: '/node-crud.jpg',
            tags: ['React', 'Node.js', 'Express', 'MongoDB'],
            category: 'fullstack',
            github: 'https://github.com/Angel-Danison/node-crud.git',
            live: '#',
          },
          {
            id: 4,
            title: 'Mini bookstore',
            description: 'A mini bookstore with fictional and non fictional books.',
            image: 'https://wpastra.com/wp-content/uploads/2022/09/book-store-starter-template-featured-section.jpeg',
            tags: ['Node.js', 'Express'],
            category: 'nodejs',
            github: 'https://github.com/Angel-Danison/mini-bookstore.git',
            live: '#',
          },
          {
            id: 5,
            title: 'Web Simon Go Game',
            description: 'Web based Simon Go Game',
            image: '/output.png',
            tags: ['Next.js'],
            category: 'fullstack',
            github: 'https://github.com/Angel-Danison/Simon-go-game.git',
            live: '#',
          },
          {
            id: 6,
            title: 'Web Drumkit',
            description: 'Web based Drumkit using html,css and javascript',
            image: '/output (1).png',
            tags: ['html', 'css', 'javascript'],
            category: 'react',
            github: 'https://github.com/Angel-Danison/-Interactive-Drum-Kit.git',
            live: '#',
          },
        ]);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'React') return p.category === 'react' || p.tags.includes('React');
    if (activeCategory === 'Node.js') return p.category === 'nodejs' || p.tags.includes('Node.js');
    if (activeCategory === 'Full Stack') return p.category === 'fullstack';
    return true;
  });

  return (
    <div className="page-wrapper">
      <section className="projects-hero section">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">My Work</span>
            <h1 className="section-title">
              Creative <span className="gradient-text">Projects</span>
            </h1>
            <p className="section-subtitle">
              A collection of projects that showcase my skills in building modern,
              performant web applications.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="projects-content">
        <div className="container">
          <ScrollReveal>
            <div className="projects__filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`projects__filter-btn ${activeCategory === cat ? 'projects__filter-btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="projects__loading">
              <div className="projects__spinner" />
            </div>
          ) : (
            <motion.div className="projects__grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="projects__card glass-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const link = project.github && project.github !== '#' ? project.github : (project.live !== '#' ? project.live : null);
                      if (link) window.open(link, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <div className="projects__card-image">
                      <img src={project.image} alt={project.title} />
                      <div className="projects__card-overlay">
                        {project.github && project.github !== '#' && (
                          <a href={project.github} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="projects__card-link" aria-label="GitHub">
                            <GithubIcon size={20} />
                          </a>
                        )}
                        {project.live && project.live !== '#' && (
                          <a href={project.live} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="projects__card-link" aria-label="Live Preview">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="projects__card-body">
                      <h3 className="projects__card-title">{project.title}</h3>
                      <p className="projects__card-desc">{project.description}</p>
                      <div className="projects__card-tags">
                        {project.tags.map((tag) => (
                          <span key={tag} className="projects__tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
