import React, { useState } from 'react';
import { useEV } from '../../context/EVContext';
import {
  Car,
  Plus,
  Trash2,
  Zap,
  Battery,
  ShieldCheck,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  Table as TableIcon,
} from 'lucide-react';

export default function MyEvsView() {
  const { registeredEVs, registerEV, deleteEV, currentUser, setCurrentAppTab } = useEV();

  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [viewFormat, setViewFormat] = useState('grid'); // 'grid' | 'table'

  // Form State
  const [ownerName, setOwnerName] = useState(currentUser ? currentUser.name : 'Rahul Sharma');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Sedan (Electric)');
  const [batteryCapacity, setBatteryCapacity] = useState('60');
  const [currentBatteryPercent, setCurrentBatteryPercent] = useState('50');
  const [connectorType, setConnectorType] = useState('CCS2');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!vehicleNumber.trim()) {
      setFormError('Please enter a valid vehicle license plate number.');
      return;
    }

    if (!batteryCapacity || Number(batteryCapacity) <= 0) {
      setFormError('Please provide a realistic battery capacity (e.g., 40 - 100 kWh).');
      return;
    }

    registerEV({
      ownerName: ownerName.trim() || 'EV Driver',
      vehicleNumber: vehicleNumber.trim().toUpperCase(),
      vehicleType,
      batteryCapacity: Number(batteryCapacity),
      currentBatteryPercent: Number(currentBatteryPercent),
      connectorType,
    });

    // Reset and close
    setVehicleNumber('');
    setRegisterModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            My Registered EVs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your garage vehicles, monitor battery capacity, and reserve charging slots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Format Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewFormat('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewFormat === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'
              }`}
              title="Grid Cards"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewFormat('table')}
              className={`p-1.5 rounded-lg transition ${
                viewFormat === 'table' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setRegisterModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-sm shadow-emerald-600/20"
          >
            <Plus className="w-4 h-4" />
            Register New EV
          </button>
        </div>
      </div>

      {/* EV Cards Grid */}
      {viewFormat === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEVs.map((ev) => (
            <div
              key={ev.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft hover:shadow-elevated transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {ev.status || 'Ready'}
                  </span>
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Owner: {ev.ownerName}
                </p>
                <h3 className="text-lg font-black text-slate-900 font-mono tracking-wide mt-0.5 mb-1">
                  {ev.vehicleNumber}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mb-4">{ev.vehicleType}</p>

                {/* Battery Meter */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Battery className="w-3.5 h-3.5 text-emerald-600" />
                      Current Battery
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {ev.currentBatteryPercent}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        ev.currentBatteryPercent < 30
                          ? 'bg-rose-500'
                          : ev.currentBatteryPercent < 60
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${ev.currentBatteryPercent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-mono">
                    <span>Pack: {ev.batteryCapacity} kWh</span>
                    <span>Port: {ev.connectorType || 'CCS2'}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setCurrentAppTab('book')}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition flex items-center justify-center gap-1.5 border border-emerald-200"
                >
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  Book Bay
                </button>
                <button
                  onClick={() => deleteEV(ev.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Remove vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Owner Name</th>
                  <th className="py-3 px-4">Vehicle Number</th>
                  <th className="py-3 px-4">Vehicle Type</th>
                  <th className="py-3 px-4">Battery Capacity</th>
                  <th className="py-3 px-4">Current SoC</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registeredEVs.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{ev.ownerName}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                      {ev.vehicleNumber}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{ev.vehicleType}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                      {ev.batteryCapacity} kWh
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {ev.currentBatteryPercent}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {ev.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setCurrentAppTab('book')}
                          className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition"
                        >
                          Book
                        </button>
                        <button
                          onClick={() => deleteEV(ev.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Register New EV Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Register New EV</h3>
                  <p className="text-xs text-slate-500">Save vehicle specs to persistent database</p>
                </div>
              </div>
              <button
                onClick={() => setRegisterModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Owner Name *
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle License Plate Number *
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. MH-12-AB-9999"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vehicle Model / Type *
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  >
                    <option value="Sedan (Tesla Model 3)">Sedan (Tesla Model 3)</option>
                    <option value="Compact SUV (Tata Nexon EV)">Compact SUV (Tata Nexon EV)</option>
                    <option value="SUV (MG ZS EV)">SUV (MG ZS EV)</option>
                    <option value="Crossover (Hyundai Ioniq 5)">Crossover (Hyundai Ioniq 5)</option>
                    <option value="Coupe SUV (Tata Curvv EV)">Coupe SUV (Tata Curvv EV)</option>
                    <option value="Two-Wheeler (Ola S1 Pro / Ather)">Two-Wheeler (Ola / Ather)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Connector Port
                  </label>
                  <select
                    value={connectorType}
                    onChange={(e) => setConnectorType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  >
                    <option value="CCS2">CCS2 (Combo Fast DC)</option>
                    <option value="Type 2">Type 2 (Mennekes AC)</option>
                    <option value="CHAdeMO">CHAdeMO</option>
                    <option value="GB/T">GB/T</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Battery Capacity (kWh) *
                  </label>
                  <input
                    type="number"
                    value={batteryCapacity}
                    onChange={(e) => setBatteryCapacity(e.target.value)}
                    placeholder="e.g. 60"
                    min="5"
                    max="200"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Battery SoC (%)
                  </label>
                  <input
                    type="number"
                    value={currentBatteryPercent}
                    onChange={(e) => setCurrentBatteryPercent(e.target.value)}
                    min="1"
                    max="100"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20"
                >
                  Confirm & Save EV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
