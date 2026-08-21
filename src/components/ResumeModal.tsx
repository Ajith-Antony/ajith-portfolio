import React from 'react';
import { PERSONAL_INFO, EXPERIENCES } from '../data/portfolioData';
import { X, Printer, Mail, MapPin, Phone } from 'lucide-react';
import { LinkedinIcon } from './SocialIcons';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl relative overflow-y-auto my-8 space-y-6">
        
        {/* Action Controls Top */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 sticky top-0 bg-slate-950/90 py-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              CURRICULUM VITAE
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md hover:bg-emerald-400 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="space-y-8 text-slate-200 text-sm">
          
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-100 uppercase tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <h2 className="text-lg font-bold font-mono text-emerald-400">
              {PERSONAL_INFO.title}
            </h2>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <LinkedinIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>linkedin.com/in/ajithpallisseryantony</span>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Core Technical Skills */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              CORE TECHNICAL SKILLS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200 block text-xs font-mono mb-1">Frontend:</strong>
                <span className="text-xs text-slate-400">
                  React 18/19, Next.js, TypeScript, JavaScript (ES6+), WebSockets, REST APIs, Redux Toolkit, Redux Saga, Context API, Tailwind CSS, Styled Components, Ag-Grid, Lightweight Charts, TradingView.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-slate-200 block text-xs font-mono mb-1">Backend, Web3 & Databases:</strong>
                <span className="text-xs text-slate-400">
                  Node.js, Express, Fastify, Web3 Wallet Integrations, NFT Marketplaces, DEX, Shufti KYC Verification, MongoDB, PostgreSQL, SQL, Webpack, Docker, SEO.
                </span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              PROFESSIONAL EXPERIENCE
            </h3>

            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="space-y-2 pb-4 border-b border-slate-800/60 last:border-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs">
                  <span className="font-bold text-slate-100 text-sm">{exp.company} — <span className="text-emerald-400">{exp.role}</span></span>
                  <span className="text-slate-400">{exp.period} | {exp.location}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              EDUCATION
            </h3>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-slate-200">B.Tech in Computer Science & Engineering</span>
              <span className="text-slate-400">2016 – 2020</span>
            </div>
            <p className="text-xs text-slate-400">
              APJ Abdul Kalam Technological University, Kerala, India
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
