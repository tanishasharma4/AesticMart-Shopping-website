import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const HERO_SLIDES = [
  {
    title: "Acoustics Redefined",
    subtitle: "Aestic Studio Headphones Max",
    description: "Immerse yourself in studio-grade acoustics, active noise cancellation, and titanium craftsmanship.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
    badge: "New Flagship Audio",
    category: "electronics",
    price: 349.99
  },
  {
    title: "Mongolian Cashmere 2026",
    subtitle: "Luxury Minimalist Apparel",
    description: "Double-breasted oversized coat meticulously crafted from hand-selected pure cashmere.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=1200",
    badge: "Autumn/Winter Edition",
    category: "fashion",
    price: 489.00
  },
  {
    title: "Architectural Horology",
    subtitle: "Chronos Swiss Automatic",
    description: "Surgical steel, sapphire crystal lens, and emerald sunray dial designed for purists.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
    badge: "Limited Swiss Release",
    category: "accessories",
    price: 650.00
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedCategory, formatPrice } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative overflow-hidden py-8 sm:py-12">
      {/* Background Gradient Mesh */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl glass-panel border border-slate-800/80 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            
            {/* Content Left */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                <span>{slide.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-none mb-4">
                {slide.title}
              </h1>
              
              <p className="text-lg sm:text-xl font-medium text-gradient-purple mb-4">
                {slide.subtitle} — <span className="text-amber-400 font-bold">{formatPrice(slide.price)}</span>
              </p>

              <p className="text-slate-400 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setSelectedCategory(slide.category)}
                  className="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-purple-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center gap-2.5 mt-10">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transition-all duration-700 scale-105 hover:scale-100"
              />
            </div>

          </div>
        </div>

        {/* Feature Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <Truck className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">Express Delivery</h4>
              <p className="text-[11px] text-slate-400">Free shipping on orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">Authentic Guarantee</h4>
              <p className="text-[11px] text-slate-400">100% verified luxury sourcing</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <RefreshCw className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">30-Day Returns</h4>
              <p className="text-[11px] text-slate-400">Hassle-free exchange & refund</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <Award className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">24/7 VIP Support</h4>
              <p className="text-[11px] text-slate-400">Dedicated concierge assistance</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
