export interface DailyEarningItem {
  day: string;
  date: string;
  earnings: number;
  orders: number;
  distanceKm: number;
  onlineHours: number;
}

export const weeklyEarningsData: DailyEarningItem[] = [
  { day: 'Mon', date: 'Sep 14', earnings: 420, orders: 10, distanceKm: 32.1, onlineHours: 5.5 },
  { day: 'Tue', date: 'Sep 15', earnings: 510, orders: 13, distanceKm: 41.5, onlineHours: 6.8 },
  { day: 'Wed', date: 'Sep 16', earnings: 630, orders: 16, distanceKm: 49.0, onlineHours: 7.2 },
  { day: 'Thu', date: 'Sep 17', earnings: 485, orders: 12, distanceKm: 36.8, onlineHours: 6.0 },
  { day: 'Fri', date: 'Sep 18', earnings: 720, orders: 18, distanceKm: 55.4, onlineHours: 8.0 },
  { day: 'Sat', date: 'Sep 19', earnings: 650, orders: 15, distanceKm: 48.2, onlineHours: 7.5 },
  { day: 'Sun', date: 'Sep 20 (Today)', earnings: 486.5, orders: 12, distanceKm: 37.4, onlineHours: 6.4 }
];

export const todayEarningsSummary = {
  total: 486.5,
  deliveryEarnings: 312.0,
  distanceEarnings: 124.5,
  incentives: 30.0,
  tips: 20.0,
  bonuses: 0.0,
  adjustments: 0.0,
  weeklyTotal: 3842.0,
  monthlyTotal: 14280.0,
  availableBalance: 1240.0,
  nextPayoutDate: 'Monday, Sep 21'
};

export const payoutHistory = [
  { id: 'PO-991', date: 'Sep 14, 2026', amount: 3840, status: 'PAID', bankRef: 'UPI/6642019921/HDFC' },
  { id: 'PO-990', date: 'Sep 07, 2026', amount: 3180, status: 'PAID', bankRef: 'UPI/5531024419/HDFC' },
  { id: 'PO-989', date: 'Aug 31, 2026', amount: 2950, status: 'PAID', bankRef: 'UPI/4412093310/HDFC' },
  { id: 'PO-988', date: 'Aug 24, 2026', amount: 4120, status: 'PAID', bankRef: 'UPI/3301048822/HDFC' }
];
