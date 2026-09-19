import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  SlidersHorizontal,
  LogOut
} from 'lucide-react';
import { useStore, CURRENCIES } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const {
    theme,
    setTheme,
    currency,
    setCurrency,
    searchQuery,
    setSearchQuery,
    cart,
    wishlist,
    selectedCategory,
    setSelectedCategory,
    categories,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthOpen,
    setIsOrdersOpen,
  } = useStore();

  const { user, isAuthenticated, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/85 border-b border-slate-800/60 light:border-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-amber-400 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-5.5 h-5.5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Aestic<span className="text-gradient-purple font-serif font-normal italic">Mart</span>
              </span>
            </a>

            {/* Category Dropdown */}
            <div className="hidden lg:relative lg:block">
              <button
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-700/50"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl glass-panel p-2 shadow-2xl border border-slate-700/50 z-50 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setCategoryMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-purple-600/20 text-purple-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    All Collections
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug || cat.name}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-purple-600/20 text-purple-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Live Search Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search luxury fashion, tech, home decor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 light:bg-slate-100/90 border border-slate-800 light:border-slate-300 rounded-full py-2.5 pl-11 pr-4 text-sm text-slate-100 light:text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 group-focus-within:text-purple-400 transition-colors" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-white text-xs bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-300 light:text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
              >
                {Object.keys(CURRENCIES).map((currKey) => (
                  <option key={currKey} value={currKey} className="bg-slate-900 text-slate-200">
                    {CURRENCIES[currKey].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-amber-300 transition-all shadow-sm"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-rose-400 transition-all shadow-sm"
              title="View Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-95"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Button */}
            <div className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 transition-all"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-7 h-7 rounded-lg object-cover ring-2 ring-purple-500/40"
                  />
                  <span className="hidden md:inline text-xs font-medium text-slate-200">{user?.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white transition-all"
                  title="Sign In"
                >
                  <User className="w-4.5 h-4.5" />
                </button>
              )}

              {/* User Menu Dropdown */}
              {userMenuOpen && isAuthenticated && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl glass-panel p-2 shadow-2xl border border-slate-700/50 z-50">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-100 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      setIsOrdersOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-purple-400" />
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
