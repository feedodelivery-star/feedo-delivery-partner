import React, { useState, useEffect } from 'react';
import { Order } from '../../types';
import { CategoryBadge } from '../common/CategoryBadge';
import { MapPin, Clock, DollarSign, ArrowRight, ShieldCheck, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface OrderOfferModalProps {
  order: Order;
  onAccept: () => void;
  onDecline: () => void;
}

export const OrderOfferModal: React.FC<OrderOfferModalProps> = ({
  order,
  onAccept,
  onDecline,
}) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<number>(15);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDecline();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onDecline]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-[#161e2e] border border-slate-700/80 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl overflow-hidden relative border-t-4 border-t-[#00C853]">
        {/* Top Radar Pulse Alert Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#00E676] animate-ping" />
            <span className="text-xs font-black tracking-widest text-[#00E676] uppercase">
              {order.isBatched ? 'SMART BATCHED OFFER' : 'NEW ORDER OFFER'}
            </span>
          </div>

          {/* Countdown Ring Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-extrabold text-xs">
            <Clock size={14} className="animate-spin" />
            <span>{t('acceptWithin')} {timeLeft}s</span>
          </div>
        </div>

        {/* Order Category & Order ID */}
        <div className="flex items-center justify-between gap-2 mb-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2">
            <CategoryBadge category={order.category} size="md" />
            {order.isBatched && (
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                <Layers size={12} />
                <span>2 DROPS</span>
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400">Order ID</div>
            <div className="text-sm font-bold text-white font-mono">{order.id}</div>
          </div>
        </div>

        {/* Big Earning & Distance Highlight Card */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 p-4 rounded-2xl border border-emerald-500/30 mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Estimated Earnings</div>
            <div className="text-3xl font-black text-[#00E676] tracking-tight flex items-baseline gap-1">
              <span>₹{order.estimatedEarnings}</span>
              <span className="text-xs text-emerald-400/80 font-normal">
                (incl. ₹{order.earningsBreakdown.surgeBonus + order.earningsBreakdown.tip} bonus)
              </span>
            </div>
          </div>
          <div className="text-right border-l border-slate-800 pl-4">
            <div className="text-xs text-slate-400">Total Route</div>
            <div className="text-lg font-bold text-white">{order.totalDistance} km</div>
            <div className="text-[11px] text-slate-400">~{order.estimatedTime} mins</div>
          </div>
        </div>

        {/* Route Details (Store & Delivery Area Preview) */}
        <div className="space-y-3 mb-5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
          {/* Pickup Store */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">PICKUP STORE</span>
                <span className="text-amber-400 font-bold">{order.distanceToPickup} km away</span>
              </div>
              <div className="text-sm font-bold text-white truncate">{order.store.name}</div>
              <div className="text-xs text-slate-400 truncate">{order.store.address}</div>
            </div>
          </div>

          <div className="ml-3.5 border-l-2 border-dashed border-slate-700 h-3 my-0.5" />

          {/* Delivery Area (Exact address hidden before acceptance) */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">DELIVERY AREA</span>
                <span className="text-blue-400 font-bold">{order.deliveryDistance} km drop</span>
              </div>
              <div className="text-sm font-bold text-white">{order.zone} Area</div>
              <div className="text-xs text-amber-400/90 flex items-center gap-1 mt-0.5">
                <ShieldCheck size={12} />
                <span>Exact delivery address unlocks after pickup verification</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onDecline}
            className="py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-700 transition-colors"
          >
            {t('decline')}
          </button>
          <button
            onClick={onAccept}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            <span>{t('accept')}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
