import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/SocialIcons';
import ScrollReveal from '../components/ScrollReveal';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="contact-hero section">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Get In Touch</span>
            <h1 className="section-title">
              Let's Start a <span className="gradient-text">Conversation</span>
            </h1>
            <p className="section-subtitle">
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Fill out the form and I'll get back to you as soon as possible.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact__layout">
            {/* Contact Info */}
            <ScrollReveal variant="fade-right">
              <div className="contact__info">
                <div className="contact__info-card glass-card">
                  <Mail size={24} />
                  <div>
                    <h4>Email</h4>
                    <p>adanison2003@gmail.com</p>
                  </div>
                </div>

                <div className="contact__info-card glass-card">
                  <MapPin size={24} />
                  <div>
                    <h4>Location</h4>
                    <p>Ahembabad, Gujarat, India</p>
                  </div>
                </div>
                <div className="contact__socials">
                  <h4 className="contact__socials-title">Follow Me</h4>
                  <div className="contact__socials-links">
                    <a href="https://github.com/Angel-Danison" className="contact__social-link" aria-label="GitHub">
                      <GithubIcon size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/angel-danison-535847361/" className="contact__social-link" aria-label="LinkedIn">
                      <LinkedinIcon size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal variant="fade-left" delay={0.2}>
              <form className="contact__form glass-card" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="contact__form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="write your name"
                      required
                    />
                  </div>
                  <div className="contact__form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="write your email"
                      required
                    />
                  </div>
                </div>

                <div className="contact__form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary contact__submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="contact__spinner" />
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </motion.button>

                {/* Status Toast */}
                {status && (
                  <motion.div
                    className={`contact__toast contact__toast--${status}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {status === 'success' ? (
                      <>
                        <CheckCircle size={20} />
                        Message sent successfully! I'll get back to you soon.
                      </>
                    ) : (
                      <>
                        <AlertCircle size={20} />
                        Something went wrong. Please try again or email me directly.
                      </>
                    )}
                  </motion.div>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
