import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, User, Phone, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { OrnamentalDivider } from '../common/OrnamentalDivider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const ok = await login(email, password);
        if (!ok) {
          setError('Invalid email or password. Please try again.');
          setLoading(false);
          return;
        }
      } else {
        if (!fullName || !email || !phone || !password) {
          setError('Please fill all required fields.');
          setLoading(false);
          return;
        }
        await signup(fullName, email, phone, password);
      }

      onClose();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-md rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Ornate Header */}
        <div className="bg-[#4A0E17] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E6CA85]" />
            <h3 className="font-display text-sm sm:text-base font-bold tracking-wider text-[#E6CA85]">
              {mode === 'login' ? 'Sign In to Luxmy' : 'Create Customer Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h4 className="font-serif text-xl font-bold text-[#4A0E17]">
              {mode === 'login' ? 'Welcome Back' : 'Join the Luxmy Ecosystem'}
            </h4>
            <p className="text-xs text-stone-600 mt-1">
              Access your order history, B2B wholesale prices, and machinery consultations.
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                required
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow flex items-center justify-center gap-1.5 cursor-pointer mt-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials hint */}
          <div className="p-3 bg-[#EFE8DC] rounded-lg border border-[#C5A059]/30 text-[11px] text-stone-600">
            <span className="font-bold text-[#4A0E17]">Demo Accounts:</span>
            <div className="mt-1 flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setEmail('ramesh.sharma@example.com');
                  setPassword('demo123');
                }}
                className="text-[#6B1724] underline font-semibold"
              >
                Use Customer Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setEmail('admin@luxmy.in');
                  setPassword('admin123');
                }}
                className="text-[#B45309] underline font-semibold"
              >
                Use Admin Demo
              </button>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-stone-200 text-xs">
            {mode === 'login' ? (
              <p className="text-stone-600">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="text-[#6B1724] font-bold hover:underline"
                >
                  Sign up now
                </button>
              </p>
            ) : (
              <p className="text-stone-600">
                Already registered?{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-[#6B1724] font-bold hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
