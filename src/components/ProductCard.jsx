import React from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useStore();

  const isSaved = isInWishlist(product._id);
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600';
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative rounded-3xl glass-card border border-slate-800/80 hover:border-purple-500/40 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10">
      
      {/* Image & Overlay Controls */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${
            isSaved
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110'
              : 'bg-slate-950/60 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-xl transition-all hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Details Footer */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-semibold text-slate-300">{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-semibold text-slate-100 hover:text-purple-300 transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 mb-4">
            {product.tagline || product.brand}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
          <div>
            <span className="text-base font-extrabold text-slate-100">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="ml-2 text-xs text-slate-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-2xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 transition-all shadow-sm active:scale-95"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
