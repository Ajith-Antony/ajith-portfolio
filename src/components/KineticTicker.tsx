import React from 'react';

const ITEMS = [
  'React 19 · TypeScript · Next.js',
  'boli.ae — 100% Frontend Architecture',
  'Sub-50ms WebSocket Streaming',
  'Coinroutes Trading Platform',
  'Shufti KYC Compliance Pipeline',
  'TNC Web3 · 150k+ Users',
  'Dubai, UAE · Available for Work',
  'Core Web Vitals · SEO Architecture',
];

export const KineticTicker: React.FC = () => {
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker-bar" style={{ borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)' }}>
      <div className="ticker-track">
        {items.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="amber">◆</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
