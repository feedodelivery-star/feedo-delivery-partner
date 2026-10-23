import React from 'react';
import { AccountStatus } from '../../types';
import { ShieldAlert, Clock, AlertTriangle, FileText, Phone, ArrowLeft, RefreshCw, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ApplicationStatusScreensProps {
  status: AccountStatus;
  applicationId?: string;
  rejectionReason?: string;
  missingDocuments?: string[];
  onBackToLogin: () => void;
  onOpenSupport: () => void;
  onResumeRegistration?: () => void;
}

export const ApplicationStatusScreens: React.FC<ApplicationStatusScreensProps> = ({
  status,
  applicationId = 'FD-APP-102938',
  rejectionReason = 'Driving licence photo verification failed due to blurriness.',
  missingDocuments = ['Driving Licence (Front & Back)', 'Vehicle RC (Registration Certificate)'],
  onBackToLogin,
  onOpenSupport,
  onResumeRegistration,
}) => {
  if (status === 'UNDER_REVIEW') {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-[#161e2e] border border-amber-500/40 rounded-3xl p-6 shadow-2xl relative text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Clock size={32} />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-widest mb-2">
            APPLICATION UNDER REVIEW
          </span>

          <h2 className="text-xl font-black text-white mb-1">Your Application is Being Verified</h2>
          <p className="text-xs text-slate-400 mb-5">
            Our Feedo partner onboarding team is currently checking your submitted documents and vehicle registration.
          </p>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6 text-left space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-semibold">Application Reference ID</span>
              <span className="font-mono font-bold text-amber-400">{applicationId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Current Status</span>
              <span className="font-bold text-amber-400">⏳ Under Admin Verification</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Review Time</span>
              <span className="font-bold text-white">2 to 6 Hours</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 mb-6 text-left">
            Notice: Dashboard access is disabled until your Feedo partner account is approved by admin verification.
          </div>

          <div className="space-y-2">
            <button
              onClick={onOpenSupport}
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <HelpCircle size={16} />
              <span>CONTACT SUPPORT TEAM</span>
            </button>

            <button
              onClick={onBackToLogin}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>BACK TO LOGIN</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'DOCUMENTS_PENDING') {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-[#161e2e] border border-slate-700 rounded-3xl p-6 shadow-2xl relative text-center">
          <div className="w-16 h-16 rounded-3xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto mb-4">
            <FileText size={32} />
          </div>

          <h2 className="text-xl font-black text-white mb-1">Complete Your Application</h2>
          <p className="text-xs text-slate-400 mb-5">
            You are a few steps away from completing your Feedo delivery partner registration!
          </p>

          {/* Checklist */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6 text-left space-y-2.5 text-xs">
            <div className="text-slate-400 font-bold mb-1">REGISTRATION CHECKLIST</div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 size={16} />
              <span>Mobile OTP Verification</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 size={16} />
              <span>Personal Information</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 size={16} />
              <span>Profile Photo</span>
            </div>
            {missingDocuments.map((doc) => (
              <div key={doc} className="flex items-center gap-2 text-amber-400 font-bold">
                <AlertTriangle size={16} />
                <span>Missing: {doc}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <button
              onClick={onResumeRegistration}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              <span>RESUME REGISTRATION WIZARD</span>
            </button>

            <button
              onClick={onBackToLogin}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>BACK TO LOGIN</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'REJECTED') {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-[#161e2e] border border-red-500/50 rounded-3xl p-6 shadow-2xl relative text-center">
          <div className="w-16 h-16 rounded-3xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={32} />
          </div>

          <h2 className="text-xl font-black text-white mb-1">Application Not Approved</h2>
          <p className="text-xs text-slate-400 mb-5">
            Your application could not be verified by our Feedo compliance team.
          </p>

          <div className="bg-slate-900 border border-red-500/30 p-4 rounded-2xl mb-6 text-left space-y-2 text-xs">
            <div className="text-red-400 font-bold">REJECTION REASON</div>
            <p className="text-slate-300">{rejectionReason}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={onResumeRegistration}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              <span>RE-UPLOAD CORRECTION DOCUMENTS</span>
            </button>

            <button
              onClick={onOpenSupport}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2"
            >
              <HelpCircle size={16} />
              <span>CONTACT SUPPORT</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Suspended Status
  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-[#161e2e] border border-red-500/50 rounded-3xl p-6 shadow-2xl relative text-center">
        <div className="w-16 h-16 rounded-3xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert size={32} />
        </div>

        <h2 className="text-xl font-black text-white mb-1">Partner Account Suspended</h2>
        <p className="text-xs text-slate-400 mb-5">
          Your Feedo delivery partner account has been temporarily suspended.
        </p>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6 text-left text-xs text-slate-300">
          Reason: Order cancellation threshold exceeded / Pending safety audit. Please contact Feedo Partner Helpdesk.
        </div>

        <button
          onClick={onOpenSupport}
          className="w-full py-3.5 px-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Phone size={16} />
          <span>CALL PARTNER HELPDESK</span>
        </button>

        <button
          onClick={onBackToLogin}
          className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center justify-center gap-2 mt-2"
        >
          <ArrowLeft size={16} />
          <span>BACK TO LOGIN</span>
        </button>
      </div>
    </div>
  );
};
