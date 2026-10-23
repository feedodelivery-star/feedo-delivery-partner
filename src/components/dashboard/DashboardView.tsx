import React from 'react';
import { StatusToggle } from './StatusToggle';
import { useDelivery } from '../../context/DeliveryContext';
import { ActiveDeliveryWorkflow } from '../delivery/ActiveDeliveryWorkflow';
import {
  DollarSign,
  Package,
  Navigation,
  Clock,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Flame
} from 'lucide-react';
import { NavTab } from '../common/BottomNav';

interface DashboardViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenHelp: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab, onOpenHelp }) => {
  const {
    isOnline,
    activeOrder,
    dailyMetrics,
    gpsState,
    updateDeliveryState,
    verifyPickupCode,
    verifyDeliveryOtp,
    cancelActiveOrder,
    isStoreCodeIncorrect,
    isCustomerOtpIncorrect,
  } = useDelivery();

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* 1. Main Status Toggle Card */}
      <StatusToggle />

      {/* 2. Active Delivery Workflow Section (If active delivery exists) */}
      {activeOrder ? (
        <ActiveDeliveryWorkflow
          order={activeOrder}
          gpsState={gpsState}
          onUpdateState={updateDeliveryState}
          onVerifyPickup={verifyPickupCode}
          onVerifyOtp={verifyDeliveryOtp}
          onCancelOrder={cancelActiveOrder}
          isStoreCodeError={isStoreCodeIncorrect}
          isOtpError={isCustomerOtpIncorrect}
        />
      ) : (
        /* 3. Today's Statistics & Performance Cards */
        <div className="space-y-6">
          {/* Today's Earning Highlight Card */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-[#161e2e] to-[#161e2e] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  TODAY'S EARNINGS
                </div>
                <div className="text-4xl font-black text-white tracking-tight mt-1 flex items-baseline gap-2">
                  <span>₹{dailyMetrics.earnings.toFixed(2)}</span>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    +₹52 vs yesterday
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('earnings')}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#00E676] font-bold text-xs border border-slate-700/80 flex items-center gap-1.5 transition-colors"
              >
                <span>View Breakdown</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Quick Earnings Sub-Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Delivery Pay</div>
                <div className="text-sm font-extrabold text-white">₹312.00</div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Distance Pay</div>
                <div className="text-sm font-extrabold text-white">₹124.50</div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Incentives</div>
                <div className="text-sm font-extrabold text-amber-400">₹30.00</div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Tips</div>
                <div className="text-sm font-extrabold text-emerald-400">₹20.00</div>
              </div>
            </div>
          </div>

          {/* Today's Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-[#00E676] flex items-center justify-center mb-2">
                <Package size={18} />
              </div>
              <div className="text-2xl font-black text-white">{dailyMetrics.ordersCompleted}</div>
              <div className="text-xs text-slate-400">Orders Completed</div>
            </div>

            <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center mb-2">
                <Navigation size={18} />
              </div>
              <div className="text-2xl font-black text-white">{dailyMetrics.distanceKm} km</div>
              <div className="text-xs text-slate-400">Total Distance</div>
            </div>

            <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center mb-2">
                <Clock size={18} />
              </div>
              <div className="text-2xl font-black text-white">
                {Math.floor(dailyMetrics.onlineTimeMinutes / 60)}h {dailyMetrics.onlineTimeMinutes % 60}m
              </div>
              <div className="text-xs text-slate-400">Online Hours</div>
            </div>

            <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2">
                <CheckCircle2 size={18} />
              </div>
              <div className="text-2xl font-black text-white">{dailyMetrics.acceptanceRate}%</div>
              <div className="text-xs text-slate-400">Acceptance Rate</div>
            </div>

            <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-2">
                <ShieldCheck size={18} />
              </div>
              <div className="text-2xl font-black text-white">{dailyMetrics.completionRate}%</div>
              <div className="text-xs text-slate-400">Completion Rate</div>
            </div>

            <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
              <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center mb-2">
                <TrendingUp size={18} />
              </div>
              <div className="text-2xl font-black text-white">₹40.5/h</div>
              <div className="text-xs text-slate-400">Hourly Rate</div>
            </div>
          </div>

          {/* Incentive Target Banner */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Award size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">Daily Target Milestone</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    ₹100 BONUS
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete 3 more orders today to unlock ₹100 cash reward (7 / 10 done).
                </p>

                {/* Progress Bar */}
                <div className="w-full sm:w-64 bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full w-[70%]" />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('performance')}
              className="py-2.5 px-4 rounded-xl bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/30 font-bold text-xs flex items-center gap-1 self-stretch sm:self-auto justify-center"
            >
              <span>View All Challenges</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* High Demand / Heatmap Zone Alert */}
          <div className="bg-gradient-to-r from-orange-950/60 via-slate-900 to-slate-900 border border-orange-500/30 rounded-3xl p-5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center flex-shrink-0">
                <Flame size={22} className="animate-bounce" />
              </div>
              <div>
                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  HIGH SURGE DEMAND NEARBY
                </div>
                <div className="text-base font-extrabold text-white">
                  Indiranagar & Koramangala Hub (+₹15/order)
                </div>
                <div className="text-xs text-slate-400">12 active orders waiting for partner pickup</div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('orders')}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-xs transition-colors shadow-md hidden sm:flex items-center gap-1"
            >
              <span>GO TO ZONE</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
