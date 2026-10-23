import React, { useState } from 'react';
import { HelpCircle, MessageSquare, PhoneCall, AlertTriangle, ShieldCheck, ChevronRight, Search } from 'lucide-react';
import { LiveSupportChat } from './LiveSupportChat';

export const HelpSupportView: React.FC = () => {
  const [showLiveChat, setShowLiveChat] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqCategories = [
    { title: 'Store & Pickup Issues', desc: 'Order not ready, merchant closed, wrong pickup code', icon: HelpCircle },
    { title: 'Customer Delivery Issues', desc: 'Unreachable customer, locked gate, wrong address', icon: ShieldCheck },
    { title: 'Earnings & Instant Payouts', desc: 'Missing tip, rate per km, cashout processing', icon: PhoneCall },
    { title: 'Vehicle & Safety Emergency', desc: 'Accident help, vehicle breakdown, SOS dispatch', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Help & Support Center</h1>
        <p className="text-xs text-slate-400">24/7 dedicated partner support for active orders and account queries.</p>
      </div>

      {/* Live Support Banner CTA */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-[#161e2e] to-[#161e2e] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-[#00E676] border border-emerald-500/30">
            LIVE ASSISTANCE
          </span>
          <h2 className="text-xl font-black text-white mt-1">Need Instant Help with Order?</h2>
          <p className="text-xs text-slate-400">Chat with Feedo automated assistant or connect directly to agent support.</p>
        </div>

        <button
          onClick={() => setShowLiveChat(true)}
          className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
        >
          <MessageSquare size={18} />
          <span>START LIVE CHAT</span>
        </button>
      </div>

      {/* Search FAQ Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search help topics (e.g. pickup code, instant payout, vehicle issue)..."
          className="w-full bg-[#161e2e] border border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-700"
        />
      </div>

      {/* FAQ Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {faqCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              onClick={() => setShowLiveChat(true)}
              className="bg-[#161e2e] hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#00E676] border border-slate-800 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{cat.title}</h4>
                  <p className="text-xs text-slate-400">{cat.desc}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </div>
          );
        })}
      </div>

      {/* Live Support Drawer */}
      {showLiveChat && <LiveSupportChat onClose={() => setShowLiveChat(false)} />}
    </div>
  );
};
