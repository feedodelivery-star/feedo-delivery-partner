import React from 'react';
import { Home, Package, DollarSign, TrendingUp, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export type NavTab = 'home' | 'orders' | 'earnings' | 'performance' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeOrderCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  activeOrderCount = 0,
}) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home' as NavTab, label: t('home'), icon: Home },
    { id: 'orders' as NavTab, label: t('myOrders'), icon: Package, badge: activeOrderCount },
    { id: 'earnings' as NavTab, label: t('earnings'), icon: DollarSign },
    { id: 'performance' as NavTab, label: t('performance'), icon: TrendingUp },
    { id: 'profile' as NavTab, label: t('profile'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0f19]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 md:hidden">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-[#00E676] bg-emerald-500/10 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center animate-bounce">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#00E676] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
