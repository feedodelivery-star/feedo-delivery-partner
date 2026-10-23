import React, { useState } from 'react';
import { CreditCard, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { mockPartnerProfile } from '../../data/mockProfile';

interface PayoutModalProps {
  balance: number;
  onConfirmPayout: (amount: number) => void;
  onClose: () => void;
}

export const PayoutModal: React.FC<PayoutModalProps> = ({
  balance,
  onConfirmPayout,
  onClose,
}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const bank = mockPartnerProfile.bankDetails;

  const handleCashout = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onConfirmPayout(balance);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#161e2e] border border-slate-700 rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X size={18} />
        </button>

        {!isSuccess ? (
          <>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-[#00E676] border border-emerald-500/40 flex items-center justify-center mb-4">
              <CreditCard size={24} />
            </div>

            <h3 className="text-xl font-black text-white mb-1">Instant Bank Cashout</h3>
            <p className="text-xs text-slate-400 mb-4">
              Transfer your available Feedo delivery earnings straight to your bank account via IMPS/UPI.
            </p>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Transfer Amount</span>
                <span className="font-bold text-white">₹{balance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Bank Account</span>
                <span className="font-bold text-slate-200">{bank.bankName} ({bank.accountNumberMasked})</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>UPI ID</span>
                <span className="font-bold text-slate-200">{bank.upiId}</span>
              </div>
              <div className="flex justify-between text-xs text-emerald-400 pt-2 border-t border-slate-800">
                <span>Transfer Fee</span>
                <span className="font-bold">₹0.00 (FREE)</span>
              </div>
            </div>

            <button
              onClick={handleCashout}
              disabled={balance <= 0}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              <span>CONFIRM CASHOUT ₹{balance.toFixed(2)}</span>
            </button>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-black text-white">Cashout Successful!</h3>
            <p className="text-xs text-slate-300">
              ₹{balance.toFixed(2)} has been credited to {bank.bankName}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
