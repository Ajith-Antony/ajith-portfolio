import React, { useState } from 'react';
import {
  TrendingUp, Shield, CheckCircle2, Zap, BarChart2,
  Building2, UserCheck, Layers, ArrowDownUp, RefreshCw, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coinroutes' | 'boli' | 'tnc'>('coinroutes');

  // boli.ae Proptech valuation simulator state
  const [propSqft, setPropSqft] = useState(1450);
  const [locationZone, setLocationZone] = useState<'dubai_marina' | 'business_bay' | 'downton'>('dubai_marina');
  const [kycStep, setKycStep] = useState(1);

  // TNC DEX Swap state
  const [fromAmount, setFromAmount] = useState("1.5");
  const [isSwapping, setIsSwapping] = useState(false);

  // Proptech price calculation
  const getValuation = () => {
    const rateMap = { dubai_marina: 1850, business_bay: 1620, downton: 2400 };
    const baseVal = propSqft * rateMap[locationZone];
    return baseVal.toLocaleString();
  };

  const handleSimulateKyc = () => {
    setKycStep(1);
    setTimeout(() => setKycStep(2), 600);
    setTimeout(() => setKycStep(3), 1200);
    setTimeout(() => {
      setKycStep(4);
      confetti({ particleCount: 30, spread: 40 });
    }, 1800);
  };

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      confetti({ particleCount: 35, spread: 50 });
    }, 1000);
  };

  return (
    <section id="demos" className="py-20 md:py-32 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Mosey style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>LIVE ARCHITECTURE DEMOS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
              Interactive Production Highlights
            </h2>
            <p className="text-base text-slate-400 max-w-2xl">
              Explore hands-on interactive mini-widgets demonstrating the actual systems, WebSockets, KYC pipelines, and DEX interfaces built by Ajith.
            </p>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('coinroutes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'coinroutes'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Coinroutes Trading</span>
            </button>

            <button
              onClick={() => setActiveTab('boli')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'boli'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>boli.ae PropTech</span>
            </button>

            <button
              onClick={() => setActiveTab('tnc')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tnc'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>TNC Web3 & DEX</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Coinroutes Trading Terminal */}
        {activeTab === 'coinroutes' && (
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    Coinroutes • Institutional Trading Platform
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                    Real-Time Order Books & Chart Synchronization
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Engineered sub-50ms live order books handling thousands of high-frequency price updates per second. Migrated REST polling to WebSocket streaming and replaced heavy TradingView charts with Lightweight Charts for 4x faster rendering.
                </p>

                {/* Key Technical Metric Badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xl font-extrabold font-mono text-emerald-400">4x Faster</div>
                    <div className="text-xs text-slate-400">Initial Chart Load Speed</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xl font-extrabold font-mono text-emerald-400">-60%</div>
                    <div className="text-xs text-slate-400">Backend Server Load</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Migrated full codebase from JavaScript to TypeScript</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Redux Saga to Redux Toolkit modernization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ag-Grid server-side virtual layout integration</span>
                  </li>
                </ul>
              </div>

              {/* Live Interactive Benchmark Visualizer */}
              <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                      <BarChart2 className="w-4 h-4 text-emerald-400" />
                      <span>PERFORMANCE BENCHMARK AUDIT</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Live Comparison</span>
                  </div>

                  {/* Latency Comparison Graph Bar */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                        <span>REST Polling Architecture (Legacy)</span>
                        <span className="text-amber-400">650ms Latency</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-amber-500/80 rounded-full w-[85%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                        <span>WebSocket Streaming (Ajith Architecture)</span>
                        <span className="text-emerald-400 font-bold">12ms Latency</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-900 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[15%] animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Chart Load Comparison */}
                  <div className="pt-4 space-y-3 border-t border-slate-900">
                    <div className="text-xs font-mono text-slate-400 font-semibold uppercase">
                      Chart Component Render Benchmark:
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                        <span className="block text-slate-400 text-[11px]">TradingView Advanced</span>
                        <span className="text-base font-bold text-slate-300 mt-1 block">1,420 ms</span>
                        <span className="text-[10px] text-slate-500">Heavy Bundle (840kb)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                        <span className="block text-emerald-400 text-[11px]">Lightweight Charts</span>
                        <span className="text-base font-bold text-emerald-300 mt-1 block">310 ms</span>
                        <span className="text-[10px] text-emerald-400/80 font-bold">4.5x Render Speedup</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-xs font-mono text-slate-400 flex items-center justify-between">
                  <span>Tech: React • TypeScript • WebSockets • Redux Toolkit</span>
                  <span className="text-emerald-400">Verified</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: boli.ae PropTech & Shufti KYC */}
        {activeTab === 'boli' && (
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    boli.ae • PropTech & Automated Valuation
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                    Automated Valuation & KYC Onboarding
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Spearheaded frontend architecture for Dubai property valuation workflows, automated Power of Attorney (POA) payments, and real-time Shufti KYC identity verification.
                </p>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-slate-400 font-bold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>REGULATORY COMPLIANCE INTEGRATION</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Seamless biometric facial matching, passport OCR extraction, and instant AML background checks integrated via Shufti API pipelines.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xl font-extrabold font-mono text-emerald-400">85%</div>
                    <div className="text-xs text-slate-400">Core Web Vitals Gain</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xl font-extrabold font-mono text-emerald-400">100%</div>
                    <div className="text-xs text-slate-400">UAE Regulatory Compliant</div>
                  </div>
                </div>
              </div>

              {/* Live Interactive Property & KYC Simulator */}
              <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-6">
                
                {/* Simulator 1: Property Valuation Widget */}
                <div className="space-y-4 pb-6 border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span>DUBAI PROPERTY VALUATION CALCULATOR</span>
                    </span>
                    <span className="text-xs font-mono text-emerald-400">Live Estimate</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1 font-mono">Location Zone</label>
                      <select
                        value={locationZone}
                        onChange={(e) => setLocationZone(e.target.value as any)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="dubai_marina">Dubai Marina (1,850 AED/sqft)</option>
                        <option value="business_bay">Business Bay (1,620 AED/sqft)</option>
                        <option value="downton">Downtown Dubai (2,400 AED/sqft)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1 font-mono">
                        Built-Up Area: <span className="text-emerald-400 font-bold">{propSqft} sq.ft</span>
                      </label>
                      <input
                        type="range"
                        min="500"
                        max="5000"
                        step="50"
                        value={propSqft}
                        onChange={(e) => setPropSqft(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">Estimated Property Value</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-emerald-300 font-display">
                        {getValuation()} AED
                      </span>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md hover:bg-emerald-400 transition-colors">
                      Process POA
                    </button>
                  </div>
                </div>

                {/* Simulator 2: Shufti KYC Pipeline Visualizer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>SHUFTI KYC IDENTITY PIPELINE</span>
                    </span>
                    <button
                      onClick={handleSimulateKyc}
                      className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-400"
                    >
                      Run Verification Test
                    </button>
                  </div>

                  {/* Stage Progress Bar */}
                  <div className="grid grid-cols-4 gap-2 text-center font-mono text-[11px]">
                    <div className={`p-2 rounded-lg border transition-all ${
                      kycStep >= 1 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      1. Doc Upload
                    </div>
                    <div className={`p-2 rounded-lg border transition-all ${
                      kycStep >= 2 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      2. OCR Check
                    </div>
                    <div className={`p-2 rounded-lg border transition-all ${
                      kycStep >= 3 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      3. Biometric
                    </div>
                    <div className={`p-2 rounded-lg border transition-all ${
                      kycStep >= 4 ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      4. Verified
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 3: TNC IT Solutions Web3 & DEX */}
        {activeTab === 'tnc' && (
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    TNC IT Solutions • Web3 & Decentralized Exchange
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
                    150k+ User NFT Marketplace & DEX Interface
                  </h3>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Architected production NFT marketplaces, multi-chain wallet integrations (WalletConnect / Web3.js), and real-time Socket.IO trade order notifications serving 150,000+ active users.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xl font-extrabold font-mono text-emerald-400">150,000+</div>
                    <div className="text-xs text-slate-400">Active Web3 Traders</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xl font-extrabold font-mono text-emerald-400">45%</div>
                    <div className="text-xs text-slate-400">Scanner Latency Drop</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Real-time decentralized trading & liquidity pool views</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Multi-chain blockchain scanner UI performance optimization</span>
                  </li>
                </ul>
              </div>

              {/* Live Interactive DEX Swap Visualizer */}
              <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                    <ArrowDownUp className="w-4 h-4 text-emerald-400" />
                    <span>DEX TOKEN SWAP WIDGET SIMULATOR</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400">Low-Slippage Routing</span>
                </div>

                {/* Swap Box */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">You Pay</span>
                      <input
                        type="number"
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="bg-transparent text-xl font-extrabold text-slate-100 font-mono w-28 focus:outline-none"
                      />
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-emerald-400 border border-slate-700">
                      ETH
                    </span>
                  </div>

                  <div className="flex justify-center -my-2">
                    <div className="p-2 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
                      <ArrowDownUp className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">You Receive (Estimated)</span>
                      <span className="text-xl font-extrabold text-emerald-300 font-mono">
                        {(Number(fromAmount || 0) * 3420.50).toLocaleString()} USDT
                      </span>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-emerald-400 border border-slate-700">
                      USDT
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Network Gas: <strong className="text-slate-200">~$1.85</strong></span>
                  <span>Slippage Tolerance: <strong className="text-emerald-400">0.5%</strong></span>
                </div>

                <button
                  onClick={handleSwap}
                  disabled={isSwapping}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {isSwapping ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Broadcasting Transaction...</span>
                    </>
                  ) : (
                    <>
                      <span>Execute DEX Swap</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
