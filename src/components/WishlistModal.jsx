import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function WishlistModal() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct,
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel border border-slate-700/60 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Saved Wishlist</h2>
              <p className="text-xs text-slate-400">{wishlist.length} luxury items saved</p>
            </div>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-12 h-12 text-slate-600 mx-auto stroke-1" />
              <p className="text-sm font-semibold text-slate-400">Your wishlist is currently empty</p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlist.map((item) => {
              const image = item.images?.[0] || item.image;
              return (
                <div
                  key={item._id}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={image}
                      alt={item.name}
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setQuickViewProduct(item);
                      }}
                      className="w-16 h-16 rounded-xl object-cover bg-slate-950 cursor-pointer"
                    />
                    <div>
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setQuickViewProduct(item);
                        }}
                        className="text-xs font-bold text-slate-100 hover:text-purple-300 cursor-pointer"
                      >
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-purple-400 uppercase font-semibold">{item.category}</p>
                      <span className="text-xs font-bold text-amber-400">{formatPrice(item.price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(item);
                        toggleWishlist(item);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Move to Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
