import React, { useState } from 'react';
import { useDelivery } from '../../context/DeliveryContext';
import { useAuth } from '../../context/AuthContext';
import { CategoryType, GPSState, AccountStatus } from '../../types';
import { Wrench, Zap, Play, RotateCcw, X, MapPin, KeyRound, ShieldCheck, Power, Layers, UserCheck } from 'lucide-react';

export const FloatingDemoControlPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { partner, setDemoAccountStatus } = useAuth();
  const {
    isOnline,
    toggleOnline,
    activeOrder,
    triggerDemoOffer,
    setGpsState,
    gpsState,
    verifyPickupCode,
    verifyDeliveryOtp,
    resetDemoData,
  } = useDelivery();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-2xl hover:scale-105 transition-all border border-amber-300 flex items-center gap-2 text-xs"
          title="Open Developer Demo Controls"
        >
          <Wrench size={18} />
          <span className="hidden sm:inline">DEMO CONTROL PANEL</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-[#161e2e] border border-amber-500/50 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-fade-in relative text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold">
              <Wrench size={16} />
              <span>GOD MODE — DEMO CONTROLS</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>

          {/* Account Verification Status Switcher */}
          <div className="space-y-1.5 bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="text-slate-400 font-bold text-[11px] flex items-center gap-1">
              <UserCheck size={14} className="text-amber-400" />
              <span>Account Status Gatekeeping Test</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-[10px]">
              {(['APPROVED', 'UNDER_REVIEW', 'DOCUMENTS_PENDING', 'REJECTED', 'SUSPENDED'] as AccountStatus[]).map(
                (st) => (
                  <button
                    key={st}
                    onClick={() => setDemoAccountStatus(st)}
                    className={`p-1.5 rounded-lg font-bold border transition-colors ${
                      partner.accountStatus === st
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Duty Status */}
          <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-300 font-semibold">Duty Status:</span>
            <button
              onClick={toggleOnline}
              className={`px-3 py-1 rounded-lg font-extrabold text-[11px] ${
                isOnline ? 'bg-emerald-500/20 text-[#00E676]' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </button>
          </div>

          {/* Trigger Order Offers */}
          <div className="space-y-2">
            <div className="text-slate-400 font-bold text-[11px] uppercase">
              Trigger Order Offer by Category
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {(['FOOD', 'GROCERY', 'ELECTRONICS', 'MEAT', 'FASHION', 'VEGETABLES'] as CategoryType[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => triggerDemoOffer(cat)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] border border-slate-800 text-left truncate"
                  >
                    + {cat}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => triggerDemoOffer('FOOD', true)}
              className="w-full p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold text-[11px] border border-purple-500/30 flex items-center justify-center gap-1.5"
            >
              <Layers size={14} />
              <span>+ SMART BATCHED OFFER (2 ORDERS)</span>
            </button>
          </div>

          {/* GPS Geofence State Switcher */}
          {activeOrder && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-slate-400 font-bold text-[11px] uppercase">
                GPS Geofence Simulation
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(['NORMAL', 'ARRIVING', 'ARRIVED', 'OUTSIDE_GEOFENCE'] as GPSState[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => setGpsState(st)}
                    className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      gpsState === st
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Auto Fill Codes */}
          {activeOrder && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-slate-400 font-bold text-[11px] uppercase">
                Auto-Fill Verification Codes
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => verifyPickupCode('4821')}
                  className="p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold border border-amber-500/30 flex items-center justify-center gap-1"
                >
                  <KeyRound size={14} />
                  <span>Auto-Pickup (4821)</span>
                </button>
                <button
                  onClick={() => verifyDeliveryOtp('9102')}
                  className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-[#00E676] font-bold border border-emerald-500/30 flex items-center justify-center gap-1"
                >
                  <ShieldCheck size={14} />
                  <span>Auto-OTP (9102)</span>
                </button>
              </div>
            </div>
          )}

          {/* Reset Demo Data */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={resetDemoData}
              className="w-full p-2.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 font-bold text-[11px] border border-red-500/30 flex items-center justify-center gap-1.5"
            >
              <RotateCcw size={14} />
              <span>RESET DEMO DATA & METRICS</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
