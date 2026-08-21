import React from 'react';
import { PHILOSOPHY_TENETS } from '../data/portfolioData';

export const EngineeringPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Header */}
      <div style={{
        padding: '40px 40px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <div>
          <div className="section-tag">
            <span className="section-index">05</span>
            <span className="amber-line" />
          </div>
          <h2 className="headline-md">Engineering Philosophy</h2>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {PHILOSOPHY_TENETS.map((tenet, i) => (
          <div
            key={i}
            style={{
              padding: '32px 36px',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '36px',
              fontWeight: 800,
              color: 'var(--amber-border)',
              lineHeight: 1,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
            }}>
              {tenet.id}
            </div>

            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '10px',
              letterSpacing: '-0.01em',
            }}>
              {tenet.title}
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
              lineHeight: '1.7',
              margin: 0,
            }}>
              {tenet.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
