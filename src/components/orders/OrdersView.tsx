import React, { useState } from 'react';
import { useDelivery } from '../../context/DeliveryContext';
import { Order, CategoryType } from '../../types';
import { CategoryBadge } from '../common/CategoryBadge';
import { Package, Clock, MapPin, Search, ChevronRight, X, Phone, ShieldCheck } from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { ordersHistory } = useDelivery();
  const [activeFilterTab, setActiveFilterTab] = useState<'ALL' | 'COMPLETED' | 'CANCELLED'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'ALL'>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = ordersHistory.filter((order) => {
    if (activeFilterTab === 'COMPLETED' && order.status !== 'COMPLETED') return false;
    if (activeFilterTab === 'CANCELLED' && order.status !== 'CANCELLED') return false;
    if (selectedCategory !== 'ALL' && order.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Order History</h1>
        <p className="text-xs text-slate-400">Review past completed, active, and cancelled hyperlocal deliveries.</p>
      </div>

      {/* Filter Tabs & Categories */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveFilterTab('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeFilterTab === 'ALL' ? 'bg-[#00E676] text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Orders ({ordersHistory.length})
          </button>
          <button
            onClick={() => setActiveFilterTab('COMPLETED')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeFilterTab === 'COMPLETED' ? 'bg-[#00E676] text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveFilterTab('CANCELLED')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${
              activeFilterTab === 'CANCELLED' ? 'bg-[#00E676] text-slate-950 font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Category Selector */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as any)}
          className="bg-slate-900 text-slate-200 border border-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-slate-700"
        >
          <option value="ALL">All Categories</option>
          <option value="FOOD">Food 🍔</option>
          <option value="GROCERY">Grocery 🛒</option>
          <option value="VEGETABLES">Fruits & Veg 🥦</option>
          <option value="MEAT">Meat 🥩</option>
          <option value="FASHION">Fashion 👕</option>
          <option value="ELECTRONICS">Electronics 📱</option>
          <option value="HYPERLOCAL">Hyperlocal 📦</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#161e2e] border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
            <Package size={40} className="mx-auto mb-3 opacity-30 text-slate-400" />
            <h3 className="text-base font-bold text-white mb-1">No Orders Found</h3>
            <p className="text-xs">There are no orders matching your selected category filters.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-[#161e2e] hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-4 shadow-lg cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <CategoryBadge category={order.category} size="md" showIconOnly />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white font-mono">{order.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                        order.status === 'COMPLETED'
                          ? 'bg-emerald-500/15 text-[#00E676] border-emerald-500/30'
                          : 'bg-red-500/15 text-red-400 border-red-500/30'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-200 mt-1">{order.store.name}</h4>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{order.createdAt}</span>
                    <span>•</span>
                    <span>{order.totalDistance} km</span>
                    <span>•</span>
                    <span>{order.itemCount} items</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                <div className="text-left sm:text-right">
                  <div className="text-base font-black text-[#00E676]">₹{order.estimatedEarnings}</div>
                  <div className="text-[10px] text-slate-500">{order.zone} Zone</div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#161e2e] border border-slate-700 rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <CategoryBadge category={selectedOrder.category} size="md" />
              <span className="text-sm font-black text-white font-mono">{selectedOrder.id}</span>
            </div>

            <h3 className="text-xl font-black text-white mb-4">Order Details Summary</h3>

            {/* Store & Customer Details */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 mb-4 text-xs">
              <div>
                <div className="text-slate-500 font-semibold mb-0.5">PICKUP MERCHANT</div>
                <div className="text-sm font-bold text-white">{selectedOrder.store.name}</div>
                <div className="text-slate-400">{selectedOrder.store.address}</div>
              </div>

              <div className="border-t border-slate-800 pt-2">
                <div className="text-slate-500 font-semibold mb-0.5">CUSTOMER DROP</div>
                <div className="text-sm font-bold text-white">{selectedOrder.customer.name}</div>
                <div className="text-slate-400">{selectedOrder.customer.address}</div>
              </div>
            </div>

            {/* Pay Breakdown */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2 mb-5 text-xs text-slate-300">
              <div className="flex justify-between font-bold text-white text-sm border-b border-slate-800 pb-2">
                <span>Total Earning</span>
                <span className="text-[#00E676]">₹{selectedOrder.estimatedEarnings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Base Pay</span>
                <span>₹{selectedOrder.earningsBreakdown.basePay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Distance Pay</span>
                <span>₹{selectedOrder.earningsBreakdown.distancePay}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Surge Bonus</span>
                <span>+₹{selectedOrder.earningsBreakdown.surgeBonus}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
