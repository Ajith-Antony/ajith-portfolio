import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate send
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#000',
    border: '1px solid var(--border)',
    borderRadius: 0,
    padding: '10px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.9)',
        zIndex: 200,
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
          maxWidth: '520px',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div className="label-amber" style={{ marginBottom: '4px' }}>Get in touch</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700 }}>
              Let's Build Something.
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Contact Info */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          gap: '24px',
        }}>
          <div>
            <div className="label" style={{ marginBottom: '2px' }}>Email</div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="mono"
              style={{ fontSize: '11px', color: 'var(--amber)', textDecoration: 'none' }}
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div>
            <div className="label" style={{ marginBottom: '2px' }}>Phone</div>
            <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {PERSONAL_INFO.phone}
            </span>
          </div>
        </div>

        {/* Form */}
        {sent ? (
          <div style={{
            padding: '40px 24px',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--amber)',
          }}>
            ✓ Message sent. Ajith will respond soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div className="label" style={{ marginBottom: '6px' }}>Name</div>
              <input
                style={inputStyle}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                onFocus={e => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <div className="label" style={{ marginBottom: '6px' }}>Email</div>
              <input
                type="email"
                style={inputStyle}
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                onFocus={e => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <div className="label" style={{ marginBottom: '6px' }}>Message</div>
              <textarea
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                onFocus={e => (e.target.style.borderColor = 'var(--amber)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <button type="submit" className="btn-amber" style={{ alignSelf: 'flex-start' }}>
              Send Message →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
