import React from 'react';
import { CheckCircle2, PackageCheck, Calendar, ArrowRight, Download, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function OrderSuccessModal() {
  const { lastOrder, setLastOrder, formatPrice } = useStore();

  if (!lastOrder) return null;

  const estimatedDeliveryDate = lastOrder.estimatedDelivery
    ? new Date(lastOrder.estimatedDelivery).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : 'In 3-4 Business Days';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl glass-panel border border-slate-700/60 shadow-2xl p-6 sm:p-8 text-center space-y-6">
        
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
          </span>
          <h2 className="text-2xl font-extrabold text-slate-100">Thank You For Your Order!</h2>
          <p className="text-xs text-slate-400 mt-1">
            Order Reference ID: <span className="text-purple-300 font-mono font-bold">{lastOrder.orderNumber}</span>
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Est. Delivery</span>
            </div>
            <p className="text-xs text-slate-400">{estimatedDeliveryDate}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-1">
              <PackageCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Payment Mode</span>
            </div>
            <p className="text-xs text-slate-400">{lastOrder.paymentMethod} (Paid)</p>
          </div>
        </div>

        {/* Items Summary List */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-left max-h-44 overflow-y-auto space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Order Items</h4>
          {lastOrder.orderItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
              <span className="text-slate-200 truncate max-w-[200px]">{item.name} × {item.quantity}</span>
              <span className="font-bold text-slate-300">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-700 flex justify-between text-xs font-extrabold text-amber-400">
            <span>Total Amount Paid</span>
            <span>{formatPrice(lastOrder.totalPrice)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setLastOrder(null)}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
