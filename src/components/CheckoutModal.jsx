import React, { useState } from 'react';
import { X, CreditCard, Truck, ShieldCheck, CheckCircle2, QrCode, Banknote, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../services/api';

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    formatPrice,
    cartSubtotal,
    discountAmount,
    estimatedTax,
    shippingFee,
    cartTotal,
    setLastOrder,
    showToast,
  } = useStore();

  const { user } = useAuth();

  const [step, setStep] = useState(1); // 1: Shipping Address, 2: Delivery Method, 3: Payment
  const [submitting, setSubmitting] = useState(false);

  // Address State
  const [address, setAddress] = useState({
    fullName: user ? user.name : '',
    email: user ? user.email : '',
    street: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    country: 'United States',
    phone: '+1 (555) 019-2834',
  });

  // Shipping Speed
  const [shippingMethod, setShippingMethod] = useState('express'); // 'express' | 'priority'

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // 'Credit Card' | 'UPI' | 'Cash on Delivery'
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
    cardHolder: user ? user.name : 'Valued Customer',
  });
  const [upiId, setUpiId] = useState('alex.rivera@okaxis');

  if (!isCheckoutOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      const orderPayload = {
        orderItems: cart,
        shippingAddress: {
          fullName: address.fullName,
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          country: address.country,
          phone: address.phone,
        },
        paymentMethod,
        guestEmail: address.email,
        subtotal: cartSubtotal,
        taxPrice: estimatedTax,
        shippingPrice: shippingFee,
        discountPrice: discountAmount,
        totalPrice: cartTotal,
      };

      const orderResult = await apiCall('/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload),
      });

      setLastOrder(orderResult);
      clearCart();
      setIsCheckoutOpen(false);
      showToast('Order placed successfully! Receipt generated.');
    } catch (err) {
      showToast(err.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel border border-slate-700/60 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto flex flex-col justify-between">
        
        {/* Header & Steps */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-100">Secure Express Checkout</h2>
              <p className="text-xs text-slate-400">Step {step} of 3 — Complete your order</p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between mb-8 px-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-purple-400 font-bold' : 'text-slate-600'}`}>
              <span className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500 flex items-center justify-center text-xs">1</span>
              <span className="text-xs hidden sm:inline">Address</span>
            </div>
            <div className="flex-1 h-0.5 mx-3 bg-slate-800" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-purple-400 font-bold' : 'text-slate-600'}`}>
              <span className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500 flex items-center justify-center text-xs">2</span>
              <span className="text-xs hidden sm:inline">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 mx-3 bg-slate-800" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-purple-400 font-bold' : 'text-slate-600'}`}>
              <span className="w-6 h-6 rounded-full bg-purple-600/20 border border-purple-500 flex items-center justify-center text-xs">3</span>
              <span className="text-xs hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        {/* Step 1: Address Form */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Shipping & Billing Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Street Address</label>
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">State / Prov</label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg"
              >
                <span>Continue to Shipping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Shipping Options */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-400" />
              <span>Select Shipping Speed</span>
            </h3>

            <div className="space-y-3">
              <label
                onClick={() => setShippingMethod('express')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'bg-purple-600/20 border-purple-500 text-slate-100'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    ⚡
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Standard Express (3-5 Business Days)</h4>
                    <p className="text-[11px] text-slate-400">Insured delivery with real-time tracking</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">
                  {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('priority')}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  shippingMethod === 'priority'
                    ? 'bg-purple-600/20 border-purple-500 text-slate-100'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    ✈️
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">Priority Air Courier (1-2 Days)</h4>
                    <p className="text-[11px] text-slate-400">Overnight delivery in luxury velvet packaging</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400">{formatPrice(29.00)}</span>
              </label>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Gateway */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>Payment Gateway Simulation</span>
            </h3>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Credit Card', icon: CreditCard, label: 'Credit Card' },
                { id: 'UPI', icon: QrCode, label: 'Instant UPI' },
                { id: 'Cash on Delivery', icon: Banknote, label: 'COD' },
              ].map((pm) => {
                const IconComp = pm.icon;
                const isSelected = paymentMethod === pm.id;
                return (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <IconComp className="w-5 h-5 mb-1" />
                    <span className="text-[11px]">{pm.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Credit Card Inputs */}
            {paymentMethod === 'Credit Card' && (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Expires</label>
                    <input
                      type="text"
                      value={cardDetails.expDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Input */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <label className="text-[10px] font-semibold text-slate-400 uppercase block">Virtual Payment Address (VPA)</label>
                <input
                  type="text"
                  placeholder="username@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-100"
                />
                <p className="text-[11px] text-slate-400">Scan QR or enter UPI VPA for instant authorization.</p>
              </div>
            )}

            {/* Total Order Summary Box */}
            <div className="p-4 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-300">Total Amount Payable</p>
                <p className="text-xs text-slate-400">Includes taxes and shipping</p>
              </div>
              <span className="text-xl font-extrabold text-amber-400">{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/25 active:scale-95 transition-all"
              >
                {submitting ? 'Processing Payment...' : `Pay ${formatPrice(cartTotal)} Now`}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
