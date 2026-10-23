import React from 'react';
import { Home, Package, DollarSign, TrendingUp, User, ShieldAlert, HelpCircle, LogOut } from 'lucide-react';
import { NavTab } from './BottomNav';
import { useAuth } from '../../context/AuthContext';
import { useDelivery } from '../../context/DeliveryContext';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenHelp: () => void;
  onOpenSos: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHelp,
  onOpenSos,
}) => {
  const { partner, logout } = useAuth();
  const { isOnline, toggleOnline, activeOrder } = useDelivery();

  const mainItems = [
    { id: 'home' as NavTab, label: 'Dashboard Home', icon: Home },
    { id: 'orders' as NavTab, label: 'Order History', icon: Package, badge: activeOrder ? 1 : 0 },
    { id: 'earnings' as NavTab, label: 'Earnings & Payouts', icon: DollarSign },
    { id: 'performance' as NavTab, label: 'Performance & Ratings', icon: TrendingUp },
    { id: 'profile' as NavTab, label: 'Partner Profile', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#0b0f19] border-r border-slate-800/80 min-h-[calc(100vh-61px)] p-4 flex-shrink-0">
      {/* Online Toggle Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-inner">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-semibold text-slate-400">DUTY STATUS</div>
            <div className={`text-sm font-bold ${isOnline ? 'text-[#00E676]' : 'text-slate-400'}`}>
              {isOnline ? 'ONLINE & ACTIVE' : 'OFFLINE'}
            </div>
          </div>
          <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-[#00E676] animate-pulse' : 'bg-slate-600'}`} />
        </div>
        <button
          onClick={toggleOnline}
          className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs transition-all shadow-md ${
            isOnline
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              : 'bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 shadow-emerald-500/20'
          }`}
        >
          {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="space-y-1 mb-8 flex-1">
        <div className="px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Main Menu
        </div>
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-500/15 text-[#00E676] border border-emerald-500/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-[#00E676]' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="w-5 h-5 bg-amber-400 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Secondary Actions & Support */}
      <div className="space-y-2 pt-4 border-t border-slate-800/80">
        <button
          onClick={onOpenHelp}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800/60 hover:text-white transition-all"
        >
          <HelpCircle size={17} className="text-cyan-400" />
          <span>Help & Support Center</span>
        </button>

        <button
          onClick={onOpenSos}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
        >
          <ShieldAlert size={17} className="animate-pulse" />
          <span>Emergency SOS</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-300 hover:bg-slate-800/40 transition-all mt-2"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>

      {/* Partner Info Footer Card */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
        <img
          src={partner.photoUrl}
          alt={partner.name}
          className="w-9 h-9 rounded-full object-cover border border-emerald-500/40"
        />
        <div className="overflow-hidden">
          <div className="text-xs font-bold text-white truncate">{partner.name}</div>
          <div className="text-[10px] text-slate-400 truncate">ID: {partner.id}</div>
        </div>
      </div>
    </aside>
  );
};
