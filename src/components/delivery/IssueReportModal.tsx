import React, { useState } from 'react';
import { AlertTriangle, HelpCircle, X, CheckCircle2 } from 'lucide-react';

interface IssueReportModalProps {
  type: 'STORE' | 'CUSTOMER' | 'CANCEL';
  onClose: () => void;
  onSubmitIssue: (reason: string) => void;
}

export const IssueReportModal: React.FC<IssueReportModalProps> = ({
  type,
  onClose,
  onSubmitIssue,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');

  const storeReasons = [
    'Order is delayed / Not ready yet',
    'Store is closed / Unreachable',
    'Pickup code unavailable from staff',
    'Package is damaged or leaking',
    'Wrong items packed by store',
    'Other store issue'
  ];

  const customerReasons = [
    'Customer not answering phone call',
    'Delivery location inaccessible / Locked gate',
    'Incorrect / Incomplete delivery address',
    'Customer refused package',
    'Safety issue at location',
    'Other customer issue'
  ];

  const cancelReasons = [
    'Vehicle breakdown / Flat tyre',
    'Store closed / Cannot pick up',
    'Customer non-responsive',
    'Accident or medical emergency',
    'Excessive store wait time (>20 mins)',
    'Other emergency'
  ];

  const reasons = type === 'STORE' ? storeReasons : type === 'CUSTOMER' ? customerReasons : cancelReasons;
  const title = type === 'STORE' ? 'Report Store Issue' : type === 'CUSTOMER' ? 'Report Customer Issue' : 'Cancel Delivery Order';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;
    onSubmitIssue(selectedReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#161e2e] border border-slate-700 rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-4">
          <AlertTriangle size={22} />
        </div>

        <h3 className="text-xl font-black text-white mb-1">{title}</h3>
        <p className="text-xs text-slate-400 mb-4">
          Please select the reason so Feedo support can assist or reassign the order.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {reasons.map((reason) => (
              <label
                key={reason}
                onClick={() => setSelectedReason(reason)}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  selectedReason === reason
                    ? 'bg-amber-500/15 border-amber-500/60 text-white'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{reason}</span>
                <input
                  type="radio"
                  name="issueReason"
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="accent-amber-500"
                />
              </label>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            Note: Frequent cancellations affect your acceptance & completion rating.
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!selectedReason}
              className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={16} />
              <span>Submit Issue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
