import React from 'react';
import { mockNotifications } from '../../data/mockNotifications';
import { Bell, CheckCircle2, DollarSign, Award, ShieldAlert, X } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#161e2e] border border-slate-700 rounded-3xl p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#00E676] flex items-center justify-center">
            <Bell size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Notifications Center</h3>
            <p className="text-xs text-slate-400">Updates on orders, earnings & account</p>
          </div>
        </div>

        <div className="space-y-3">
          {mockNotifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                n.isRead ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-900 border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white">{n.title}</span>
                <span className="text-[10px] text-slate-500">{n.timestamp}</span>
              </div>
              <p className="text-slate-400">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
