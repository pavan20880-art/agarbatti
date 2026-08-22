export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  brand: string;
  category: 'Agarbatti' | 'Dhoop Batti' | 'Dhoop Cones' | 'Sambrani / Dhoop Cups' | 'Karpur / Camphor' | 'Pooja Products' | 'Other Incense Products';
  fragrance: 'Sandalwood' | 'Rose' | 'Jasmine' | 'Mogra' | 'Oudh' | 'Musk' | 'Lavender' | 'Sambrani' | 'Kewra' | 'Champa' | 'Floral' | 'Natural Herbal';
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  bulkPrice: number;
  bulkMinQty: number; // e.g. 50 boxes
  sizeOptions: { size: string; sticksCount: number; price: number; bulkPrice: number }[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  fragranceNotes: {
    top: string;
    heart: string;
    base: string;
  };
  burningTime: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isOrganic?: boolean;
  packaging: string;
}

export interface Machine {
  id: string;
  name: string;
  modelNumber: string;
  manufacturer: string;
  category: 'Semi-Automatic Machines' | 'Fully Automatic Machines' | 'Dhoop Cone Machines' | 'Camphor Tablet Punching' | 'Drying & Packing';
  type: string;
  capacityKgPerHour: string;
  speedSticksPerMin: string;
  powerHP: string;
  dimensions: string;
  requiredManpower: string;
  operatingVoltage: string;
  warranty: string;
  priceRange: string;
  approxInvestment: string;
  images: string[];
  description: string;
  keyFeatures: string[];
  specifications: Record<string, string>;
  suitableFor: string;
  installationSupport: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  established: string;
  location: string;
  productCategories: string[];
  featuredProductsCount: number;
  isOfficialPartner: boolean;
}

export interface MachineManufacturer {
  id: string;
  name: string;
  location: string;
  established: string;
  specialties: string[];
  description: string;
  machinesSupplied: number;
  isoCertified: boolean;
  logo: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  category: string;
  fragrance: string;
  size: string;
  sticksCount: number;
  price: number;
  quantity: number;
  image: string;
  orderType: 'regular' | 'bulk';
  cartonCount?: number;
}

export interface DeliveryAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
  landmark?: string;
  type?: 'Home' | 'Business / Warehouse';
}

export interface Order {
  id: string;
  date: string;
  orderType: 'regular' | 'bulk';
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  deliveryAddress: DeliveryAddress;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Wallets' | 'Cash on Delivery';
  paymentId: string;
  paymentStatus: 'Paid' | 'Processing' | 'Pending' | 'Failed';
  orderStatus: 'Order Placed' | 'Payment Confirmed' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  timeline: { title: string; date: string; description: string; done: boolean }[];
  customer: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    businessName?: string;
    gstNumber?: string;
  };
  trackingNumber?: string;
  courierPartner?: string;
}

export interface BulkQuoteRequest {
  id: string;
  date: string;
  productName: string;
  brand: string;
  category: string;
  quantityBoxes: number;
  cartonCount: number;
  targetDate: string;
  businessName: string;
  gstNumber?: string;
  contactName: string;
  phone: string;
  whatsapp: string;
  email: string;
  deliveryCity: string;
  deliveryState: string;
  additionalNotes: string;
  status: 'Enquiry Submitted' | 'Under Review' | 'Quotation Sent' | 'Awaiting Confirmation' | 'Payment Pending' | 'Confirmed' | 'Dispatched' | 'Completed';
  quotedAmount?: number;
  assignedManager?: string;
}

export interface ConsultationRequest {
  id: string;
  date: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  businessExperience: 'None (First time)' | 'Some retail/distribution' | 'Existing agarbatti manufacturer' | 'Other industrial manufacturing';
  interestedMachine: string;
  expectedProduction: '30-50 kg/day' | '100-200 kg/day' | '500+ kg/day' | 'Commercial (1+ Ton/day)' | 'Not sure';
  investmentRange: 'Under ₹5 Lakh' | '₹5 - 10 Lakh' | '₹10 - 25 Lakh' | '₹25 Lakh+' | 'Exploring feasibility';
  preferredContactMethod: 'WhatsApp' | 'Phone Call' | 'In-Person Factory Visit' | 'Google Meet / Video Call';
  message: string;
  status: 'New' | 'Representative Assigned' | 'Call Scheduled' | 'Consultation Completed';
}

export interface User {
  id: string;
  uid?: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  businessName?: string;
  gstNumber?: string;
  businessType?: 'Individual / Pooja Store' | 'Retailer' | 'Wholesaler / Distributor' | 'Agarbatti Manufacturer' | 'Institution / Temple Trust';
  role?: 'customer' | 'admin';
  addresses: DeliveryAddress[];
  savedProductIds: string[];
  createdAt: string;
  updatedAt?: string;
}
