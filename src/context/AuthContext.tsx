import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PartnerProfile, AccountStatus } from '../types';
import { mockPartnerProfile } from '../data/mockProfile';

interface LoginResult {
  success: boolean;
  status: AccountStatus;
  isUnregistered?: boolean;
  message?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  partner: PartnerProfile;
  registeredPartners: PartnerProfile[];
  loginWithPhone: (phone: string) => LoginResult;
  verifyOtp: (otp: string) => LoginResult;
  logout: () => void;
  updatePartnerProfile: (updates: Partial<PartnerProfile>) => void;
  setDemoAccountStatus: (status: AccountStatus) => void;
  registerNewPartner: (data: Partial<PartnerProfile>) => void;
  approvePartnerApplication: (applicationId: string) => void;
  rejectPartnerApplication: (applicationId: string, reason?: string) => void;
  isAdminPortalOpen: boolean;
  setIsAdminPortalOpen: (open: boolean) => void;
}

const initialRegisteredPartners: PartnerProfile[] = [
  mockPartnerProfile, // 9999999999 - APPROVED
  {
    id: 'FD-P-10290',
    applicationId: 'FD-APP-102938',
    accountStatus: 'UNDER_REVIEW',
    name: 'Ramesh Reddy',
    phone: '+91 88888 88888',
    email: 'ramesh.reddy@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    totalRatings: 0,
    partnerSince: 'Sep 2026',
    city: 'Bengaluru',
    currentZone: 'HSR Layout Zone',
    vehicle: {
      type: 'Scooter',
      model: 'TVS Ntorq 125',
      number: 'KA 05 AB 5678',
      fuelType: 'Petrol',
      insuranceValidUntil: '2027-08-31',
      rcNumber: 'KA0520230012998',
      pucValidUntil: '2026-12-31',
    },
    bankDetails: {
      accountHolder: 'Ramesh Reddy',
      bankName: 'Axis Bank Ltd.',
      accountNumberMasked: '•••• •••• 4521',
      ifscCode: 'UTIB0000845',
      upiId: 'ramesh96@okaxis',
    },
  },
  {
    id: 'FD-P-10291',
    applicationId: 'FD-APP-709123',
    accountStatus: 'DOCUMENTS_PENDING',
    missingDocuments: ['Driving Licence (Front & Back)', 'Vehicle RC Copy'],
    name: 'Kavita Sharma',
    phone: '+91 77777 77777',
    email: 'kavita.sharma@yahoo.com',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    totalRatings: 0,
    partnerSince: 'Sep 2026',
    city: 'Bengaluru',
    currentZone: 'Koramangala Zone',
    vehicle: {
      type: 'Motorcycle',
      model: 'Hero Splendor Plus',
      number: 'KA 01 EV 9921',
      fuelType: 'Petrol',
      insuranceValidUntil: '2027-05-20',
      rcNumber: 'KA0120220055123',
      pucValidUntil: '2026-11-15',
    },
    bankDetails: {
      accountHolder: 'Kavita Sharma',
      bankName: 'ICICI Bank',
      accountNumberMasked: '•••• •••• 8812',
      ifscCode: 'ICIC0000102',
      upiId: 'kavita@okicici',
    },
  },
  {
    id: 'FD-P-10292',
    applicationId: 'FD-APP-601244',
    accountStatus: 'REJECTED',
    rejectionReason: 'Driving licence photo match failed due to image blurriness.',
    name: 'Suresh Nair',
    phone: '+91 66666 66666',
    email: 'suresh.nair@hotmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 4.2,
    totalRatings: 12,
    partnerSince: 'Aug 2026',
    city: 'Bengaluru',
    currentZone: 'Whitefield Zone',
    vehicle: {
      type: 'Scooter',
      model: 'Ather 450X',
      number: 'KA 03 EV 4410',
      fuelType: 'Electric Vehicle',
      insuranceValidUntil: '2027-09-10',
      rcNumber: 'KA0320230099412',
      pucValidUntil: '2027-01-20',
    },
    bankDetails: {
      accountHolder: 'Suresh Nair',
      bankName: 'State Bank of India',
      accountNumberMasked: '•••• •••• 1109',
      ifscCode: 'SBIN0001420',
      upiId: 'suresh@oksbi',
    },
  },
  {
    id: 'FD-P-10293',
    applicationId: 'FD-APP-501199',
    accountStatus: 'SUSPENDED',
    name: 'Vikas Verma',
    phone: '+91 55555 55555',
    email: 'vikas.verma@outlook.com',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    rating: 3.8,
    totalRatings: 84,
    partnerSince: 'Jan 2026',
    city: 'Bengaluru',
    currentZone: 'Jayanagar Zone',
    vehicle: {
      type: 'Motorcycle',
      model: 'Bajaj Pulsar 150',
      number: 'KA 02 MH 7788',
      fuelType: 'Petrol',
      insuranceValidUntil: '2026-11-30',
      rcNumber: 'KA0220210044123',
      pucValidUntil: '2026-10-10',
    },
    bankDetails: {
      accountHolder: 'Vikas Verma',
      bankName: 'Kotak Mahindra Bank',
      accountNumberMasked: '•••• •••• 3341',
      ifscCode: 'KKBK0000451',
      upiId: 'vikas@okkotak',
    },
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [registeredPartners, setRegisteredPartners] = useState<PartnerProfile[]>(initialRegisteredPartners);
  const [partner, setPartner] = useState<PartnerProfile>(mockPartnerProfile);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);

  const loginWithPhone = (phone: string): LoginResult => {
    const cleanPhone = phone.replace(/\D/g, '');
    const matched = registeredPartners.find((p) => p.phone.replace(/\D/g, '').endsWith(cleanPhone));

    if (!matched) {
      return {
        success: false,
        status: 'REGISTERED',
        isUnregistered: true,
        message: `Mobile number +91 ${cleanPhone} is not registered with Feedo. Please register your account first.`,
      };
    }

    setPartner(matched);
    return {
      success: true,
      status: matched.accountStatus,
    };
  };

  const verifyOtp = (otp: string): LoginResult => {
    if (otp !== '123456' && otp.length !== 6) {
      return { success: false, status: partner.accountStatus, message: 'Invalid OTP code. Use 123456 for demo.' };
    }

    // STRICT AUTH RULE: Only APPROVED + ACTIVE status grants access to Dashboard!
    if (partner.accountStatus === 'APPROVED') {
      setIsAuthenticated(true);
      return { success: true, status: 'APPROVED' };
    } else {
      setIsAuthenticated(false);
      return { success: false, status: partner.accountStatus };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updatePartnerProfile = (updates: Partial<PartnerProfile>) => {
    setPartner((prev) => ({ ...prev, ...updates }));
    setRegisteredPartners((prev) =>
      prev.map((p) => (p.id === partner.id ? { ...p, ...updates } : p))
    );
  };

  const setDemoAccountStatus = (status: AccountStatus) => {
    setPartner((prev) => ({ ...prev, accountStatus: status }));
    setRegisteredPartners((prev) =>
      prev.map((p) => (p.id === partner.id ? { ...p, accountStatus: status } : p))
    );
    if (status !== 'APPROVED') {
      setIsAuthenticated(false);
    }
  };

  const registerNewPartner = (data: Partial<PartnerProfile>) => {
    const newAppId = `FD-APP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPartner: PartnerProfile = {
      id: `FD-P-${Math.floor(10000 + Math.random() * 90000)}`,
      applicationId: newAppId,
      accountStatus: 'UNDER_REVIEW',
      name: data.name || 'New Partner',
      phone: data.phone || '+91 98765 43210',
      email: data.email || 'partner@feedo.in',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 5.0,
      totalRatings: 0,
      partnerSince: 'Just now',
      city: data.city || 'Bengaluru',
      currentZone: `${data.city || 'Indiranagar'} Zone`,
      vehicle: data.vehicle || {
        type: 'Scooter',
        model: 'TVS Jupiter',
        number: 'KA 01 XX 9988',
        fuelType: 'Petrol',
        insuranceValidUntil: '2027-12-31',
        rcNumber: 'KA0120240099881',
        pucValidUntil: '2026-12-31',
      },
      bankDetails: data.bankDetails || {
        accountHolder: data.name || 'New Partner',
        bankName: 'HDFC Bank',
        accountNumberMasked: '•••• •••• 9988',
        ifscCode: 'HDFC0001245',
        upiId: 'partner@okhdfc',
      },
    };

    setRegisteredPartners((prev) => [newPartner, ...prev]);
    setPartner(newPartner);
    setIsAuthenticated(false);
  };

  const approvePartnerApplication = (applicationId: string) => {
    setRegisteredPartners((prev) =>
      prev.map((p) =>
        p.applicationId === applicationId ? { ...p, accountStatus: 'APPROVED' } : p
      )
    );
    if (partner.applicationId === applicationId) {
      setPartner((prev) => ({ ...prev, accountStatus: 'APPROVED' }));
    }
  };

  const rejectPartnerApplication = (applicationId: string, reason?: string) => {
    const defaultReason = reason || 'Document verification check failed. Please re-upload clear copies.';
    setRegisteredPartners((prev) =>
      prev.map((p) =>
        p.applicationId === applicationId
          ? { ...p, accountStatus: 'REJECTED', rejectionReason: defaultReason }
          : p
      )
    );
    if (partner.applicationId === applicationId) {
      setPartner((prev) => ({ ...prev, accountStatus: 'REJECTED', rejectionReason: defaultReason }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        partner,
        registeredPartners,
        loginWithPhone,
        verifyOtp,
        logout,
        updatePartnerProfile,
        setDemoAccountStatus,
        registerNewPartner,
        approvePartnerApplication,
        rejectPartnerApplication,
        isAdminPortalOpen,
        setIsAdminPortalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
