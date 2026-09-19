import React from 'react';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, RotateCcw, Star, DollarSign } from 'lucide-react';

export default function FilterSidebar() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    resetFilters,
    formatPrice,
  } = useStore();

  return (
    <div className="rounded-3xl glass-panel p-6 border border-slate-800/80 sticky top-28 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Filter Catalog</h3>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors"
          title="Reset Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Selection */}
      <div>
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Categories</h4>
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === 'all'}
                onChange={() => setSelectedCategory('all')}
                className="accent-purple-500"
              />
              <span className={selectedCategory === 'all' ? 'text-purple-300 font-semibold' : 'text-slate-400'}>
                All Collections
              </span>
            </div>
          </label>

          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center justify-between text-xs cursor-pointer p-2 rounded-xl hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat.slug}
                  onChange={() => setSelectedCategory(cat.slug)}
                  className="accent-purple-500"
                />
                <span className={selectedCategory === cat.slug ? 'text-purple-300 font-semibold' : 'text-slate-400'}>
                  {cat.name}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Price Cap</h4>
          <span className="text-xs font-bold text-amber-400">{formatPrice(priceRange[1])}</span>
        </div>
        <input
          type="range"
          min="50"
          max="1500"
          step="25"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer h-1.5"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>{formatPrice(0)}</span>
          <span>{formatPrice(1500)}</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Minimum Rating</h4>
        <div className="space-y-1.5">
          {[4.5, 4.0, 3.5, 0].map((starVal) => (
            <button
              key={starVal}
              onClick={() => setMinRating(starVal)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                minRating === starVal
                  ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{starVal === 0 ? 'Any Rating' : `${starVal}+ Stars`}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
