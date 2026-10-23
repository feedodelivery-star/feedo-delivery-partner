import React, { useState } from 'react';
import { AlertTriangle, Phone, Radio, MapPin, X, CheckCircle2 } from 'lucide-react';

interface EmergencySOSModalProps {
  onClose: () => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({ onClose }) => {
  const [triggered, setTriggered] = useState<boolean>(false);

  const handleConfirmSOS = () => {
    setTriggered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#161e2e] border border-red-500/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
        >
          <X size={18} />
        </button>

        {!triggered ? (
          <>
            <div className="w-16 h-16 rounded-3xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mb-4 mx-auto animate-pulse">
              <AlertTriangle size={32} />
            </div>

            <h3 className="text-xl font-black text-white text-center mb-1">EMERGENCY SOS ASSISTANCE</h3>
            <p className="text-xs text-slate-400 text-center mb-5">
              Use this during immediate safety threats, vehicle accidents, or dangerous situations on duty.
            </p>

            <div className="space-y-2.5 mb-6">
              <a
                href="tel:112"
                className="w-full p-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black text-xs flex items-center justify-between transition-colors shadow-lg shadow-red-500/25"
              >
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>Call Emergency Police (112)</span>
                </div>
                <span className="text-[10px] bg-red-700 px-2 py-0.5 rounded">DIRECT CALL</span>
              </a>

              <button
                onClick={handleConfirmSOS}
                className="w-full p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Radio size={18} className="animate-pulse" />
                  <span>Broadcast Live GPS Location to Feedo Safety</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">ALERT TEAM</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-200 font-semibold"
              >
                Cancel & Return
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-black text-white">Emergency Alert Dispatched</h3>
            <p className="text-xs text-slate-300">
              Your live GPS coordinates (Indiranagar 100 Feet Rd) have been broadcasted to Feedo Safety Officers and your emergency contact.
            </p>
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
