import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DeliveryAddress } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
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
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<DeliveryAddress, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  toggleSaveProduct: (productId: string) => void;
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
    },
    {
      id: 'addr-2',
      fullName: 'Pawan Kumar Sharma',
      phone: '+91 98765 43210',
      street: 'Flat 402, Vrindavan Heights, CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380009',
      isDefault: false,
      type: 'Home'
    }
  ],
  savedProductIds: ['lux-sandalwood-royal', 'lux-devdoot-sambrani-cups'],
  createdAt: '2026-01-15'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'luxmy_user_auth_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

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

  const login = async (emailOrPhone: string): Promise<{ success: boolean; message?: string }> => {
    if (!emailOrPhone.trim()) {
      return { success: false, message: 'Please enter your Mobile number or Email address' };
    }
    // Simulate lookup / verification
    const newUser: User = {
      id: `usr-lux-${Date.now().toString().slice(-4)}`,
      fullName: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Luxmy Customer',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@luxmy.in`,
      phone: emailOrPhone.startsWith('+91') || /^\d+$/.test(emailOrPhone) ? emailOrPhone : '+91 98765 43210',
      whatsapp: emailOrPhone.startsWith('+91') || /^\d+$/.test(emailOrPhone) ? emailOrPhone : '+91 98765 43210',
      addresses: [
        {
          id: 'addr-default',
          fullName: 'Customer Address',
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
    setUser(newUser);
    return { success: true };
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
      id: `usr-lux-${Date.now().toString().slice(-4)}`,
      fullName: userData.fullName,
      email: userData.email || `${userData.phone}@luxmy.in`,
      phone: userData.phone,
      whatsapp: userData.whatsapp || userData.phone,
      businessName: userData.businessName,
      gstNumber: userData.gstNumber,
      businessType: userData.businessType || (userData.businessName ? 'Retailer' : 'Individual / Pooja Store'),
      addresses: defaultAddress,
      savedProductIds: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUser(newUser);
    return { success: true };
  };

  const loginWithDemoUser = (type: 'retailer' | 'individual' = 'retailer') => {
    if (type === 'retailer') {
      setUser(DEMO_USER_RETAILER);
    } else {
      setUser({
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
            type: 'Home'
          }
        ],
        savedProductIds: ['lux-sandalwood-royal', 'lux-mogra-vrindavan'],
        createdAt: '2026-02-01'
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  const addAddress = (address: Omit<DeliveryAddress, 'id'>) => {
    setUser((prev) => {
      if (!prev) return null;
      const newAddr: DeliveryAddress = {
        ...address,
        id: `addr-${Date.now()}`
      };
      const addresses = address.isDefault
        ? prev.addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
        : [...prev.addresses, newAddr];
      return { ...prev, addresses };
    });
  };

  const removeAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.filter((a) => a.id !== id)
      };
    });
  };

  const setDefaultAddress = (id: string) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        addresses: prev.addresses.map((a) => ({
          ...a,
          isDefault: a.id === id
        }))
      };
    });
  };

  const toggleSaveProduct = (productId: string) => {
    setUser((prev) => {
      if (!prev) return null;
      const exists = prev.savedProductIds.includes(productId);
      const savedProductIds = exists
        ? prev.savedProductIds.filter((id) => id !== productId)
        : [...prev.savedProductIds, productId];
      return { ...prev, savedProductIds };
    });
  };

  const isProductSaved = (productId: string) => {
    return Boolean(user?.savedProductIds?.includes(productId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
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
