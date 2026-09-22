import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  Receipt,
  Search,
  Download,
  Eye,
  Calendar,
  CreditCard,
  Printer,
  CheckCircle2,
  FileText,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function BillingView() {
  const { bills, setSelectedBillForModal } = useEV();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBills = bills.filter(
    (b) =>
      b.billId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = bills.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalKwh = bills.reduce((acc, curr) => acc + curr.energyConsumed, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            Billing & Invoices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Audit history of generated tax receipts and charging session payments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Bill ID or Plate..."
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Mini Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Invoiced Amount
          </p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">
            ₹{totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            100% Collected & Verified
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Energy Delivered
          </p>
          <p className="text-2xl font-black text-emerald-700 font-mono mt-1">
            {totalKwh.toFixed(1)} kWh
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Across {bills.length} charging sessions
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-soft">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Average Tariff Rate
          </p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-1">
            ₹17.00 / kWh
          </p>
          <p className="text-[11px] text-sky-600 font-semibold mt-0.5">
            Dynamic Peak/Off-Peak Grid
          </p>
        </div>
      </div>

      {/* Bills Table (Exact Required Fields: Bill ID, Vehicle Number, Charging Date, Energy Consumed, Amount, Payment Status + View Bill & Download Bill) */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Bill ID</th>
                <th className="py-3.5 px-4">Vehicle Number</th>
                <th className="py-3.5 px-4">Charging Date</th>
                <th className="py-3.5 px-4">Energy Consumed</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4 text-right">Invoice Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <tr key={bill.billId} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">
                      {bill.billId}
                    </td>
                    <td className="py-4 px-4 font-mono font-medium text-slate-700">
                      <div>
                        <span className="font-bold text-emerald-800">{bill.vehicleNumber}</span>
                        <span className="block text-[10px] text-slate-400 font-sans">{bill.ownerName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-mono">
                      {bill.chargingDate}
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-emerald-700">
                      {bill.energyConsumed.toFixed(1)} kWh
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">
                      ₹{bill.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {bill.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* "View Bill" Button */}
                        <button
                          onClick={() => setSelectedBillForModal(bill)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-600" />
                          View Bill
                        </button>

                        {/* "Download Bill" Button */}
                        <button
                          onClick={() => {
                            setSelectedBillForModal(bill);
                            setTimeout(() => window.print(), 300);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition flex items-center gap-1 border border-emerald-200"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-600" />
                          Download Bill
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No billing records match your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
