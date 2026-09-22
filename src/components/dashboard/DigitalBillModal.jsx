import React from 'react';
import { useEV } from '../../context/EVContext';
import {
  X,
  Printer,
  CheckCircle2,
  Zap,
  Download,
  Calendar,
  Clock,
  Car,
  ShieldCheck,
  CreditCard,
  Building,
} from 'lucide-react';

export default function DigitalBillModal() {
  const { BRAND_INFO, selectedBillForModal, setSelectedBillForModal } = useEV();

  if (!selectedBillForModal) return null;

  const bill = selectedBillForModal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Official Digital Charging Tax Invoice
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              Print / Save PDF
            </button>
            <button
              onClick={() => setSelectedBillForModal(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition"
              aria-label="Close invoice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-8 md:p-10 bg-white text-slate-900">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b-2 border-emerald-500/80 gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-950 tracking-tight uppercase">
                    {BRAND_INFO.name}
                  </h2>
                  <p className="text-xs font-bold text-emerald-700 tracking-wide uppercase">
                    Team: {BRAND_INFO.team}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                {BRAND_INFO.tagline} • Green Energy Infrastructure
              </p>
              <p className="text-[11px] text-slate-500">
                GSTIN: 27AABCS1234F1Z8 • Hub: Central Metro EV Supercharging Bay
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold text-xs rounded-full border border-emerald-300 mb-1.5">
                PAID • DIGITAL RECEIPT
              </span>
              <p className="text-xs font-mono text-slate-500">Invoice ID</p>
              <p className="text-sm font-extrabold font-mono text-slate-900">{bill.billId}</p>
              <p className="text-[11px] text-slate-500">Date: {bill.chargingDate}</p>
            </div>
          </div>

          {/* Customer & Vehicle Details (2-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Customer Details
              </p>
              <p className="text-sm font-extrabold text-slate-900">{bill.ownerName}</p>
              <p className="text-xs text-slate-600">Registered EV Driver</p>
              <p className="text-xs text-slate-500 font-mono mt-1">Ref ID: {bill.bookingId}</p>
            </div>

            <div className="sm:text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Vehicle Details
              </p>
              <p className="text-sm font-extrabold text-slate-900 font-mono">{bill.vehicleNumber}</p>
              <p className="text-xs text-slate-600">{bill.vehicleType}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Battery Pack: {bill.batteryCapacity} kWh
              </p>
            </div>
          </div>

          {/* Charging Details Table */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Station / Bay</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3 text-right">Energy Consumed</th>
                  <th className="py-3 px-3 text-right">Tariff Rate</th>
                  <th className="py-3 px-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {bill.slotNumber} (Fast Charger)
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-mono">
                    {bill.durationMinutes || 45} mins
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-700 font-mono">
                    {bill.energyConsumed.toFixed(1)} kWh
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-slate-700">
                    ₹{bill.ratePerKwh.toFixed(2)}/kWh
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 font-mono">
                    ₹{bill.subtotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculation Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-2 pb-6 border-b border-slate-200">
            <div className="text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                Payment Method: {bill.paymentMethod || 'Instant UPI'}
              </p>
              <p className="font-mono text-[11px]">Txn Ref: {bill.transactionRef || 'TXN-9982710'}</p>
              <p className="text-[11px] text-emerald-700 font-medium">
                🌱 100% Solar & Wind Grid Certified Power
              </p>
            </div>

            <div className="w-full sm:w-60 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Energy Charges</span>
                <span className="font-mono font-semibold">₹{bill.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Green GST ({bill.gstPercent || 5.0}%)</span>
                <span className="font-mono font-semibold">₹{bill.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t-2 border-slate-900">
                <span>Total Amount</span>
                <span className="font-mono text-emerald-700">₹{bill.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Invoice Required Tagline Footer */}
          <div className="pt-6 text-center">
            <p className="text-sm font-extrabold text-emerald-800 mb-1">
              “Thank you for choosing smart & sustainable mobility.”
            </p>
            <p className="text-[11px] text-slate-500">
              Generated by {BRAND_INFO.name} Cloud Billing Module • Team {BRAND_INFO.team}
            </p>
          </div>
        </div>

        {/* Bottom Modal Actions (Hidden on print) */}
        <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={() => setSelectedBillForModal(null)}
            className="px-5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-xl transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-md shadow-emerald-600/20"
          >
            <Download className="w-3.5 h-3.5" />
            Download / Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
