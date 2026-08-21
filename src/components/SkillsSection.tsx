import React, { useState, useRef, useEffect } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const barsRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (!barsRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: barsRef.current,
      start: 'top 80%',
      onEnter: () => setAnimated(true),
    });
    return () => trigger.kill();
  }, []);

  const cat = SKILL_CATEGORIES[activeCategory];

  return (
    <section id="skills" style={{ borderBottom: '1px solid var(--border)' }}>
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
            <span className="section-index">02</span>
            <span className="amber-line" />
          </div>
          <h2 className="headline-md">Skills Matrix</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
        {/* Left: Category Nav */}
        <div style={{ borderRight: '1px solid var(--border)' }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveCategory(i);
                setAnimated(false);
                setTimeout(() => setAnimated(true), 50);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '16px 20px',
                background: activeCategory === i ? 'var(--amber-dim)' : 'transparent',
                borderBottom: '1px solid var(--border)',
                borderLeft: activeCategory === i ? '2px solid var(--amber)' : '2px solid transparent',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.08em',
                color: activeCategory === i ? 'var(--amber)' : 'var(--text-muted)',
                textTransform: 'uppercase',
                fontWeight: activeCategory === i ? 700 : 400,
              }}>
                {cat.category}
              </div>
            </button>
          ))}
        </div>

        {/* Right: Skill Bars */}
        <div ref={barsRef}>
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border)',
          }}>
            <div className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {cat.description}
            </div>
          </div>

          {cat.skills.map((skill, i) => (
            <div key={i} className="skill-row">
              <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {skill.name}
              </span>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{ width: animated ? `${skill.level}%` : '0%' }}
                />
              </div>
              <span className="mono" style={{
                fontSize: '10px',
                color: 'var(--amber)',
                textAlign: 'right',
                fontWeight: 700,
              }}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
