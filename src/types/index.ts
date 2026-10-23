export type CategoryType = 
  | 'FOOD' 
  | 'GROCERY' 
  | 'VEGETABLES' 
  | 'MEAT' 
  | 'FASHION' 
  | 'ELECTRONICS' 
  | 'HYPERLOCAL';

export type DeliveryState = 
  | 'OFFERED'
  | 'ACCEPTED'
  | 'GOING_TO_PICKUP'
  | 'ARRIVED_AT_PICKUP'
  | 'PICKUP_VERIFICATION'
  | 'PICKED_UP'
  | 'GOING_TO_CUSTOMER'
  | 'ARRIVED_AT_CUSTOMER'
  | 'DELIVERY_OTP'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

export type GPSState = 'NORMAL' | 'ARRIVING' | 'ARRIVED' | 'OUTSIDE_GEOFENCE';

export type AccountStatus = 
  | 'REGISTERED' 
  | 'DOCUMENTS_PENDING' 
  | 'UNDER_REVIEW' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'SUSPENDED' 
  | 'INACTIVE';

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  preparationStatus?: string;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  instructions?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  category: CategoryType;
  store: StoreInfo;
  customer: CustomerInfo;
  distanceToPickup: number;
  deliveryDistance: number;
  totalDistance: number;
  estimatedEarnings: number;
  earningsBreakdown: {
    basePay: number;
    distancePay: number;
    surgeBonus: number;
    tip: number;
  };
  estimatedTime: number;
  items: OrderItem[];
  itemCount: number;
  zone: string;
  pickupCode: string;
  deliveryOtp: string;
  status: DeliveryState;
  createdAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  cancellationReason?: string;
  isBatched?: boolean;
  batchOrderCount?: number;
  batchOrderId?: string;
}

export interface PartnerProfile {
  id: string;
  applicationId: string;
  accountStatus: AccountStatus;
  rejectionReason?: string;
  missingDocuments?: string[];
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
  rating: number;
  totalRatings: number;
  partnerSince: string;
  city: string;
  currentZone: string;
  vehicle: {
    type: 'Bike' | 'Scooter' | 'Bicycle' | 'Car' | 'Motorcycle' | 'Electric Vehicle';
    model: string;
    number: string;
    fuelType: string;
    insuranceValidUntil: string;
    rcNumber: string;
    pucValidUntil: string;
  };
  bankDetails: {
    accountHolder: string;
    bankName: string;
    accountNumberMasked: string;
    ifscCode: string;
    upiId: string;
  };
}

export interface DailyMetrics {
  earnings: number;
  ordersCompleted: number;
  distanceKm: number;
  onlineTimeMinutes: number;
  acceptanceRate: number;
  completionRate: number;
}

export interface Incentive {
  id: string;
  title: string;
  description: string;
  rewardAmount: number;
  currentProgress: number;
  targetProgress: number;
  category: 'DAILY' | 'PEAK_HOUR' | 'WEEKLY';
  timeLimit?: string;
  isCompleted: boolean;
}

export interface NotificationItem {
  id: string;
  category: 'ORDER' | 'EARNINGS' | 'INCENTIVE' | 'ACCOUNT' | 'SYSTEM';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  status: 'VERIFIED' | 'UNDER_REVIEW' | 'ACTION_REQUIRED' | 'MISSING';
  documentNumberMasked: string;
  expiryDate?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'partner' | 'support' | 'bot';
  text: string;
  timestamp: string;
  attachmentUrl?: string;
}

export interface ServiceZone {
  id: string;
  name: string;
  city: string;
  demandLevel: 'NORMAL' | 'HIGH' | 'VERY_HIGH';
  estimatedSurgeBonus: number;
  activeOrdersCount: number;
}
