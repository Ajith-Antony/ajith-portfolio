import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const [label, setLabel] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      const el = e.target as HTMLElement;
      const cursor = el.closest('[data-cursor]') as HTMLElement | null;
      if (cursor) {
        setIsHovered(true);
        setLabel(cursor.getAttribute('data-cursor') || '');
      } else if (el.closest('a, button, input, select, textarea')) {
        setIsHovered(true);
        setLabel('');
      } else {
        setIsHovered(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let raf: number;

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const ringSize = label ? 'auto' : isHovered ? '44px' : '28px';
  const ringRadius = label ? '2px' : '50%';

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ width: isHovered ? '4px' : '6px', height: isHovered ? '4px' : '6px' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: label ? 'auto' : ringSize,
          height: label ? 'auto' : ringSize,
          borderRadius: ringRadius,
          padding: label ? '4px 10px' : '0',
          background: label ? 'var(--amber)' : 'transparent',
          borderColor: label ? 'var(--amber)' : isHovered ? 'var(--amber)' : 'rgba(245,158,11,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {label && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#000',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
        )}
      </div>
    </>
  );
};
