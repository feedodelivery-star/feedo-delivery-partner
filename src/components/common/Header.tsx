import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDelivery } from '../../context/DeliveryContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, AlertTriangle, Globe, Star, Building } from 'lucide-react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenSos: () => void;
  onOpenProfile: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenSos,
  onOpenProfile,
  unreadCount,
}) => {
  const { partner, setIsAdminPortalOpen } = useAuth();
  const { isOnline } = useDelivery();
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C853] to-[#059669] flex items-center justify-center font-extrabold text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
            F
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-lg text-white">FEEDO</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#00E676] border border-emerald-500/30">
                PARTNER
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">by Opliora Private Limited</p>
          </div>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Portal Button */}
          <button
            onClick={() => setIsAdminPortalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-bold transition-colors"
            title="Open Admin Approval Portal"
          >
            <Building size={15} />
            <span>ADMIN PORTAL</span>
          </button>

          {/* Status Indicator Pill */}
          <div
            className={`hidden xs:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
              isOnline
                ? 'bg-emerald-500/10 text-[#00E676] border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-[#00E676] animate-pulse' : 'bg-slate-500'
              }`}
            />
            <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </div>

          {/* Language Selector */}
          <div className="relative group">
            <button
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/80 flex items-center gap-1 text-xs"
              title="Change Language"
            >
              <Globe size={16} />
              <span className="uppercase font-semibold">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 w-28 py-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
              <button
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-3 py-1.5 text-xs ${language === 'en' ? 'text-[#00E676] font-bold bg-emerald-500/10' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('kn')}
                className={`w-full text-left px-3 py-1.5 text-xs ${language === 'kn' ? 'text-[#00E676] font-bold bg-emerald-500/10' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                ಕನ್ನಡ (KN)
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`w-full text-left px-3 py-1.5 text-xs ${language === 'hi' ? 'text-[#00E676] font-bold bg-emerald-500/10' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                हिंदी (HI)
              </button>
            </div>
          </div>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenSos}
            className="px-2.5 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40 flex items-center gap-1 text-xs font-bold transition-colors"
            title="Emergency SOS"
          >
            <AlertTriangle size={15} className="animate-pulse" />
            <span className="hidden sm:inline">SOS</span>
          </button>

          {/* Notification Icon */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00E676] text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Partner Avatar Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/40 transition-colors"
          >
            <img
              src={partner.photoUrl}
              alt={partner.name}
              className="w-7 h-7 rounded-full object-cover border border-emerald-500/50"
            />
            <div className="hidden md:block text-left text-xs">
              <div className="font-semibold text-white leading-tight">{partner.name}</div>
              <div className="text-[10px] text-amber-400 flex items-center gap-0.5">
                <Star size={10} fill="currentColor" />
                <span>{partner.rating}</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
