import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, showToast } = useStore();
  const { login, register, authError, setAuthError } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
        showToast('Successfully signed in!');
      } else {
        await register(name, email, password);
        showToast('Account created successfully!');
      }
      setIsAuthOpen(false);
    } catch (err) {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('alex@aesticmart.com');
    setPassword('password123');
    setLoading(true);
    try {
      await login('alex@aesticmart.com', 'password123');
      showToast('Logged in as Demo Customer (Alex Rivera)');
      setIsAuthOpen(false);
    } catch (err) {
      showToast('Demo login error: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl glass-panel border border-slate-700/60 shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setAuthError(null);
            setIsAuthOpen(false);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Title */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20 mb-3">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-100">
            {mode === 'login' ? 'Welcome Back to AesticMart' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'login' ? 'Sign in to access saved wishlist & orders' : 'Join our exclusive VIP luxury member portal'}
          </p>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {authError}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <UserIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="alex@aesticmart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-3 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 transition-all"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="pt-2 border-t border-slate-800 text-center space-y-3">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>One-Click Demo Customer Sign In</span>
          </button>

          <p className="text-xs text-slate-400">
            {mode === 'login' ? "Don't have an account yet?" : "Already registered?"}{' '}
            <button
              type="button"
              onClick={() => {
                setAuthError(null);
                setMode(mode === 'login' ? 'register' : 'login');
              }}
              className="text-purple-400 font-bold hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
