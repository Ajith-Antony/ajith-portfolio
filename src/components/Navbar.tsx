import React, { useState, useEffect } from 'react';

interface NavProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavProps> = ({ onOpenContact, onOpenResume }) => {
  const [time, setTime] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const t = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Dubai'
      });
      setTime(`DXB ${t}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="nav" style={{ background: scrolled ? 'rgba(8,8,8,0.95)' : 'var(--bg)' }}>
      {/* Left: Name & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <a
          href="#"
          data-cursor="HOME"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '14px',
            color: 'var(--text)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          Ajith Antony
        </a>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--amber)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
          Available for work
        </span>
      </div>

      {/* Center: Nav Links */}
      <div style={{ display: 'flex', gap: '32px' }} className="hidden md:flex">
        {[
          { href: '#projects', label: 'Projects' },
          { href: '#skills', label: 'Skills' },
          { href: '#experience', label: 'Experience' },
          { href: '#code', label: 'Code' },
        ].map(({ href, label }) => (
          <a key={href} href={href} className="nav-link">{label}</a>
        ))}
      </div>

      {/* Right: Clock + Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span className="mono hidden md:block" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
          {time}
        </span>
        <button
          onClick={onOpenResume}
          className="btn-outline"
          style={{ padding: '6px 14px', fontSize: '10px' }}
        >
          Resume
        </button>
        <button
          onClick={onOpenContact}
          data-cursor="LET'S TALK"
          className="btn-amber"
          style={{ padding: '6px 14px', fontSize: '10px' }}
        >
          Contact
        </button>
      </div>
    </nav>
  );
};
