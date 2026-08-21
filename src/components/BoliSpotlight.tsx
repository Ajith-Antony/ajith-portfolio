import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, ExternalLink, Award, CheckCircle2,
  Clock, Flame, Scale
} from 'lucide-react';
import { playBidSound, playClickSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface BidItem {
  id: string;
  bidder: string;
  amount: number;
  time: string;
  isUser?: boolean;
}

export const BoliSpotlight: React.FC = () => {
  // Auction Simulator State
  const [currentPrice, setCurrentPrice] = useState(4350000);
  const [bids, setBids] = useState<BidItem[]>([
    { id: 'b1', bidder: 'Al-Mansoor Investments', amount: 4350000, time: '10 secs ago' },
    { id: 'b2', bidder: 'Emaar Premier Buyer', amount: 4300000, time: '45 secs ago' },
    { id: 'b3', bidder: 'Dubai Marina Trustee', amount: 4250000, time: '2 mins ago' },
  ]);
  const [userBidIncrement, setUserBidIncrement] = useState(50000);
  const [timeLeft, setTimeLeft] = useState(184); // 3 mins 4 secs

  // Valuation calculator state
  const [areaSqft, setAreaSqft] = useState(2100);
  const [selectedZone, setSelectedZone] = useState<'dubai_hills' | 'palm' | 'downtown'>('dubai_hills');

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Place User Bid
  const handlePlaceBid = () => {
    playBidSound();
    const newPrice = currentPrice + userBidIncrement;
    setCurrentPrice(newPrice);
    const newBidItem: BidItem = {
      id: `user-${Date.now()}`,
      bidder: 'You (Verified Buyer)',
      amount: newPrice,
      time: 'Just now',
      isUser: true,
    };
    setBids([newBidItem, ...bids]);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const getEstimatedValuation = () => {
    const rates = { dubai_hills: 2150, palm: 3600, downtown: 2850 };
    return (areaSqft * rates[selectedZone]).toLocaleString();
  };

  return (
    <section id="boli-spotlight" className="py-24 md:py-36 bg-slate-950 relative overflow-hidden border-t border-emerald-500/30">
      
      {/* Background Neon Spotlight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flagship Header Banner */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-slate-900/90 via-slate-950 to-emerald-950/20 shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-extrabold tracking-wider">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>FLAGSHIP FEAT — 100% FRONTEND ARCHITECTURE</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
                  Market Live in UAE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
                boli.ae — End-to-End PropTech Platform
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                Ajith spearheaded 100% of the frontend engineering architecture from initial wireframes to UAE market delivery for <a href="https://boli.ae/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold underline hover:text-emerald-300">boli.ae</a>—building real-time auction bidding engines, Shufti KYC compliance flows, automated POA payments, and overcoming complex SEO bottlenecks.
              </p>

              <div className="flex items-center gap-4 flex-wrap pt-2">
                <a
                  href="https://boli.ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="EXPLORE"
                  onClick={playClickSound}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-all"
                >
                  <span>Visit boli.ae Production Site</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-6 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Zero-to-Launch Ownership</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>UAE Legal Compliance</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 shrink-0 lg:w-72">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
                <div className="text-2xl font-extrabold font-mono text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">Frontend Ownership</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
                <div className="text-2xl font-extrabold font-mono text-emerald-400">+85%</div>
                <div className="text-xs text-slate-400 mt-1">SEO Discoverability</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
                <div className="text-2xl font-extrabold font-mono text-emerald-400">&lt;50ms</div>
                <div className="text-xs text-slate-400 mt-1">Bid Stream Sync</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-center">
                <div className="text-2xl font-extrabold font-mono text-emerald-400">Instant</div>
                <div className="text-xs text-slate-400 mt-1">Shufti KYC Verification</div>
              </div>
            </div>

          </div>
        </div>

        {/* Live Interactive Property Auction & Bidding Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Auction & Bidding Engine Simulator */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Flame className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-100 text-lg">
                    Live Dubai Real Estate Bidding Engine
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Interactive simulation of boli.ae real-time auction architecture
                  </p>
                </div>
              </div>

              {/* Countdown badge */}
              <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                <Clock className="w-4 h-4 animate-spin" />
                <span>CLOSING IN {formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Property Item Details Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">Featured Listing #DXB-9042</span>
                <h4 className="text-base font-bold text-slate-100 mt-0.5">3-Bed Luxury Villa in Dubai Hills Estate</h4>
                <p className="text-xs text-slate-400">2,400 sq.ft • Private Pool • Full Park View</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Current Highest Bid</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-300 font-mono">
                  {currentPrice.toLocaleString()} AED
                </span>
              </div>
            </div>

            {/* Interactive Bid Placement Buttons */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Select Bid Raise Increment:</span>
                <div className="flex gap-2">
                  {[25000, 50000, 100000].map((inc) => (
                    <button
                      key={inc}
                      onClick={() => setUserBidIncrement(inc)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${
                        userBidIncrement === inc
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      +{inc.toLocaleString()} AED
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePlaceBid}
                data-cursor="PLACE BID"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>Place Live Bid of {(currentPrice + userBidIncrement).toLocaleString()} AED</span>
              </button>
            </div>

            {/* Live Bids History Feed */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                Live Bid Feed Activity:
              </div>
              <div className="space-y-1.5 font-mono text-xs max-h-44 overflow-y-auto pr-1">
                {bids.map((b) => (
                  <div
                    key={b.id}
                    className={`p-2.5 rounded-xl flex items-center justify-between border transition-all ${
                      b.isUser
                        ? 'bg-emerald-500/15 border-emerald-400/50 text-emerald-200'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${b.isUser ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                      <span className="font-bold">{b.bidder}</span>
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="font-extrabold text-emerald-300">{b.amount.toLocaleString()} AED</span>
                      <span className="text-[11px] text-slate-500">{b.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Technical Features Breakdown & Valuation Module */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Real Estate Valuation Calculator */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>AUTOMATED VALUATION ENGINE</span>
                </span>
                <span className="text-xs font-mono text-emerald-400">Instant API</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Dubai Location</label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value as any)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="dubai_hills">Dubai Hills Estate (2,150 AED/sqft)</option>
                  <option value="palm">Palm Jumeirah (3,600 AED/sqft)</option>
                  <option value="downtown">Downtown Dubai (2,850 AED/sqft)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Built Area: <span className="text-emerald-400 font-bold">{areaSqft} sq.ft</span>
                </label>
                <input
                  type="range"
                  min="800"
                  max="6000"
                  step="100"
                  value={areaSqft}
                  onChange={(e) => setAreaSqft(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Calculated Valuation</span>
                  <span className="text-xl font-extrabold text-emerald-300 font-display">
                    {getEstimatedValuation()} AED
                  </span>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    confetti({ particleCount: 25 });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md hover:bg-emerald-400 transition-colors"
                >
                  Generate POA
                </button>
              </div>
            </div>

            {/* Architecture Highlights Card */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Frontend Architecture Victories</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Integrated Shufti KYC pipelines for real-time automated identity verification & AML checks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Built frictionless digital payment gateways for Power of Attorney (POA) issuance & property valuations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Resolved legacy SEO architecture bottlenecks, elevating organic search discoverability by 85%.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
