import { Incentive } from '../types';

export const mockIncentives: Incentive[] = [
  {
    id: 'inc-1',
    title: 'Daily Milestone — Complete 10 Orders',
    description: 'Complete 10 deliveries today to unlock ₹100 cash bonus.',
    rewardAmount: 100,
    currentProgress: 7,
    targetProgress: 10,
    category: 'DAILY',
    timeLimit: 'Ends today at 11:59 PM',
    isCompleted: false
  },
  {
    id: 'inc-2',
    title: 'Dinner Peak Rush Bonus',
    description: 'Complete 5 deliveries between 7:00 PM and 10:00 PM.',
    rewardAmount: 60,
    currentProgress: 2,
    targetProgress: 5,
    category: 'PEAK_HOUR',
    timeLimit: '7:00 PM – 10:00 PM',
    isCompleted: false
  },
  {
    id: 'inc-3',
    title: 'Weekly Hero Challenge — 60 Deliveries',
    description: 'Complete 60 orders this week to unlock ₹500 super incentive.',
    rewardAmount: 500,
    currentProgress: 44,
    targetProgress: 60,
    category: 'WEEKLY',
    timeLimit: '2 days remaining',
    isCompleted: false
  },
  {
    id: 'inc-4',
    title: 'Rain / High Demand Surge Bonus',
    description: 'Extra ₹15 per order during wet weather or extreme surge in Indiranagar zone.',
    rewardAmount: 15,
    currentProgress: 1,
    targetProgress: 1,
    category: 'PEAK_HOUR',
    timeLimit: 'Active Now',
    isCompleted: true
  }
];
