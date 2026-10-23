import React from 'react';
import { Star, ThumbsUp, ShieldCheck, Clock, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { mockPartnerProfile } from '../../data/mockProfile';

export const PerformanceView: React.FC = () => {
  const ratingDistribution = [
    { stars: '5 ★', percentage: 92, count: 315 },
    { stars: '4 ★', percentage: 6, count: 20 },
    { stars: '3 ★', percentage: 1, count: 4 },
    { stars: '2 ★', percentage: 0.5, count: 2 },
    { stars: '1 ★', percentage: 0.5, count: 1 },
  ];

  const compliments = [
    { title: 'Super Fast Delivery', count: 184, icon: Clock },
    { title: 'Friendly & Polite', count: 142, icon: Heart },
    { title: 'Well Packaged & Intact', count: 98, icon: ShieldCheck },
    { title: 'Followed Instructions', count: 76, icon: ThumbsUp },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Performance & Partner Ratings</h1>
        <p className="text-xs text-slate-400">Maintain high ratings and low cancellation rates to receive priority order matching.</p>
      </div>

      {/* Main Overall Rating Highlight */}
      <div className="bg-gradient-to-r from-amber-950/80 via-[#161e2e] to-[#161e2e] border border-amber-500/40 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex flex-col items-center justify-center font-black">
            <span className="text-3xl leading-none">{mockPartnerProfile.rating}</span>
            <div className="flex text-amber-400 text-xs mt-1">
              <Star size={12} fill="currentColor" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              EXCELLENT PARTNER SCORE
            </div>
            <h2 className="text-xl font-black text-white">Top 5% Partner in Indiranagar</h2>
            <p className="text-xs text-slate-400">Based on {mockPartnerProfile.totalRatings} customer & store ratings</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Acceptance Rate</div>
            <div className="text-xl font-black text-[#00E676]">96%</div>
          </div>
          <div className="bg-slate-900/80 p-3 rounded-2xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Completion Rate</div>
            <div className="text-xl font-black text-[#00E676]">98%</div>
          </div>
        </div>
      </div>

      {/* Rating Breakdown Chart */}
      <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white">Star Rating Breakdown</h3>

        <div className="space-y-2.5">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <span className="w-8 font-bold text-amber-400">{item.stars}</span>
              <div className="flex-1 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-amber-400 h-full rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-12 text-right text-slate-400 font-semibold">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Compliments Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-extrabold text-white">Customer Compliments</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {compliments.map((comp) => {
            const Icon = comp.icon;
            return (
              <div key={comp.title} className="bg-[#161e2e] border border-slate-800 p-4 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-[#00E676] flex items-center justify-center mx-auto mb-2">
                  <Icon size={20} />
                </div>
                <div className="text-lg font-black text-white">{comp.count}</div>
                <div className="text-xs text-slate-400">{comp.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
