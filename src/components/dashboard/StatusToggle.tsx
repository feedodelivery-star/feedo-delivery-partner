import React from 'react';
import { Power, Radio, ShieldCheck } from 'lucide-react';
import { useDelivery } from '../../context/DeliveryContext';
import { useLanguage } from '../../context/LanguageContext';

export const StatusToggle: React.FC = () => {
  const { isOnline, toggleOnline } = useDelivery();
  const { t } = useLanguage();

  return (
    <div
      className={`relative w-full rounded-3xl p-6 transition-all duration-300 overflow-hidden border shadow-2xl ${
        isOnline
          ? 'bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-900 border-emerald-500/40 shadow-emerald-500/10'
          : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-800'
      }`}
    >
      {/* Background Radar Pulse effect when online */}
      {isOnline && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/10 pointer-events-none animate-radar" />
      )}

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Status Text & Location */}
        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-[#00E676] animate-ping' : 'bg-slate-500'
              }`}
            />
            <span
              className={`text-xs font-black tracking-widest uppercase ${
                isOnline ? 'text-[#00E676]' : 'text-slate-400'
              }`}
            >
              {isOnline ? t('youAreOnline') : t('youAreOffline')}
            </span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {isOnline ? 'Indiranagar High Demand Zone' : 'Ready to Start Delivering?'}
          </h2>

          <p className="text-xs text-slate-400 max-w-sm">
            {isOnline
              ? 'Stay online to receive instant food, grocery, electronics, and hyperlocal delivery offers nearby.'
              : 'Go online to start receiving orders and earning ₹400 – ₹900 today.'}
          </p>
        </div>

        {/* Big Interactive GO ONLINE Toggle Button */}
        <button
          onClick={toggleOnline}
          className={`relative group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm tracking-wide transition-all duration-300 transform active:scale-95 shadow-xl ${
            isOnline
              ? 'bg-slate-800/90 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:text-white'
              : 'bg-gradient-to-r from-[#00C853] via-[#00E676] to-[#059669] hover:brightness-110 text-slate-950 shadow-emerald-500/30'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isOnline ? 'bg-slate-700 text-slate-300' : 'bg-slate-950/20 text-slate-950'
            }`}
          >
            <Power size={22} strokeWidth={2.5} />
          </div>
          <span>{isOnline ? t('goOffline') : t('goOnline')}</span>
        </button>
      </div>
    </div>
  );
};
