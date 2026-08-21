import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO, INITIAL_ORDER_BOOK } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [orderBook, setOrderBook] = useState(INITIAL_ORDER_BOOK);
  const [latency, setLatency] = useState(12);
  const [tickCount, setTickCount] = useState(4821);
  const [btcPrice, setBtcPrice] = useState(67445.00);
  const [priceUp, setPriceUp] = useState(true);
  const [mode, setMode] = useState<'ws' | 'rest'>('ws');
  const [running, setRunning] = useState(true);

  // Flash effect on data update
  const [flashRow, setFlashRow] = useState(-1);

  useEffect(() => {
    if (!running) return;
    const interval = mode === 'ws' ? 600 : 2800;

    const id = setInterval(() => {
      const delta = (Math.random() - 0.49) * 3;
      const base = 67445 + delta;
      setPriceUp(delta > 0);
      setBtcPrice(Number(base.toFixed(2)));

      const newAsks = Array.from({ length: 5 }, (_, i) => ({
        price: Number((base + (5 - i) * 1.2).toFixed(2)),
        size: Number((Math.random() * 3 + 0.2).toFixed(2)),
        total: 0,
      }));
      const newBids = Array.from({ length: 5 }, (_, i) => ({
        price: Number((base - (i + 1) * 1.2).toFixed(2)),
        size: Number((Math.random() * 3 + 0.2).toFixed(2)),
        total: 0,
      }));

      let acc = 0;
      newAsks.forEach(r => { acc += r.size; r.total = Number(acc.toFixed(2)); });
      acc = 0;
      newBids.forEach(r => { acc += r.size; r.total = Number(acc.toFixed(2)); });

      setOrderBook({ asks: newAsks, bids: newBids });
      setLatency(mode === 'ws' ? Math.floor(8 + Math.random() * 10) : Math.floor(450 + Math.random() * 300));
      setTickCount(n => n + 1);
      setFlashRow(Math.floor(Math.random() * 5));
      setTimeout(() => setFlashRow(-1), 250);
    }, interval);

    return () => clearInterval(id);
  }, [running, mode]);

  const maxTotal = Math.max(
    ...orderBook.asks.map(a => a.total),
    ...orderBook.bids.map(b => b.total)
  );

  return (
    <section
      style={{
        paddingTop: '96px',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Hero: Name-First Identity */}
      <div
        style={{
          padding: '48px 40px 40px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Status bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}>
          <div className="label-amber">
            Available for work · Dubai, UAE
          </div>
          <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>{PERSONAL_INFO.email}</span>
            <span style={{ color: 'var(--border)' }}>|</span>
            <span>{PERSONAL_INFO.phone}</span>
          </div>
        </div>

        {/* Giant Name */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 12vw, 180px)',
          fontWeight: 800,
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          color: 'var(--text)',
          margin: 0,
        }}>
          AJITH
          <br />
          <span style={{
            color: 'var(--amber)',
            display: 'inline-block',
          }}>
            ANTONY
          </span>
        </h1>

        {/* Role + Tagline */}
        <div style={{
          marginTop: '28px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'end',
          gap: '32px',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 700,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
            }}>
              Senior Frontend Engineer
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginTop: '8px',
              maxWidth: '520px',
            }}>
              6+ years building real-time trading platforms, PropTech systems, and Web3 applications.
              Owned the entire frontend architecture for <span style={{ color: 'var(--amber)' }}>boli.ae</span> — from zero to production.
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <button
              className="btn-amber"
              onClick={onOpenContact}
              data-cursor="LET'S TALK"
            >
              Start Conversation
              <span style={{ fontSize: '16px' }}>→</span>
            </button>
            <a
              href="#projects"
              className="btn-outline"
              data-cursor="EXPLORE"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>

      {/* Two-Column: Stats + Live Order Book */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px' }}>
        {/* Left: Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRight: '1px solid var(--border)' }}>
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div key={i} className="stat-block">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}

          {/* Bio Block */}
          <div style={{
            gridColumn: '1 / -1',
            padding: '24px',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}>
            <div className="label" style={{ marginBottom: '12px' }}>About</div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              lineHeight: '1.7',
              maxWidth: '520px',
            }}>
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div style={{
            gridColumn: '1 / -1',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {['React 19', 'Next.js', 'TypeScript', 'WebSockets', 'Redux Toolkit', 'Shufti KYC', 'Three.js', 'GSAP', 'Ag-Grid', 'Lightweight Charts'].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  padding: '4px 10px',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                  transition: 'border-color 0.15s, color 0.15s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.borderColor = 'var(--amber)';
                  (e.target as HTMLElement).style.color = 'var(--amber)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.borderColor = 'var(--border)';
                  (e.target as HTMLElement).style.color = 'var(--text-muted)';
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Live Order Book */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                BTC/USD LIVE ORDER BOOK
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                fontWeight: 700,
                color: priceUp ? 'var(--green)' : 'var(--red)',
                marginTop: '2px',
              }}>
                ${btcPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span style={{ marginLeft: '6px', fontSize: '10px' }}>{priceUp ? '▲' : '▼'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setMode('ws')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  padding: '4px 8px',
                  background: mode === 'ws' ? 'var(--amber)' : 'transparent',
                  color: mode === 'ws' ? '#000' : 'var(--text-muted)',
                  border: `1px solid ${mode === 'ws' ? 'var(--amber)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                }}
              >
                WS
              </button>
              <button
                onClick={() => setMode('rest')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  padding: '4px 8px',
                  background: mode === 'rest' ? 'var(--amber)' : 'transparent',
                  color: mode === 'rest' ? '#000' : 'var(--text-muted)',
                  border: `1px solid ${mode === 'rest' ? 'var(--amber)' : 'var(--border)'}`,
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                }}
              >
                REST
              </button>
              <button
                onClick={() => setRunning(!running)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  padding: '4px 8px',
                  background: 'transparent',
                  color: running ? 'var(--green)' : 'var(--text-dim)',
                  border: `1px solid var(--border)`,
                  cursor: 'pointer',
                }}
              >
                {running ? '■ PAUSE' : '▶ PLAY'}
              </button>
            </div>
          </div>

          {/* Column Headers */}
          <div className="order-book" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 72px 72px',
            padding: '6px 12px',
            borderBottom: '1px solid var(--border)',
            color: 'var(--text-dim)',
            fontSize: '9px',
            letterSpacing: '0.1em',
          }}>
            <span>PRICE</span>
            <span style={{ textAlign: 'right' }}>SIZE</span>
            <span style={{ textAlign: 'right' }}>DEPTH</span>
          </div>

          {/* Asks */}
          <div className="order-book">
            {[...orderBook.asks].reverse().map((ask, i) => (
              <div
                key={`ask-${i}`}
                className="order-row"
                style={{
                  background: flashRow === i ? 'rgba(239,68,68,0.08)' : undefined,
                }}
              >
                <span style={{ color: 'var(--red)' }}>{ask.price.toFixed(2)}</span>
                <span style={{ textAlign: 'right', color: 'var(--text-muted)' }}>{ask.size.toFixed(3)}</span>
                <span style={{ textAlign: 'right', color: 'var(--text-dim)' }}>{ask.total.toFixed(3)}</span>
                <div className="order-fill-ask" style={{ width: `${(ask.total / maxTotal) * 100}%` }} />
              </div>
            ))}
          </div>

          {/* Spread */}
          <div style={{
            padding: '6px 12px',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
              SPREAD $1.50 — TICKS {tickCount.toLocaleString()}
            </span>
            <span className="mono" style={{
              fontSize: '9px',
              color: latency < 50 ? 'var(--green)' : '#f97316',
              fontWeight: 700,
            }}>
              {latency}ms {mode === 'ws' ? '⚡WS' : 'REST'}
            </span>
          </div>

          {/* Bids */}
          <div className="order-book">
            {orderBook.bids.map((bid, i) => (
              <div key={`bid-${i}`} className="order-row">
                <span style={{ color: 'var(--green)' }}>{bid.price.toFixed(2)}</span>
                <span style={{ textAlign: 'right', color: 'var(--text-muted)' }}>{bid.size.toFixed(3)}</span>
                <span style={{ textAlign: 'right', color: 'var(--text-dim)' }}>{bid.total.toFixed(3)}</span>
                <div className="order-fill-bid" style={{ width: `${(bid.total / maxTotal) * 100}%` }} />
              </div>
            ))}
          </div>

          {/* Footer label */}
          <div style={{
            marginTop: 'auto',
            padding: '10px 12px',
            borderTop: '1px solid var(--border)',
          }}>
            <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
              Coinroutes architecture pattern — sub-50ms real-time streaming
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
