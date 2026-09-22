import React from 'react';
import { useEV } from '../../context/EVContext';
import { Zap, Code, Terminal, Heart, RotateCcw, Cpu, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { BRAND_INFO, resetToDefaultData, setViewMode, setCurrentAppTab, demoLogin } = useEV();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
                <Zap className="w-5 h-5 fill-current text-white" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                {BRAND_INFO.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {BRAND_INFO.mainTagline}. An engineering capstone transforming C++ & OOP architectural principles into a modern cloud-ready SaaS application.
            </p>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-400 text-xs font-mono font-semibold">
                <Code className="w-3.5 h-3.5" />
                Team: {BRAND_INFO.team}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                {BRAND_INFO.tagline}
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3.5">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setViewMode('app');
                    setCurrentAppTab('slots');
                  }}
                  className="hover:text-emerald-400 transition"
                >
                  5-Bay Visual Charging Slots
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setViewMode('app');
                    setCurrentAppTab('book');
                  }}
                  className="hover:text-emerald-400 transition"
                >
                  4-Step Smart Slot Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setViewMode('app');
                    setCurrentAppTab('my-evs');
                  }}
                  className="hover:text-emerald-400 transition"
                >
                  Registered EV Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setViewMode('app');
                    setCurrentAppTab('billing');
                  }}
                  className="hover:text-emerald-400 transition"
                >
                  Digital Invoice Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    demoLogin('admin');
                  }}
                  className="hover:text-amber-400 transition flex items-center gap-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Admin Station Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* C++ & Academic Foundation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              C++ OOP Foundations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Classes & Encapsulation</li>
              <li>Parameterized Constructors</li>
              <li>STL Vectors & Dynamic Arrays</li>
              <li>File Handling (<code className="text-emerald-300 font-mono text-[11px]">fstream</code> persistence)</li>
              <li>Static Tariff Calculation Functions</li>
              <li>Modular System Architecture</li>
            </ul>
          </div>

          {/* Presentation & Demo Controls */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3.5">
              Evaluation & Reset
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Reset browser localStorage to original initial seeds (5 slots: Slot 03 booked, 4 EVs, 3 previous bills).
            </p>
            <button
              onClick={resetToDefaultData}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              Reset Demo Database
            </button>
            <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-slate-400" />
              Developed for BTech Capstone Presentation
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 {BRAND_INFO.name}. Built with pride by <span className="text-slate-300 font-semibold">{BRAND_INFO.team}</span>.</p>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span>{BRAND_INFO.tagline}</span>
            <span>•</span>
            <span className="text-emerald-400">React + C++ Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
