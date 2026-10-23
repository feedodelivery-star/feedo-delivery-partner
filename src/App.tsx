import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { DeliveryProvider, useDelivery } from './context/DeliveryContext';
import { Header } from './components/common/Header';
import { BottomNav, NavTab } from './components/common/BottomNav';
import { Sidebar } from './components/common/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { OrdersView } from './components/orders/OrdersView';
import { EarningsView } from './components/earnings/EarningsView';
import { PerformanceView } from './components/performance/PerformanceView';
import { ProfileView } from './components/profile/ProfileView';
import { HelpSupportView } from './components/support/HelpSupportView';
import { EmergencySOSModal } from './components/emergency/EmergencySOSModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { OrderOfferModal } from './components/delivery/OrderOfferModal';
import { DeliverySuccessModal } from './components/delivery/DeliverySuccessModal';
import { AuthView } from './components/auth/AuthView';
import { AdminDemoPortal } from './components/admin/AdminDemoPortal';
import { FloatingDemoControlPanel } from './components/dev/FloatingDemoControlPanel';

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdminPortalOpen, setIsAdminPortalOpen } = useAuth();
  const {
    offeredOrder,
    acceptOrderOffer,
    declineOrderOffer,
    showSuccessModal,
    closeSuccessModal,
    lastCompletedEarning,
    activeOrder,
  } = useDelivery();

  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [showHelpCenter, setShowHelpCenter] = useState<boolean>(false);

  if (!isAuthenticated) {
    return (
      <AuthView
        onSuccessLogin={() => {}}
        onOpenSupport={() => setShowHelpCenter(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans selection:bg-[#00E676] selection:text-slate-950">
      {/* Top Header */}
      <Header
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenSos={() => setShowSosModal(true)}
        onOpenProfile={() => setActiveTab('profile')}
        unreadCount={2}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setShowHelpCenter(false);
            setActiveTab(tab);
          }}
          onOpenHelp={() => setShowHelpCenter(true)}
          onOpenSos={() => setShowSosModal(true)}
        />

        {/* Main Content Dashboard */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden max-w-5xl">
          {showHelpCenter ? (
            <HelpSupportView />
          ) : (
            <>
              {activeTab === 'home' && (
                <DashboardView
                  onNavigateTab={setActiveTab}
                  onOpenHelp={() => setShowHelpCenter(true)}
                />
              )}
              {activeTab === 'orders' && <OrdersView />}
              {activeTab === 'earnings' && <EarningsView />}
              {activeTab === 'performance' && <PerformanceView />}
              {activeTab === 'profile' && <ProfileView />}
            </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setShowHelpCenter(false);
          setActiveTab(tab);
        }}
        activeOrderCount={activeOrder ? 1 : 0}
      />

      {/* Floating Developer Demo Control Panel */}
      <FloatingDemoControlPanel />

      {/* Modals & Overlays */}
      {isAdminPortalOpen && (
        <AdminDemoPortal onClose={() => setIsAdminPortalOpen(false)} />
      )}

      {offeredOrder && (
        <OrderOfferModal
          order={offeredOrder}
          onAccept={acceptOrderOffer}
          onDecline={declineOrderOffer}
        />
      )}

      {showSuccessModal && (
        <DeliverySuccessModal
          earningAmount={lastCompletedEarning || 52}
          onClose={closeSuccessModal}
          onViewOrders={() => {
            closeSuccessModal();
            setActiveTab('orders');
          }}
        />
      )}

      {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
      )}

      {showSosModal && (
        <EmergencySOSModal onClose={() => setShowSosModal(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DeliveryProvider>
          <AppContent />
        </DeliveryProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
