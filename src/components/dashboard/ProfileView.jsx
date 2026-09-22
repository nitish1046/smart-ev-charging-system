import React from 'react';
import { useEV } from '../../context/EVContext';
import {
  User,
  ShieldCheck,
  Mail,
  Car,
  Leaf,
  CreditCard,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function ProfileView() {
  const { currentUser, registeredEVs, bills, demoLogin, BRAND_INFO } = useEV();

  const totalUserKwh = bills.reduce((acc, curr) => acc + curr.energyConsumed, 0);
  const totalCo2Saved = (totalUserKwh * 0.82).toFixed(1);

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-left">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-black text-slate-950 tracking-tight">
          User Profile & Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Account details, role authorizations, and personal environmental contributions.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 text-3xl flex items-center justify-center font-bold shadow-inner">
            {currentUser?.avatar || '⚡'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-slate-900">
                {currentUser?.name || 'Rahul Sharma'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                {currentUser?.role || 'driver'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {currentUser?.email || 'rahul.sharma@silentcoders.io'}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              Verified Silent Coders EV Network Member
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              if (currentUser?.role === 'admin') {
                demoLogin('driver');
              } else {
                demoLogin('admin');
              }
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition border border-slate-200"
          >
            Switch to {currentUser?.role === 'admin' ? 'Driver View' : 'Admin View'}
          </button>
        </div>
      </div>

      {/* Personal Ecological Impact */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-elevated border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
          <Leaf className="w-4 h-4" />
          Personal Ecological Savings
        </div>
        <h3 className="text-xl font-bold mb-6">
          Your Direct Clean Mobility Footprint
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl font-black text-emerald-400 font-mono block">
              {totalUserKwh.toFixed(1)} kWh
            </span>
            <span className="text-xs text-slate-300">Total Solar Energy Charged</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl font-black text-sky-400 font-mono block">
              {totalCo2Saved} kg
            </span>
            <span className="text-xs text-slate-300">CO₂ Exhaust Offset</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl font-black text-teal-400 font-mono block">
              {registeredEVs.length} EVs
            </span>
            <span className="text-xs text-slate-300">Managed in Garage</span>
          </div>
        </div>
      </div>

      {/* Payment & Billing Preferences */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-600" />
            <h4 className="text-sm font-bold text-slate-900">Payment Preferences</h4>
          </div>
          <span className="text-xs text-emerald-600 font-bold">Auto-Debit Ready</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-700">
              UPI
            </div>
            <div>
              <p className="font-bold text-slate-900">Silent Coders Instant Pay (UPI)</p>
              <p className="text-[11px] text-slate-500 font-mono">silentcoders@okhdfcbank</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
            Default
          </span>
        </div>
      </div>
    </div>
  );
}
