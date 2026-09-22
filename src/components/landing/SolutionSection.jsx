import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Search,
  CalendarCheck,
  Zap,
  Receipt,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function SolutionSection() {
  const { setViewMode, setCurrentAppTab, demoLogin } = useEV();
  const [activeStep, setActiveStep] = useState(2); // Step 3: Book Slot

  const workflowSteps = [
    {
      step: 1,
      title: "Register EV",
      icon: <UserCheck className="w-5 h-5" />,
      tag: "Step 01",
      description: "Sign up and save your vehicle's plate number, model type, battery capacity, and charging connector.",
      highlight: "Enforces C++ encapsulation principles for vehicle data models.",
      targetTab: "my-evs",
    },
    {
      step: 2,
      title: "Check Slots",
      icon: <Search className="w-5 h-5" />,
      tag: "Step 02",
      description: "Inspect the 5 visual station bays in real-time with color-coded status indicators (Available, Booked, Occupied).",
      highlight: "Live bay monitoring with voltage and kW ratings.",
      targetTab: "slots",
    },
    {
      step: 3,
      title: "Book Slot",
      icon: <CalendarCheck className="w-5 h-5" />,
      tag: "Step 03",
      description: "Select your EV, pick an open bay, choose charging duration, and obtain an instant cryptographically unique Booking ID.",
      highlight: "Guaranteed bay reservation with automated slot lock.",
      targetTab: "book",
    },
    {
      step: 4,
      title: "Charge Vehicle",
      icon: <Zap className="w-5 h-5" />,
      tag: "Step 04",
      description: "Dock vehicle into the designated bay. Monitor live charging speed (up to 120 kW) and real-time battery SoC progress.",
      highlight: "Live battery telemetry simulation and automated shutdown.",
      targetTab: "book",
    },
    {
      step: 5,
      title: "Generate Bill",
      icon: <Receipt className="w-5 h-5" />,
      tag: "Step 05",
      description: "Upon completion, an official GST tax invoice is generated with units consumed, transparent tariff, and print/download options.",
      highlight: "Automated billing module calculating kWh, GST, and totals.",
      targetTab: "billing",
    },
  ];

  return (
    <section id="solution" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Complete End-To-End System
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            One Smart Platform for EV Charging
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A unified ecosystem seamlessly managing drivers, charging bays, power flow, and billing with zero friction.
          </p>
        </div>

        {/* Core System Capabilities Checklist */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-14">
          {[
            "User Registration & Login",
            "EV Registration & Garage",
            "Charging Slot Availability",
            "Instant Slot Booking",
            "Charging Telemetry Management",
            "Automated Digital Bill Generation",
            "Registered EV Management",
            "Admin Station Analytics",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-xs font-bold text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Visual Workflow: Register → Check Slots → Book Slot → Charge Vehicle → Generate Bill */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-elevated p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Interactive Journey
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                5-Step Intelligent Workflow
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Click any step to inspect system mechanics
            </div>
          </div>

          {/* Workflow Stepper Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative mb-10">
            {workflowSteps.map((stepItem, index) => {
              const isSelected = activeStep === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`relative p-4 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-500 shadow-glow-green'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {stepItem.icon}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {stepItem.tag}
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-bold tracking-tight mb-1 ${
                      isSelected ? 'text-emerald-950' : 'text-slate-800'
                    }`}
                  >
                    {stepItem.title}
                  </h4>

                  {/* Desktop connector arrow */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                      →
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Step Details Panel */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold border border-emerald-500/30">
                <span>{workflowSteps[activeStep].tag}</span>
                <span>•</span>
                <span>{workflowSteps[activeStep].title}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                {workflowSteps[activeStep].description}
              </p>
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {workflowSteps[activeStep].highlight}
              </p>
            </div>

            <button
              onClick={() => {
                setViewMode('app');
                setCurrentAppTab(workflowSteps[activeStep].targetTab);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center gap-2 flex-shrink-0 shadow-md shadow-emerald-500/20"
            >
              Test This in Live App
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
