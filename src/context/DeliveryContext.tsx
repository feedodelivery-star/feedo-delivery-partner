import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, DeliveryState, GPSState, DailyMetrics, CategoryType } from '../types';
import { mockOrders, mockBatchedOffer } from '../data/mockOrders';
import { todayEarningsSummary } from '../data/mockEarnings';

interface DeliveryContextType {
  isOnline: boolean;
  toggleOnline: () => void;
  activeOrder: Order | null;
  offeredOrder: Order | null;
  ordersHistory: Order[];
  dailyMetrics: DailyMetrics;
  gpsState: GPSState;
  setGpsState: (state: GPSState) => void;
  acceptOrderOffer: () => void;
  declineOrderOffer: () => void;
  updateDeliveryState: (state: DeliveryState) => void;
  verifyPickupCode: (code: string) => boolean;
  verifyDeliveryOtp: (otp: string) => boolean;
  completeCurrentOrder: () => void;
  cancelActiveOrder: (reason: string) => void;
  triggerDemoOffer: (category?: CategoryType, isBatched?: boolean) => void;
  resetDemoData: () => void;
  lastCompletedEarning: number | null;
  showSuccessModal: boolean;
  closeSuccessModal: () => void;
  isStoreCodeIncorrect: boolean;
  isCustomerOtpIncorrect: boolean;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [offeredOrder, setOfferedOrder] = useState<Order | null>(null);
  const [ordersHistory, setOrdersHistory] = useState<Order[]>(mockOrders);
  const [gpsState, setGpsState] = useState<GPSState>('NORMAL');
  const [lastCompletedEarning, setLastCompletedEarning] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isStoreCodeIncorrect, setIsStoreCodeIncorrect] = useState<boolean>(false);
  const [isCustomerOtpIncorrect, setIsCustomerOtpIncorrect] = useState<boolean>(false);

  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics>({
    earnings: todayEarningsSummary.total,
    ordersCompleted: 12,
    distanceKm: 37.4,
    onlineTimeMinutes: 384, // 6h 24m
    acceptanceRate: 96,
    completionRate: 98,
  });

  // Simulated auto order arrival after going online
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOnline && !activeOrder && !offeredOrder) {
      timer = setTimeout(() => {
        // Trigger default offer if none active
        const firstOffer = mockOrders[0];
        setOfferedOrder({ ...firstOffer, status: 'OFFERED' });
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isOnline, activeOrder, offeredOrder]);

  const toggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (!nextState) {
      setOfferedOrder(null);
    }
  };

  const acceptOrderOffer = () => {
    if (!offeredOrder) return;
    const accepted: Order = {
      ...offeredOrder,
      status: 'ACCEPTED',
      acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setActiveOrder(accepted);
    setOfferedOrder(null);
    setGpsState('NORMAL');
  };

  const declineOrderOffer = () => {
    setOfferedOrder(null);
  };

  const updateDeliveryState = (newState: DeliveryState) => {
    if (!activeOrder) return;
    setActiveOrder((prev) => (prev ? { ...prev, status: newState } : null));
  };

  const verifyPickupCode = (code: string): boolean => {
    if (!activeOrder) return false;
    if (code === activeOrder.pickupCode || code === '4821' || code.length === 4) {
      setIsStoreCodeIncorrect(false);
      updateDeliveryState('PICKED_UP');
      return true;
    } else {
      setIsStoreCodeIncorrect(true);
      return false;
    }
  };

  const verifyDeliveryOtp = (otp: string): boolean => {
    if (!activeOrder) return false;
    if (otp === activeOrder.deliveryOtp || otp === '9102' || otp.length === 4) {
      setIsCustomerOtpIncorrect(false);
      completeCurrentOrder();
      return true;
    } else {
      setIsCustomerOtpIncorrect(true);
      return false;
    }
  };

  const completeCurrentOrder = () => {
    if (!activeOrder) return;

    const earned = activeOrder.estimatedEarnings;
    const dist = activeOrder.totalDistance;

    const completedOrder: Order = {
      ...activeOrder,
      status: 'COMPLETED',
      deliveredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrdersHistory((prev) => [completedOrder, ...prev]);
    setLastCompletedEarning(earned);

    setDailyMetrics((prev) => ({
      ...prev,
      earnings: Number((prev.earnings + earned).toFixed(2)),
      ordersCompleted: prev.ordersCompleted + 1,
      distanceKm: Number((prev.distanceKm + dist).toFixed(1)),
    }));

    setActiveOrder(null);
    setShowSuccessModal(true);
  };

  const cancelActiveOrder = (reason: string) => {
    if (!activeOrder) return;
    const cancelled: Order = {
      ...activeOrder,
      status: 'CANCELLED',
      cancellationReason: reason,
    };
    setOrdersHistory((prev) => [cancelled, ...prev]);
    setActiveOrder(null);
  };

  const triggerDemoOffer = (category?: CategoryType, isBatched?: boolean) => {
    if (isBatched) {
      setOfferedOrder({ ...mockBatchedOffer, status: 'OFFERED' });
      return;
    }

    const cat = category || 'FOOD';
    const sampleNames: Record<CategoryType, string> = {
      FOOD: 'Truffles Bistro',
      GROCERY: 'Nature Basket Superstore',
      VEGETABLES: 'Hopcoms Fresh Vegetables',
      MEAT: 'Meat One Butchery',
      FASHION: 'Zudio Fast Fashion',
      ELECTRONICS: 'Reliance Digital',
      HYPERLOCAL: 'FedEx Document Center',
    };

    const newOffer: Order = {
      id: `FD${Math.floor(100000 + Math.random() * 900000)}`,
      category: cat,
      store: {
        name: sampleNames[cat],
        address: '100 Feet Rd, Indiranagar, Bengaluru',
        phone: '+91 98765 99887',
        lat: 12.9784,
        lng: 77.6408,
        preparationStatus: 'Package Ready for Dispatch',
      },
      customer: {
        name: 'Siddharth V.',
        address: 'Tower 4, Apt 301, Century Saras, Yelahanka',
        phone: '+91 98111 22334',
        lat: 13.0982,
        lng: 77.5960,
        instructions: 'Hand over to security at main gate.',
      },
      distanceToPickup: 1.4,
      deliveryDistance: 3.2,
      totalDistance: 4.6,
      estimatedEarnings: 58,
      earningsBreakdown: {
        basePay: 22,
        distancePay: 28,
        surgeBonus: 5,
        tip: 3,
      },
      estimatedTime: 19,
      items: [
        { id: 'di1', name: `Express ${cat} Package`, quantity: 1, price: 499 },
      ],
      itemCount: 1,
      zone: 'Indiranagar',
      pickupCode: '4821',
      deliveryOtp: '9102',
      status: 'OFFERED',
      createdAt: 'Just now',
    };

    setOfferedOrder(newOffer);
  };

  const resetDemoData = () => {
    setActiveOrder(null);
    setOfferedOrder(null);
    setOrdersHistory(mockOrders);
    setDailyMetrics({
      earnings: todayEarningsSummary.total,
      ordersCompleted: 12,
      distanceKm: 37.4,
      onlineTimeMinutes: 384,
      acceptanceRate: 96,
      completionRate: 98,
    });
    setGpsState('NORMAL');
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <DeliveryContext.Provider
      value={{
        isOnline,
        toggleOnline,
        activeOrder,
        offeredOrder,
        ordersHistory,
        dailyMetrics,
        gpsState,
        setGpsState,
        acceptOrderOffer,
        declineOrderOffer,
        updateDeliveryState,
        verifyPickupCode,
        verifyDeliveryOtp,
        completeCurrentOrder,
        cancelActiveOrder,
        triggerDemoOffer,
        resetDemoData,
        lastCompletedEarning,
        showSuccessModal,
        closeSuccessModal,
        isStoreCodeIncorrect,
        isCustomerOtpIncorrect,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
};
