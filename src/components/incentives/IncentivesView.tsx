import React from 'react';
import { mockIncentives } from '../../data/mockIncentives';
import { Award, Clock, Zap, CheckCircle2, ChevronRight, Gift } from 'lucide-react';

export const IncentivesView: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Active Incentives & Rewards</h1>
        <p className="text-xs text-slate-400">Complete delivery milestones to unlock daily cash bonuses & surge rewards.</p>
      </div>

      {/* Hero Incentive Card */}
      <div className="bg-gradient-to-r from-amber-950/80 via-[#161e2e] to-[#161e2e] border border-amber-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
              <Gift size={24} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                FEATURED WEEKLY CHALLENGE
              </span>
              <h2 className="text-xl font-black text-white mt-1">Weekly Hero Milestone — ₹500 Bonus</h2>
              <p className="text-xs text-slate-400">Complete 60 deliveries this week. 44 done so far!</p>
            </div>
          </div>
          <div className="text-right font-black text-2xl text-amber-400">₹500</div>
        </div>

        {/* Big Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-300">Progress: 44 / 60 Orders</span>
            <span className="text-amber-400">73% Completed</span>
          </div>
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full rounded-full w-[73%]" />
          </div>
          <div className="text-[11px] text-slate-500">Expires in 2 days (Sunday 11:59 PM)</div>
        </div>
      </div>

      {/* All Incentives List */}
      <div className="space-y-3">
        <h3 className="text-base font-extrabold text-white">Today's Active Targets</h3>

        {mockIncentives.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-3xl border transition-all ${
              item.isCompleted
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : 'bg-[#161e2e] border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.isCompleted
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {item.isCompleted ? <CheckCircle2 size={20} /> : <Zap size={20} />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-white">{item.title}</h4>
                    {item.isCompleted && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-[#00E676] border border-emerald-500/30">
                        UNLOCKED & CREDITED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>

              <div className="text-right self-end sm:self-auto">
                <div className="text-lg font-black text-[#00E676]">₹{item.rewardAmount}</div>
                {item.timeLimit && <div className="text-[10px] text-slate-500">{item.timeLimit}</div>}
              </div>
            </div>

            {/* Progress Bar */}
            {!item.isCompleted && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Progress</span>
                  <span className="font-bold text-white">
                    {item.currentProgress} / {item.targetProgress}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-[#00E676] h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (item.currentProgress / item.targetProgress) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
