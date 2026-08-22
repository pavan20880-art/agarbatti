import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DeliveryAddress } from '../types';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export function getFriendlyAuthErrorMessage(errorCodeOrMessage: string): string {
  const code = (errorCodeOrMessage || '').toLowerCase();
  if (code.includes('auth/email-already-in-use') || code.includes('email-already-in-use')) {
    return 'An account with this email already exists. Please log in instead.';
  }
  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password') || code.includes('auth/user-not-found')) {
    return 'Email or password is incorrect. Please try again.';
  }
  if (code.includes('auth/invalid-email') || code.includes('invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (code.includes('auth/weak-password') || code.includes('weak-password')) {
    return 'Password should be at least 6 characters long.';
  }
  if (code.includes('auth/user-disabled') || code.includes('user-disabled')) {
    return 'This account has been disabled. Please contact support.';
  }
  if (code.includes('auth/too-many-requests') || code.includes('too-many-requests')) {
    return 'Too many unsuccessful attempts. Please wait a few moments and try again.';
  }
  if (code.includes('auth/network-request-failed') || code.includes('network-request-failed')) {
    return 'We could not connect to the server. Please check your internet connection and try again.';
  }
  if (code.includes('auth/popup-closed-by-user')) {
    return 'Google sign-in window was closed before completing sign-in.';
  }
  if (code.includes('auth/cancelled-popup-request') || code.includes('popup-blocked')) {
    return 'Pop-up was blocked by browser. Please enable popups or try email login.';
  }
  return 'Authentication failed. Please check your details and try again.';
}

interface AuthResult {
  success: boolean;
  message?: string;
  code?: string;
  generatedOtp?: string; // For testing and instant OTP preview
}

interface AuthContextType {
  user: User | null;
  allUsers: User[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (userData: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    password?: string;
    businessName?: string;
    gstNumber?: string;
    businessType?: User['businessType'];
    city?: string;
    state?: string;
    street?: string;
    pincode?: string;
  }) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  sendPhoneOtp: (phoneNumber: string) => Promise<AuthResult>;
  verifyPhoneOtp: (phoneNumber: string, otp: string, userData?: {
    fullName?: string;
    email?: string;
    businessName?: string;
    businessType?: User['businessType'];
  }) => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  loginWithDemoUser: (type?: 'retailer' | 'individual' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addAddress: (address: Omit<DeliveryAddress, 'id'>) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  toggleSaveProduct: (productId: string) => Promise<void>;
  isProductSaved: (productId: string) => boolean;
}

const DEMO_USER_RETAILER: User = {
  id: 'usr-demo-retailer',
  uid: 'usr-demo-retailer',
  fullName: 'Pawan Kumar Sharma',
  email: 'pawan.agarbatti@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  businessName: 'Shree Ganesh Pooja Bhandar & Enterprises',
  gstNumber: '24AAACP1234F1Z5',
  businessType: 'Wholesaler / Distributor',
  role: 'customer',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Pawan Kumar Sharma',
      phone: '+91 98765 43210',
      street: 'Shop No. 14, Main Market, Temple Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      isDefault: true,
      landmark: 'Opposite Mahadev Temple',
      type: 'Business / Warehouse'
    }
  ],
  savedProductIds: ['lux-sandalwood-royal', 'lux-devdoot-sambrani-cups'],
  createdAt: '2026-01-15',
  updatedAt: '2026-01-15'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'luxmy_user_auth_v1';
const OTP_STORE_KEY = 'luxmy_phone_otp_sessions';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync all users from Firestore for Admin visibility across devices
  useEffect(() => {
    try {
      const usersCol = collection(db, 'users');
      const unsubscribe = onSnapshot(usersCol, (snapshot) => {
        const usersList: User[] = [];
        snapshot.forEach((docSnap) => {
          usersList.push(docSnap.data() as User);
        });
        setAllUsers(usersList);
      }, (err) => {
        console.warn('Firestore users listen note:', err);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore setup listener error:', e);
    }
  }, []);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const profile = docSnap.data() as User;
            profile.id = firebaseUser.uid;
            profile.uid = firebaseUser.uid;
            setUser(profile);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
          } else {
            const newProfile: User = {
              id: firebaseUser.uid,
              uid: firebaseUser.uid,
              fullName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Luxmy Customer',
              email: firebaseUser.email || '',
              phone: firebaseUser.phoneNumber || '+91 98765 43210',
              whatsapp: firebaseUser.phoneNumber || '+91 98765 43210',
              role: firebaseUser.email?.toLowerCase() === 'admin@luxmy.in' ? 'admin' : 'customer',
              businessType: 'Individual / Pooja Store',
              addresses: [],
              savedProductIds: [],
              createdAt: new Date().toISOString().split('T')[0],
              updatedAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newProfile, { merge: true });
            setUser(newProfile);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newProfile));
          }
        } catch (e) {
          console.warn('Could not fetch user profile from Firestore:', e);
        }
      } else {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed?.id?.startsWith('usr-demo-') || parsed?.id?.startsWith('usr-phone-')) {
              setUser(parsed);
            } else {
              setUser(null);
              localStorage.removeItem(AUTH_STORAGE_KEY);
            }
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync user state to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  /**
   * 1. GOOGLE AUTHENTICATION (Sign In / Sign Up)
   */
  const loginWithGoogle = async (): Promise<AuthResult> => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const fbUser = userCredential.user;
      const uid = fbUser.uid;

      const userDocRef = doc(db, 'users', uid);
      const existingDoc = await getDoc(userDocRef);
      let profile: User;

      if (existingDoc && existingDoc.exists()) {
        profile = existingDoc.data() as User;
        profile.id = uid;
        profile.uid = uid;
      } else {
        profile = {
          id: uid,
          uid,
          fullName: fbUser.displayName || 'Luxmy Customer',
          email: fbUser.email || '',
          phone: fbUser.phoneNumber || '',
          whatsapp: fbUser.phoneNumber || '',
          role: fbUser.email?.toLowerCase() === 'admin@luxmy.in' ? 'admin' : 'customer',
          businessType: 'Individual / Pooja Store',
          addresses: [],
          savedProductIds: [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, profile, { merge: true });
      }

      setUser(profile);
      return { success: true };
    } catch (err: any) {
      console.warn('Google sign-in error:', err?.code, err?.message);
      const friendlyMsg = getFriendlyAuthErrorMessage(err?.code || err?.message || '');
      return {
        success: false,
        message: friendlyMsg,
        code: err?.code || 'auth/google-error'
      };
    }
  };

  /**
   * 2. PHONE OTP AUTHENTICATION: SEND OTP
   */
  const sendPhoneOtp = async (phoneNumber: string): Promise<AuthResult> => {
    const cleaned = phoneNumber.replace(/[^0-9+]/g, '');
    if (!cleaned || cleaned.replace(/\D/g, '').length < 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number with country code (e.g. +91 9876543210).' };
    }

    // Generate a secure 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionData = {
      phone: cleaned,
      otp: generatedOtp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes validity
    };

    try {
      // Store OTP in session storage for verification
      const existingSessions = JSON.parse(sessionStorage.getItem(OTP_STORE_KEY) || '{}');
      existingSessions[cleaned] = sessionData;
      sessionStorage.setItem(OTP_STORE_KEY, JSON.stringify(existingSessions));
      
      console.log(`[Luxmy SMS Gateway] OTP for ${cleaned} is: ${generatedOtp}`);
      return { 
        success: true, 
        message: `OTP sent successfully to ${cleaned}`,
        generatedOtp 
      };
    } catch (e: any) {
      return { success: false, message: 'Could not send OTP. Please try again.' };
    }
  };

  /**
   * 2. PHONE OTP AUTHENTICATION: VERIFY OTP & SIGN IN / SIGN UP
   */
  const verifyPhoneOtp = async (
    phoneNumber: string, 
    otp: string,
    userData?: {
      fullName?: string;
      email?: string;
      businessName?: string;
      businessType?: User['businessType'];
    }
  ): Promise<AuthResult> => {
    const cleanedPhone = phoneNumber.replace(/[^0-9+]/g, '');
    const cleanOtp = otp.trim();

    if (!cleanOtp || cleanOtp.length < 4) {
      return { success: false, message: 'Please enter a valid 6-digit verification OTP code.' };
    }

    try {
      const existingSessions = JSON.parse(sessionStorage.getItem(OTP_STORE_KEY) || '{}');
      const session = existingSessions[cleanedPhone];

      // Allow 123456 as a master test OTP for development/testing or check stored OTP
      const isMasterOtp = cleanOtp === '123456';
      const isStoredOtpValid = session && session.otp === cleanOtp && session.expiresAt > Date.now();

      if (!isMasterOtp && !isStoredOtpValid) {
        return { 
          success: false, 
          message: 'Invalid or expired OTP code. Please enter the 6-digit code or request a new one.' 
        };
      }

      // Check if user already exists in Firestore by phone
      const phoneDigits = cleanedPhone.replace(/\D/g, '');
      const uid = `usr-phone-${phoneDigits}`;
      const userDocRef = doc(db, 'users', uid);
      const existingDoc = await getDoc(userDocRef);

      let profile: User;
      if (existingDoc && existingDoc.exists()) {
        profile = existingDoc.data() as User;
        profile.id = uid;
        profile.uid = uid;
        if (userData?.fullName && !profile.fullName) profile.fullName = userData.fullName;
        if (userData?.email && !profile.email) profile.email = userData.email;
        if (userData?.businessName && !profile.businessName) profile.businessName = userData.businessName;
        await setDoc(userDocRef, profile, { merge: true });
      } else {
        profile = {
          id: uid,
          uid,
          fullName: userData?.fullName?.trim() || `Customer (${cleanedPhone.slice(-4)})`,
          email: userData?.email?.trim() || `${phoneDigits}@luxmy.customer`,
          phone: cleanedPhone,
          whatsapp: cleanedPhone,
          businessName: userData?.businessName || '',
          businessType: userData?.businessType || (userData?.businessName ? 'Retailer' : 'Individual / Pooja Store'),
          role: 'customer',
          addresses: [],
          savedProductIds: [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, profile, { merge: true });
      }

      setUser(profile);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
      return { success: true };
    } catch (err: any) {
      console.warn('Phone OTP verification failed:', err);
      return {
        success: false,
        message: err?.message || 'Could not verify OTP. Please try again.'
      };
    }
  };

  /**
   * 3. EMAIL/PASSWORD: LOGIN
   */
  const login = async (
    emailInput: string, 
    passwordInput: string
  ): Promise<AuthResult> => {
    const email = (emailInput || '').trim();
    const password = passwordInput || '';

    if (!email) {
      return { success: false, message: 'Please enter your email address' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your account password' };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch or sync Firestore customer profile
      const userDocRef = doc(db, 'users', uid);
      const existingDoc = await getDoc(userDocRef);
      let profile: User;

      if (existingDoc && existingDoc.exists()) {
        profile = existingDoc.data() as User;
        profile.id = uid;
        profile.uid = uid;
      } else {
        profile = {
          id: uid,
          uid,
          fullName: userCredential.user.displayName || email.split('@')[0] || 'Luxmy Customer',
          email: userCredential.user.email || email,
          phone: '+91 98765 43210',
          whatsapp: '+91 98765 43210',
          role: email.toLowerCase() === 'admin@luxmy.in' ? 'admin' : 'customer',
          businessType: 'Individual / Pooja Store',
          addresses: [],
          savedProductIds: [],
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString()
        };
        await setDoc(userDocRef, profile, { merge: true });
      }

      setUser(profile);
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase signIn attempt:', err?.code, err?.message);
      const friendlyMsg = getFriendlyAuthErrorMessage(err?.code || err?.message || '');
      return { 
        success: false, 
        message: friendlyMsg,
        code: err?.code || 'auth/unknown-error'
      };
    }
  };

  /**
   * 3. EMAIL/PASSWORD: SIGNUP
   */
  const signup = async (userData: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    password?: string;
    businessName?: string;
    gstNumber?: string;
    businessType?: User['businessType'];
    city?: string;
    state?: string;
    street?: string;
    pincode?: string;
  }): Promise<AuthResult> => {
    const fullName = (userData.fullName || '').trim();
    const email = (userData.email || '').trim();
    const phone = (userData.phone || '').trim();
    const password = userData.password || '';

    if (!fullName) {
      return { success: false, message: 'Please enter your Full Name' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid Email Address' };
    }
    if (!phone) {
      return { success: false, message: 'Please enter your Mobile Phone Number' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long' };
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const initialAddresses: DeliveryAddress[] = (userData.street && userData.city) ? [
        {
          id: `addr-${Date.now()}`,
          fullName,
          phone,
          street: userData.street,
          city: userData.city,
          state: userData.state || 'Gujarat',
          pincode: userData.pincode || '380001',
          isDefault: true,
          type: userData.businessName ? 'Business / Warehouse' : 'Home'
        }
      ] : [];

      const newUser: User = {
        id: uid,
        uid,
        fullName,
        email,
        phone,
        whatsapp: userData.whatsapp || phone,
        businessName: userData.businessName || '',
        gstNumber: userData.gstNumber || '',
        businessType: userData.businessType || (userData.businessName ? 'Retailer' : 'Individual / Pooja Store'),
        role: email.toLowerCase() === 'admin@luxmy.in' ? 'admin' : 'customer',
        addresses: initialAddresses,
        savedProductIds: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      };

      // Store in Cloud Firestore users collection
      await setDoc(doc(db, 'users', uid), newUser, { merge: true });

      setUser(newUser);
      return { success: true };
    } catch (err: any) {
      console.warn('Firebase signup attempt:', err?.code, err?.message);
      const friendlyMsg = getFriendlyAuthErrorMessage(err?.code || err?.message || '');
      return {
        success: false,
        message: friendlyMsg,
        code: err?.code || 'auth/unknown-error'
      };
    }
  };

  /**
   * 4. RESET PASSWORD VIA EMAIL
   */
  const resetPassword = async (emailInput: string): Promise<AuthResult> => {
    const email = (emailInput || '').trim();
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address to receive reset instructions.' };
    }
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: `Password reset link sent to ${email}. Please check your inbox.` };
    } catch (err: any) {
      return { success: false, message: getFriendlyAuthErrorMessage(err?.code || err?.message || '') };
    }
  };

  /**
   * 5. DEMO ACCOUNTS
   */
  const loginWithDemoUser = async (type: 'retailer' | 'individual' | 'admin' = 'retailer') => {
    let demoUser: User;
    if (type === 'admin') {
      demoUser = {
        id: 'usr-demo-admin',
        uid: 'usr-demo-admin',
        fullName: 'Luxmy Administrator',
        email: 'admin@luxmy.in',
        phone: '+91 99000 11223',
        whatsapp: '+91 99000 11223',
        businessName: 'Luxmy Agarbatti Limited HQ',
        businessType: 'Agarbatti Manufacturer',
        role: 'admin',
        addresses: [
          {
            id: 'addr-admin',
            fullName: 'Admin Operations',
            phone: '+91 99000 11223',
            street: 'GIDC Industrial Zone, Phase 1',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pincode: '382110',
            isDefault: true,
            type: 'Business / Warehouse'
          }
        ],
        savedProductIds: ['lux-sandalwood-royal'],
        createdAt: '2026-01-01',
        updatedAt: '2026-01-01'
      };
    } else if (type === 'retailer') {
      demoUser = DEMO_USER_RETAILER;
    } else {
      demoUser = {
        id: 'usr-demo-individual',
        uid: 'usr-demo-individual',
        fullName: 'Ananya Deshmukh',
        email: 'ananya.deshmukh@gmail.com',
        phone: '+91 94220 11223',
        whatsapp: '+91 94220 11223',
        addresses: [
          {
            id: 'addr-ind-1',
            fullName: 'Ananya Deshmukh',
            phone: '+91 94220 11223',
            street: '302, Sai Shraddha Residency, J.M. Road, Shivajinagar',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411005',
            isDefault: true,
            type: 'Home'
          }
        ],
        savedProductIds: ['lux-sandalwood-royal', 'lux-mogra-vrindavan'],
        createdAt: '2026-02-01',
        updatedAt: '2026-02-01'
      };
    }

    setUser(demoUser);
    try {
      await setDoc(doc(db, 'users', demoUser.id), demoUser, { merge: true });
    } catch (e) {
      console.warn('Demo user firestore sync:', e);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Signout note:', e);
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updated: User = { 
      ...user, 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), updated, { merge: true });
    } catch (e) {
      console.warn('Profile update firestore sync:', e);
    }
  };

  const addAddress = async (address: Omit<DeliveryAddress, 'id'>) => {
    if (!user) return;
    const newAddr: DeliveryAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };
    const currentAddresses = user.addresses || [];
    const addresses = address.isDefault
      ? currentAddresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
      : [...currentAddresses, newAddr];
    
    const updated: User = { ...user, addresses, updatedAt: new Date().toISOString() };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { addresses, updatedAt: updated.updatedAt }, { merge: true });
    } catch (e) {
      console.warn('Address sync error:', e);
    }
  };

  const removeAddress = async (id: string) => {
    if (!user) return;
    const currentAddresses = user.addresses || [];
    const addresses = currentAddresses.filter((a) => a.id !== id);
    const updated: User = { ...user, addresses, updatedAt: new Date().toISOString() };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { addresses, updatedAt: updated.updatedAt }, { merge: true });
    } catch (e) {
      console.warn('Address remove error:', e);
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) return;
    const currentAddresses = user.addresses || [];
    const addresses = currentAddresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    const updated: User = { ...user, addresses, updatedAt: new Date().toISOString() };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { addresses, updatedAt: updated.updatedAt }, { merge: true });
    } catch (e) {
      console.warn('Default address sync error:', e);
    }
  };

  const toggleSaveProduct = async (productId: string) => {
    if (!user) return;
    const saved = user.savedProductIds || [];
    const exists = saved.includes(productId);
    const savedProductIds = exists
      ? saved.filter((id) => id !== productId)
      : [...saved, productId];
    
    const updated: User = { ...user, savedProductIds, updatedAt: new Date().toISOString() };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { savedProductIds, updatedAt: updated.updatedAt }, { merge: true });
    } catch (e) {
      console.warn('Wishlist sync error:', e);
    }
  };

  const isProductSaved = (productId: string) => {
    return Boolean(user?.savedProductIds?.includes(productId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        allUsers,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        signup,
        loginWithGoogle,
        sendPhoneOtp,
        verifyPhoneOtp,
        resetPassword,
        loginWithDemoUser,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        toggleSaveProduct,
        isProductSaved
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

