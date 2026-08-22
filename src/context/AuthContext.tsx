import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DeliveryAddress } from '../types';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot 
} from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  allUsers: User[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    password?: string;
    businessName?: string;
    gstNumber?: string;
    businessType?: User['businessType'];
    city?: string;
    state?: string;
    street?: string;
    pincode?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  loginWithDemoUser: (type?: 'retailer' | 'individual') => void;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addAddress: (address: Omit<DeliveryAddress, 'id'>) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  toggleSaveProduct: (productId: string) => Promise<void>;
  isProductSaved: (productId: string) => boolean;
}

const DEMO_USER_RETAILER: User = {
  id: 'usr-lux-8890',
  fullName: 'Pawan Kumar Sharma',
  email: 'pawan.agarbatti@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  businessName: 'Shree Ganesh Pooja Bhandar & Enterprises',
  gstNumber: '24AAACP1234F1Z5',
  businessType: 'Wholesaler / Distributor',
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
  createdAt: '2026-01-15'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'luxmy_user_auth_v1';

// Helper to normalize email
function toEmail(input: string): string {
  const trimmed = input.trim();
  if (trimmed.includes('@')) return trimmed.toLowerCase();
  const digits = trimmed.replace(/\D/g, '');
  return `${digits || 'user'}@luxmy.in`;
}

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
            setUser(profile);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
          }
        } catch (e) {
          console.warn('Could not fetch user profile from Firestore:', e);
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

  const login = async (emailOrPhone: string, password = 'LuxmySecurePassword2026!'): Promise<{ success: boolean; message?: string }> => {
    if (!emailOrPhone.trim()) {
      return { success: false, message: 'Please enter your Mobile number or Email address' };
    }

    const email = toEmail(emailOrPhone);

    try {
      let uid = '';
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        uid = userCredential.user.uid;
      } catch (authErr: any) {
        // If user does not exist in Auth, auto-create to allow quick seamless passwordless/phone login
        if (authErr?.code === 'auth/user-not-found' || authErr?.code === 'auth/invalid-credential') {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          uid = cred.user.uid;
        } else {
          // If password error or already created, still try to proceed with local profile
          console.warn('Firebase login attempt:', authErr.message);
        }
      }

      const existingDoc = uid ? await getDoc(doc(db, 'users', uid)) : null;
      let profile: User;

      if (existingDoc && existingDoc.exists()) {
        profile = existingDoc.data() as User;
      } else {
        profile = {
          id: uid || `usr-lux-${Date.now().toString().slice(-4)}`,
          fullName: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Luxmy Customer',
          email,
          phone: emailOrPhone.startsWith('+91') || /^\d+$/.test(emailOrPhone) ? emailOrPhone : '+91 98765 43210',
          whatsapp: emailOrPhone.startsWith('+91') || /^\d+$/.test(emailOrPhone) ? emailOrPhone : '+91 98765 43210',
          addresses: [
            {
              id: 'addr-default',
              fullName: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Customer',
              phone: '+91 98765 43210',
              street: '12, Heritage Lane, MG Road',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560001',
              isDefault: true,
              type: 'Home'
            }
          ],
          savedProductIds: ['lux-sandalwood-royal'],
          createdAt: new Date().toISOString().split('T')[0]
        };

        if (uid) {
          await setDoc(doc(db, 'users', uid), profile, { merge: true });
        }
      }

      setUser(profile);
      return { success: true };
    } catch (e: any) {
      console.error('Login error:', e);
      return { success: false, message: e.message || 'Login failed. Please try again.' };
    }
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    phone: string;
    whatsapp: string;
    password?: string;
    businessName?: string;
    gstNumber?: string;
    businessType?: User['businessType'];
    city?: string;
    state?: string;
    street?: string;
    pincode?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    if (!userData.fullName || !userData.phone) {
      return { success: false, message: 'Full name and mobile number are required' };
    }

    const email = toEmail(userData.email || userData.phone);
    const password = userData.password || 'LuxmySecurePassword2026!';

    try {
      let uid = '';
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        uid = userCred.user.uid;
      } catch (authErr: any) {
        if (authErr?.code === 'auth/email-already-in-use') {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          uid = cred.user.uid;
        } else {
          console.warn('Firebase signup auth note:', authErr.message);
          uid = `usr-lux-${Date.now().toString().slice(-4)}`;
        }
      }

      const defaultAddress: DeliveryAddress[] = userData.street && userData.city ? [
        {
          id: `addr-${Date.now()}`,
          fullName: userData.fullName,
          phone: userData.phone,
          street: userData.street,
          city: userData.city,
          state: userData.state || 'Maharashtra',
          pincode: userData.pincode || '400001',
          isDefault: true,
          type: userData.businessName ? 'Business / Warehouse' : 'Home'
        }
      ] : [];

      const newUser: User = {
        id: uid,
        fullName: userData.fullName,
        email,
        phone: userData.phone,
        whatsapp: userData.whatsapp || userData.phone,
        businessName: userData.businessName,
        gstNumber: userData.gstNumber,
        businessType: userData.businessType || (userData.businessName ? 'Retailer' : 'Individual / Pooja Store'),
        addresses: defaultAddress,
        savedProductIds: [],
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Store in Cloud Firestore so all admin dashboards across all devices instantly see it
      await setDoc(doc(db, 'users', uid), newUser, { merge: true });

      setUser(newUser);
      return { success: true };
    } catch (e: any) {
      console.error('Signup error:', e);
      return { success: false, message: e.message || 'Signup failed' };
    }
  };

  const loginWithDemoUser = async (type: 'retailer' | 'individual' = 'retailer') => {
    const demoUser = type === 'retailer' ? DEMO_USER_RETAILER : {
      id: 'usr-lux-1022',
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
          type: 'Home' as const
        }
      ],
      savedProductIds: ['lux-sandalwood-royal', 'lux-mogra-vrindavan'],
      createdAt: '2026-02-01'
    };

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
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
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
    const addresses = address.isDefault
      ? user.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
      : [...user.addresses, newAddr];
    
    const updated = { ...user, addresses };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { addresses }, { merge: true });
    } catch (e) {
      console.warn('Address sync error:', e);
    }
  };

  const removeAddress = async (id: string) => {
    if (!user) return;
    const addresses = user.addresses.filter((a) => a.id !== id);
    const updated = { ...user, addresses };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { addresses }, { merge: true });
    } catch (e) {
      console.warn('Address remove error:', e);
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) return;
    const addresses = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    const updated = { ...user, addresses };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { addresses }, { merge: true });
    } catch (e) {
      console.warn('Default address sync error:', e);
    }
  };

  const toggleSaveProduct = async (productId: string) => {
    if (!user) return;
    const exists = user.savedProductIds.includes(productId);
    const savedProductIds = exists
      ? user.savedProductIds.filter((id) => id !== productId)
      : [...user.savedProductIds, productId];
    
    const updated = { ...user, savedProductIds };
    setUser(updated);
    try {
      await setDoc(doc(db, 'users', user.id), { savedProductIds }, { merge: true });
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
