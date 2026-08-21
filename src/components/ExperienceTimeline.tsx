import React, { useRef, useEffect } from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceTimeline: React.FC = () => {
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = itemsRef.current?.querySelectorAll('.exp-item');
    if (!items) return;

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
          delay: i * 0.05,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="experience" style={{ borderBottom: '1px solid var(--border)' }}>
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
            <span className="section-index">04</span>
            <span className="amber-line" />
          </div>
          <h2 className="headline-md">Experience</h2>
        </div>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
          6+ Years · Sept 2020 – Present
        </div>
      </div>

      {/* Timeline */}
      <div ref={itemsRef} style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
        {EXPERIENCES.map((exp, idx) => (
          <React.Fragment key={idx}>
            {/* Date Column */}
            <div
              className="exp-item"
              style={{
                padding: '28px 24px',
                borderRight: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div className="mono" style={{ fontSize: '10px', color: 'var(--amber)', fontWeight: 700 }}>
                {exp.period.split('–')[0].trim()}
              </div>
              <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
                {exp.period.includes('–') ? `→ ${exp.period.split('–')[1].trim()}` : ''}
              </div>
            </div>

            {/* Content Column */}
            <div
              className="exp-item"
              style={{
                padding: '28px 32px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '8px',
                gap: '16px',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}>
                    {exp.company}
                  </div>
                  <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {exp.role} · {exp.location}
                  </div>
                </div>

                {/* Metrics inline */}
                {exp.metrics && (
                  <div style={{ display: 'flex', gap: '20px', flexShrink: 0 }}>
                    {exp.metrics.slice(0, 2).map((m, mi) => (
                      <div key={mi} style={{ textAlign: 'right' }}>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '18px',
                          fontWeight: 800,
                          color: 'var(--amber)',
                          lineHeight: 1,
                        }}>
                          {m.value}
                        </div>
                        <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <ul style={{
                margin: '12px 0 0',
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}>
                {exp.highlights.slice(0, 2).map((h, hi) => (
                  <li key={hi} style={{
                    display: 'flex',
                    gap: '10px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                  }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0, fontSize: '10px', marginTop: '3px' }}>◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
