import React from 'react';
import { AlertCircle, Clock, TrendingUp, HelpCircle, ArrowDown } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="problem" className="py-20 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            The Industry Challenge
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Making EV Charging Simpler
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Current charging setups struggle to keep pace with rapid EV adoption, leaving drivers frustrated with queue bottlenecks and fragmented processes.
          </p>
        </div>

        {/* 3 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all group text-left relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition">
              <AlertCircle className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
              Challenge 01
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">
              Limited Charging Infrastructure
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Finding available charging stations and slots can be difficult, leading to range anxiety and unexpected station crowding.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-200/70 text-xs font-semibold text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              Drivers face 45+ min average queue wait times
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all group text-left relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
              Challenge 02
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">
              Manual & Time-Consuming
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional processes make booking, tracking and billing inconvenient with lack of digital automation and opaque tariffs.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-200/70 text-xs font-semibold text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Disjointed receipts & error-prone manual logs
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all group text-left relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block mb-1">
              Challenge 03
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">
              Growing EV Adoption
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              As EV adoption grows, efficient charging management becomes increasingly important to prevent grid overload and bay lockouts.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-200/70 text-xs font-semibold text-slate-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              +140% annual increase in EV fleet demand
            </div>
          </div>
        </div>

        {/* Closing Callout */}
        <div className="mt-14 max-w-2xl mx-auto p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shadow-sm">
          <p className="text-base sm:text-lg font-bold text-emerald-950">
            “We need a smart, simple and reliable solution for EV charging management.”
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 mt-2">
            <span>Discover how Silent Coders solves this below</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
