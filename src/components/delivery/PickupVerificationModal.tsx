import React, { useState } from 'react';
import { StoreInfo } from '../../types';
import { Lock, AlertCircle, KeyRound, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface PickupVerificationModalProps {
  store: StoreInfo;
  onVerify: (code: string) => boolean;
  onClose: () => void;
  isError?: boolean;
}

export const PickupVerificationModal: React.FC<PickupVerificationModalProps> = ({
  store,
  onVerify,
  onClose,
  isError = false,
}) => {
  const { t } = useLanguage();
  const [code, setCode] = useState<string>('');
  const [localError, setLocalError] = useState<boolean>(isError);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) return;
    const success = onVerify(code);
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

        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-4">
          <KeyRound size={24} />
        </div>

        <h3 className="text-xl font-black text-white mb-1">{t('pickupVerification')}</h3>
        <p className="text-xs text-slate-400 mb-4">
          Ask <span className="text-amber-400 font-semibold">{store.name}</span> staff for the 4-digit pickup verification code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              ENTER 4-DIGIT PICKUP CODE
            </label>
            <input
              type="text"
              maxLength={4}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.replace(/\D/g, ''));
                setLocalError(false);
              }}
              placeholder="e.g. 4821"
              className="w-full text-center text-3xl font-mono tracking-widest font-black py-3 px-4 rounded-2xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              autoFocus
            />
          </div>

          {localError && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>Incorrect pickup code. Please confirm with store manager. (Demo hint: 4821)</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <Lock size={14} />
            <span>Customer delivery address will unlock automatically after verification.</span>
          </div>

          <button
            type="submit"
            disabled={code.length < 4}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} />
            <span>{t('verifyAndPickup')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
