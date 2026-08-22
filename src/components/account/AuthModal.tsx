import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  KeyRound, 
  Building2,
  Smartphone
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialTab?: 'phone' | 'email' | 'google';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialTab = 'phone'
}) => {
  const { 
    login, 
    signup, 
    loginWithGoogle, 
    sendPhoneOtp, 
    verifyPhoneOtp, 
    resetPassword,
    loginWithDemoUser 
  } = useAuth();

  // Active Method: 'phone' | 'email' | 'forgot-password'
  const [activeTab, setActiveTab] = useState<'phone' | 'email' | 'forgot-password'>('phone');
  const [emailMode, setEmailMode] = useState<'login' | 'signup'>('login');

  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone OTP state
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneName, setPhoneName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [previewOtp, setPreviewOtp] = useState<string | null>(null);

  // Feedback & UI
  const [error, setError] = useState<{ message: string; isEmailInUse?: boolean } | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpSent, otpTimer]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      if (!res.success) {
        setError({ message: res.message || 'Google sign-in could not be completed.' });
        return;
      }
      setSuccessMsg('Successfully signed in with Google!');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 400);
    } catch (err: any) {
      setError({ message: err?.message || 'Google sign-in failed. Please try email or phone login.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const cleanNumber = phoneInput.trim();
    if (!cleanNumber || cleanNumber.replace(/\D/g, '').length < 10) {
      setError({ message: 'Please enter a valid 10-digit mobile phone number.' });
      return;
    }

    setLoading(true);
    try {
      const fullPhone = cleanNumber.startsWith('+') ? cleanNumber : `+91 ${cleanNumber}`;
      const res = await sendPhoneOtp(fullPhone);
      if (!res.success) {
        setError({ message: res.message || 'Failed to send OTP. Please verify your phone number.' });
        return;
      }
      setOtpSent(true);
      setOtpTimer(60);
      if (res.generatedOtp) {
        setPreviewOtp(res.generatedOtp);
      }
      setSuccessMsg(res.message || `OTP sent to ${fullPhone}`);
    } catch (err: any) {
      setError({ message: err?.message || 'Failed to send OTP.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!otpCode || otpCode.trim().length < 4) {
      setError({ message: 'Please enter the 6-digit OTP received on your mobile number.' });
      return;
    }

    setLoading(true);
    try {
      const fullPhone = phoneInput.trim().startsWith('+') ? phoneInput.trim() : `+91 ${phoneInput.trim()}`;
      const res = await verifyPhoneOtp(fullPhone, otpCode.trim(), {
        fullName: phoneName.trim() || undefined,
        businessName: businessName.trim() || undefined
      });

      if (!res.success) {
        setError({ message: res.message || 'Invalid or expired OTP.' });
        return;
      }

      setSuccessMsg('Phone verified successfully! Logging you in...');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 500);
    } catch (err: any) {
      setError({ message: err?.message || 'Verification failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (emailMode === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setError({ message: res.message || 'Login failed. Please check your credentials.' });
          return;
        }
      } else {
        if (!fullName.trim() || !email.trim() || !phone.trim() || !password) {
          setError({ message: 'Please fill in all required registration fields.' });
          return;
        }
        const res = await signup({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password,
          businessName: businessName.trim() || undefined
        });
        if (!res.success) {
          const isEmailInUse = res.code === 'auth/email-already-in-use' || res.message?.includes('already exists');
          setError({
            message: res.message || 'Account registration could not be completed.',
            isEmailInUse
          });
          return;
        }
      }

      setSuccessMsg(emailMode === 'login' ? 'Welcome back!' : 'Account created successfully!');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 400);
    } catch (err: any) {
      setError({ message: err?.message || 'An unexpected authentication error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await resetPassword(email);
      if (!res.success) {
        setError({ message: res.message || 'Could not send password reset instructions.' });
        return;
      }
      setSuccessMsg(res.message || 'Reset link sent! Please check your email inbox.');
    } catch (err: any) {
      setError({ message: err?.message || 'Password reset failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-lg rounded-2xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Ornate Indian Royal Header */}
        <div className="bg-[#4A0E17] text-white px-5 py-4 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E6CA85]/20 border border-[#E6CA85]/40 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#E6CA85]" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide text-[#E6CA85]">
                Luxmy Agarbatti Limited
              </h3>
              <p className="text-[11px] text-amber-200/80 font-sans">
                Secure Customer & Wholesale Partner Portal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method Selector Tabs */}
        <div className="bg-[#F3ECE0] border-b border-[#C5A059]/30 px-5 pt-3 flex gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setActiveTab('phone');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`pb-2.5 px-3 font-semibold text-xs transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'phone'
                ? 'border-[#4A0E17] text-[#4A0E17] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile OTP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('email');
              setError(null);
              setSuccessMsg(null);
            }}
            className={`pb-2.5 px-3 font-semibold text-xs transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'email'
                ? 'border-[#4A0E17] text-[#4A0E17] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email & Password</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">

          {/* Quick Google Sign In Banner Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 rounded-xl border border-stone-300 font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer hover:shadow-sm disabled:opacity-60"
            >
              {/* Google Brand G SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-300"></div>
              </div>
              <span className="relative px-3 bg-[#FAF6F0] text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-stone-800 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{error.message}</span>
              </div>
              {error.isEmailInUse && (
                <div className="pt-1 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('email');
                      setEmailMode('login');
                      setError(null);
                    }}
                    className="px-3 py-1 bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold rounded-md shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Switch to Login</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="font-semibold">{successMsg}</span>
            </div>
          )}

          {/* TAB 1: PHONE NUMBER & OTP */}
          {activeTab === 'phone' && (
            <div className="space-y-3.5">
              {!otpSent ? (
                <form onSubmit={handleSendPhoneOtp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mobile Phone Number *
                    </label>
                    <div className="flex rounded-lg border border-[#C5A059]/50 overflow-hidden bg-white focus-within:ring-1 focus-within:ring-[#4A0E17]">
                      <span className="px-3 py-2 bg-stone-100 text-stone-600 text-xs font-bold border-r border-stone-200 flex items-center gap-1">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="98765 43210"
                        className="w-full px-3 py-2 text-xs font-medium focus:outline-none"
                        required
                        autoFocus
                      />
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      We'll send a 6-digit OTP code to verify your mobile number.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={phoneName}
                      onChange={(e) => setPhoneName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Business / Shop Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Shree Ganesh Pooja Store"
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    <span>{loading ? 'Sending OTP...' : 'Send Verification OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyPhoneOtp} className="space-y-3">
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs flex items-center justify-between">
                    <div>
                      <span className="text-stone-500">OTP sent to:</span>{' '}
                      <span className="font-bold text-stone-800">{phoneInput}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtpCode('');
                        setError(null);
                      }}
                      className="text-[#6B1724] font-bold hover:underline text-[11px]"
                    >
                      Change Number
                    </button>
                  </div>

                  {previewOtp && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center justify-between text-emerald-800">
                      <span>Instant OTP Preview: <strong>{previewOtp}</strong></span>
                      <button
                        type="button"
                        onClick={() => setOtpCode(previewOtp)}
                        className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] rounded font-bold hover:bg-emerald-800"
                      >
                        Auto Fill
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Enter 6-Digit Verification OTP *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • • • •"
                      className="w-full px-3 py-2.5 text-center tracking-[0.4em] font-mono text-base font-bold bg-white rounded-lg border border-[#C5A059]/60 focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>
                      {otpTimer > 0 ? (
                        <span>Resend OTP in <strong className="text-[#4A0E17]">{otpTimer}s</strong></span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendPhoneOtp()}
                          className="text-[#6B1724] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Resend OTP</span>
                        </button>
                      )}
                    </span>
                    <span className="text-[11px] text-stone-500">Master test code: 123456</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length < 4}
                    className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    <span>{loading ? 'Verifying...' : 'Verify OTP & Continue'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: EMAIL & PASSWORD */}
          {activeTab === 'email' && (
            <div className="space-y-3">
              {/* Sub Mode Switcher */}
              <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setEmailMode('login');
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    emailMode === 'login'
                      ? 'bg-white text-[#4A0E17] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmailMode('signup');
                    setError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    emailMode === 'signup'
                      ? 'bg-white text-[#4A0E17] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-2.5">
                {emailMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Chandra Sharma"
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                        required
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-stone-700">
                      Password *
                    </label>
                    {emailMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('forgot-password');
                          setError(null);
                        }}
                        className="text-[11px] text-[#6B1724] hover:underline font-semibold"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17] pr-8"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {emailMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Business / Shop Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Shree Ganesh Pooja Store"
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-1 disabled:opacity-50 transition-colors"
                >
                  <span>{loading ? 'Processing...' : emailMode === 'login' ? 'Sign In & Continue' : 'Create Account & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {activeTab === 'forgot-password' && (
            <form onSubmit={handleResetPassword} className="space-y-3">
              <div className="text-xs text-stone-600">
                Enter your registered account email address. We'll send you password reset instructions.
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('email');
                    setError(null);
                  }}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                >
                  <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Instant Demo Accounts */}
          <div className="p-3 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/30 text-[11px] text-stone-600">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-[#4A0E17] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                1-Click Instant Demo Login:
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={async () => {
                  await loginWithDemoUser('retailer');
                  onClose();
                  if (onSuccess) onSuccess();
                }}
                className="px-2 py-1.5 bg-white hover:bg-stone-50 rounded-lg border border-[#C5A059]/40 text-[#6B1724] font-bold text-[11px] transition-colors text-center shadow-xs"
              >
                Retailer
              </button>
              <button
                type="button"
                onClick={async () => {
                  await loginWithDemoUser('individual');
                  onClose();
                  if (onSuccess) onSuccess();
                }}
                className="px-2 py-1.5 bg-white hover:bg-stone-50 rounded-lg border border-[#C5A059]/40 text-stone-800 font-bold text-[11px] transition-colors text-center shadow-xs"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={async () => {
                  await loginWithDemoUser('admin');
                  onClose();
                  if (onSuccess) onSuccess();
                }}
                className="px-2 py-1.5 bg-white hover:bg-stone-50 rounded-lg border border-[#C5A059]/40 text-[#B45309] font-bold text-[11px] transition-colors text-center shadow-xs"
              >
                Admin HQ
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
