import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 40px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: '24px',
    }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '14px',
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          marginBottom: '4px',
        }}>
          Ajith Pallissery Antony
        </div>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
          Senior Frontend Engineer · Dubai, UAE
        </div>
      </div>

      <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', textAlign: 'center' }}>
        © {year} · Built with React + GSAP + Three.js
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="nav-link"
        >
          Email
        </a>
      </div>
    </footer>
  );
};
