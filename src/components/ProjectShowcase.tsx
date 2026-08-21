import React, { useState, useRef, useEffect } from 'react';
import { EXPERIENCES, type ProjectExperience } from '../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectShowcase: React.FC = () => {
  const [active, setActive] = useState<ProjectExperience | null>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = rowsRef.current?.querySelectorAll('.proj-row');
    if (!rows) return;

    rows.forEach((row, i) => {
      gsap.fromTo(
        row,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
          },
          delay: i * 0.06,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="projects" style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Section Header */}
      <div style={{
        padding: '40px 40px 0',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '24px',
      }}>
        <div>
          <div className="section-tag">
            <span className="section-index">01</span>
            <span className="amber-line" />
          </div>
          <h2 className="headline-md">Projects</h2>
        </div>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
          {EXPERIENCES.length} Roles
        </div>
      </div>

      {/* Project Table */}
      <div ref={rowsRef}>
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="proj-row"
            onClick={() => setActive(exp)}
            data-cursor="CASE STUDY"
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr auto auto',
              alignItems: 'center',
              gap: '0',
              padding: '0',
              borderBottom: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {/* Index */}
            <div style={{
              padding: '20px 0 20px 20px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-dim)',
              borderRight: '1px solid var(--border)',
            }}>
              0{idx + 1}
            </div>

            {/* Company + Role */}
            <div style={{ padding: '20px 24px', borderRight: '1px solid var(--border)' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(16px, 2vw, 22px)',
                color: 'var(--text)',
                letterSpacing: '-0.01em',
                marginBottom: '4px',
              }}>
                {exp.company}
              </div>
              <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                {exp.role} · {exp.location}
              </div>
            </div>

            {/* Metrics */}
            <div style={{
              padding: '20px 24px',
              borderRight: '1px solid var(--border)',
              display: 'flex',
              gap: '24px',
            }}>
              {(exp.metrics || []).slice(0, 2).map((m, mi) => (
                <div key={mi}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: 'var(--amber)',
                    lineHeight: 1,
                  }}>
                    {m.value}
                  </div>
                  <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '2px' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Period + Arrow */}
            <div style={{
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '4px',
            }}>
              <span className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
                {exp.period}
              </span>
              <span style={{ color: 'var(--amber)', fontSize: '16px', fontWeight: 300 }}>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--bg-1)',
              border: '1px solid var(--amber)',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
              <div>
                <div className="label-amber" style={{ marginBottom: '8px' }}>Case Study</div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                }}>
                  {active.company}
                </div>
                <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {active.role} · {active.period} · {active.location}
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                ×
              </button>
            </div>

            {/* Description */}
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: '1.7',
              }}>
                {active.description}
              </p>
            </div>

            {/* Metrics */}
            {active.metrics && active.metrics.length > 0 && (
              <div style={{
                padding: '24px',
                borderBottom: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: `repeat(${active.metrics.length}, 1fr)`,
                gap: '0',
              }}>
                {active.metrics.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      borderRight: i < active.metrics!.length - 1 ? '1px solid var(--border)' : 'none',
                      paddingRight: '24px',
                      paddingLeft: i > 0 ? '24px' : '0',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      fontWeight: 800,
                      color: 'var(--amber)',
                      lineHeight: 1,
                    }}>
                      {m.value}
                    </div>
                    <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
              <div className="label" style={{ marginBottom: '16px' }}>Key Achievements</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {active.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--text-muted)',
                      lineHeight: '1.6',
                    }}
                  >
                    <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '1px' }}>◆</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div style={{ padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {active.skills.map((s, i) => (
                <span
                  key={i}
                  className="mono"
                  style={{
                    fontSize: '10px',
                    padding: '4px 10px',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
