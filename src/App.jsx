import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryPills from './components/CategoryPills';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import UserOrdersModal from './components/UserOrdersModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

function MainLayout() {
  const { toastMessage } = useStore();

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-purple-600 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'error'
              ? 'bg-rose-950/90 text-rose-200 border-rose-500/50'
              : toastMessage.type === 'info'
              ? 'bg-indigo-950/90 text-indigo-200 border-indigo-500/50'
              : 'bg-slate-900/90 text-emerald-300 border-emerald-500/50'
          }`}>
            <span>✨</span>
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      {/* Main Header Navbar */}
      <Navbar />

      {/* Main Storefront Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Promotional Hero Slider */}
        <HeroBanner />

        {/* Category Filter Pills */}
        <CategoryPills />

        {/* Grid Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <QuickViewModal />
      <CartDrawer />
      <WishlistModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <UserOrdersModal />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainLayout />
      </StoreProvider>
    </AuthProvider>
  );
}
