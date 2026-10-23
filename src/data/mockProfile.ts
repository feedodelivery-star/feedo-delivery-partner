import { PartnerProfile, DocumentItem } from '../types';

export const mockPartnerProfile: PartnerProfile = {
  id: 'FD-P-10245',
  applicationId: 'FD-APP-102938',
  accountStatus: 'APPROVED',
  name: 'Arjun Kumar',
  phone: '+91 99999 99999',
  email: 'arjun.kumar.feedo@opliora.com',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  rating: 4.8,
  totalRatings: 342,
  partnerSince: 'March 2025',
  city: 'Bengaluru',
  currentZone: 'Indiranagar Zone',
  vehicle: {
    type: 'Scooter',
    model: 'Honda Activa 6G',
    number: 'KA 01 XX 1234',
    fuelType: 'Petrol',
    insuranceValidUntil: 'Oct 15, 2027',
    rcNumber: 'KA0120240098123',
    pucValidUntil: 'Nov 30, 2026'
  },
  bankDetails: {
    accountHolder: 'Arjun Kumar',
    bankName: 'HDFC Bank Ltd.',
    accountNumberMasked: '•••• •••• 9812',
    ifscCode: 'HDFC0001245',
    upiId: 'arjun99@okhdfcbank'
  }
};

export const mockDocuments: DocumentItem[] = [
  { id: 'doc-1', name: 'Aadhaar Card (Front & Back)', type: 'Identity Proof', status: 'VERIFIED', documentNumberMasked: '•••• •••• 4512' },
  { id: 'doc-2', name: 'PAN Card', type: 'Tax ID', status: 'VERIFIED', documentNumberMasked: 'ABCDE••••F' },
  { id: 'doc-3', name: 'Driving Licence (DL)', type: 'License', status: 'VERIFIED', documentNumberMasked: 'KA01 2022•••••••', expiryDate: '2035-12-31' },
  { id: 'doc-4', name: 'Vehicle RC (Registration Certificate)', type: 'Vehicle', status: 'VERIFIED', documentNumberMasked: 'KA01XX1234' },
  { id: 'doc-5', name: 'Vehicle Insurance Certificate', type: 'Vehicle', status: 'VERIFIED', documentNumberMasked: 'POL-99214012', expiryDate: '2027-10-15' },
  { id: 'doc-6', name: 'Pollution Under Control (PUC)', type: 'Vehicle', status: 'UNDER_REVIEW', documentNumberMasked: 'PUC-8812341' },
  { id: 'doc-7', name: 'Bank Passbook / Cancelled Cheque', type: 'Payout', status: 'VERIFIED', documentNumberMasked: 'HDFC0001245' }
];
