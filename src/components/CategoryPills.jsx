import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Shirt, Headphones, Home, Watch } from 'lucide-react';

const CATEGORY_ICONS = {
  fashion: Shirt,
  electronics: Headphones,
  home: Home,
  accessories: Watch,
};

export default function CategoryPills() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none py-4">
      <button
        onClick={() => setSelectedCategory('all')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg shadow-purple-600/25 scale-105'
            : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>All Items</span>
      </button>

      {categories.map((cat) => {
        const IconComponent = CATEGORY_ICONS[cat.slug] || Sparkles;
        const isSelected = selectedCategory === cat.slug;

        return (
          <button
            key={cat.slug || cat.name}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg shadow-purple-600/25 scale-105'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            <IconComponent className="w-3.5 h-3.5" />
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
