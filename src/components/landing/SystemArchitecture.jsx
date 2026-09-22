import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Cpu,
  Database,
  Zap,
  Receipt,
  ArrowDown,
  Sparkles,
  Info,
  Server,
  Layers,
} from 'lucide-react';

export default function SystemArchitecture() {
  const [selectedNode, setSelectedNode] = useState('core');

  const nodeDetails = {
    user: {
      title: "1. User / Driver Layer",
      icon: <User className="w-6 h-6 text-sky-600" />,
      type: "Client Interface",
      description: "EV drivers and fleet operators interact via desktop, tablet, and mobile interfaces. Initiates authentication, garage registrations, and slot booking requests.",
      protocol: "HTTPS / REST / WebSocket Events",
      dataPayload: "{ userId, vehiclePlate, chosenBay, durationMins }",
    },
    auth: {
      title: "2. Login / Signup Auth Gateway",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      type: "Security & Session",
      description: "Validates credentials, distinguishes between Driver and Station Admin roles, issues encrypted session states, and safeguards user profile persistence.",
      protocol: "JWT Session / LocalStorage Encrypted Cache",
      dataPayload: "{ token, role: 'driver' | 'admin', expiresAt }",
    },
    core: {
      title: "3. EV Charging Station System Core",
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
      type: "Central Dispatcher & Business Logic",
      description: "The primary orchestrator corresponding to the C++ StationManager engine. Coordinates reservations, validates slot conflicts, and triggers billing calculations.",
      protocol: "State Machine & Event Bus",
      dataPayload: "Dispatches commands to DB, Slots Controller & Billing Engine",
    },
    database: {
      title: "4A. Database & File Handling",
      icon: <Database className="w-6 h-6 text-amber-600" />,
      type: "Persistence Subsystem",
      description: "Handles permanent storage of vehicle models, battery sizes, customer profiles, and historical logs. Inherits from C++ fstream file-handling paradigms.",
      protocol: "JSON Serialization / IndexedDB / Cloud DB Ready",
      dataPayload: "Tables: Users, Vehicles, Reservations, Invoices",
    },
    slots: {
      title: "4B. Charging Slots Module",
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      type: "Hardware Telemetry Subsystem",
      description: "Manages real-time state machine for the 5 bays (Available, Booked, Occupied). Monitors power delivery (22kW AC to 120kW DC Fast) and SoC updates.",
      protocol: "OCPP 2.0.1 / Hardware Telemetry Emulation",
      dataPayload: "{ bayId: 1..5, status, powerKw, voltage, currentSoC }",
    },
    billing: {
      title: "4C. Billing & Tariff Module",
      icon: <Receipt className="w-6 h-6 text-teal-600" />,
      type: "Financial & Invoicing Engine",
      description: "Computes base energy cost using power tariff rates, calculates 5% GST tax, generates cryptographically traceable digital invoice PDFs.",
      protocol: "Stateless Tariff Arithmetic",
      dataPayload: "Formula: Subtotal = (kWh * Rate); Total = Subtotal + Tax",
    },
  };

  const active = nodeDetails[selectedNode];

  return (
    <section id="architecture" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Full-Stack Topology
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            System Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Interactive visual diagram depicting the modular data flow from driver interaction to hardware control and digital invoicing.
          </p>
        </div>

        {/* Interactive Architecture Diagram */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-elevated mb-10">
          <div className="flex flex-col items-center max-w-4xl mx-auto space-y-4">
            {/* Level 1: User */}
            <button
              onClick={() => setSelectedNode('user')}
              className={`w-full max-w-md p-4 rounded-2xl border text-center transition-all ${
                selectedNode === 'user'
                  ? 'bg-sky-50 border-sky-500 shadow-glow-blue scale-105'
                  : 'bg-white border-slate-200 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <User className="w-5 h-5 text-sky-600" />
                <h4 className="text-base font-bold text-slate-900">User / EV Driver</h4>
              </div>
              <p className="text-xs text-slate-500">
                Web & Mobile Client Interface (Driver & Station Admin)
              </p>
            </button>

            {/* Pulsing Connector Down */}
            <div className="flex flex-col items-center py-1">
              <span className="h-6 w-0.5 bg-gradient-to-b from-sky-400 to-emerald-500"></span>
              <ArrowDown className="w-4 h-4 text-emerald-600 animate-bounce" />
            </div>

            {/* Level 2: Login / Signup */}
            <button
              onClick={() => setSelectedNode('auth')}
              className={`w-full max-w-md p-4 rounded-2xl border text-center transition-all ${
                selectedNode === 'auth'
                  ? 'bg-emerald-50 border-emerald-500 shadow-glow-green scale-105'
                  : 'bg-white border-slate-200 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="text-base font-bold text-slate-900">Login / Signup Gateway</h4>
              </div>
              <p className="text-xs text-slate-500">
                Session Control • Role Authorization • Encrypted State
              </p>
            </button>

            {/* Pulsing Connector Down */}
            <div className="flex flex-col items-center py-1">
              <span className="h-6 w-0.5 bg-emerald-500"></span>
              <ArrowDown className="w-4 h-4 text-emerald-600 animate-bounce" />
            </div>

            {/* Level 3: EV Charging Station System Core */}
            <button
              onClick={() => setSelectedNode('core')}
              className={`w-full max-w-lg p-5 rounded-2xl border text-center transition-all ${
                selectedNode === 'core'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-elevated scale-105'
                  : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <Cpu className="w-6 h-6 text-emerald-300" />
                <h4 className="text-lg font-black tracking-tight">
                  EV Charging Station System Core
                </h4>
              </div>
              <p className="text-xs text-slate-200 font-mono">
                Team Silent Coders Engine • Orchestration & Logic Bus
              </p>
            </button>

            {/* Branching SVG Lines */}
            <div className="w-full max-w-2xl py-2 flex justify-center">
              <svg viewBox="0 0 600 40" className="w-full h-8 overflow-visible">
                <path
                  d="M 300 0 L 300 15 L 100 15 L 100 40 M 300 15 L 300 40 M 300 15 L 500 15 L 500 40"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-flow-cable"
                />
              </svg>
            </div>

            {/* Level 4: 3 Subsystems */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Database */}
              <button
                onClick={() => setSelectedNode('database')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedNode === 'database'
                    ? 'bg-amber-50 border-amber-500 shadow-md scale-105'
                    : 'bg-white border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-amber-600" />
                  <h4 className="text-sm font-bold text-slate-900">Database</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Persistent storage for vehicle records, user garage & historical bookings.
                </p>
              </button>

              {/* Charging Slots */}
              <button
                onClick={() => setSelectedNode('slots')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedNode === 'slots'
                    ? 'bg-emerald-50 border-emerald-500 shadow-glow-green scale-105'
                    : 'bg-white border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">Charging Slots</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  5 Visual station bays with live availability state and power telemetry.
                </p>
              </button>

              {/* Billing Module */}
              <button
                onClick={() => setSelectedNode('billing')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedNode === 'billing'
                    ? 'bg-teal-50 border-teal-500 shadow-md scale-105'
                    : 'bg-white border-slate-200 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Receipt className="w-5 h-5 text-teal-600" />
                  <h4 className="text-sm font-bold text-slate-900">Billing Module</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Automated tariff arithmetic, GST calculation, and digital invoice generation.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Component Inspection Card */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              {active.icon}
              <h3 className="text-lg font-bold text-white">{active.title}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {active.type}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {active.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono">
              <span className="text-slate-400">
                Protocol: <span className="text-emerald-400">{active.protocol}</span>
              </span>
              <span className="text-slate-400">
                Payload: <span className="text-sky-300">{active.dataPayload}</span>
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 flex-shrink-0">
            <div className="text-emerald-400 font-bold mb-1">C++ OOP Mapping:</div>
            <div>Modular Class Isolation</div>
            <div>Static Function Dispatch</div>
          </div>
        </div>
      </div>
    </section>
  );
}
