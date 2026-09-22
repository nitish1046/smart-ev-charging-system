import React, { useState } from 'react';
import { CPP_OOP_SNIPPETS } from '../../data/initialData';
import {
  Code,
  Cpu,
  FileCode,
  Terminal,
  Layers,
  Database,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

export default function TechnologySection() {
  const [activeSnippetKey, setActiveSnippetKey] = useState('evClass');
  const [copied, setCopied] = useState(false);

  const activeSnippet = CPP_OOP_SNIPPETS[activeSnippetKey];

  const handleCopy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.cppCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const techCards = [
    {
      name: "C++ Language",
      badge: "Core Logic",
      desc: "Robust performance, strict type safety, memory control and compile-time optimization.",
      icon: <Terminal className="w-5 h-5 text-emerald-600" />,
    },
    {
      name: "OOP Paradigm",
      badge: "Architecture",
      desc: "Class models for Vehicles, Charging Bays, User Sessions, and Billing Engines.",
      icon: <Layers className="w-5 h-5 text-sky-600" />,
    },
    {
      name: "File Handling",
      badge: "Data Persistence",
      desc: "Persistent state management using C++ fstream for read/write CSV records.",
      icon: <Database className="w-5 h-5 text-amber-600" />,
    },
    {
      name: "STL Vectors",
      badge: "Data Structures",
      desc: "Dynamic container std::vector for flexible queueing, slots and fleet registries.",
      icon: <Cpu className="w-5 h-5 text-teal-600" />,
    },
    {
      name: "Console Application",
      badge: "Original Foundation",
      desc: "Originally architected as a high-performance terminal tool, now elevated to web.",
      icon: <Code className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: "VS Code & Tooling",
      badge: "Dev Environment",
      desc: "Engineered with modern C++ compilers (GCC/Clang) and Vite + React build tooling.",
      icon: <FileCode className="w-5 h-5 text-rose-600" />,
    },
  ];

  const oopConcepts = [
    {
      name: "Classes & Objects",
      desc: "Blueprint models: ElectricVehicle, ChargingSlot, BookingSystem, and BillingManager.",
    },
    {
      name: "Encapsulation",
      desc: "Private member variables with strict getter/setter validation and data protection.",
    },
    {
      name: "Constructors",
      desc: "Parameterized constructors ensuring valid state initialization for slots and cars.",
    },
    {
      name: "Static Functions",
      desc: "Stateless utility routines for tariff calculations and GST tax computations.",
    },
    {
      name: "Vectors (std::vector)",
      desc: "Dynamic, contiguous memory storage for fleet vehicles and active reservations.",
    },
    {
      name: "File Handling (fstream)",
      desc: "Persistent disk I/O serialization storing vehicle records across sessions.",
    },
  ];

  return (
    <section id="technology" className="py-20 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            Computer Science Foundations
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Original C++ & Object-Oriented Foundations
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Originally designed as a C++ & OOP project, this web interface preserves the exact architectural integrity, encapsulation rules, and modular separation of concerns.
          </p>
        </div>

        {/* 6 Technology Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {techCards.map((card, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-soft hover:shadow-elevated transition text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
                  {card.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {card.badge}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{card.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* OOP Concepts Grid */}
        <div className="mb-14">
          <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Key OOP Concepts Implemented in the Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oopConcepts.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-soft flex items-start gap-3 text-left"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Code Viewer: C++ Core to Web Architecture */}
        <div className="rounded-3xl bg-slate-950 text-slate-100 border border-slate-800 shadow-2xl overflow-hidden text-left">
          {/* Code Viewer Header */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono font-bold text-slate-400 ml-2">
                C++ Source Inspector • Silent Coders
              </span>
            </div>

            {/* Snippet Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {Object.keys(CPP_OOP_SNIPPETS).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveSnippetKey(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                    activeSnippetKey === key
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {key === 'evClass' && 'EV.h'}
                  {key === 'slotClass' && 'ChargingSlot.h'}
                  {key === 'fileHandling' && 'StationManager.cpp'}
                  {key === 'billingModule' && 'BillingModule.cpp'}
                </button>
              ))}

              <button
                onClick={handleCopy}
                className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Snippet Description Bar */}
          <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <div>
              <span className="font-bold text-emerald-400">{activeSnippet.title}: </span>
              <span className="text-slate-300">{activeSnippet.description}</span>
            </div>
            <div className="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-800/60">
              Web Mapping: {activeSnippet.webMapping}
            </div>
          </div>

          {/* Syntax Highlighted Code Box */}
          <div className="p-6 overflow-x-auto max-h-96 text-xs sm:text-sm font-mono leading-relaxed bg-[#0A0F1D]">
            <pre className="text-emerald-300">
              <code>{activeSnippet.cppCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
