import React, { useState } from 'react';
import { Order, GPSState } from '../../types';
import { SimulatedMapView } from '../map/SimulatedMapView';
import { CategoryBadge } from '../common/CategoryBadge';
import { PickupVerificationModal } from './PickupVerificationModal';
import { DeliveryOTPModal } from './DeliveryOTPModal';
import { IssueReportModal } from './IssueReportModal';
import {
  MapPin,
  Phone,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Package,
  Clock,
  KeyRound,
  Lock,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ActiveDeliveryWorkflowProps {
  order: Order;
  gpsState: GPSState;
  onUpdateState: (state: any) => void;
  onVerifyPickup: (code: string) => boolean;
  onVerifyOtp: (otp: string) => boolean;
  onCancelOrder: (reason: string) => void;
  isStoreCodeError?: boolean;
  isOtpError?: boolean;
}

export const ActiveDeliveryWorkflow: React.FC<ActiveDeliveryWorkflowProps> = ({
  order,
  gpsState,
  onUpdateState,
  onVerifyPickup,
  onVerifyOtp,
  onCancelOrder,
  isStoreCodeError = false,
  isOtpError = false,
}) => {
  const { t } = useLanguage();
  const [showItemsList, setShowItemsList] = useState<boolean>(false);
  const [showPickupModal, setShowPickupModal] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [issueType, setIssueType] = useState<'STORE' | 'CUSTOMER' | 'CANCEL' | null>(null);

  const isHeadingToPickup = order.status === 'ACCEPTED' || order.status === 'GOING_TO_PICKUP';
  const isAtStore = order.status === 'ARRIVED_AT_PICKUP' || order.status === 'PICKUP_VERIFICATION';
  const isHeadingToCustomer = order.status === 'PICKED_UP' || order.status === 'GOING_TO_CUSTOMER';
  const isAtCustomer = order.status === 'ARRIVED_AT_CUSTOMER' || order.status === 'DELIVERY_OTP';

  // Timeline Step Status Indicator
  const timelineSteps = [
    { label: 'Accepted', active: true },
    { label: 'Store Pickup', active: isAtStore || isHeadingToCustomer || isAtCustomer },
    { label: 'Picked Up', active: isHeadingToCustomer || isAtCustomer },
    { label: 'Customer Drop', active: isAtCustomer },
    { label: 'Delivered', active: order.status === 'DELIVERED' },
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner Alert Bar */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-2xl p-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CategoryBadge category={order.category} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white font-mono">{order.id}</span>
              {order.isBatched && (
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                  <Layers size={11} />
                  <span>BATCHED (2)</span>
                </span>
              )}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <Clock size={12} />
              <span>ETA: {order.estimatedTime} mins</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400 font-medium">Earning</div>
          <div className="text-xl font-black text-[#00E676]">₹{order.estimatedEarnings}</div>
        </div>
      </div>

      {/* Progress Timeline Pills */}
      <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl flex items-center justify-between overflow-x-auto gap-2">
        {timelineSteps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                  step.active
                    ? 'bg-[#00E676] text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {step.active ? '✓' : idx + 1}
              </div>
              <span className={`text-xs font-semibold ${step.active ? 'text-white' : 'text-slate-500'}`}>
                {step.label}
              </span>
            </div>
            {idx < timelineSteps.length - 1 && <div className="w-4 h-0.5 bg-slate-800" />}
          </div>
        ))}
      </div>

      {/* Interactive Map Simulation View */}
      <SimulatedMapView
        store={order.store}
        customer={isHeadingToCustomer || isAtCustomer ? order.customer : undefined}
        currentStep={order.status}
        gpsState={gpsState}
      />

      {/* Main Delivery Action Card */}
      <div className="bg-[#161e2e] border border-slate-700/80 rounded-2xl p-5 shadow-2xl space-y-4">
        {/* Step 1 & 2: Store Pickup Details */}
        {(isHeadingToPickup || isAtStore) && (
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-2">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>PICKUP LOCATION</span>
              </div>
              <span className="text-slate-400 font-normal">{order.distanceToPickup} km away</span>
            </div>

            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white">{order.store.name}</h3>
                <p className="text-xs text-slate-300">{order.store.address}</p>
                {order.store.preparationStatus && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    {order.store.preparationStatus}
                  </span>
                )}
              </div>

              <a
                href={`tel:${order.store.phone}`}
                className="p-3 rounded-xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center justify-center flex-shrink-0"
                title="Call Store"
              >
                <Phone size={18} />
              </a>
            </div>

            {/* Action Buttons for Store Phase */}
            {isHeadingToPickup && (
              <div className="space-y-2">
                <button
                  onClick={() => onUpdateState('ARRIVED_AT_PICKUP')}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  <span>{t('imAtStore')}</span>
                </button>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => setIssueType('STORE')}
                    className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 py-1"
                  >
                    <AlertTriangle size={14} />
                    <span>Report Store Issue</span>
                  </button>
                  <button
                    onClick={() => setIssueType('CANCEL')}
                    className="text-xs text-red-400 hover:text-red-300 py-1 font-semibold"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            )}

            {isAtStore && (
              <div className="space-y-3 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <KeyRound size={16} />
                    <span>STORE ARRIVAL CONFIRMED</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  Ask merchant staff for the 4-digit pickup code to unlock customer delivery information.
                </p>
                <button
                  onClick={() => setShowPickupModal(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <KeyRound size={18} />
                  <span>ENTER PICKUP CODE</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3 & 4: Customer Navigation Details (Unlocked after pickup) */}
        {(isHeadingToCustomer || isAtCustomer) && (
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-400 font-bold mb-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} />
                <span>CUSTOMER DELIVERY LOCATION (UNLOCKED)</span>
              </div>
              <span className="text-slate-400 font-normal">{order.deliveryDistance} km drop</span>
            </div>

            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white">{order.customer.name}</h3>
                <p className="text-xs text-slate-200 font-semibold mt-0.5">{order.customer.address}</p>
                {order.customer.instructions && (
                  <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2 rounded-lg mt-2">
                    Note: {order.customer.instructions}
                  </p>
                )}
              </div>

              <a
                href={`tel:${order.customer.phone}`}
                className="p-3 rounded-xl bg-emerald-500/20 text-[#00E676] hover:bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center flex-shrink-0"
                title="Call Customer"
              >
                <Phone size={18} />
              </a>
            </div>

            {/* Action Buttons for Customer Drop Phase */}
            {isHeadingToCustomer && (
              <div className="space-y-2">
                <button
                  onClick={() => onUpdateState('ARRIVED_AT_CUSTOMER')}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  <span>{t('imAtCustomerLocation')}</span>
                </button>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => setIssueType('CUSTOMER')}
                    className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 py-1"
                  >
                    <AlertTriangle size={14} />
                    <span>Report Customer Issue</span>
                  </button>
                  <button
                    onClick={() => setIssueType('CANCEL')}
                    className="text-xs text-red-400 hover:text-red-300 py-1 font-semibold"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            )}

            {isAtCustomer && (
              <div className="space-y-3 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl">
                <div className="text-xs font-bold text-[#00E676] flex items-center gap-1.5">
                  <ShieldCheck size={16} />
                  <span>ARRIVED AT CUSTOMER LOCATION</span>
                </div>
                <p className="text-xs text-slate-300">
                  Ask customer for their 4-digit OTP to complete the order and credit ₹{order.estimatedEarnings}.
                </p>
                <button
                  onClick={() => setShowOtpModal(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={18} />
                  <span>ENTER DELIVERY OTP</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Itemized Order Package Details Drawer */}
        <div className="border-t border-slate-800 pt-3">
          <button
            onClick={() => setShowItemsList(!showItemsList)}
            className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 font-semibold py-1"
          >
            <div className="flex items-center gap-2">
              <Package size={16} className="text-emerald-400" />
              <span>Package Items ({order.itemCount} items)</span>
            </div>
            {showItemsList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showItemsList && (
            <div className="mt-3 space-y-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                  <span className="font-medium text-white">{item.quantity}x {item.name}</span>
                  <span className="text-slate-400">₹{item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pickup Verification Code Modal */}
      {showPickupModal && (
        <PickupVerificationModal
          store={order.store}
          onVerify={(code) => {
            const ok = onVerifyPickup(code);
            if (ok) setShowPickupModal(false);
            return ok;
          }}
          onClose={() => setShowPickupModal(false)}
          isError={isStoreCodeError}
        />
      )}

      {/* Customer Delivery OTP Modal */}
      {showOtpModal && (
        <DeliveryOTPModal
          customer={order.customer}
          onVerify={(otp) => {
            const ok = onVerifyOtp(otp);
            if (ok) setShowOtpModal(false);
            return ok;
          }}
          onClose={() => setShowOtpModal(false)}
          isError={isOtpError}
        />
      )}

      {/* Issue / Cancellation Modal */}
      {issueType && (
        <IssueReportModal
          type={issueType}
          onClose={() => setIssueType(null)}
          onSubmitIssue={(reason) => {
            if (issueType === 'CANCEL') {
              onCancelOrder(reason);
            }
            setIssueType(null);
          }}
        />
      )}
    </div>
  );
};
