import React, { useState } from 'react';
import { CustomerInfo } from '../../types';
import { ShieldCheck, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface DeliveryOTPModalProps {
  customer: CustomerInfo;
  onVerify: (otp: string) => boolean;
  onClose: () => void;
  isError?: boolean;
}

export const DeliveryOTPModal: React.FC<DeliveryOTPModalProps> = ({
  customer,
  onVerify,
  onClose,
  isError = false,
}) => {
  const { t } = useLanguage();
  const [otp, setOtp] = useState<string>('');
  const [localError, setLocalError] = useState<boolean>(isError);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    const success = onVerify(otp);
    if (!success) {
      setLocalError(true);
    }
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

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-[#00E676] border border-emerald-500/40 flex items-center justify-center mb-4">
          <ShieldCheck size={24} />
        </div>

        <h3 className="text-xl font-black text-white mb-1">{t('enterDeliveryOtp')}</h3>
        <p className="text-xs text-slate-400 mb-4">
          Ask customer <span className="text-white font-bold">{customer.name}</span> for their 4-digit delivery completion OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              ENTER 4-DIGIT CUSTOMER OTP
            </label>
            <input
              type="text"
              maxLength={4}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, ''));
                setLocalError(false);
              }}
              placeholder="e.g. 9102"
              className="w-full text-center text-3xl font-mono tracking-widest font-black py-3 px-4 rounded-2xl bg-slate-900 border border-slate-700 text-[#00E676] focus:outline-none focus:border-[#00C853]"
              autoFocus
            />
          </div>

          {localError && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>Incorrect OTP. Please ask customer to check their Feedo app SMS. (Demo hint: 9102)</span>
            </div>
          )}

          <button
            type="submit"
            disabled={otp.length < 4}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} />
            <span>{t('verifyAndComplete')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
