import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PartnerProfile, AccountStatus } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  UserCheck,
  Search,
  X,
  Phone,
  Building,
  Eye,
  Layers,
  ChevronRight
} from 'lucide-react';

interface AdminDemoPortalProps {
  onClose: () => void;
}

export const AdminDemoPortal: React.FC<AdminDemoPortalProps> = ({ onClose }) => {
  const { registeredPartners, approvePartnerApplication, rejectPartnerApplication } = useAuth();
  const [filter, setFilter] = useState<AccountStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectPartner, setInspectPartner] = useState<PartnerProfile | null>(null);

  const filtered = registeredPartners.filter((p) => {
    if (filter !== 'ALL' && p.accountStatus !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.applicationId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = registeredPartners.filter((p) => p.accountStatus === 'UNDER_REVIEW').length;
  const approvedCount = registeredPartners.filter((p) => p.accountStatus === 'APPROVED').length;
  const rejectedCount = registeredPartners.filter((p) => p.accountStatus === 'REJECTED').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-5xl h-[85vh] bg-[#161e2e] border border-emerald-500/40 rounded-3xl flex flex-col shadow-2xl overflow-hidden relative">
        {/* Admin Header */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00C853] to-[#059669] text-slate-950 flex items-center justify-center font-black text-xl shadow-lg">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-white">FEEDO LOGISTICS ADMIN PORTAL</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-[#00E676] border border-emerald-500/30">
                  OPLIORA ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Delivery Partner Application Verification & Approval Center</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="text-slate-400">Total Registered</div>
            <div className="text-xl font-black text-white">{registeredPartners.length}</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-2xl border border-amber-500/30">
            <div className="text-amber-400 font-bold">Pending Review</div>
            <div className="text-xl font-black text-amber-400">{pendingCount}</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-2xl border border-emerald-500/30">
            <div className="text-[#00E676] font-bold">Approved Active</div>
            <div className="text-xl font-black text-[#00E676]">{approvedCount}</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-2xl border border-red-500/30">
            <div className="text-red-400 font-bold">Rejected</div>
            <div className="text-xl font-black text-red-400">{rejectedCount}</div>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="p-4 bg-slate-900/40 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            {(['ALL', 'UNDER_REVIEW', 'DOCUMENTS_PENDING', 'APPROVED', 'REJECTED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  filter === tab
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab === 'ALL' && 'All Applications'}
                {tab === 'UNDER_REVIEW' && `Pending (${pendingCount})`}
                {tab === 'DOCUMENTS_PENDING' && 'Incomplete'}
                {tab === 'APPROVED' && 'Approved'}
                {tab === 'REJECTED' && 'Rejected'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search App ID or name..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>

        {/* Applications List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0f172a]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No partner applications found matching your filter criteria.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.applicationId}
                className="bg-[#161e2e] border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{item.name}</span>
                      <span className="font-mono text-[11px] text-amber-400 font-bold">
                        {item.applicationId}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                          item.accountStatus === 'APPROVED'
                            ? 'bg-emerald-500/20 text-[#00E676] border-emerald-500/30'
                            : item.accountStatus === 'UNDER_REVIEW'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : item.accountStatus === 'REJECTED'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}
                      >
                        {item.accountStatus}
                      </span>
                    </div>

                    <div className="text-slate-400 mt-1 flex flex-wrap items-center gap-3 text-[11px]">
                      <span>📞 {item.phone}</span>
                      <span>•</span>
                      <span>🚗 {item.vehicle.type} ({item.vehicle.model})</span>
                      <span>•</span>
                      <span>📍 {item.city}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setInspectPartner(item)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5"
                  >
                    <Eye size={14} />
                    <span>INSPECT DOCS</span>
                  </button>

                  {item.accountStatus !== 'APPROVED' ? (
                    <button
                      onClick={() => approvePartnerApplication(item.applicationId)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black flex items-center gap-1.5 shadow-md"
                    >
                      <CheckCircle2 size={14} />
                      <span>APPROVE ACCOUNT</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => rejectPartnerApplication(item.applicationId, 'Admin manual revocation')}
                      className="px-3 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 font-bold flex items-center gap-1"
                    >
                      <XCircle size={14} />
                      <span>REVOKE</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detailed Document Inspector Modal */}
        {inspectPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-lg bg-[#161e2e] border border-slate-700 rounded-3xl p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto text-xs">
              <button
                onClick={() => setInspectPartner(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={inspectPartner.photoUrl}
                  alt={inspectPartner.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500"
                />
                <div>
                  <h3 className="text-lg font-black text-white">{inspectPartner.name}</h3>
                  <div className="text-amber-400 font-mono font-bold">{inspectPartner.applicationId}</div>
                  <div className="text-slate-400 text-[11px]">{inspectPartner.phone} • {inspectPartner.city}</div>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 mb-5">
                <div className="font-bold text-white text-sm border-b border-slate-800 pb-2">
                  VERIFICATION DOCUMENTS CHECKLIST
                </div>

                <div className="flex justify-between items-center text-emerald-400 font-semibold">
                  <span>1. Driving Licence Copy ({inspectPartner.vehicle.type})</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ VALIDATED</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 font-semibold">
                  <span>2. Vehicle RC ({inspectPartner.vehicle.number})</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ VALIDATED</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 font-semibold">
                  <span>3. Aadhaar / PAN Government ID</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ VALIDATED</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400 font-semibold">
                  <span>4. Bank Account & UPI Verification ({inspectPartner.bankDetails.bankName})</span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ VERIFIED</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    rejectPartnerApplication(inspectPartner.applicationId, 'DL copy failed verification test');
                    setInspectPartner(null);
                  }}
                  className="py-3 px-4 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold border border-red-500/30 flex items-center justify-center gap-1.5"
                >
                  <XCircle size={16} />
                  <span>REJECT APPLICATION</span>
                </button>

                <button
                  onClick={() => {
                    approvePartnerApplication(inspectPartner.applicationId);
                    setInspectPartner(null);
                  }}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black flex items-center justify-center gap-1.5 shadow-md"
                >
                  <CheckCircle2 size={16} />
                  <span>APPROVE ACCOUNT NOW</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
