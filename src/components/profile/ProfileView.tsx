import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockDocuments } from '../../data/mockProfile';
import {
  User,
  ShieldCheck,
  CreditCard,
  FileText,
  Star,
  Phone,
  Mail,
  Edit2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  LogOut,
  ChevronRight,
  Bike
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { partner, logout } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'vehicle' | 'bank' | 'documents'>('profile');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-[#00E676] border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>Verified</span>
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Clock size={12} />
            <span>Under Review</span>
          </span>
        );
      case 'ACTION_REQUIRED':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
            <AlertTriangle size={12} />
            <span>Action Required</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fade-in">
      {/* Header Profile Summary */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-[#161e2e] to-[#161e2e] border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <img
            src={partner.photoUrl}
            alt={partner.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#00E676] shadow-xl"
          />
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl font-black text-white">{partner.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-[#00E676] border border-emerald-500/30">
                PRO PARTNER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Partner ID: <span className="text-white font-mono font-bold">{partner.id}</span></p>
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star size={14} fill="currentColor" />
                <span>{partner.rating}</span>
              </span>
              <span>•</span>
              <span>{partner.currentZone}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center gap-2"
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'profile'
              ? 'bg-[#00E676] text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setActiveSubTab('vehicle')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'vehicle'
              ? 'bg-[#00E676] text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Vehicle Details
        </button>
        <button
          onClick={() => setActiveSubTab('bank')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'bank'
              ? 'bg-[#00E676] text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Bank Details
        </button>
        <button
          onClick={() => setActiveSubTab('documents')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'documents'
              ? 'bg-[#00E676] text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Documents Vault ({mockDocuments.length})
        </button>
      </div>

      {/* Tab Content Views */}
      {activeSubTab === 'profile' && (
        <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 text-xs">
          <h3 className="text-base font-extrabold text-white">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">Full Legal Name</div>
              <div className="text-sm font-bold text-white mt-0.5">{partner.name}</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">Registered Phone</div>
              <div className="text-sm font-bold text-white mt-0.5">{partner.phone}</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">Email Address</div>
              <div className="text-sm font-bold text-white mt-0.5">{partner.email}</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">Operating City</div>
              <div className="text-sm font-bold text-white mt-0.5">{partner.city}</div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'vehicle' && (
        <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 text-xs">
          <h3 className="text-base font-extrabold text-white">Registered Vehicle Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">Vehicle Type</div>
              <div className="text-sm font-bold text-white mt-0.5">{partner.vehicle.type} ({partner.vehicle.model})</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">Registration Number</div>
              <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">{partner.vehicle.number}</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">Insurance Expiry</div>
              <div className="text-sm font-bold text-white mt-0.5">{partner.vehicle.insuranceValidUntil}</div>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="text-slate-400 font-semibold">PUC Expiry</div>
              <div className="text-sm font-bold text-white mt-0.5">{partner.vehicle.pucValidUntil}</div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'bank' && (
        <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 text-xs">
          <h3 className="text-base font-extrabold text-white">Bank Account & UPI Details</h3>
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Account Holder</span>
              <span className="font-bold text-white">{partner.bankDetails.accountHolder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bank Name</span>
              <span className="font-bold text-white">{partner.bankDetails.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account Number</span>
              <span className="font-bold text-white font-mono">{partner.bankDetails.accountNumberMasked}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">IFSC Code</span>
              <span className="font-bold text-white font-mono">{partner.bankDetails.ifscCode}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 text-emerald-400">
              <span>UPI ID</span>
              <span className="font-bold font-mono">{partner.bankDetails.upiId}</span>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'documents' && (
        <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white">Partner Documents Hub</h3>
          <div className="space-y-2.5">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-white">{doc.name}</div>
                    <div className="text-[10px] text-slate-400">{doc.type} • {doc.documentNumberMasked}</div>
                  </div>
                </div>

                {getStatusBadge(doc.status)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
