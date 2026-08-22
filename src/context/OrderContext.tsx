import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, BulkQuoteRequest, ConsultationRequest, DeliveryAddress, CartItem } from '../types';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot 
} from 'firebase/firestore';

interface OrderContextType {
  orders: Order[];
  bulkQuotes: BulkQuoteRequest[];
  consultations: ConsultationRequest[];
  placeOrder: (data: {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    deliveryAddress: DeliveryAddress;
    paymentMethod: Order['paymentMethod'];
    customer: Order['customer'];
    orderType: 'regular' | 'bulk';
  }) => Promise<Order>;
  createOrder?: (data: {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    deliveryAddress: DeliveryAddress;
    paymentMethod: Order['paymentMethod'];
    customer: Order['customer'];
    orderType: 'regular' | 'bulk';
  }) => Promise<Order>;
  requestBulkQuote: (data: Omit<BulkQuoteRequest, 'id' | 'date' | 'status'>) => Promise<BulkQuoteRequest>;
  bookConsultation: (data: Omit<ConsultationRequest, 'id' | 'date' | 'status'>) => Promise<ConsultationRequest>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => Promise<void>;
  updateBulkQuoteStatus: (quoteId: string, status: BulkQuoteRequest['status'], quotedAmount?: number) => Promise<void>;
  updateConsultationStatus: (consultId: string, status: ConsultationRequest['status']) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
}

const SEED_ORDERS: Order[] = [
  {
    id: 'LUX-2026-000123',
    date: '2026-08-14',
    orderType: 'regular',
    items: [
      {
        id: 'lux-sandalwood-royal-Pouch Pack (100g)-regular',
        productId: 'lux-sandalwood-royal',
        name: 'Luxmy Signature Royal Mysore Sandalwood Agarbatti',
        brand: 'Luxmy Signature',
        category: 'Agarbatti',
        fragrance: 'Sandalwood',
        size: 'Pouch Pack (100g)',
        sticksCount: 80,
        price: 180,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
        orderType: 'regular'
      },
      {
        id: 'lux-devdoot-sambrani-cups-Box of 12 Cups + Fiber Plate-regular',
        productId: 'lux-devdoot-sambrani-cups',
        name: 'Devdoot Natural Loban & Sambrani Charcoal-Free Cups',
        brand: 'Luxmy Signature',
        category: 'Sambrani / Dhoop Cups',
        fragrance: 'Sambrani',
        size: 'Box of 12 Cups + Fiber Plate',
        sticksCount: 12,
        price: 240,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80',
        orderType: 'regular'
      }
    ],
    subtotal: 1020,
    tax: 51,
    shipping: 0,
    discount: 102,
    total: 969,
    deliveryAddress: {
      id: 'addr-1',
      fullName: 'Pawan Kumar Sharma',
      phone: '+91 98765 43210',
      street: 'Shop No. 14, Main Market, Temple Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380001',
      isDefault: true,
      type: 'Business / Warehouse'
    },
    paymentMethod: 'UPI',
    paymentId: 'UPI/2026/889102432',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    timeline: [
      { title: 'Order Placed', date: '14 Aug, 10:30 AM', description: 'Order recorded in Luxmy central registry', done: true },
      { title: 'Payment Confirmed', date: '14 Aug, 10:31 AM', description: 'UPI transaction verified successfully', done: true },
      { title: 'Processing & Batch QA', date: '15 Aug, 02:15 PM', description: 'Quality inspection & sealed packing completed', done: true },
      { title: 'Dispatched', date: '16 Aug, 09:45 AM', description: 'Handed over to BlueDart Express Logistics', done: true },
      { title: 'Out for Delivery', date: 'Expected 22 Aug', description: 'Local courier hub transit', done: false }
    ],
    customer: {
      name: 'Pawan Kumar Sharma',
      email: 'pawan.agarbatti@gmail.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      businessName: 'Shree Ganesh Pooja Bhandar & Enterprises'
    },
    trackingNumber: 'BLUEDART-88290123IN',
    courierPartner: 'BlueDart Express'
  }
];

const SEED_BULK_QUOTES: BulkQuoteRequest[] = [
  {
    id: 'BLK-2026-0044',
    date: '2026-08-18',
    productName: 'Luxmy Signature Royal Mysore Sandalwood Agarbatti',
    brand: 'Luxmy Signature',
    category: 'Agarbatti',
    quantityBoxes: 250,
    cartonCount: 5,
    targetDate: '2026-09-10',
    businessName: 'Shree Ganesh Pooja Bhandar & Enterprises',
    gstNumber: '24AAACP1234F1Z5',
    contactName: 'Pawan Kumar Sharma',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'pawan.agarbatti@gmail.com',
    deliveryCity: 'Ahmedabad',
    deliveryState: 'Gujarat',
    additionalNotes: 'Need 250 boxes of 250g twin zipper packaging before Navratri festive season.',
    status: 'Quotation Sent',
    quotedAmount: 58500,
    assignedManager: 'Vikram Singh (Senior B2B Accounts)'
  }
];

const SEED_CONSULTATIONS: ConsultationRequest[] = [
  {
    id: 'CNS-2026-0019',
    date: '2026-08-19',
    fullName: 'Pawan Kumar Sharma',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'pawan.agarbatti@gmail.com',
    city: 'Ahmedabad',
    state: 'Gujarat',
    businessExperience: 'Some retail/distribution',
    interestedMachine: 'Luxmy SpeedMaster-400 Semi-Automatic',
    expectedProduction: '100-200 kg/day',
    investmentRange: '₹5 - 10 Lakh',
    preferredContactMethod: 'In-Person Factory Visit',
    message: 'We want to set up an automated agarbatti manufacturing unit in Sanand GIDC with 3-year raw material buy-back agreement.',
    status: 'Representative Assigned'
  }
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_KEY = 'luxmy_orders_v1';
const BULK_QUOTES_KEY = 'luxmy_bulk_quotes_v1';
const CONSULTATIONS_KEY = 'luxmy_consultations_v1';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      return stored ? JSON.parse(stored) : SEED_ORDERS;
    } catch {
      return SEED_ORDERS;
    }
  });

  const [bulkQuotes, setBulkQuotes] = useState<BulkQuoteRequest[]>(() => {
    try {
      const stored = localStorage.getItem(BULK_QUOTES_KEY);
      return stored ? JSON.parse(stored) : SEED_BULK_QUOTES;
    } catch {
      return SEED_BULK_QUOTES;
    }
  });

  const [consultations, setConsultations] = useState<ConsultationRequest[]>(() => {
    try {
      const stored = localStorage.getItem(CONSULTATIONS_KEY);
      return stored ? JSON.parse(stored) : SEED_CONSULTATIONS;
    } catch {
      return SEED_CONSULTATIONS;
    }
  });

  // Realtime Cloud Firestore listeners for multi-device sync
  useEffect(() => {
    try {
      const ordersCol = collection(db, 'orders');
      const unsubOrders = onSnapshot(ordersCol, (snapshot) => {
        if (!snapshot.empty) {
          const list: Order[] = [];
          snapshot.forEach((d) => list.push(d.data() as Order));
          // Merge unique with SEED
          const combined = [...list];
          SEED_ORDERS.forEach(seed => {
            if (!combined.some(o => o.id === seed.id)) combined.push(seed);
          });
          setOrders(combined);
        }
      }, (err) => console.warn('Firestore orders sync note:', err));

      const quotesCol = collection(db, 'bulk_quotes');
      const unsubQuotes = onSnapshot(quotesCol, (snapshot) => {
        if (!snapshot.empty) {
          const list: BulkQuoteRequest[] = [];
          snapshot.forEach((d) => list.push(d.data() as BulkQuoteRequest));
          const combined = [...list];
          SEED_BULK_QUOTES.forEach(seed => {
            if (!combined.some(q => q.id === seed.id)) combined.push(seed);
          });
          setBulkQuotes(combined);
        }
      }, (err) => console.warn('Firestore quotes sync note:', err));

      const consultCol = collection(db, 'consultations');
      const unsubConsult = onSnapshot(consultCol, (snapshot) => {
        if (!snapshot.empty) {
          const list: ConsultationRequest[] = [];
          snapshot.forEach((d) => list.push(d.data() as ConsultationRequest));
          const combined = [...list];
          SEED_CONSULTATIONS.forEach(seed => {
            if (!combined.some(c => c.id === seed.id)) combined.push(seed);
          });
          setConsultations(combined);
        }
      }, (err) => console.warn('Firestore consult sync note:', err));

      return () => {
        unsubOrders();
        unsubQuotes();
        unsubConsult();
      };
    } catch (e) {
      console.warn('Realtime listeners initialization note:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(BULK_QUOTES_KEY, JSON.stringify(bulkQuotes));
    } catch (e) {
      console.error('Failed to sync quotes', e);
    }
  }, [bulkQuotes]);

  useEffect(() => {
    try {
      localStorage.setItem(CONSULTATIONS_KEY, JSON.stringify(consultations));
    } catch (e) {
      console.error('Failed to sync consultations', e);
    }
  }, [consultations]);

  const placeOrder = async (data: {
    items: CartItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
    deliveryAddress: DeliveryAddress;
    paymentMethod: Order['paymentMethod'];
    customer: Order['customer'];
    orderType: 'regular' | 'bulk';
  }): Promise<Order> => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `LUX-2026-${randomSuffix}`;
    const paymentId = `PAY/LUX/${Date.now().toString().slice(-6)}`;
    const today = new Date().toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      date: today,
      orderType: data.orderType,
      items: data.items,
      subtotal: data.subtotal,
      tax: data.tax,
      shipping: data.shipping,
      discount: data.discount,
      total: data.total,
      deliveryAddress: data.deliveryAddress,
      paymentMethod: data.paymentMethod,
      paymentId,
      paymentStatus: 'Paid',
      orderStatus: 'Order Placed',
      timeline: [
        { title: 'Order Placed', date: 'Just now', description: 'Order recorded in Luxmy database', done: true },
        { title: 'Payment Confirmed', date: 'Just now', description: `${data.paymentMethod} verified with Gateway Reference: ${paymentId}`, done: true },
        { title: 'Processing & Packaging', date: 'Next 24-48 Hours', description: 'Batch assignment & fragrance sealing', done: false },
        { title: 'Dispatched', date: 'Pending', description: 'Logistics pickup & airway bill generation', done: false },
        { title: 'Delivered', date: '3-5 Business Days', description: 'Direct delivery at customer address', done: false }
      ],
      customer: data.customer,
      trackingNumber: `LUX-EXP-${randomSuffix.toString().slice(0, 4)}`,
      courierPartner: 'Luxmy Priority Express'
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Save to Cloud Firestore so it reflects on all devices
    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
    } catch (e) {
      console.warn('Order cloud sync note:', e);
    }

    return newOrder;
  };

  const requestBulkQuote = async (data: Omit<BulkQuoteRequest, 'id' | 'date' | 'status'>): Promise<BulkQuoteRequest> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const quoteId = `BLK-2026-${randomSuffix}`;
    const newQuote: BulkQuoteRequest = {
      ...data,
      id: quoteId,
      date: new Date().toISOString().split('T')[0],
      status: 'Enquiry Submitted',
      assignedManager: 'Senior Wholesale Specialist'
    };
    setBulkQuotes((prev) => [newQuote, ...prev]);

    // Cloud Firestore Sync
    try {
      await setDoc(doc(db, 'bulk_quotes', quoteId), newQuote);
    } catch (e) {
      console.warn('Bulk quote cloud sync note:', e);
    }

    return newQuote;
  };

  const bookConsultation = async (data: Omit<ConsultationRequest, 'id' | 'date' | 'status'>): Promise<ConsultationRequest> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const consultId = `CNS-2026-${randomSuffix}`;
    const newConsult: ConsultationRequest = {
      ...data,
      id: consultId,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setConsultations((prev) => [newConsult, ...prev]);

    // Cloud Firestore Sync
    try {
      await setDoc(doc(db, 'consultations', consultId), newConsult);
    } catch (e) {
      console.warn('Consultation cloud sync note:', e);
    }

    return newConsult;
  };

  const updateOrderStatus = async (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    try {
      await setDoc(doc(db, 'orders', orderId), { orderStatus: status }, { merge: true });
    } catch (e) {
      console.warn('Order status sync error:', e);
    }
  };

  const updateBulkQuoteStatus = async (quoteId: string, status: BulkQuoteRequest['status'], quotedAmount?: number) => {
    setBulkQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? { ...q, status, ...(quotedAmount !== undefined ? { quotedAmount } : {}) }
          : q
      )
    );
    try {
      const payload: any = { status };
      if (quotedAmount !== undefined) payload.quotedAmount = quotedAmount;
      await setDoc(doc(db, 'bulk_quotes', quoteId), payload, { merge: true });
    } catch (e) {
      console.warn('Quote status sync error:', e);
    }
  };

  const updateConsultationStatus = async (consultId: string, status: ConsultationRequest['status']) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === consultId ? { ...c, status } : c))
    );
    try {
      await setDoc(doc(db, 'consultations', consultId), { status }, { merge: true });
    } catch (e) {
      console.warn('Consultation status sync error:', e);
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        bulkQuotes,
        consultations,
        placeOrder,
        createOrder: placeOrder,
        requestBulkQuote,
        bookConsultation,
        updateOrderStatus,
        updateBulkQuoteStatus,
        updateConsultationStatus,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
