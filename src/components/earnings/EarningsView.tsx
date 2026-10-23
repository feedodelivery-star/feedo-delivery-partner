import React, { useState } from 'react';
import { weeklyEarningsData, todayEarningsSummary, payoutHistory } from '../../data/mockEarnings';
import { PayoutModal } from './PayoutModal';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  ArrowUpRight,
  Download,
  CheckCircle2,
  PieChart as PieIcon,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const EarningsView: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('week');
  const [showPayoutModal, setShowPayoutModal] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(todayEarningsSummary.availableBalance);

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Earnings & Cashouts</h1>
          <p className="text-xs text-slate-400">Track daily payouts, incentives, distance pay, and tips.</p>
        </div>

        {/* Time Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setTimeFilter('today')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              timeFilter === 'today' ? 'bg-[#00E676] text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              timeFilter === 'week' ? 'bg-[#00E676] text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              timeFilter === 'month' ? 'bg-[#00E676] text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Available Balance & Payout CTA Card */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-[#161e2e] to-[#161e2e] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              AVAILABLE CASHOUT BALANCE
            </div>
            <div className="text-4xl font-black text-[#00E676] tracking-tight mt-1">
              ₹{balance.toFixed(2)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Next scheduled auto payout: <span className="text-white font-bold">{todayEarningsSummary.nextPayoutDate}</span>
            </div>
          </div>

          <button
            onClick={() => setShowPayoutModal(true)}
            className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
          >
            <CreditCard size={18} />
            <span>INSTANT CASHOUT NOW</span>
          </button>
        </div>
      </div>

      {/* Interactive Recharts Earnings Chart */}
      <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-white">Weekly Earnings Breakdown</h3>
            <p className="text-xs text-slate-400">Total: ₹3,842.00 across 102 orders</p>
          </div>
          <div className="text-xs font-bold text-[#00E676] bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Avg: ₹548/day
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyEarningsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [`₹${val}`, 'Earnings']}
              />
              <Bar dataKey="earnings" radius={[8, 8, 0, 0]}>
                {weeklyEarningsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.day.includes('Today') ? '#00E676' : '#059669'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Itemized Pay Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Base Delivery Earnings</div>
          <div className="text-xl font-black text-white">₹3,120.00</div>
          <div className="text-[10px] text-slate-500 mt-1">Fixed per-order rate</div>
        </div>

        <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Distance Earnings</div>
          <div className="text-xl font-black text-white">₹1,240.50</div>
          <div className="text-[10px] text-slate-500 mt-1">₹6.5 per km rate</div>
        </div>

        <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Milestone Incentives</div>
          <div className="text-xl font-black text-amber-400">₹420.00</div>
          <div className="text-[10px] text-slate-500 mt-1">Daily & peak bonuses</div>
        </div>

        <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Customer Tips</div>
          <div className="text-xl font-black text-emerald-400">₹302.00</div>
          <div className="text-[10px] text-slate-500 mt-1">100% passed to partner</div>
        </div>

        <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Rain / Surge Bonuses</div>
          <div className="text-xl font-black text-purple-400">₹200.00</div>
          <div className="text-[10px] text-slate-500 mt-1">Extreme demand surge</div>
        </div>

        <div className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl">
          <div className="text-xs text-slate-400 font-semibold mb-1">Adjustments / Refunds</div>
          <div className="text-xl font-black text-slate-300">₹0.00</div>
          <div className="text-[10px] text-slate-500 mt-1">Zero deductions</div>
        </div>
      </div>

      {/* Payout History Log */}
      <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">Past Bank Payouts</h3>
          <span className="text-xs text-slate-400 font-semibold">Direct UPI Transfer</span>
        </div>

        <div className="space-y-2.5">
          {payoutHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-[#00E676] flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <div className="font-bold text-white">₹{item.amount.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400">{item.date} • {item.id}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-[#00E676] border border-emerald-500/30">
                  {item.status}
                </span>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">{item.bankRef}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instant Payout Modal */}
      {showPayoutModal && (
        <PayoutModal
          balance={balance}
          onConfirmPayout={(amount) => {
            setBalance((prev) => Math.max(0, prev - amount));
            setShowPayoutModal(false);
          }}
          onClose={() => setShowPayoutModal(false)}
        />
      )}
    </div>
  );
};
