import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { ArrowUpDown, Sparkles, RefreshCw } from 'lucide-react';

export default function ProductGrid() {
  const {
    products,
    loadingProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    setSortBy,
    resetFilters,
  } = useStore();

  return (
    <div className="flex-1 space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800/80">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Explore Collection</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {products.length} Products
            </span>
          </h2>
          {searchQuery && (
            <p className="text-xs text-slate-400 mt-0.5">
              Showing results for "<span className="text-purple-300 font-semibold">{searchQuery}</span>"
            </p>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-400">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
          >
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Loading Skeletons */}
      {loadingProducts ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="h-96 rounded-3xl glass-card animate-pulse bg-slate-900/60 border border-slate-800"
            />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl glass-panel border border-slate-800/80 p-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-slate-200 mb-2">No Products Match Your Criteria</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            We couldn't find any products matching your active filters or search terms. Try clearing your filters.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </div>
  );
}
