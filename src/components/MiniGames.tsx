import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─── GAME 1: TRADE SNIPER ─────────────────────────────────────────────────────
// Click BUY when the ask price enters the target zone. Score based on timing.

const TradeSniperGame: React.FC = () => {
  const [price, setPrice] = useState(67450);
  const [target] = useState({ low: 67430, high: 67440 });
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [lastResult, setLastResult] = useState<'hit' | 'miss' | null>(null);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const priceRef = useRef(67450);
  // Pull price toward zone center every 3s to guarantee zone visits
  const pullTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    // Fast tick: small random walk
    const id = setInterval(() => {
      const zoneCenter = (target.low + target.high) / 2; // 67435
      // 30% bias toward zone center so needle visits at least every 3s
      const bias = (zoneCenter - priceRef.current) * 0.08;
      const noise = (Math.random() * 6 - 3);
      priceRef.current += bias + noise;
      priceRef.current = Math.max(67412, Math.min(67478, priceRef.current));
      setPrice(Number(priceRef.current.toFixed(2)));
    }, 100);
    // Hard-pull into zone every 2.5s to guarantee opportunity
    pullTimerRef.current = setInterval(() => {
      const zoneCenter = (target.low + target.high) / 2;
      priceRef.current = zoneCenter + (Math.random() * 6 - 3);
    }, 2500);
    return () => { clearInterval(id); if (pullTimerRef.current) clearInterval(pullTimerRef.current); };
  }, [running, target]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { setRunning(false); setGameOver(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const handleFire = useCallback(() => {
    if (!running) return;
    const p = priceRef.current;
    const hit = p >= target.low && p <= target.high;
    if (hit) {
      setScore(s => s + 1);
      setLastResult('hit');
    } else {
      setMisses(m => m + 1);
      setLastResult('miss');
    }
    setTimeout(() => setLastResult(null), 400);
  }, [running, target]);

  const restart = () => {
    setScore(0); setMisses(0); setTimeLeft(30);
    setGameOver(false); setLastResult(null);
    priceRef.current = 67450;
    setPrice(67450);
    setRunning(true);
  };

  const inZone = price >= target.low && price <= target.high;
  const pct = ((price - 67410) / (67480 - 67410)) * 100;
  const zoneLow = ((target.low - 67410) / (67480 - 67410)) * 100;
  const zoneHigh = ((target.high - 67410) / (67480 - 67410)) * 100;

  return (
    <div style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>TRADE SNIPER</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontFamily: 'var(--font-body)' }}>
            BUY when price enters the amber zone
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <span style={{ color: 'var(--amber)' }}>HITS: {score}</span>
          <span style={{ color: 'var(--red)' }}>MISS: {misses}</span>
          <span style={{ color: running ? 'var(--green)' : 'var(--text-dim)' }}>{timeLeft}s</span>
        </div>
      </div>

      {/* Price Gauge */}
      <div style={{ position: 'relative', height: '64px', background: '#000', border: '1px solid var(--border)' }}>
        {/* Target Zone */}
        <div style={{
          position: 'absolute',
          left: `${zoneLow}%`,
          width: `${zoneHigh - zoneLow}%`,
          top: 0, bottom: 0,
          background: 'rgba(245,158,11,0.18)',
          borderLeft: '1px solid var(--amber)',
          borderRight: '1px solid var(--amber)',
        }} />
        {/* Price Needle */}
        <div style={{
          position: 'absolute',
          left: `${pct}%`,
          top: 0, bottom: 0,
          width: '2px',
          background: inZone ? 'var(--amber)' : 'var(--text-muted)',
          transform: 'translateX(-50%)',
          transition: 'left 0.1s linear',
          boxShadow: inZone ? '0 0 8px var(--amber)' : 'none',
        }} />
        {/* Price Label */}
        <div style={{
          position: 'absolute',
          left: `${pct}%`,
          bottom: '6px',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: inZone ? 'var(--amber)' : 'var(--text-muted)',
          whiteSpace: 'nowrap',
          fontWeight: 700,
        }}>
          ${price.toFixed(2)}
        </div>
        {/* Zone labels */}
        <div style={{
          position: 'absolute',
          left: `${(zoneLow + zoneHigh) / 2}%`,
          top: '8px',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--amber)',
          letterSpacing: '0.1em',
        }}>
          TARGET ZONE
        </div>
      </div>

      {/* Flash result */}
      <div style={{ height: '20px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
        {lastResult === 'hit' && <span style={{ color: 'var(--green)' }}>✓ TRADE EXECUTED +1</span>}
        {lastResult === 'miss' && <span style={{ color: 'var(--red)' }}>✗ OUTSIDE ZONE</span>}
      </div>

      {/* Controls */}
      {!running && !gameOver && (
        <button onClick={restart} className="btn-amber" style={{ alignSelf: 'center' }}>
          START TRADING ▶
        </button>
      )}

      {running && (
        <button
          onClick={handleFire}
          style={{
            background: inZone ? 'var(--amber)' : 'var(--bg-3)',
            border: `2px solid ${inZone ? 'var(--amber)' : 'var(--border)'}`,
            color: inZone ? '#000' : 'var(--text-dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            fontWeight: 800,
            padding: '14px 32px',
            cursor: 'pointer',
            letterSpacing: '0.15em',
            transition: 'all 0.08s ease',
            alignSelf: 'center',
            boxShadow: inZone ? '0 0 20px rgba(245,158,11,0.3)' : 'none',
          }}
        >
          ⚡ BUY NOW
        </button>
      )}

      {gameOver && (
        <div style={{ textAlign: 'center' }}>
          <div className="mono" style={{ color: 'var(--amber)', fontSize: '24px', fontWeight: 800 }}>
            {score} TRADES
          </div>
          <div className="mono" style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '4px' }}>
            {misses} misses · {Math.round((score / (score + misses || 1)) * 100)}% accuracy
          </div>
          <button onClick={restart} className="btn-amber" style={{ marginTop: '12px' }}>
            RETRY
          </button>
        </div>
      )}
    </div>
  );
};

// ─── GAME 2: STACK CATCHER ─────────────────────────────────────────────────────
// Falling tech skill tokens — move the paddle to catch them. Miss = -1 life.

const FALLING_SKILLS = [
  { label: 'React', color: '#61dafb' },
  { label: 'TypeScript', color: '#3178c6' },
  { label: 'Next.js', color: '#fff' },
  { label: 'WebSocket', color: 'var(--amber)' },
  { label: 'Redux', color: '#764abc' },
  { label: 'Shufti KYC', color: 'var(--green)' },
  { label: 'Ag-Grid', color: '#0f9d58' },
  { label: 'Node.js', color: '#68a063' },
  { label: 'GSAP', color: 'var(--amber)' },
  { label: 'Three.js', color: '#049ef4' },
  { label: 'Tailwind', color: '#38bdf8' },
  { label: 'GraphQL', color: '#e10098' },
  { label: 'Web3', color: '#f6851b' },
  { label: 'Vite', color: '#bd34fe' },
];

interface Token { id: number; x: number; y: number; skill: typeof FALLING_SKILLS[0]; speed: number; }

const StackCatcherGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    paddle: 50,
    tokens: [] as Token[],
    score: 0,
    lives: 3,
    running: false,
    nextId: 0,
    spawnTimer: 0,
    raf: 0,
  });
  const [display, setDisplay] = useState({ score: 0, lives: 3, running: false, gameOver: false });

  const start = useCallback(() => {
    const s = stateRef.current;
    s.paddle = 50; s.tokens = []; s.score = 0;
    s.lives = 3; s.running = true; s.nextId = 0; s.spawnTimer = 0;
    setDisplay({ score: 0, lives: 3, running: true, gameOver: false });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;
    const PADDLE_W = 80;
    const PADDLE_H = 8;
    const TOKEN_H = 22;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.paddle = ((e.clientX - rect.left) / rect.width) * 100;
    };
    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.paddle = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    let lastTime = 0;
    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const s = stateRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // Grid lines (faint)
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      if (!s.running) {
        stateRef.current.raf = requestAnimationFrame(loop);
        return;
      }

      // Spawn
      s.spawnTimer -= dt;
      if (s.spawnTimer <= 0) {
        const skill = FALLING_SKILLS[Math.floor(Math.random() * FALLING_SKILLS.length)];
        s.tokens.push({ id: s.nextId++, x: 5 + Math.random() * 90, y: 0, skill, speed: 18 + Math.random() * 12 + s.score * 0.3 });
        s.spawnTimer = 1.4 - Math.min(s.score * 0.02, 0.8);
      }

      // Update tokens
      const paddleX = (s.paddle / 100) * W;
      const paddleY = H - 24;
      const keep: Token[] = [];

      for (const t of s.tokens) {
        t.y += t.speed * dt * H * 0.01;
        const tx = (t.x / 100) * W;
        const caught = t.y > (paddleY - TOKEN_H / 2) && t.y < paddleY + PADDLE_H &&
          tx > paddleX - PADDLE_W / 2 - 10 && tx < paddleX + PADDLE_W / 2 + 10;

        if (caught) {
          s.score++;
          setDisplay(d => ({ ...d, score: s.score }));
        } else if (t.y > H + 10) {
          s.lives--;
          setDisplay(d => ({ ...d, lives: s.lives }));
          if (s.lives <= 0) {
            s.running = false;
            setDisplay({ score: s.score, lives: 0, running: false, gameOver: true });
          }
        } else {
          keep.push(t);
        }
      }
      s.tokens = keep;

      // Draw tokens — dark bg + bright text for readability
      for (const t of s.tokens) {
        const tx = (t.x / 100) * W;
        const tw = 72;
        // Dark background pill
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(tx - tw / 2, t.y - TOKEN_H / 2, tw, TOKEN_H);
        // Amber left accent bar
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(tx - tw / 2, t.y - TOKEN_H / 2, 3, TOKEN_H);
        // White label — always readable
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(t.skill.label, tx + 2, t.y);
        // Subtle border
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(tx - tw / 2, t.y - TOKEN_H / 2, tw, TOKEN_H);
      }

      // Draw paddle
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(paddleX - PADDLE_W / 2, paddleY, PADDLE_W, PADDLE_H);
      // Paddle glow
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.fillRect(paddleX - PADDLE_W / 2, paddleY, PADDLE_W, PADDLE_H);
      ctx.shadowBlur = 0;

      stateRef.current.raf = requestAnimationFrame(loop);
    };

    stateRef.current.raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>STACK CATCHER</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            Move paddle to catch falling skills
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          <span style={{ color: 'var(--amber)' }}>SCORE: {display.score}</span>
          <span style={{ color: display.lives < 2 ? 'var(--red)' : 'var(--text-muted)' }}>
            {'❤'.repeat(display.lives)}{'🖤'.repeat(3 - display.lives)}
          </span>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={420}
          height={240}
          style={{
            width: '100%',
            height: '240px',
            border: '1px solid var(--border)',
            cursor: display.running ? 'none' : 'default',
            display: 'block',
          }}
        />
        {!display.running && !display.gameOver && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '12px',
            background: 'rgba(0,0,0,0.7)',
          }}>
            <button onClick={start} className="btn-amber">START CATCHING ▶</button>
          </div>
        )}
        {display.gameOver && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'rgba(0,0,0,0.85)',
          }}>
            <div className="mono" style={{ color: 'var(--amber)', fontSize: '28px', fontWeight: 800 }}>
              {display.score} CAUGHT
            </div>
            <div className="mono" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
              {display.score >= 20 ? '🔥 SENIOR LEVEL STACK' : display.score >= 10 ? '⚡ MID-LEVEL STACK' : '📚 KEEP LEARNING'}
            </div>
            <button onClick={start} className="btn-amber" style={{ marginTop: '8px' }}>RETRY</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── GAME 3: DEBUG HUNT ─────────────────────────────────────────────────────
// Click the buggy line in a code snippet — 5 rounds, scored on speed.

const DEBUG_ROUNDS = [
  {
    title: 'React setState inside render',
    lines: [
      "const Counter = () => {",
      "  const [count, setCount] = useState(0);",
      "  setCount(count + 1);",
      "  return <div>{count}</div>;",
      "};",
    ],
    bugLine: 2,
    hint: "setCount() called directly in render body causes an infinite re-render loop!",
  },
  {
    title: 'Missing useEffect dependency',
    lines: [
      "useEffect(() => {",
      "  fetchUser(userId);",
      "}, []);",
      "",
      "// userId can change externally",
    ],
    bugLine: 2,
    hint: "Empty deps array means userId changes never trigger a re-fetch.",
  },
  {
    title: 'Async event handler leak',
    lines: [
      "useEffect(() => {",
      "  socket.on('message', (msg) => {",
      "    setMessages(prev => [...prev, msg]);",
      "  });",
      "});",
    ],
    bugLine: 4,
    hint: "No cleanup function & missing deps — socket listener leaks on every render.",
  },
  {
    title: 'Object mutation in Redux reducer',
    lines: [
      "case 'INCREMENT':",
      "  state.value += 1;",
      "  return state;",
      "",
      "// Returning state after mutation",
    ],
    bugLine: 1,
    hint: "Direct state.value mutation breaks Redux immutability — same reference returned.",
  },
  {
    title: 'Key prop in list rendering',
    lines: [
      "items.map((item, index) => (",
      "  <ListItem",
      "    key={index}",
      "    value={item.value}",
      "  />",
    ],
    bugLine: 2,
    hint: "Using array index as key causes incorrect reconciliation when list order changes.",
  },
];

const DebugHuntGame: React.FC = () => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [startTime] = useState(Date.now());
  const [totalMs, setTotalMs] = useState(0);

  const current = DEBUG_ROUNDS[round];

  const handlePick = (lineIdx: number) => {
    if (selected !== null) return;
    setSelected(lineIdx);
    setShowHint(true);
    if (lineIdx === current.bugLine) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (round + 1 >= DEBUG_ROUNDS.length) {
        setTotalMs(Date.now() - startTime);
        setDone(true);
      } else {
        setRound(r => r + 1);
        setSelected(null);
        setShowHint(false);
      }
    }, 1200);
  };

  const restart = () => {
    setRound(0); setScore(0); setSelected(null);
    setShowHint(false); setDone(false);
  };

  if (done) {
    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>DEBUG HUNT — RESULTS</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 800, color: 'var(--amber)', lineHeight: 1 }}>
          {score}/{DEBUG_ROUNDS.length}
        </div>
        <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Completed in {(totalMs / 1000).toFixed(1)}s ·{' '}
          {score === 5 ? '🔥 SENIOR DEBUGGER' : score >= 3 ? '⚡ SOLID EYE' : '📚 Keep practicing'}
        </div>
        <button onClick={restart} className="btn-amber">PLAY AGAIN</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>DEBUG HUNT</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
            Click the buggy line
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <span style={{ color: 'var(--amber)' }}>ROUND {round + 1}/{DEBUG_ROUNDS.length}</span>
          <span style={{ color: 'var(--green)' }}>✓ {score}</span>
        </div>
      </div>

      <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)', borderLeft: '2px solid var(--amber)', paddingLeft: '10px' }}>
        {current.title}
      </div>

      {/* Code Lines */}
      <div style={{ background: '#000', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)' }}>
        {current.lines.map((line, i) => {
          const isBug = i === current.bugLine;
          const isPicked = selected === i;
          const isCorrectShown = selected !== null && isBug;
          const isWrongPick = isPicked && !isBug;

          return (
            <div
              key={i}
              onClick={() => handlePick(i)}
              style={{
                display: 'flex',
                alignItems: 'stretch',
                cursor: selected === null && line.trim() ? 'pointer' : 'default',
                background: isCorrectShown
                  ? 'rgba(34,197,94,0.12)'
                  : isWrongPick
                    ? 'rgba(239,68,68,0.12)'
                    : 'transparent',
                borderLeft: isCorrectShown
                  ? '2px solid var(--green)'
                  : isWrongPick
                    ? '2px solid var(--red)'
                    : '2px solid transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                if (selected === null && line.trim())
                  e.currentTarget.style.background = 'rgba(245,158,11,0.06)';
              }}
              onMouseLeave={e => {
                if (!isCorrectShown && !isWrongPick)
                  e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{
                width: '32px', flexShrink: 0, textAlign: 'right', paddingRight: '12px',
                paddingLeft: '8px', fontSize: '10px', color: '#333', paddingTop: '6px',
                paddingBottom: '6px',
              }}>
                {i + 1}
              </span>
              <span style={{
                fontSize: '11.5px', color: '#c9d1d9', lineHeight: '1.6',
                paddingTop: '6px', paddingBottom: '6px', paddingRight: '12px',
                flex: 1, whiteSpace: 'pre',
              }}>
                {line || ' '}
              </span>
            </div>
          );
        })}
      </div>

      {showHint && (
        <div style={{
          padding: '8px 12px',
          background: selected === current.bugLine ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
          border: `1px solid ${selected === current.bugLine ? 'var(--green)' : 'var(--red)'}`,
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: selected === current.bugLine ? 'var(--green)' : 'var(--red)',
        }}>
          {selected === current.bugLine ? `✓ Correct! ` : `✗ Wrong. `}{current.hint}
        </div>
      )}
    </div>
  );
};

// ─── GAME 4: KYC RUSH ────────────────────────────────────────────────────────
// Approve/Reject documents like boli.ae's Shufti KYC pipeline.

const KYC_DOCS = [
  { name: 'Mohammed Al Rashid', nationality: 'UAE', docType: 'Passport', expiry: '2027-03-15', dob: '1988-07-22', faceMatch: true, status: 'valid' },
  { name: 'Sarah Chen', nationality: 'Singapore', docType: 'Driver License', expiry: '2023-01-01', dob: '1995-04-10', faceMatch: true, status: 'expired' },
  { name: 'Omar Khalid', nationality: 'Jordan', docType: 'National ID', expiry: '2026-09-30', dob: '1990-11-05', faceMatch: false, status: 'mismatch' },
  { name: 'Priya Sharma', nationality: 'India', docType: 'Passport', expiry: '2028-05-20', dob: '1993-02-28', faceMatch: true, status: 'valid' },
  { name: 'James Wu', nationality: 'Hong Kong', docType: 'Passport', expiry: '2024-12-31', dob: '1985-09-14', faceMatch: true, status: 'expired' },
  { name: 'Fatima Al Zaabi', nationality: 'UAE', docType: 'National ID', expiry: '2029-06-10', dob: '1997-03-03', faceMatch: true, status: 'valid' },
  { name: 'Carlos Mendes', nationality: 'Brazil', docType: 'Passport', expiry: '2026-08-15', dob: '1991-06-19', faceMatch: false, status: 'mismatch' },
  { name: 'Aisha Nkrumah', nationality: 'Ghana', docType: 'Passport', expiry: '2025-11-22', dob: '1989-12-01', faceMatch: true, status: 'valid' },
  { name: 'Yuki Tanaka', nationality: 'Japan', docType: 'Residence Visa', expiry: '2022-07-01', dob: '1994-08-17', faceMatch: true, status: 'expired' },
  { name: 'Hassan Ali', nationality: 'Pakistan', docType: 'Passport', expiry: '2027-01-30', dob: '1987-05-25', faceMatch: true, status: 'valid' },
];

const KycRushGame: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const doc = KYC_DOCS[idx];
  const shouldApprove = doc.status === 'valid';

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(3);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleDecision('reject'); // auto-reject on timeout
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [idx]);

  useEffect(() => {
    if (started && !done) resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [idx, started]);

  const handleDecision = (decision: 'approve' | 'reject') => {
    if (result) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const correct = decision === (shouldApprove ? 'approve' : 'reject');
    setResult(correct ? 'correct' : 'wrong');
    setScore(s => s + (correct ? 1 : 0));
    setTimeout(() => {
      setResult(null);
      if (idx + 1 >= KYC_DOCS.length) { setDone(true); }
      else { setIdx(i => i + 1); }
    }, 900);
  };

  const restart = () => {
    setIdx(0); setScore(0); setDone(false);
    setResult(null); setStarted(false);
  };

  const expiryDate = new Date(doc.expiry);
  const today = new Date();
  const expired = expiryDate < today;

  if (done) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>KYC RUSH — RESULTS</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '56px', fontWeight: 800, color: 'var(--amber)', lineHeight: 1 }}>
          {score}/{KYC_DOCS.length}
        </div>
        <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {score === 10 ? '🔥 COMPLIANCE OFFICER LEVEL' : score >= 7 ? '⚡ SOLID KYC EYE' : '📋 Keep reviewing the docs'}
        </div>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Powered by boli.ae Shufti pipeline logic</div>
        <button onClick={restart} className="btn-amber" style={{ marginTop: '8px' }}>REVIEW AGAIN</button>
      </div>
    );
  }

  if (!started) {
    return (
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>KYC RUSH</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>
          Review documents. Approve valid ones.<br />Reject expired or face-mismatched IDs.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div>✓ Document not expired → APPROVE</div>
          <div>✗ Expired document → REJECT</div>
          <div>✗ Face mismatch → REJECT</div>
          <div style={{ color: 'var(--amber)' }}>⏱ 3 seconds per document</div>
        </div>
        <button onClick={() => setStarted(true)} className="btn-amber">START PROCESSING ▶</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>KYC RUSH — BOLI.AE</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Approve valid · Reject flagged</div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
          <span style={{ color: 'var(--amber)' }}>✓ {score}</span>
          <span style={{ color: 'var(--text-dim)' }}>{idx + 1}/{KYC_DOCS.length}</span>
          <span style={{
            color: timeLeft <= 1 ? 'var(--red)' : timeLeft === 2 ? '#f97316' : 'var(--green)',
            fontWeight: 800,
          }}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ height: '3px', background: 'var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${(timeLeft / 3) * 100}%`,
          background: timeLeft <= 1 ? 'var(--red)' : timeLeft === 2 ? '#f97316' : 'var(--amber)',
          transition: 'width 1s linear, background 0.3s',
        }} />
      </div>

      {/* Document Card */}
      <div style={{
        background: '#000',
        border: `1px solid ${result === 'correct' ? 'var(--green)' : result === 'wrong' ? 'var(--red)' : 'var(--border)'}`,
        padding: '20px',
        transition: 'border-color 0.2s',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
      }}>
        {/* Left: Doc type header */}
        <div style={{ gridColumn: '1 / -1', paddingBottom: '14px', marginBottom: '14px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: 'var(--text)' }}>{doc.docType}</div>
            <div className="mono" style={{ fontSize: '9px', color: 'var(--amber)', letterSpacing: '0.15em', marginTop: '2px' }}>UAE PROPERTY PLATFORM · SHUFTI PRO</div>
          </div>
          <div className="mono" style={{ fontSize: '9px', padding: '4px 10px', border: '1px solid var(--border)', color: 'var(--text-dim)' }}>ID-{String(idx + 1).padStart(4, '0')}</div>
        </div>

        {/* Fields */}
        {[
          { label: 'Full Name', value: doc.name },
          { label: 'Nationality', value: doc.nationality },
          { label: 'Date of Birth', value: doc.dob },
          { label: 'Doc Expiry', value: doc.expiry, flag: expired ? 'EXPIRED' : '' },
          { label: 'Face Match', value: doc.faceMatch ? 'MATCHED' : 'MISMATCH', flag: !doc.faceMatch ? 'FAIL' : '' },
          { label: 'AML Status', value: 'CLEAR' },
        ].map((f, fi) => (
          <div key={fi} style={{ padding: '8px 12px', borderRight: fi % 2 === 0 ? '1px solid var(--border)' : 'none', borderBottom: fi < 4 ? '1px solid var(--border)' : 'none' }}>
            <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '4px', color: f.flag ? 'var(--red)' : 'var(--text)', fontWeight: f.flag ? 700 : 400 }}>
              {f.value}
              {f.flag && <span style={{ marginLeft: '8px', fontSize: '9px', background: 'rgba(239,68,68,0.15)', padding: '2px 6px', color: 'var(--red)' }}>⚠ {f.flag}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          onClick={() => handleDecision('reject')}
          style={{
            padding: '14px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: 'var(--red)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
        >
          ✗ REJECT
        </button>
        <button
          onClick={() => handleDecision('approve')}
          style={{
            padding: '14px',
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.3)',
            color: 'var(--green)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(34,197,94,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(34,197,94,0.08)')}
        >
          ✓ APPROVE
        </button>
      </div>

      {result && (
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: result === 'correct' ? 'var(--green)' : 'var(--red)' }}>
          {result === 'correct' ? '✓ CORRECT DECISION' : '✗ WRONG — Re-read the doc!'}
        </div>
      )}
    </div>
  );
};

// ─── GAME 5: WS REACTION ──────────────────────────────────────────────────────
// A ping dot appears at random positions — click it instantly.
// Measures reaction time in ms. Themed as Coinroutes WebSocket latency benchmark.

const WsReactionGame: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'waiting' | 'ping' | 'early' | 'done'>('idle');
  const [dotPos, setDotPos] = useState({ x: 50, y: 50 });
  const [times, setTimes] = useState<number[]>([]);
  const [pingStart, setPingStart] = useState(0);
  const [round, setRound] = useState(0);
  const TOTAL = 8;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setTimes([]); setRound(0); setPhase('waiting');
    schedulePing();
  };

  const schedulePing = () => {
    const delay = 1000 + Math.random() * 2000;
    timeoutRef.current = setTimeout(() => {
      setDotPos({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      });
      setPingStart(performance.now());
      setPhase('ping');
    }, delay);
  };

  const handleAreaClick = () => {
    if (phase === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('early');
      setTimeout(() => { setPhase('waiting'); schedulePing(); }, 900);
    }
  };

  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (phase !== 'ping') return;
    const elapsed = Math.round(performance.now() - pingStart);
    const newTimes = [...times, elapsed];
    setTimes(newTimes);
    const newRound = round + 1;
    setRound(newRound);
    setPhase('waiting');
    if (newRound >= TOTAL) {
      setTimeout(() => setPhase('done'), 200);
    } else {
      schedulePing();
    }
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const best = times.length ? Math.min(...times) : 0;

  const getRating = (ms: number) => {
    if (ms < 120) return { label: '🔥 WebSocket Native', color: 'var(--green)' };
    if (ms < 200) return { label: '⚡ Below WS SLA', color: 'var(--amber)' };
    if (ms < 350) return { label: '📡 REST Territory', color: '#f97316' };
    return { label: '🐢 Use a CDN', color: 'var(--red)' };
  };

  if (phase === 'done') {
    const rating = getRating(avg);
    return (
      <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>WS REACTION — LATENCY REPORT</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', width: '100%', maxWidth: '360px', border: '1px solid var(--border)' }}>
          <div style={{ padding: '20px', borderRight: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 800, color: 'var(--amber)', lineHeight: 1 }}>{avg}ms</div>
            <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '6px', letterSpacing: '0.1em' }}>AVG LATENCY</div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 800, color: 'var(--green)', lineHeight: 1 }}>{best}ms</div>
            <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '6px', letterSpacing: '0.1em' }}>BEST PING</div>
          </div>
        </div>
        {/* Per-round breakdown */}
        <div style={{ width: '100%', maxWidth: '360px', border: '1px solid var(--border)', background: '#000' }}>
          {times.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '5px 12px', borderBottom: i < times.length - 1 ? '1px solid #111' : 'none' }}>
              <span className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)', width: '20px' }}>#{i + 1}</span>
              <div style={{ flex: 1, height: '4px', background: '#1a1a1a', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.min((t / 600) * 100, 100)}%`, background: t < 150 ? 'var(--green)' : t < 300 ? 'var(--amber)' : 'var(--red)' }} />
              </div>
              <span className="mono" style={{ fontSize: '10px', fontWeight: 700, color: t < 150 ? 'var(--green)' : t < 300 ? 'var(--amber)' : 'var(--red)', width: '48px', textAlign: 'right' }}>{t}ms</span>
            </div>
          ))}
        </div>
        <div className="mono" style={{ fontSize: '13px', fontWeight: 800, color: rating.color }}>{rating.label}</div>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>Coinroutes WS target: &lt;50ms · REST baseline: ~750ms</div>
        <button onClick={start} className="btn-amber">BENCHMARK AGAIN</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '0.15em' }}>WS REACTION TEST — COINROUTES</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Click the ping dot the moment it appears</div>
        </div>
        {phase !== 'idle' && (
          <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            <span style={{ color: 'var(--amber)' }}>ROUND {round + 1}/{TOTAL}</span>
            {times.length > 0 && <span style={{ color: 'var(--text-muted)' }}>AVG {Math.round(times.reduce((a, b) => a + b, 0) / times.length)}ms</span>}
          </div>
        )}
      </div>

      {/* Game arena */}
      <div
        onClick={handleAreaClick}
        style={{
          position: 'relative',
          height: '280px',
          background: '#000',
          border: '1px solid var(--border)',
          cursor: phase === 'ping' ? 'crosshair' : 'default',
          overflow: 'hidden',
        }}
      >
        {/* Grid lines */}
        {[...Array(6)].map((_, i) => (
          <div key={`v${i}`} style={{ position: 'absolute', left: `${(i + 1) * (100 / 7)}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.03)' }} />
        ))}
        {[...Array(4)].map((_, i) => (
          <div key={`h${i}`} style={{ position: 'absolute', top: `${(i + 1) * 25}%`, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.03)' }} />
        ))}

        {phase === 'idle' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Test your reaction time</div>
            <button onClick={(e) => { e.stopPropagation(); start(); }} className="btn-amber">RUN BENCHMARK ▶</button>
          </div>
        )}

        {phase === 'waiting' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="mono" style={{ fontSize: '11px', color: 'var(--text-dim)', animation: 'blink 1.2s step-end infinite' }}>WAITING FOR PING...</div>
          </div>
        )}

        {phase === 'early' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="mono" style={{ fontSize: '12px', color: 'var(--red)', fontWeight: 700 }}>⚠ TOO EARLY — Wait for the dot!</div>
          </div>
        )}

        {phase === 'ping' && (
          <button
            onClick={handleDotClick}
            style={{
              position: 'absolute',
              left: `${dotPos.x}%`,
              top: `${dotPos.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--amber)',
              border: 'none',
              cursor: 'crosshair',
              boxShadow: '0 0 20px var(--amber), 0 0 40px rgba(245,158,11,0.4)',
              animation: 'ping-appear 0.08s ease-out',
            }}
          />
        )}

        {/* Last time overlay */}
        {times.length > 0 && phase === 'waiting' && (
          <div style={{ position: 'absolute', bottom: '10px', right: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)' }}>
            Last: <span style={{ color: times[times.length - 1] < 200 ? 'var(--green)' : 'var(--amber)', fontWeight: 700 }}>{times[times.length - 1]}ms</span>
          </div>
        )}
      </div>

      {/* Benchmark bar */}
      {phase !== 'idle' && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-dim)', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: 'var(--green)' }}>■ WS &lt;50ms</span>
          <span style={{ color: 'var(--amber)' }}>■ GOOD &lt;200ms</span>
          <span style={{ color: '#f97316' }}>■ REST &lt;400ms</span>
          <span style={{ color: 'var(--red)' }}>■ SLOW 400ms+</span>
        </div>
      )}
    </div>
  );
};

// ─── MAIN MINIGAMES SECTION ────────────────────────────────────────────────────

const GAMES = [
  { id: 'sniper', label: 'Trade Sniper', sub: 'Order Book Timing' },
  { id: 'stack', label: 'Stack Catcher', sub: 'Falling Skills Arcade' },
  { id: 'debug', label: 'Debug Hunt', sub: 'Spot the Bug' },
  { id: 'kyc', label: 'KYC Rush', sub: 'boli.ae Doc Review' },
  { id: 'ws', label: 'WS Reaction', sub: 'Coinroutes Ping Test' },
];

export const MiniGames: React.FC = () => {
  const [active, setActive] = useState('sniper');

  return (
    <section id="games" style={{ borderBottom: '1px solid var(--border)' }}>
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
            <span className="section-index">03</span>
            <span className="amber-line" />
          </div>
          <h2 className="headline-md">Mini Games</h2>
        </div>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
          5 Games · All Work-Inspired
        </div>
      </div>

      {/* Game Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
        {GAMES.map(g => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            style={{
              flex: 1,
              minWidth: '120px',
              padding: '14px 20px',
              background: active === g.id ? 'var(--bg-2)' : 'transparent',
              borderRight: '1px solid var(--border)',
              borderBottom: active === g.id ? '2px solid var(--amber)' : '2px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.15s',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              color: active === g.id ? 'var(--amber)' : 'var(--text-muted)',
            }}>
              {g.label}
            </div>
            <div className="mono" style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '2px', letterSpacing: '0.08em' }}>
              {g.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Game Area */}
      <div style={{ minHeight: '360px', background: 'var(--bg-1)' }}>
        {active === 'sniper' && <TradeSniperGame />}
        {active === 'stack' && <StackCatcherGame />}
        {active === 'debug' && <DebugHuntGame />}
        {active === 'kyc' && <KycRushGame />}
        {active === 'ws' && <WsReactionGame />}
      </div>
    </section>
  );
};
