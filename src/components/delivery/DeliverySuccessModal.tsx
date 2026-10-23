import React from 'react';
import { Check, Sparkles, ArrowRight, DollarSign } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DeliverySuccessModalProps {
  earningAmount: number;
  onClose: () => void;
  onViewOrders: () => void;
}

export const DeliverySuccessModal: React.FC<DeliverySuccessModalProps> = ({
  earningAmount,
  onClose,
  onViewOrders,
}) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#161e2e] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl text-center relative overflow-hidden">
        {/* Top Celebration Sparkle Glow */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Checkmark Circle */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#00C853] to-[#00E676] text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-4 animate-bounce">
          <Check size={42} strokeWidth={3.5} />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[#00E676] text-xs font-bold mb-2">
          <Sparkles size={14} />
          <span>DELIVERY SUCCESSFUL</span>
        </div>

        <h2 className="text-2xl font-black text-white mb-1">{t('deliveryCompleted')}</h2>
        <p className="text-xs text-slate-400 mb-5">
          Great job! The package was verified and safely handed over.
        </p>

        {/* Big Earnings Breakdown Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 text-left space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs text-slate-400 font-semibold">{t('youEarned')}</span>
            <span className="text-2xl font-black text-[#00E676]">₹{earningAmount}</span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Base Delivery Pay</span>
              <span>₹20.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Distance Pay (3.8 km)</span>
              <span>₹24.00</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Peak Demand Surge Bonus</span>
              <span>+₹5.00</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Customer Tip</span>
              <span>+₹3.00</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onViewOrders}
            className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
          >
            {t('viewOrder')}
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5"
          >
            <span>{t('backToDashboard')}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
