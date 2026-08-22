import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  AlertCircle,
  MessageCircle,
  Building,
  User as UserIcon,
  Phone,
  Tag,
  Smartphone,
  Mail,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { DeliveryAddress, Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDashboard: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOpenDashboard
}) => {
  const { items, subtotal, tax, shipping, discount, total, appliedCoupon, clearCart } = useCart();
  const { 
    user, 
    isAuthenticated, 
    login, 
    signup, 
    loginWithGoogle, 
    sendPhoneOtp, 
    verifyPhoneOtp, 
    loginWithDemoUser 
  } = useAuth();
  const { placeOrder } = useOrders();

  // Step state: 'auth' | 'shipping' | 'payment' | 'success'
  const [currentStep, setCurrentStep] = useState<'auth' | 'shipping' | 'payment' | 'success'>(
    isAuthenticated ? 'shipping' : 'auth'
  );

  // Auth sub-form state
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authEmail, setAuthEmail] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  
  // Phone OTP checkout state
  const [phoneInput, setPhoneInput] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [previewOtp, setPreviewOtp] = useState<string | null>(null);

  const [authError, setAuthError] = useState<{ message: string; isEmailInUse?: boolean } | null>(null);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // Shipping form state
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || '');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || 'Ahmedabad');
  const [state, setState] = useState(user?.addresses?.[0]?.state || 'Gujarat');
  const [pincode, setPincode] = useState(user?.addresses?.[0]?.pincode || '380001');
  const [landmark, setLandmark] = useState(user?.addresses?.[0]?.landmark || '');
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || '');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI');
  const [upiId, setUpiId] = useState('customer@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

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

  // Sync auth state: if user signs in, transition smoothly from auth step to shipping
  useEffect(() => {
    if (isAuthenticated) {
      if (currentStep === 'auth') {
        setCurrentStep('shipping');
      }
      if (user) {
        if (!fullName) setFullName(user.fullName);
        if (!phone) setPhone(user.phone);
        if (user.addresses && user.addresses.length > 0) {
          const defAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
          if (!street && defAddr.street) setStreet(defAddr.street);
          if (!city && defAddr.city) setCity(defAddr.city);
          if (!state && defAddr.state) setState(defAddr.state);
          if (!pincode && defAddr.pincode) setPincode(defAddr.pincode);
          if (!landmark && defAddr.landmark) setLandmark(defAddr.landmark);
        }
        if (!businessName && user.businessName) setBusinessName(user.businessName);
        if (!gstNumber && user.gstNumber) setGstNumber(user.gstNumber);
      }
    } else {
      if (currentStep === 'shipping' || currentStep === 'payment') {
        setCurrentStep('auth');
      }
    }
  }, [isAuthenticated, user]);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsAuthSubmitting(true);
    try {
      const res = await loginWithGoogle();
      if (!res.success) {
        setAuthError({ message: res.message || 'Google sign-in could not be completed.' });
        return;
      }
      setCurrentStep('shipping');
    } catch (err: any) {
      setAuthError({ message: err?.message || 'Google sign-in failed.' });
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleSendPhoneOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);
    const cleanNumber = phoneInput.trim();
    if (!cleanNumber || cleanNumber.replace(/\D/g, '').length < 10) {
      setAuthError({ message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }
    setIsAuthSubmitting(true);
    try {
      const fullPhone = cleanNumber.startsWith('+') ? cleanNumber : `+91 ${cleanNumber}`;
      const res = await sendPhoneOtp(fullPhone);
      if (!res.success) {
        setAuthError({ message: res.message || 'Failed to send OTP.' });
        return;
      }
      setOtpSent(true);
      setOtpTimer(60);
      if (res.generatedOtp) {
        setPreviewOtp(res.generatedOtp);
      }
    } catch (err: any) {
      setAuthError({ message: err?.message || 'Failed to send OTP.' });
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!otpCode || otpCode.trim().length < 4) {
      setAuthError({ message: 'Please enter the 6-digit OTP code.' });
      return;
    }
    setIsAuthSubmitting(true);
    try {
      const fullPhone = phoneInput.trim().startsWith('+') ? phoneInput.trim() : `+91 ${phoneInput.trim()}`;
      const res = await verifyPhoneOtp(fullPhone, otpCode.trim(), {
        fullName: authFullName.trim() || undefined
      });
      if (!res.success) {
        setAuthError({ message: res.message || 'Invalid or expired OTP code.' });
        return;
      }
      setCurrentStep('shipping');
    } catch (err: any) {
      setAuthError({ message: err?.message || 'Verification failed.' });
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthSubmitting(true);

    try {
      if (authMode === 'login') {
        const res = await login(authEmail, authPassword);
        if (!res.success) {
          setAuthError({ message: res.message || 'Login failed. Please check your email and password.' });
          setIsAuthSubmitting(false);
          return;
        }
      } else {
        if (!authFullName.trim() || !authEmail.trim() || !authPhone.trim() || !authPassword) {
          setAuthError({ message: 'Please provide all required fields' });
          setIsAuthSubmitting(false);
          return;
        }
        const res = await signup({
          fullName: authFullName.trim(),
          email: authEmail.trim(),
          phone: authPhone.trim(),
          password: authPassword
        });
        if (!res.success) {
          const isEmailInUse = res.code === 'auth/email-already-in-use' || res.message?.includes('already exists');
          setAuthError({
            message: res.message || 'Account registration could not be completed.',
            isEmailInUse
          });
          setIsAuthSubmitting(false);
          return;
        }
      }
      // Successfully authenticated -> smoothly proceed to shipping step
      setCurrentStep('shipping');
    } catch (err: any) {
      setAuthError({ message: err?.message || 'An unexpected error occurred during authentication.' });
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !street.trim() || !city.trim() || !pincode.trim()) {
      alert('Please fill all required shipping fields.');
      return;
    }
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    if (!isAuthenticated || !user) {
      setCurrentStep('auth');
      return;
    }

    if (items.length === 0) {
      setPaymentError('Your cart is empty. Please add items before checking out.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate gateway verification
      await new Promise((res) => setTimeout(res, 800));

      const deliveryAddress: DeliveryAddress = {
        id: `addr-${Date.now()}`,
        fullName: fullName.trim(),
        phone: phone.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        landmark: landmark.trim() || undefined,
        isDefault: true,
        type: businessName ? 'Business / Warehouse' : 'Home'
      };

      const hasBulkItems = items.some((i) => i.orderType === 'bulk');

      const createdOrder = await placeOrder({
        items,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        deliveryAddress,
        paymentMethod,
        customer: {
          name: fullName.trim(),
          email: user.email || authEmail || 'customer@luxmy.in',
          phone: phone.trim(),
          whatsapp: phone.trim(),
          businessName: businessName.trim() || undefined,
          gstNumber: gstNumber.trim() || undefined
        },
        orderType: hasBulkItems ? 'bulk' : 'regular'
      });

      setPlacedOrder(createdOrder);
      setCurrentStep('success');
      clearCart();

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4A0E17', '#E6CA85', '#B45309', '#25D366']
        });
      } catch (err) {
        // Safe fallback
      }

    } catch (err: any) {
      console.error('Order placement error:', err);
      setPaymentError('We could not complete your order. Please check your connection and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF6F0] w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-[#C5A059]/50 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Ornate Header */}
        <div className="bg-[#4A0E17] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E6CA85]" />
            <h3 className="font-display text-sm sm:text-base font-bold tracking-wider text-[#E6CA85]">
              Luxmy Agarbatti Secure Checkout
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#E6CA85] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Unless on Success screen) */}
        {currentStep !== 'success' && (
          <div className="bg-[#EFE8DC] px-6 py-2.5 border-b border-[#C5A059]/30 flex items-center justify-between text-xs font-semibold text-stone-600">
            <div className={`flex items-center gap-1.5 ${currentStep === 'auth' ? 'text-[#6B1724] font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                isAuthenticated ? 'bg-emerald-700 text-white' : 'bg-[#4A0E17] text-[#E6CA85]'
              }`}>
                {isAuthenticated ? '✓' : '1'}
              </span>
              <span>Account</span>
            </div>
            <span>→</span>
            <div className={`flex items-center gap-1.5 ${currentStep === 'shipping' ? 'text-[#6B1724] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#4A0E17] text-[#E6CA85] flex items-center justify-center text-[10px]">2</span>
              <span>Delivery</span>
            </div>
            <span>→</span>
            <div className={`flex items-center gap-1.5 ${currentStep === 'payment' ? 'text-[#6B1724] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#4A0E17] text-[#E6CA85] flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: AUTHENTICATION */}
          {currentStep === 'auth' && (
            <div className="space-y-4 max-w-md mx-auto">
              <div className="text-center">
                <h4 className="font-serif text-xl font-bold text-[#4A0E17]">
                  Sign In or Create Account
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Connect your account to track your orders, save shipping addresses, and unlock B2B pricing.
                </p>
              </div>

              {/* Google 1-Tap Button */}
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isAuthSubmitting}
                  className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 rounded-xl border border-stone-300 font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer hover:shadow-sm disabled:opacity-60"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative my-3 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-300"></div>
                  </div>
                  <span className="relative px-3 bg-[#FAF6F0] text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    Or choose method
                  </span>
                </div>
              </div>

              {/* Sub Method Tabs */}
              <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('phone');
                    setAuthError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    authMethod === 'phone'
                      ? 'bg-white text-[#4A0E17] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMethod('email');
                    setAuthError(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
                    authMethod === 'email'
                      ? 'bg-white text-[#4A0E17] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email & Password</span>
                </button>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-stone-800 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{authError.message}</span>
                  </div>
                  {authError.isEmailInUse && (
                    <div className="pt-1 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMethod('email');
                          setAuthMode('login');
                          setAuthError(null);
                        }}
                        className="px-3 py-1 bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold rounded-md shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Log In to Existing Account</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* METHOD 1: PHONE OTP */}
              {authMethod === 'phone' && (
                <div className="space-y-3">
                  {!otpSent ? (
                    <form onSubmit={handleSendPhoneOtp} className="space-y-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Mobile Phone Number *
                        </label>
                        <div className="flex rounded-lg border border-[#C5A059]/50 overflow-hidden bg-white">
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
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Your Full Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={authFullName}
                          onChange={(e) => setAuthFullName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-medium focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isAuthSubmitting}
                        className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                      >
                        <span>{isAuthSubmitting ? 'Sending OTP...' : 'Send Verification OTP'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyPhoneOtp} className="space-y-3">
                      <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-xs flex items-center justify-between">
                        <div>
                          <span className="text-stone-500">OTP sent to:</span>{' '}
                          <span className="font-bold text-stone-800">{phoneInput}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode('');
                            setAuthError(null);
                          }}
                          className="text-[#6B1724] font-bold hover:underline text-[11px]"
                        >
                          Change
                        </button>
                      </div>

                      {previewOtp && (
                        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center justify-between text-emerald-800">
                          <span>Instant OTP: <strong>{previewOtp}</strong></span>
                          <button
                            type="button"
                            onClick={() => setOtpCode(previewOtp)}
                            className="px-2 py-0.5 bg-emerald-700 text-white text-[10px] rounded font-bold"
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
                          className="w-full px-3 py-2 text-center tracking-[0.3em] font-mono text-base font-bold bg-white rounded-lg border border-[#C5A059]/60 focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                          required
                          autoFocus
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs text-stone-600">
                        <span>
                          {otpTimer > 0 ? (
                            <span>Resend in <strong className="text-[#4A0E17]">{otpTimer}s</strong></span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSendPhoneOtp()}
                              className="text-[#6B1724] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Resend OTP</span>
                            </button>
                          )}
                        </span>
                        <span className="text-[11px] text-stone-400">Master code: 123456</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isAuthSubmitting || otpCode.length < 4}
                        className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                      >
                        <span>{isAuthSubmitting ? 'Verifying...' : 'Verify OTP & Continue'}</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* METHOD 2: EMAIL & PASSWORD */}
              {authMethod === 'email' && (
                <div className="space-y-3">
                  <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError(null);
                      }}
                      className={`flex-1 py-1 font-bold rounded ${authMode === 'login' ? 'bg-white text-[#4A0E17] shadow-xs' : 'text-stone-600'}`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setAuthError(null);
                      }}
                      className={`flex-1 py-1 font-bold rounded ${authMode === 'signup' ? 'bg-white text-[#4A0E17] shadow-xs' : 'text-stone-600'}`}
                    >
                      Create Account
                    </button>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-2.5">
                    {authMode === 'signup' && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                          <input
                            type="text"
                            value={authFullName}
                            onChange={(e) => setAuthFullName(e.target.value)}
                            placeholder="e.g. Ramesh Chandra Sharma"
                            className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            value={authPhone}
                            onChange={(e) => setAuthPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                            required
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Password *</label>
                      <input
                        type="password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/50 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isAuthSubmitting}
                      className="w-full py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow flex items-center justify-center gap-1.5 cursor-pointer mt-1 disabled:opacity-50 transition-colors"
                    >
                      <span>{isAuthSubmitting ? 'Authenticating...' : authMode === 'signup' ? 'Create Account & Continue' : 'Sign In & Continue'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* Instant 1-Click Demo */}
              <div className="p-2.5 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/30 text-[11px] text-stone-600">
                <span className="font-bold text-[#4A0E17] flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  Instant 1-Click Demo Login:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      await loginWithDemoUser('retailer');
                      setCurrentStep('shipping');
                    }}
                    className="px-2 py-1 bg-white hover:bg-stone-50 rounded border border-[#C5A059]/40 text-[#6B1724] font-bold text-center shadow-xs"
                  >
                    Retailer Demo
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await loginWithDemoUser('individual');
                      setCurrentStep('shipping');
                    }}
                    className="px-2 py-1 bg-white hover:bg-stone-50 rounded border border-[#C5A059]/40 text-stone-800 font-bold text-center shadow-xs"
                  >
                    Customer Demo
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {currentStep === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B45309]" />
                  <span>Delivery Address & Recipient Details</span>
                </h4>
                <span className="text-xs text-stone-500">Logged in as {user?.fullName}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Mobile *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Street Address / Building / Flat *</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="Plot No. 42, GIDC Industrial Estate, Phase 2"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold focus:outline-none focus:ring-1 focus:ring-[#4A0E17]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="Near Laxmi Temple"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Business / Firm Name (Optional)</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Mahadev Pooja Emporium"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">GSTIN for Tax Invoice (Optional)</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    placeholder="24AAACP1234F1Z5"
                    className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#C5A059]/40 uppercase"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Return to Store
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#5B131F] text-[#E6CA85] text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {currentStep === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-[#4A0E17] flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#B45309]" />
                  <span>Select Payment Method</span>
                </h4>
                <span className="text-xs font-bold text-[#4A0E17]">
                  Total: ₹{total.toLocaleString()}
                </span>
              </div>

              {paymentError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}

              <div className="space-y-2.5">
                
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'UPI'
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/20'
                      : 'bg-white border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#4A0E17]">Instant UPI / QR Code</p>
                        <p className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Zero Surcharge
                    </span>
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 pt-3 border-t border-[#C5A059]/30 text-xs">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">Enter UPI VPA ID:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okhdfcbank"
                        className="w-full px-3 py-1.5 text-xs bg-white rounded border border-[#C5A059]/40"
                      />
                    </div>
                  )}
                </div>

                {/* Cards / Net Banking Option */}
                <div
                  onClick={() => setPaymentMethod('Credit/Debit Card')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'Credit/Debit Card'
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/20'
                      : 'bg-white border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-800">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4A0E17]">Credit / Debit Card / Net Banking</p>
                      <p className="text-[11px] text-stone-500">Visa, Mastercard, RuPay, HDFC, SBI, ICICI</p>
                    </div>
                  </div>
                </div>

                {/* Cash on Delivery / Bank RTGS */}
                <div
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'bg-[#FAF6F0] border-[#B45309] ring-2 ring-[#B45309]/20'
                      : 'bg-white border-stone-200 hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4A0E17]">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-stone-500">Pay cash upon courier arrival</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Order Summary Recap */}
              <div className="p-3 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/30 text-xs space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Cart Items ({items.length}):</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>GST Tax (5%):</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-[#4A0E17] text-sm pt-1 border-t border-[#C5A059]/30">
                  <span>Total Payable:</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep('shipping')}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Address</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-lg bg-[#6B1724] hover:bg-[#4A0E17] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E6CA85]" />
                  <span>{isProcessing ? 'Authorizing Payment...' : `Pay ₹${total.toLocaleString()} & Confirm`}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ORDER CONFIRMATION / SUCCESS */}
          {currentStep === 'success' && placedOrder && (
            <div className="text-center p-4 sm:p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#4A0E17]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Thank you for choosing Luxmy Agarbatti Limited. Your sacred incense package is being prepared with Vedic purity.
                </p>
              </div>

              <div className="p-4 bg-[#EFE8DC] rounded-xl border border-[#C5A059]/40 text-xs text-left max-w-md mx-auto space-y-1.5">
                <div className="flex justify-between font-bold text-[#4A0E17] pb-1 border-b border-[#C5A059]/30">
                  <span>Order Reference:</span>
                  <span className="font-mono text-[#6B1724]">{placedOrder.id}</span>
                </div>
                <p><strong>Recipient:</strong> {placedOrder.customer.name} ({placedOrder.customer.phone})</p>
                <p><strong>Delivery City:</strong> {placedOrder.deliveryAddress.city}, {placedOrder.deliveryAddress.state} - {placedOrder.deliveryAddress.pincode}</p>
                <p><strong>Payment Method:</strong> {placedOrder.paymentMethod}</p>
                <p><strong>Total Paid:</strong> ₹{placedOrder.total.toLocaleString()} (Tax Invoice Generated)</p>
                <p><strong>Tracking Number:</strong> <span className="font-mono text-[#4A0E17]">{placedOrder.trackingNumber}</span></p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenDashboard();
                  }}
                  className="px-5 py-2.5 bg-[#4A0E17] text-[#E6CA85] text-xs font-bold rounded-lg shadow hover:bg-[#5B131F] cursor-pointer transition-colors"
                >
                  View in Customer Dashboard →
                </button>

                <a
                  href={`https://wa.me/911234567890?text=Hello%20Luxmy,%20I%20have%20placed%20order%20${placedOrder.id}.%20Please%20confirm%20dispatch.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow flex items-center gap-1.5 hover:bg-[#1ebd5a] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Dispatch Updates</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
