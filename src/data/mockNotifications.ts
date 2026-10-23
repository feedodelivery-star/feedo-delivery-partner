import { NotificationItem } from '../types';

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    category: 'ORDER',
    title: 'New High-Value Order Nearby',
    message: 'Food order offer from Nandi Gourmet Burgers available for ₹52.',
    timestamp: '2 mins ago',
    isRead: false
  },
  {
    id: 'n-2',
    category: 'INCENTIVE',
    title: 'Incentive Progress Alert',
    message: "You're 3 orders away from completing today's ₹100 bonus milestone!",
    timestamp: '25 mins ago',
    isRead: false
  },
  {
    id: 'n-3',
    category: 'EARNINGS',
    title: 'Weekly Payout Processed',
    message: '₹3,840 has been transferred to your HDFC bank account (Ref: UPI/6642019921).',
    timestamp: 'Yesterday',
    isRead: true
  },
  {
    id: 'n-4',
    category: 'SYSTEM',
    title: 'Document Verified Successfully',
    message: 'Your updated Driving Licence has been verified by the Feedo onboarding team.',
    timestamp: '2 days ago',
    isRead: true
  },
  {
    id: 'n-5',
    category: 'ACCOUNT',
    title: 'Vehicle Insurance Renewal Notice',
    message: 'Your Honda Activa insurance will expire in 14 days. Please upload updated insurance copy.',
    timestamp: '3 days ago',
    isRead: true
  }
];
