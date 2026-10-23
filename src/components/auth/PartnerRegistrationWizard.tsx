import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Camera,
  Upload,
  FileText,
  ShieldCheck,
  Building,
  CreditCard,
  AlertTriangle,
  Lock,
  Clock,
  User,
  Bike
} from 'lucide-react';

interface PartnerRegistrationWizardProps {
  onBackToLogin: () => void;
  onCompletedRegistration: (appId: string) => void;
}

export const PartnerRegistrationWizard: React.FC<PartnerRegistrationWizardProps> = ({
  onBackToLogin,
  onCompletedRegistration,
}) => {
  const { registerNewPartner } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState({
    mobile: '9876543210',
    otp: '123456',
    isMobileVerified: false,
    // Personal Info
    fullName: 'Ramesh Reddy',
    dob: '1996-08-14',
    gender: 'Male',
    email: 'ramesh.reddy@gmail.com',
    city: 'Bengaluru',
    address: '14th Cross, HSR Layout Sector 1, Bengaluru',
    emergencyContactName: 'Sunita Reddy',
    emergencyContactPhone: '9845012345',
    // Photo
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isPhotoUploaded: true,
    // Vehicle
    vehicleType: 'Scooter' as 'Bike' | 'Scooter' | 'Bicycle' | 'Car' | 'Motorcycle' | 'Electric Vehicle',
    vehicleNumber: 'KA 05 AB 5678',
    vehicleBrand: 'TVS',
    vehicleModel: 'Ntorq 125',
    vehicleYear: '2023',
    fuelType: 'Petrol',
    // DL
    dlNumber: 'KA05 20210089123',
    dlExpiry: '2036-05-20',
    isDlUploaded: true,
    // Identity
    isAadhaarUploaded: true,
    isPanUploaded: true,
    // Vehicle Docs
    isRcUploaded: true,
    isInsuranceUploaded: true,
    isPucUploaded: true,
    // Bank Details
    accountHolder: 'Ramesh Reddy',
    bankName: 'Axis Bank Ltd.',
    accountNumber: '918020044521321',
    confirmAccountNumber: '918020044521321',
    ifscCode: 'UTIB0000845',
    upiId: 'ramesh96@okaxis',
    // Agreement
    agreedTerms: false,
    agreedAccuracy: false,
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedAppId, setGeneratedAppId] = useState<string>('');

  const updateField = (field: string, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleNextStep = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedTerms || !formData.agreedAccuracy) return;

    const appId = `FD-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedAppId(appId);

    registerNewPartner({
      name: formData.fullName,
      phone: `+91 ${formData.mobile}`,
      email: formData.email,
      city: formData.city,
      vehicle: {
        type: formData.vehicleType,
        model: `${formData.vehicleBrand} ${formData.vehicleModel}`,
        number: formData.vehicleNumber,
        fuelType: formData.fuelType,
        insuranceValidUntil: '2027-08-31',
        rcNumber: formData.vehicleNumber,
        pucValidUntil: '2026-12-31',
      },
      bankDetails: {
        accountHolder: formData.accountHolder,
        bankName: formData.bankName,
        accountNumberMasked: `•••• •••• ${formData.accountNumber.slice(-4)}`,
        ifscCode: formData.ifscCode,
        upiId: formData.upiId,
      },
    });

    setIsSubmitted(true);
  };

  // Outcome Screen after submission (Does NOT auto-login to dashboard!)
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md bg-[#161e2e] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl relative text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-[#00E676] border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle2 size={36} />
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-[#00E676] border border-emerald-500/30 uppercase tracking-widest mb-2">
            APPLICATION SUBMITTED
          </span>

          <h2 className="text-xl font-black text-white mb-1">Registration Successfully Submitted!</h2>
          <p className="text-xs text-slate-400 mb-5">
            Thank you for applying to become a Feedo delivery partner. Your documents have been uploaded for verification.
          </p>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl mb-6 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400 font-semibold">Partner Application ID</span>
              <span className="font-mono font-bold text-[#00E676]">{generatedAppId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account Status</span>
              <span className="font-bold text-amber-400">⏳ UNDER REVIEW</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 mb-6 text-left">
            🔒 Account access will be unlocked as soon as Feedo admin completes background document verification.
          </div>

          <button
            onClick={onBackToLogin}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#059669] hover:brightness-110 text-slate-950 font-black text-xs transition-all shadow-md"
          >
            BACK TO LOGIN SCREEN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-lg bg-[#161e2e] border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                onClick={handlePrevStep}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            <div>
              <span className="text-[10px] font-bold text-[#00E676] uppercase tracking-wider">
                STEP {currentStep} OF 9
              </span>
              <h2 className="text-base font-black text-white">
                {currentStep === 1 && 'Mobile Verification'}
                {currentStep === 2 && 'Personal Information'}
                {currentStep === 3 && 'Profile Photo Upload'}
                {currentStep === 4 && 'Vehicle Details'}
                {currentStep === 5 && 'Driving Licence'}
                {currentStep === 6 && 'Identity Verification'}
                {currentStep === 7 && 'Vehicle Documents'}
                {currentStep === 8 && 'Bank Account & UPI'}
                {currentStep === 9 && 'Feedo Partner Agreement'}
              </h2>
            </div>
          </div>

          <button
            onClick={onBackToLogin}
            className="text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        </div>

        {/* Wizard Progress Line */}
        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-[#00C853] to-[#00E676] h-full transition-all duration-300"
            style={{ width: `${(currentStep / 9) * 100}%` }}
          />
        </div>

        {/* Step 1: Mobile & OTP */}
        {currentStep === 1 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">MOBILE NUMBER</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => updateField('mobile', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">ENTER 6-DIGIT OTP (Demo: 123456)</label>
              <input
                type="text"
                value={formData.otp}
                onChange={(e) => updateField('otp', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-[#00E676] font-mono font-bold tracking-widest text-center text-lg"
              />
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              VERIFY OTP & CONTINUE
            </button>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">FULL NAME (AS PER AADHAAR)</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">DATE OF BIRTH</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => updateField('dob', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">GENDER</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">CURRENT OPERATING CITY</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">RESIDENTIAL ADDRESS</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-800 pt-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">EMERGENCY CONTACT NAME</label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => updateField('emergencyContactName', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">EMERGENCY PHONE</label>
                <input
                  type="text"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              CONTINUE TO PROFILE PHOTO
            </button>
          </div>
        )}

        {/* Step 3: Profile Photo */}
        {currentStep === 3 && (
          <div className="space-y-4 text-xs text-center">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#00E676] relative shadow-xl">
              <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <p className="text-slate-400 max-w-xs mx-auto">
              Clear front-facing photo without sunglasses or cap. Needed for customer delivery identification.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 font-bold"
              >
                <Camera size={16} />
                <span>TAKE PHOTO</span>
              </button>
              <button
                type="button"
                className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5 font-bold"
              >
                <Upload size={16} />
                <span>UPLOAD FILE</span>
              </button>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              CONFIRM PHOTO & CONTINUE
            </button>
          </div>
        )}

        {/* Step 4: Vehicle Details */}
        {currentStep === 4 && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">VEHICLE CATEGORY</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Scooter', 'Motorcycle', 'Electric Vehicle', 'Bicycle', 'Car'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => updateField('vehicleType', v)}
                    className={`py-2 px-2 rounded-xl font-bold border text-[11px] ${
                      formData.vehicleType === v
                        ? 'bg-[#00E676] text-slate-950 border-[#00E676]'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">REGISTRATION NUMBER</label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => updateField('vehicleNumber', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">BRAND</label>
                <input
                  type="text"
                  value={formData.vehicleBrand}
                  onChange={(e) => updateField('vehicleBrand', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">MODEL</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => updateField('vehicleModel', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">FUEL TYPE</label>
                <input
                  type="text"
                  value={formData.fuelType}
                  onChange={(e) => updateField('fuelType', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              SAVE VEHICLE & CONTINUE
            </button>
          </div>
        )}

        {/* Step 5: Driving Licence */}
        {currentStep === 5 && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">DRIVING LICENCE (DL) NUMBER</label>
              <input
                type="text"
                value={formData.dlNumber}
                onChange={(e) => updateField('dlNumber', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">DL EXPIRY DATE</label>
              <input
                type="date"
                value={formData.dlExpiry}
                onChange={(e) => updateField('dlExpiry', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>✓ DL Front Copy</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">UPLOADED</span>
              </div>
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>✓ DL Back Copy</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">UPLOADED</span>
              </div>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              CONFIRM LICENCE & CONTINUE
            </button>
          </div>
        )}

        {/* Step 6: Identity (Aadhaar/PAN) */}
        {currentStep === 6 && (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>Aadhaar Card (Front & Back)</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ FILE RECEIVED</span>
              </div>
              <p className="text-[11px] text-slate-400">Government identity verification</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>PAN Card Copy</span>
                <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ FILE RECEIVED</span>
              </div>
              <p className="text-[11px] text-slate-400">Tax compliance document</p>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              CONTINUE TO VEHICLE DOCS
            </button>
          </div>
        )}

        {/* Step 7: Vehicle Docs */}
        {currentStep === 7 && (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-emerald-400 font-bold">
              <span>Vehicle RC Copy</span>
              <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ UPLOADED</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-emerald-400 font-bold">
              <span>Vehicle Insurance</span>
              <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">✓ UPLOADED</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-amber-400 font-bold">
              <span>Pollution (PUC)</span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded">⏳ UNDER REVIEW</span>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              SAVE DOCS & CONTINUE TO BANK DETAILS
            </button>
          </div>
        )}

        {/* Step 8: Bank Details */}
        {currentStep === 8 && (
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">ACCOUNT HOLDER NAME</label>
              <input
                type="text"
                value={formData.accountHolder}
                onChange={(e) => updateField('accountHolder', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">BANK NAME</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => updateField('bankName', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">ACCOUNT NUMBER</label>
                <input
                  type="password"
                  value={formData.accountNumber}
                  onChange={(e) => updateField('accountNumber', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">IFSC CODE</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => updateField('ifscCode', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">UPI ID FOR INSTANT PAYOUTS</label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => updateField('upiId', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-[#00E676] font-mono font-bold"
              />
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              Saved Account Preview: <span className="text-white font-mono font-bold">XXXX XXXX {formData.accountNumber.slice(-4)}</span>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C853] to-[#059669] text-slate-950 font-black text-xs shadow-md mt-4"
            >
              SAVE BANK DETAILS & GO TO AGREEMENT
            </button>
          </div>
        )}

        {/* Step 9: Partner Agreement */}
        {currentStep === 9 && (
          <form onSubmit={handleSubmitRegistration} className="space-y-4 text-xs">
            <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 max-h-48 overflow-y-auto text-[11px] text-slate-400 space-y-2">
              <div className="font-bold text-white">FEEDO DELIVERY PARTNER AGREEMENT</div>
              <p>By registering as a Feedo Delivery Partner, you agree to comply with Feedo logistics code of conduct, traffic safety regulations, customer privacy requirements, and hygiene standards.</p>
              <p>Payouts are credited based on verified delivery completion codes and distance algorithms. Account verification takes 2–6 hours after submission.</p>
            </div>

            <div className="space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.agreedTerms}
                  onChange={(e) => updateField('agreedTerms', e.target.checked)}
                  className="mt-0.5 accent-[#00E676]"
                />
                <span>I agree to the Feedo Delivery Partner Terms & Conditions and Safety Code.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.agreedAccuracy}
                  onChange={(e) => updateField('agreedAccuracy', e.target.checked)}
                  className="mt-0.5 accent-[#00E676]"
                />
                <span>I confirm that the information and documents submitted by me are accurate.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!formData.agreedTerms || !formData.agreedAccuracy}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 disabled:opacity-50 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} />
              <span>SUBMIT APPLICATION FOR VERIFICATION</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
