import React, { useState, useEffect, useRef } from 'react';

const SNIPPETS = [
  {
    id: 'ws-engine',
    file: 'WebSocketOrderBookEngine.ts',
    desc: 'Sub-50ms buffer-flush streaming engine — Coinroutes',
    code: `// Coinroutes: High-frequency order book streaming
// Key: batch DOM updates at 60fps via rAF, not per-message
export class WebSocketOrderBookEngine {
  private socket: WebSocket | null = null;
  private bufferQueue = new Map<number, number>();
  private flushTimer: number | null = null;

  constructor(
    private readonly url: string,
    private readonly store: ReduxStore
  ) {}

  connect(): void {
    this.socket = new WebSocket(this.url);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onmessage = (event: MessageEvent) => {
      const { price, size } = JSON.parse(event.data);
      // Merge duplicate price levels before flushing
      this.bufferQueue.set(price, size);

      if (!this.flushTimer) {
        this.flushTimer = requestAnimationFrame(
          () => this.flushBuffer()
        );
      }
    };
  }

  private flushBuffer(): void {
    if (this.bufferQueue.size > 0) {
      this.store.dispatch(
        updateOrderBookDelta(
          Array.from(this.bufferQueue.entries())
        )
      );
      this.bufferQueue.clear();
    }
    this.flushTimer = null;
  }

  disconnect(): void {
    this.socket?.close();
    if (this.flushTimer) cancelAnimationFrame(this.flushTimer);
  }
}`,
  },
  {
    id: 'kyc-pipeline',
    file: 'useBoliKycPipeline.ts',
    desc: 'Shufti KYC real-time verification hook — boli.ae',
    code: `// boli.ae: Shufti KYC pipeline with UAE regulatory compliance
// Handles OCR extraction → biometric liveness → AML check
import { useState, useCallback } from 'react';
import { ShuftiService } from '@/services/shufti';
import { useToast } from '@/hooks/useToast';

type Stage =
  | 'IDLE'
  | 'UPLOADING'
  | 'OCR_EXTRACT'
  | 'LIVENESS_CHECK'
  | 'AML_SCREEN'
  | 'APPROVED'
  | 'REJECTED';

export function useBoliKycPipeline(userId: string) {
  const [stage, setStage] = useState<Stage>('IDLE');
  const [referenceId, setReferenceId] = useState<string>();
  const { toast } = useToast();

  const verify = useCallback(async (
    document: File,
    selfie: File
  ) => {
    try {
      setStage('UPLOADING');
      const { docRef } = await ShuftiService.uploadDocument(
        document, userId
      );

      setStage('OCR_EXTRACT');
      const ocrResult = await ShuftiService.runOcr(docRef);
      if (!ocrResult.isValid) throw new Error('OCR_FAILED');

      setStage('LIVENESS_CHECK');
      const liveness = await ShuftiService.verifyLiveness(
        selfie, ocrResult.faceRef
      );

      setStage('AML_SCREEN');
      const aml = await ShuftiService.amlScreening({
        name: ocrResult.fullName,
        dob: ocrResult.dateOfBirth,
        nationality: ocrResult.nationality,
      });

      if (liveness.matched && aml.clear) {
        setStage('APPROVED');
        setReferenceId(liveness.referenceId);
        return { success: true, referenceId: liveness.referenceId };
      } else {
        setStage('REJECTED');
        toast.error('Verification could not be completed');
      }
    } catch (error) {
      setStage('IDLE');
      throw error;
    }
  }, [userId]);

  return { stage, referenceId, verify };
}`,
  },
  {
    id: 'dex-swap',
    file: 'useDexSwapRouter.ts',
    desc: 'DEX swap router with slippage protection — TNC IT',
    code: `// TNC IT Solutions: Web3 DEX swap with auto-slippage
// Works across ETH, BSC, Polygon via chain-agnostic router
import { useCallback } from 'react';
import { useContractWrite, usePublicClient } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

interface SwapParams {
  fromToken: \`0x\${string}\`;
  toToken: \`0x\${string}\`;
  amountIn: string;
  slippageBps?: number; // basis points, default 50 = 0.5%
}

export function useDexSwapRouter(routerAddress: \`0x\${string}\`) {
  const publicClient = usePublicClient();
  const { writeContractAsync } = useContractWrite();

  const estimateSlippage = useCallback(async (
    params: SwapParams
  ): Promise<bigint> => {
    const amountIn = parseUnits(params.amountIn, 18);
    // Query on-chain price impact before committing gas
    const [, estimatedOut] = await publicClient.readContract({
      address: routerAddress,
      abi: ROUTER_ABI,
      functionName: 'getAmountsOut',
      args: [amountIn, [params.fromToken, params.toToken]],
    });

    const bps = params.slippageBps ?? 50;
    return estimatedOut * BigInt(10000 - bps) / BigInt(10000);
  }, [publicClient, routerAddress]);

  const executeSwap = useCallback(async (
    params: SwapParams
  ) => {
    const amountIn = parseUnits(params.amountIn, 18);
    const minOut = await estimateSlippage(params);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);

    return writeContractAsync({
      address: routerAddress,
      abi: ROUTER_ABI,
      functionName: 'swapExactTokensForTokens',
      args: [amountIn, minOut, [params.fromToken, params.toToken],
             '0x...userAddress', deadline],
    });
  }, [estimateSlippage, writeContractAsync, routerAddress]);

  return { executeSwap };
}`,
  },
];

const CLI_COMMANDS: Record<string, string[]> = {
  help: [
    '  boli        → boli.ae architecture stats',
    '  coinroutes  → trading platform metrics',
    '  skills      → full tech stack',
    '  exp         → years of experience',
    '  clear       → clear terminal',
  ],
  boli: [
    '  BOLI.AE FRONTEND ARCHITECTURE AUDIT',
    '  ─────────────────────────────────────',
    '  Ownership:      100% (zero to production)',
    '  Stack:          Next.js · React · TypeScript',
    '  KYC Pipeline:   Shufti → Real-time biometric',
    '  Core Web Vitals boost: +85%',
    '  Payments:       POA digital gateway (AED)',
    '  Status:         ✓ Live in UAE',
  ],
  coinroutes: [
    '  COINROUTES TRADING PLATFORM METRICS',
    '  ─────────────────────────────────────',
    '  WS Latency:     ~12ms (sub-50ms SLA)',
    '  Charts:         4x faster (Lightweight Charts)',
    '  Server load:    ↓60% (WS vs REST polling)',
    '  State arch:     Redux Saga → RTK migration',
    '  Grid:           Ag-Grid enterprise server-side',
  ],
  skills: [
    '  CORE STACK',
    '  React 19 · Next.js · TypeScript · TailwindCSS',
    '  REAL-TIME',
    '  WebSockets · Socket.IO · Lightweight Charts · Ag-Grid',
    '  WEB3 / INTEGRATIONS',
    '  WalletConnect · Shufti KYC · Payment Gateways',
    '  TOOLING',
    '  GSAP · Three.js · Redux Toolkit · Vite',
  ],
  exp: [
    '  6+ years · Senior Frontend Engineer',
    '  PropTech · FinTech · Web3 · SaaS',
    '  Dubai, UAE · Open to remote',
    '  ajithpallisseryantony@gmail.com',
  ],
};

export const CodeInspector: React.FC = () => {
  const [selected, setSelected] = useState(SNIPPETS[0]);
  const [copied, setCopied] = useState(false);

  const [cliInput, setCliInput] = useState('');
  const [cliLines, setCliLines] = useState([
    'ajith@portfolio:~$ System online.',
    'Type "help" for available commands.',
  ]);
  const cliEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cliEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cliLines]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selected.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCli = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    const inputLine = `ajith@portfolio:~$ ${cmd}`;
    if (cmd === 'clear') {
      setCliLines([]);
    } else {
      const response = CLI_COMMANDS[cmd] || [`  bash: ${cmd}: command not found. Try "help".`];
      setCliLines(prev => [...prev, inputLine, ...response]);
    }
    setCliInput('');
  };

  return (
    <section id="code" style={{ borderBottom: '1px solid var(--border)' }}>
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
          <h2 className="headline-md">Code Architecture</h2>
        </div>
        <div className="mono" style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
          Production TypeScript · Interactive CLI
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left: Code Inspector */}
        <div style={{ borderRight: '1px solid var(--border)' }}>
          {/* File Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            overflowX: 'auto',
          }}>
            {SNIPPETS.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                style={{
                  padding: '10px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.05em',
                  background: selected.id === s.id ? 'var(--bg-2)' : 'transparent',
                  color: selected.id === s.id ? 'var(--amber)' : 'var(--text-dim)',
                  borderRight: '1px solid var(--border)',
                  borderBottom: selected.id === s.id ? '1px solid var(--bg-2)' : 'none',
                  marginBottom: selected.id === s.id ? '-1px' : '0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}
              >
                {s.file}
              </button>
            ))}
          </div>

          {/* Description + Copy */}
          <div style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              {selected.desc}
            </span>
            <button
              onClick={handleCopy}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                padding: '4px 10px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: copied ? 'var(--amber)' : 'var(--text-dim)',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                transition: 'color 0.15s',
              }}
            >
              {copied ? 'COPIED ✓' : 'COPY'}
            </button>
          </div>

          {/* Code Block */}
          <div style={{
            background: '#000',
            padding: '20px',
            overflowX: 'auto',
            overflowY: 'auto',
            maxHeight: '460px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11.5px',
            lineHeight: '1.65',
            color: '#c9d1d9',
          }}>
            <pre style={{ margin: 0, whiteSpace: 'pre' }}>
              {selected.code.split('\n').map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ color: '#444', userSelect: 'none', minWidth: '24px', textAlign: 'right' }}>
                    {i + 1}
                  </span>
                  <span style={{ color: colorize(line) }}>{line || ' '}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Right: CLI Terminal */}
        <div className="terminal" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Terminal Top Bar */}
          <div className="terminal-bar">
            <div className="terminal-dot" style={{ background: '#ff5f56' }} />
            <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
            <div className="terminal-dot" style={{ background: '#27c93f' }} />
            <span style={{
              marginLeft: '8px',
              fontSize: '10px',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
            }}>
              ajith-antony — interactive cli
            </span>
          </div>

          {/* Terminal Output */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            maxHeight: '420px',
            fontSize: '12px',
            lineHeight: '1.7',
            color: '#888',
            fontFamily: 'var(--font-mono)',
          }}>
            {cliLines.map((line, i) => (
              <div
                key={i}
                style={{
                  color: line.startsWith('ajith@') ? '#27c93f'
                    : line.startsWith('  →') || line.includes('✓') ? 'var(--amber)'
                    : '#888',
                }}
              >
                {line}
              </div>
            ))}
            <div ref={cliEndRef} />
          </div>

          {/* Terminal Input */}
          <form
            onSubmit={handleCli}
            style={{
              borderTop: '1px solid #1a1a1a',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: '#27c93f', fontSize: '12px', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
              ajith@portfolio:~$
            </span>
            <input
              value={cliInput}
              onChange={e => setCliInput(e.target.value)}
              placeholder="type a command..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ccc',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
              }}
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              style={{
                background: 'var(--amber)',
                border: 'none',
                color: '#000',
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 700,
                padding: '4px 10px',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              RUN
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Simple syntax highlight by color
function colorize(line: string): string {
  if (line.trimStart().startsWith('//')) return '#6a737d';
  if (line.includes('import') || line.includes('export')) return '#ff7b72';
  if (line.includes('const') || line.includes('let') || line.includes('return') ||
      line.includes('async') || line.includes('await') || line.includes('new') ||
      line.includes('private') || line.includes('public') || line.includes('interface') ||
      line.includes('type') || line.includes('class')) return '#ff7b72';
  return '#c9d1d9';
}
