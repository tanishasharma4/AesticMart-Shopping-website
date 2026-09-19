import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Package, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { apiCall } from '../services/api';

export default function UserOrdersModal() {
  const { isOrdersOpen, setIsOrdersOpen, formatPrice } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOrdersOpen) {
      setLoading(true);
      apiCall('/orders/mine')
        .then((data) => setOrders(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOrdersOpen]);

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-slate-700/60 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Order History</h2>
              <p className="text-xs text-slate-400">View past orders and tracking status</p>
            </div>
          </div>
          <button
            onClick={() => setIsOrdersOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading order history...</div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto stroke-1" />
              <p className="text-sm font-semibold text-slate-400">No past orders found</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div key={ord._id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs">
                  <div>
                    <span className="font-mono font-bold text-purple-300">{ord.orderNumber}</span>
                    <span className="text-slate-500 ml-2">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                    {ord.orderStatus || 'Processing'}
                  </span>
                </div>

                <div className="space-y-1">
                  {ord.orderItems?.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs text-slate-300">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Paid</span>
                  <span className="font-extrabold text-amber-400">{formatPrice(ord.totalPrice)}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
