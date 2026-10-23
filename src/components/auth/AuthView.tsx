import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AccountStatus } from '../../types';
import { ApplicationStatusScreens } from './ApplicationStatusScreens';
import { PartnerRegistrationWizard } from './PartnerRegistrationWizard';
import { AdminDemoPortal } from '../admin/AdminDemoPortal';
import { ArrowRight, ShieldCheck, CheckCircle2, UserPlus, Phone, Lock, Wrench, AlertTriangle, Building, UserCheck } from 'lucide-react';

interface AuthViewProps {
  onSuccessLogin: () => void;
  onOpenSupport?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccessLogin, onOpenSupport }) => {
  const { loginWithPhone, verifyOtp, partner, isAdminPortalOpen, setIsAdminPortalOpen } = useAuth();
  const [viewState, setViewState] = useState<'LOGIN' | 'OTP' | 'REGISTRATION' | 'STATUS_SCREEN'>('LOGIN');
  const [phone, setPhone] = useState<string>('9999999999');
  const [otp, setOtp] = useState<string>('123456');
  const [error, setError] = useState<string>('');
  const [unregisteredError, setUnregisteredError] = useState<string>('');
  const [blockedStatus, setBlockedStatus] = useState<AccountStatus>('APPROVED');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUnregisteredError('');
    setError('');

    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    const res = loginWithPhone(phone);

    // STRICT RULE ENFORCEMENT: Unregistered mobile numbers CANNOT log in!
    if (!res.success && res.isUnregistered) {
      setUnregisteredError(res.message || `Mobile number +91 ${phone} is not registered with Feedo.`);
      return;
    }

    setViewState('OTP');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = verifyOtp(otp);

    if (result.success && result.status === 'APPROVED') {
      onSuccessLogin();
    } else {
      setBlockedStatus(result.status);
      setViewState('STATUS_SCREEN');
    }
  };

  if (isAdminPortalOpen) {
    return <AdminDemoPortal onClose={() => setIsAdminPortalOpen(false)} />;
  }

  if (viewState === 'REGISTRATION') {
    return (
      <PartnerRegistrationWizard
        onBackToLogin={() => setViewState('LOGIN')}
        onCompletedRegistration={(appId) => {
          setBlockedStatus('UNDER_REVIEW');
          setViewState('STATUS_SCREEN');
        }}
      />
    );
  }

  if (viewState === 'STATUS_SCREEN') {
    return (
      <ApplicationStatusScreens
        status={blockedStatus}
        applicationId={partner.applicationId || 'FD-APP-102938'}
        onBackToLogin={() => setViewState('LOGIN')}
        onOpenSupport={() => {
          if (onOpenSupport) onOpenSupport();
        }}
        onResumeRegistration={() => setViewState('REGISTRATION')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Admin Portal Trigger Pill */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsAdminPortalOpen(true)}
          className="py-2 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-xs border border-amber-500/40 flex items-center gap-1.5 shadow-xl"
        >
          <Building size={14} />
          <span>OPEN ADMIN VERIFICATION PORTAL</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-[#161e2e] border border-slate-800 rounded-3xl p-6 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00C853] to-[#059669] text-slate-950 font-black text-3xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
            F
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">FEEDO</h1>
          <p className="text-xs font-bold text-[#00E676] tracking-widest mt-0.5 uppercase">
            DELIVERY PARTNER LOGISTICS
          </p>
          <p className="text-[11px] text-slate-400 mt-1">DRIVE LESS. DELIVER SMARTER. EARN CLEARLY.</p>
        </div>

        {viewState === 'LOGIN' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                EXISTING PARTNER MOBILE LOGIN
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm font-bold">
                  +91
                </span>
                <input
                  type="text"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ''));
                    setUnregisteredError('');
                    setError('');
                  }}
                  placeholder="9999999999"
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-14 pr-4 py-3 text-base font-bold text-white focus:outline-none focus:border-[#00C853]"
                  autoFocus
                />
              </div>
            </div>

            {error && <div className="text-xs text-red-400">{error}</div>}

            {/* Unregistered Mobile Warning Box */}
            {unregisteredError && (
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-400">
                  <AlertTriangle size={16} />
                  <span>MOBILE NUMBER NOT REGISTERED</span>
                </div>
                <p>{unregisteredError}</p>
                <button
                  type="button"
                  onClick={() => setViewState('REGISTRATION')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md mt-1"
                >
                  <UserPlus size={15} />
                  <span>REGISTER AS DELIVERY PARTNER NOW</span>
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <span>CONTINUE WITH OTP</span>
              <ArrowRight size={18} />
            </button>

            {/* Registration CTA Divider */}
            <div className="pt-3 border-t border-slate-800 text-center space-y-3">
              <span className="text-xs text-slate-400 font-medium">New to Feedo Delivery Platform?</span>
              <button
                type="button"
                onClick={() => setViewState('REGISTRATION')}
                className="w-full py-3 px-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-2 transition-colors"
              >
                <UserPlus size={16} />
                <span>REGISTER AS DELIVERY PARTNER</span>
              </button>
            </div>

            {/* Registered Phone Presets for Presentation */}
            <div className="pt-3 border-t border-slate-800 text-[10px] space-y-1.5">
              <div className="text-slate-400 font-bold flex items-center justify-between">
                <span>REGISTERED DEMO PRESETS:</span>
                <span className="text-amber-400 font-normal">Click to test</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => {
                    setPhone('9999999999');
                    setUnregisteredError('');
                  }}
                  className="p-1.5 rounded-lg bg-emerald-500/15 text-[#00E676] border border-emerald-500/30 font-bold text-left truncate"
                >
                  ✓ Approved (9999999999)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhone('8888888888');
                    setUnregisteredError('');
                  }}
                  className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold text-left truncate"
                >
                  ⏳ Pending (8888888888)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhone('7777777777');
                    setUnregisteredError('');
                  }}
                  className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/30 font-bold text-left truncate"
                >
                  ⚠ Incomplete (7777777777)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhone('6666666666');
                    setUnregisteredError('');
                  }}
                  className="p-1.5 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30 font-bold text-left truncate"
                >
                  ✕ Rejected (6666666666)
                </button>
              </div>
            </div>
          </form>
        )}

        {viewState === 'OTP' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center mb-2">
              <span className="text-xs text-slate-400">OTP sent to +91 {phone}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 text-center">
                ENTER 6-DIGIT VERIFICATION OTP
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center text-3xl font-mono tracking-widest font-black py-3 px-4 rounded-2xl bg-slate-900 border border-slate-700 text-[#00E676] focus:outline-none focus:border-[#00C853]"
                autoFocus
              />
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-center">
              Demo OTP Code: <span className="text-[#00E676] font-mono font-bold">123456</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <span>VERIFY OTP & CONTINUE</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => setViewState('LOGIN')}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1"
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
