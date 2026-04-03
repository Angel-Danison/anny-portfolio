import React from 'react';
import ScrollReveal from './ScrollReveal';
import { ShieldCheck } from 'lucide-react';
import './CertificationSection.css';

const pdfCertifications = [
  { name: 'IBM AI Certification', file: '/IBMDesign20260314-33-i293sc.pdf' },
  { name: 'IBM CyberSecurity Certification', file: '/IBMDesign20260314-33-a827xu.pdf' },
  { name: 'IBM Component 1', file: '/IBMDesign20260314-33-cl00dk.pdf' },
  { name: 'IBM Component 2', file: '/IBMDesign20260314-33-78gf6e.pdf' },
  { name: 'Project Management Fundamentals', file: '/ProjectManagementFundamentals_Badge20260314-33-9ytexb.pdf' },
];

export default function CertificationSection({ title = "My Certifications", showLabel = true }) {
  return (
    <section className="certifications section">
      <div className="container">
        <ScrollReveal>
          {showLabel && <span className="section-label">Certifications</span>}
          <h2 className="section-title">
            Professional <span className="gradient-text">{title.split(' ').slice(1).join(' ')}</span>
          </h2>
        </ScrollReveal>

        <div className="certifications__grid">
          {pdfCertifications.map((pdf, i) => (
            <ScrollReveal key={`pdf-${i}`} delay={0.1 * i} variant="scale-up">
              <div className="pdf-viewer glass-card certification-card">
                <div className="certification-card__header">
                    <ShieldCheck size={24} className="certification__icon" style={{ color: 'var(--accent-primary)' }} />
                    <h3 className="certification-card__name">
                        {pdf.name}
                    </h3>
                </div>
                <iframe
                  src={pdf.file}
                  title={pdf.name}
                  className="certification-card__iframe"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
