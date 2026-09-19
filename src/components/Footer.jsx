import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck, CreditCard, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('Thank you for subscribing to Aestic VIP Gazette!');
      setEmail('');
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-400 flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-extrabold text-slate-100">
                Aestic<span className="text-gradient-purple font-serif font-normal italic">Mart</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Curated luxury fashion, architectural home accents, and flagship personal tech. Designed for those who value minimalist perfection.
            </p>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                placeholder="Join VIP Private Circle..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <span>Join</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Collections</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-purple-300 transition-colors">Fashion & Apparel</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Electronics & Audio</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Modern Home Decor</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Horology & Watches</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-purple-300 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Shipping & Customs</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">30-Day Returns Policy</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Concierge Support</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-purple-300 transition-colors">Our Design Philosophy</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Sustainability Sourcing</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Careers & Atelier</a></li>
              <li><a href="#" className="hover:text-purple-300 transition-colors">Press & Media</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} AesticMart Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SSL Secured</span>
            <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5" /> Visa / Mastercard / UPI</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
