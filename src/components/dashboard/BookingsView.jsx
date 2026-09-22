import React from 'react';
import { useEV } from '../../context/EVContext';
import {
  CalendarCheck,
  Zap,
  Clock,
  Car,
  Play,
  XCircle,
  PlusCircle,
  CheckCircle2,
} from 'lucide-react';

export default function BookingsView() {
  const { bookings, cancelBooking, startLiveCharging, setCurrentAppTab } = useEV();

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            My Charging Bookings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            View active bay reservations, start live charging sessions, or cancel bookings.
          </p>
        </div>

        <button
          onClick={() => setCurrentAppTab('book')}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/20"
        >
          <PlusCircle className="w-4 h-4" />
          New Reservation
        </button>
      </div>

      {/* Bookings Table & Cards */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Assigned Slot</th>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Est. Energy</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b.bookingId} className="hover:bg-slate-50/70 transition">
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">{b.bookingId}</td>
                  <td className="py-4 px-4 font-bold text-emerald-800">{b.slotNumber}</td>
                  <td className="py-4 px-4 font-mono font-medium text-slate-700">
                    <div>
                      <span className="font-bold">{b.vehicleNumber}</span>
                      <span className="block text-[10px] text-slate-400 font-sans">{b.vehicleType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    <div>
                      <span>{b.bookingDate}</span>
                      <span className="block text-[10px] text-slate-400 font-mono">{b.startTime}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-mono">{b.durationMinutes} mins</td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">{b.estimatedKwh} kWh</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        b.status === 'Active'
                          ? 'bg-sky-100 text-sky-800 border-sky-300'
                          : b.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {b.status === 'Active' && (
                        <>
                          <button
                            onClick={() => {
                              startLiveCharging(b);
                              setCurrentAppTab('dashboard');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1 shadow-sm"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            Start Charge
                          </button>
                          <button
                            onClick={() => cancelBooking(b.bookingId)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition border border-rose-200"
                            title="Cancel Booking"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {b.status === 'Completed' && (
                        <button
                          onClick={() => setCurrentAppTab('billing')}
                          className="text-xs font-bold text-emerald-600 hover:underline"
                        >
                          View Receipt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
