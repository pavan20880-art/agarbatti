import { Product, Machine, BrandPartner, MachineManufacturer } from '../types';
import prodImg1 from '../assets/images/regenerated_image_1787364347692.png';
import prodImg2 from '../assets/images/regenerated_image_1787364353075.png';
import prodImg3 from '../assets/images/regenerated_image_1787364357879.png';
import prodImg4 from '../assets/images/regenerated_image_1787364718460.png';
import prodImg5 from '../assets/images/regenerated_image_1787364363002.png';
import prodImg6 from '../assets/images/regenerated_image_1787364732285.png';
import prodImg7 from '../assets/images/regenerated_image_1787364371713.png';
import prodImg8 from '../assets/images/regenerated_image_1787364367915.png';
import prodImg9 from '../assets/images/regenerated_image_1787364375623.png';
import prodImg10 from '../assets/images/regenerated_image_1787364379976.png';
import prodImg11 from '../assets/images/regenerated_image_1787364383939.png';

export const PRODUCTS: Product[] = [
  {
    id: 'lux-sandalwood-royal',
    name: 'Luxmy Signature Royal Mysore Sandalwood Agarbatti',
    hindiName: 'लक्स्मी रॉयल मैसूर चंदन अगरबत्ती',
    brand: 'Luxmy Signature',
    category: 'Agarbatti',
    fragrance: 'Sandalwood',
    tagline: 'Pure Karnataka Mysore Sandal extract with 60-minute divine slow burning.',
    description: 'Distilled with high-grade natural Mysore Sandalwood paste, sacred herbs, and organic resins. Handcrafted with traditional charcoal-free organic bark binder to purify pooja spaces, meditation chambers, and living rooms with an authentic, calming woody aura.',
    price: 180,
    originalPrice: 220,
    bulkPrice: 110,
    bulkMinQty: 40,
    inStock: true,
    rating: 4.9,
    reviewsCount: 312,
    images: [
      prodImg1,
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Pouch Pack (100g)', sticksCount: 80, price: 180, bulkPrice: 110 },
      { size: 'Twin Zipper Box (250g)', sticksCount: 200, price: 399, bulkPrice: 250 },
      { size: 'Heritage Master Carton (1 kg)', sticksCount: 850, price: 1299, bulkPrice: 820 }
    ],
    fragranceNotes: {
      top: 'Fresh Mysore Green Wood & Cardamom',
      heart: 'Deep Sandalwood Essential Oil & Vetiver',
      base: 'Warm Amber, Benzoin, and Aged Cedar'
    },
    burningTime: '60 minutes',
    isBestseller: true,
    isOrganic: true,
    packaging: 'Eco-friendly gold foil sealed moisture-proof box'
  },
  {
    id: 'lux-mogra-vrindavan',
    name: 'Luxmy Vrindavan Mogra & Jasmine Flora Sticks',
    hindiName: 'लक्स्मी वृंदावन मोगरा फ्लोरा',
    brand: 'Luxmy Signature',
    category: 'Agarbatti',
    fragrance: 'Mogra',
    tagline: 'Fresh early morning white blossom fragrance inspired by sacred Braj Vrindavan.',
    description: 'Enriched with authentic fresh night-blooming Arabian Jasmine (Mogra) floral attar. Designed to uplift senses during morning aarti and festive gatherings with prolonged fragrance retention.',
    price: 150,
    originalPrice: 190,
    bulkPrice: 95,
    bulkMinQty: 50,
    inStock: true,
    rating: 4.8,
    reviewsCount: 240,
    images: [
      prodImg2,
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Standard Pack (120g)', sticksCount: 90, price: 150, bulkPrice: 95 },
      { size: 'Jumbo Festive Pack (300g)', sticksCount: 240, price: 340, bulkPrice: 215 },
      { size: 'Carton (1.2 kg)', sticksCount: 1000, price: 1190, bulkPrice: 750 }
    ],
    fragranceNotes: {
      top: 'White Petals & Dewy Morning Mist',
      heart: 'Rich Sambac Jasmine & Indian Mogra',
      base: 'Soft White Musk & Sandalwood Powder'
    },
    burningTime: '55 minutes',
    isBestseller: true,
    packaging: 'Gold embossed traditional pack'
  },
  {
    id: 'lux-devdoot-sambrani-cups',
    name: 'Devdoot Natural Loban & Sambrani Charcoal-Free Cups',
    hindiName: 'देवदूत प्राकृतिक लोबान व गुग्गुल सांबरानी कप',
    brand: 'Luxmy Signature',
    category: 'Sambrani / Dhoop Cups',
    fragrance: 'Sambrani',
    tagline: '100% Charcoal-free cow dung & guggal base with pure resin granules.',
    description: 'Authentic Indian temple sambrani experience without synthetic soot. Infused with pure benzoin resin (Sambrani), natural Guggal, and camphor granules on a purified havan base. Cleanses negative energies and fills spaces with ancient temple atmosphere.',
    price: 240,
    originalPrice: 290,
    bulkPrice: 155,
    bulkMinQty: 30,
    inStock: true,
    rating: 4.95,
    reviewsCount: 420,
    images: [
      prodImg3,
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Box of 12 Cups + Fiber Plate', sticksCount: 12, price: 240, bulkPrice: 155 },
      { size: 'Box of 24 Cups + 2 Fiber Plates', sticksCount: 24, price: 440, bulkPrice: 285 },
      { size: 'Master Pack (120 Cups)', sticksCount: 120, price: 1899, bulkPrice: 1250 }
    ],
    fragranceNotes: {
      top: 'Crisp Herbal Frankincense',
      heart: 'Deep Gum Benzoin & Vedic Guggal',
      base: 'Cow Ghee, Camphor & Sandal Dust'
    },
    burningTime: '40 minutes dense smoke',
    isBestseller: true,
    isOrganic: true,
    packaging: 'Rigid protective tray box with heat-resistant fiber burner'
  },
  {
    id: 'lux-karpur-bhimseni',
    name: 'Luxmy Pure Bhimseni Desi Camphor (Karpur) Flakes',
    hindiName: 'लक्स्मी शुद्ध भीमसेनी देशी कपूर',
    brand: 'Luxmy Signature',
    category: 'Karpur / Camphor',
    fragrance: 'Natural Herbal',
    tagline: '100% Organic edible-grade medicinal camphor with zero toxic residue.',
    description: 'Directly sourced crystalline Bhimseni Karpur in raw natural chunks. Leaves 0% black ash when ignited, releasing soothing therapeutic vapors that repel insects and purify air in homes and temples.',
    price: 290,
    originalPrice: 350,
    bulkPrice: 190,
    bulkMinQty: 25,
    inStock: true,
    rating: 5.0,
    reviewsCount: 180,
    images: [
      prodImg4,
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Air-tight Jar (100g)', sticksCount: 1, price: 290, bulkPrice: 190 },
      { size: 'Air-tight Jar (250g)', sticksCount: 1, price: 620, bulkPrice: 420 },
      { size: 'Bulk Wholesale Bag (1 kg)', sticksCount: 1, price: 2100, bulkPrice: 1490 }
    ],
    fragranceNotes: {
      top: 'Cooling Pure Pine Resin',
      heart: 'Natural Camphoraceous Zing',
      base: 'Fresh Herbal Clarifying Note'
    },
    burningTime: 'Leaves no ash',
    isOrganic: true,
    packaging: 'Hermetically sealed transparent glass-style PET jar'
  },
  {
    id: 'lux-gulab-shahi',
    name: 'Luxmy Shahi Gulab (Kannauj Rose) Agarbatti',
    hindiName: 'लक्स्मी शाही गुलाब अगरबत्ती',
    brand: 'Luxmy Signature',
    category: 'Agarbatti',
    fragrance: 'Rose',
    tagline: 'Crafted with authentic Kannauj Damask Rose hydrosol and petals.',
    description: 'A tribute to the centuries-old attar capital Kannauj. Prepared with genuine rose water and sun-dried Damask rose petal extracts, imparting a tranquil, romantic, and devotional sweetness.',
    price: 160,
    originalPrice: 195,
    bulkPrice: 105,
    bulkMinQty: 50,
    inStock: true,
    rating: 4.7,
    reviewsCount: 155,
    images: [
      prodImg5,
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Standard Pack (100g)', sticksCount: 75, price: 160, bulkPrice: 105 },
      { size: 'Zipper Pack (250g)', sticksCount: 190, price: 360, bulkPrice: 230 },
      { size: 'Carton (1 kg)', sticksCount: 780, price: 1250, bulkPrice: 790 }
    ],
    fragranceNotes: {
      top: 'Fresh Crushed Pink Rose Petals',
      heart: 'Deep Kannauj Rose Attar & Geranium',
      base: 'Warm Amber & Indian Sandalwood'
    },
    burningTime: '50 minutes',
    packaging: 'Royal maroon & gold decorative packaging'
  },
  {
    id: 'lux-royal-oudh-arabian',
    name: 'Luxmy Royal Assam Oudh & Amber Heritage Sticks',
    hindiName: 'लक्स्मी रॉयल असम ऊद अगरबत्ती',
    brand: 'Luxmy Signature',
    category: 'Agarbatti',
    fragrance: 'Oudh',
    tagline: 'Rare wild Assam agarwood resin formulated for discerning luxury connoisseurs.',
    description: 'An opulent union of aged Assam agarwood resin (Oudh), golden amber, and subtle oriental spices. Creates a deeply grounding, velvety smoky scent reminiscent of royal durbar ceremonies.',
    price: 320,
    originalPrice: 399,
    bulkPrice: 210,
    bulkMinQty: 30,
    inStock: true,
    rating: 4.95,
    reviewsCount: 98,
    images: [
      prodImg6,
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Luxury Gift Box (100g)', sticksCount: 65, price: 320, bulkPrice: 210 },
      { size: 'Collector Wooden Box (250g)', sticksCount: 160, price: 749, bulkPrice: 480 },
      { size: 'Master Pack (1 kg)', sticksCount: 650, price: 2600, bulkPrice: 1750 }
    ],
    fragranceNotes: {
      top: 'Smoky Agarwood Bark & Saffron',
      heart: 'Dark Resin, Cardamom & Clove',
      base: 'Aged Amber, Labdanum & Musk'
    },
    burningTime: '65 minutes',
    isNew: true,
    packaging: 'Rigid magnetic luxury presentation box'
  },
  {
    id: 'lux-dhoop-batti-kesar-chandan',
    name: 'Luxmy Kesar Chandan Wet Dhoop Batti (Sticky)',
    hindiName: 'लक्स्मी केसर चंदन गीली धूप बत्ती',
    brand: 'Luxmy Signature',
    category: 'Dhoop Batti',
    fragrance: 'Sandalwood',
    tagline: 'Traditional soft moldable dhoop prepared with Kashmiri Saffron & pure cow ghee.',
    description: 'Malleable, charcoal-free wet dhoop sticks made with natural essential oils, herbal roots, and pure saffron filaments. Easy to pinch and shape into pyramids or sticks for slow, long-lasting fragrance emission.',
    price: 130,
    originalPrice: 160,
    bulkPrice: 80,
    bulkMinQty: 60,
    inStock: true,
    rating: 4.8,
    reviewsCount: 164,
    images: [
      prodImg7,
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Pack of 12 Wet Sticks (150g)', sticksCount: 12, price: 130, bulkPrice: 80 },
      { size: 'Family Pack of 30 Sticks (400g)', sticksCount: 30, price: 299, bulkPrice: 185 }
    ],
    fragranceNotes: {
      top: 'Kashmiri Kesar & Sweet Honey',
      heart: 'Mysore Sandalwood & Nutmeg',
      base: 'Natural Gum & Guggal'
    },
    burningTime: '45 minutes',
    packaging: 'Foil-lined sealed plastic protective container'
  },
  {
    id: 'partner-haridarshan-gold',
    name: 'Hari Darshan Special Gold 24k Agarbatti',
    hindiName: 'हरि दर्शन स्पेशल गोल्ड अगरबत्ती',
    brand: 'Haridarshan',
    category: 'Agarbatti',
    fragrance: 'Floral',
    tagline: 'Iconic all-time devotional blend trusted in millions of Indian households.',
    description: 'Distributed under official Luxmy partner channel. Features Hari Darshan proprietary multi-flower bouquet blend for daily prayers, vastu purification, and morning meditation.',
    price: 120,
    originalPrice: 140,
    bulkPrice: 75,
    bulkMinQty: 60,
    inStock: true,
    rating: 4.6,
    reviewsCount: 510,
    images: [
      prodImg8,
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Zipper Pack (150g)', sticksCount: 110, price: 120, bulkPrice: 75 },
      { size: 'Carton (1 kg)', sticksCount: 800, price: 799, bulkPrice: 490 }
    ],
    fragranceNotes: {
      top: 'Marigold & Lotus Nectar',
      heart: 'Jasmine & Rose Blend',
      base: 'Sandalwood Base'
    },
    burningTime: '45 minutes',
    packaging: 'Standard printed foil box'
  },
  {
    id: 'partner-ullas-supreme',
    name: 'Ullas Supreme Sandalwood & Flora Incense',
    hindiName: 'उल्लास सुप्रीम चंदन अगरबत्ती',
    brand: 'Ullas Agarbatti',
    category: 'Agarbatti',
    fragrance: 'Sandalwood',
    tagline: 'Classic South Indian temple fragrance formulation with bamboo-less natural core.',
    description: 'Sourced from Ullas Agarbatti production hubs and distributed through Luxmy regional hubs. Renowned for consistent fragrance throw and minimal residual smoke.',
    price: 140,
    originalPrice: 170,
    bulkPrice: 88,
    bulkMinQty: 50,
    inStock: true,
    rating: 4.75,
    reviewsCount: 380,
    images: [
      prodImg9,
      'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Medium Box (120g)', sticksCount: 85, price: 140, bulkPrice: 88 },
      { size: 'Value Pack (300g)', sticksCount: 220, price: 310, bulkPrice: 195 }
    ],
    fragranceNotes: {
      top: 'Sandalwood Citrus Shavings',
      heart: 'Natural Temple Guggul',
      base: 'Herbal Wood Resins'
    },
    burningTime: '50 minutes',
    packaging: 'Gold seal moisture-resistant pack'
  },
  {
    id: 'lux-dhoop-cones-lavender',
    name: 'Luxmy Himalayan Lavender & Herb Dhoop Cones',
    hindiName: 'लक्स्मी हिमालयन लैवेंडर धूप कोन्स',
    brand: 'Luxmy Signature',
    category: 'Dhoop Cones',
    fragrance: 'Lavender',
    tagline: 'Calming French & Kashmiri lavender essence in neat self-standing cones.',
    description: 'Formulated with organic Himalayan lavender oil and dried herbs. Ideal for evening relaxation, yoga sessions, stress relief, and purifying living spaces.',
    price: 160,
    originalPrice: 195,
    bulkPrice: 98,
    bulkMinQty: 40,
    inStock: true,
    rating: 4.85,
    reviewsCount: 132,
    images: [
      prodImg10,
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Tin of 30 Cones + Brass Stand', sticksCount: 30, price: 160, bulkPrice: 98 },
      { size: 'Pack of 100 Cones', sticksCount: 100, price: 420, bulkPrice: 260 }
    ],
    fragranceNotes: {
      top: 'Fresh Wild Lavender Blossom',
      heart: 'Chamomile & Bergamot',
      base: 'Clean White Musk & Cedar'
    },
    burningTime: '35 minutes',
    packaging: 'Vintage metal tin with ceramic holding disc'
  },
  {
    id: 'lux-havan-samagri-vedic',
    name: 'Luxmy Maha-Vedic Havan & Yagya Samagri (51 Herbs)',
    hindiName: 'लक्स्मी महा-वैदिक हवन सामग्री (५१ जड़ी-बूटियाँ)',
    brand: 'Luxmy Signature',
    category: 'Pooja Products',
    fragrance: 'Natural Herbal',
    tagline: 'Authentic 51 rare Vedic herbs, Guggal, Jatamansi, and dry fruits.',
    description: 'Hand-blended according to classical Vedic scriptures. Contains 51 rare medicinal herbs including Nagarmotha, Sugandhbala, Agar-Tagar, Kapoor Kachri, dry fruits, and pure Guggal for auspicious pujas and vastu yagyas.',
    price: 210,
    originalPrice: 260,
    bulkPrice: 135,
    bulkMinQty: 30,
    inStock: true,
    rating: 4.9,
    reviewsCount: 205,
    images: [
      prodImg11,
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80'
    ],
    sizeOptions: [
      { size: 'Pouch (500g)', sticksCount: 1, price: 210, bulkPrice: 135 },
      { size: 'Large Box (1 kg)', sticksCount: 1, price: 390, bulkPrice: 250 },
      { size: 'Bulk Sack (5 kg)', sticksCount: 1, price: 1750, bulkPrice: 1150 }
    ],
    fragranceNotes: {
      top: 'Guggal, Camphor & Dried Rose',
      heart: 'Jatamansi, Tagar & Nutmeg',
      base: 'Cow Ghee, Sandalwood Powder & Benzoin'
    },
    burningTime: 'Sacred fire offering',
    isOrganic: true,
    packaging: 'Heavy duty moisture-barrier zipper pouch'
  }
];

export const MACHINES: Machine[] = [
  {
    id: 'mach-speedmaster-400',
    name: 'Luxmy SpeedMaster-400 High-Output Semi-Automatic Agarbatti Machine',
    modelNumber: 'LX-SM400-SEMI',
    manufacturer: 'Sri Vighneshwara Engineering (Luxmy Verified)',
    category: 'Semi-Automatic Machines',
    type: 'Piston / Gearbox Extruder Hybrid',
    capacityKgPerHour: '12 - 18 kg / hr (approx. 70,000 - 95,000 sticks/day)',
    speedSticksPerMin: '180 - 240 sticks/min',
    powerHP: '1.0 HP Single Phase (Runs on regular 220V household / commercial line)',
    dimensions: '1050 mm x 600 mm x 950 mm',
    requiredManpower: '1 operator (skilled or semi-skilled)',
    operatingVoltage: '220V / 50Hz Single Phase (3-Phase optional)',
    warranty: '18 Months comprehensive warranty + Lifetime parts availability',
    priceRange: '₹85,000 - ₹1,15,000 + GST',
    approxInvestment: '₹1.5 - 2.5 Lakh (including raw materials & starter batch)',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The benchmark entry-to-growth machinery for small-to-medium incense manufacturers. Engineered with hardened alloy steel piston sleeves and an automated bamboo stick feeder that minimizes stick breakage and ensures uniform diameter coating (8" or 9" sticks).',
    keyFeatures: [
      'High-durability tungsten carbide rocket die for uniform masala coating',
      'Precision auto-feeder tray compatible with 8" and 9" raw bamboo sticks',
      'Low power consumption (under 1 unit per hour of continuous operation)',
      'Smooth vibration-dampened heavy steel chassis',
      'Complete tool kit, spare rubber rollers, and maintenance guide included'
    ],
    specifications: {
      'Production Capacity': '12 - 18 kg/hour (approx. 100 - 150 kg/8 hr shift)',
      'Stick Size Supported': '8 inch, 9 inch & 12 inch bamboo core',
      'Stick Diameter': '2.8 mm to 3.5 mm (adjustable die)',
      'Motor Make': 'Godrej / Crompton Greaves 1.0 HP Heavy Duty',
      'Machine Weight': 'Approx. 135 kg',
      'Bamboo Feeder': 'Automated pneumatic & mechanical vibratory tray'
    },
    suitableFor: 'New entrepreneurs, rural micro-enterprises, expanding cottage industries',
    installationSupport: 'On-site engineer installation across all Indian states + 2 days hands-on training for operator.'
  },
  {
    id: 'mach-turbomax-650-auto',
    name: 'Luxmy TurboMax-650 Fully Automatic Dual-Feeder High Speed Line',
    modelNumber: 'LX-TM650-AUTO',
    manufacturer: 'Venus Engineering Works (Luxmy Verified)',
    category: 'Fully Automatic Machines',
    type: 'Rotary High-Speed Continuous Extrusion',
    capacityKgPerHour: '25 - 35 kg / hr (approx. 180,000 - 240,000 sticks/day)',
    speedSticksPerMin: '350 - 450 sticks/min',
    powerHP: '2.0 HP (Single or 3-Phase available)',
    dimensions: '1400 mm x 750 mm x 1200 mm',
    requiredManpower: '1 operator monitors 2 machines simultaneously',
    operatingVoltage: '220V Single Phase / 415V 3-Phase',
    warranty: '24 Months warranty with free 3 scheduled quarterly servicings',
    priceRange: '₹1,45,000 - ₹1,85,000 + GST',
    approxInvestment: '₹3.5 - 5 Lakh (including mixer, dryer tray setup & raw stocks)',
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Industrial-grade workhorse engineered for commercial agarbatti factories and B2B contract manufacturers. Features a dual-sensor stick reject system that automatically skips warped sticks without stopping the extruder.',
    keyFeatures: [
      'PLC-controlled touchscreen panel for real-time speed and count diagnostics',
      'Dual electronic stick sensors prevent jams and empty cycles',
      'Hard chrome plated cylinder for extended lifespan with abrasive charcoal/wood powder mixes',
      'Integrated auto-counting sensor and output batch separator'
    ],
    specifications: {
      'Production Capacity': '25 - 35 kg/hour (approx. 250 - 320 kg/shift)',
      'Speed': 'Up to 450 sticks per minute continuous output',
      'Stick Size': '8, 9, 10, 12 inch',
      'Motor': '2.0 HP ABB / Siemens induction motor with VFD drive',
      'Total Weight': '210 kg',
      'Noise Level': 'Ultra-quiet low vibration (<68 dB)'
    },
    suitableFor: 'Medium to large agarbatti brands, export units, bulk white-label suppliers',
    installationSupport: 'Turnkey commissioning with master technician + 3 years spare parts discount.'
  },
  {
    id: 'mach-dhoop-cone-hd200',
    name: 'Luxmy HydroPress HD-200 Hydraulic Dhoop Cone & Cup Making Machine',
    modelNumber: 'LX-HP200-DHOOP',
    manufacturer: 'HariKrishna Precision Tools (Luxmy Verified)',
    category: 'Dhoop Cone Machines',
    type: 'Heavy Hydraulic Pressure Molding',
    capacityKgPerHour: '15 - 25 kg / hr (approx. 10,000 - 15,000 cones/hr)',
    speedSticksPerMin: 'N/A (Multi-cavity die press: 36 cones per stroke)',
    powerHP: '3.0 HP 3-Phase Hydraulic Power Pack',
    dimensions: '1100 mm x 850 mm x 1500 mm',
    requiredManpower: '1 operator + 1 helper for tray removal',
    operatingVoltage: '415V 3-Phase (220V converter on request)',
    warranty: '2 Years hydraulic cylinder & pump warranty',
    priceRange: '₹1,65,000 - ₹2,10,000 + GST',
    approxInvestment: '₹2.8 - 4.5 Lakh',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Precision hydraulic molding machine for producing high-density backflow cones, standard dhoop cones, and sambrani cup blanks. Uniform compression ensures even burning without crumbling.',
    keyFeatures: [
      'Interchangeable die system (Cones, Backflow Cones, Sambrani Cups, Dhoop Sticks)',
      'Adjustable pressure regulation (10 to 50 Ton clamping force)',
      'Digital cycle timer and auto ejector plate',
      'Low thermal heat generation with forced cooling fan'
    ],
    specifications: {
      'Output per Stroke': '36 cones / 16 cups per press stroke',
      'Cycle Time': '8 to 12 seconds per stroke',
      'Die Material': 'EN-31 Tool steel mirror polished',
      'Hydraulic Tank': '50 Litres capacity with grade 68 hydraulic oil',
      'Weight': '320 kg'
    },
    suitableFor: 'Dhoop and sambrani specialty brands, temple bulk suppliers',
    installationSupport: 'Includes 2 free die sets + on-site hydraulic calibration training.'
  },
  {
    id: 'mach-camphor-punch-c100',
    name: 'Luxmy Camphor-Master C-100 High-Speed Rotary Tablet Punching Machine',
    modelNumber: 'LX-CM100-PUNCH',
    manufacturer: 'Bharat Industrial Machines (Luxmy Verified)',
    category: 'Camphor Tablet Punching',
    type: 'Multi-Station Rotary Tableting Press',
    capacityKgPerHour: '30 - 60 kg / hr (approx. 25,000 - 45,000 tablets/hr)',
    speedSticksPerMin: 'N/A (Rotary tablet output)',
    powerHP: '2.0 HP with Variable Frequency Speed Drive',
    dimensions: '900 mm x 800 mm x 1350 mm',
    requiredManpower: '1 operator',
    operatingVoltage: '220V / 415V',
    warranty: '12 Months comprehensive warranty',
    priceRange: '₹1,20,000 - ₹1,75,000 + GST',
    approxInvestment: '₹2.5 - 3.8 Lakh',
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-speed rotary press designed for pharmaceutical-grade clean pressing of pure camphor powders into circular discs, square blocks, and devotional tablets with crisp embossing.',
    keyFeatures: [
      'Stainless Steel (SS 304) contact parts for pure edible/pooja camphor',
      'Zero powder wastage recirculation tray',
      'Easy tablet weight and hardness adjustment via micrometer dials',
      'Transparent acrylic safety guard with emergency safety interlock'
    ],
    specifications: {
      'Tablet Diameter Range': '8 mm to 25 mm',
      'Max Tablet Thickness': '12 mm',
      'Punch Stations': '8 to 12 Station Turret Options',
      'Turret Speed': '15 to 30 RPM',
      'Weight': '280 kg'
    },
    suitableFor: 'Camphor tablet manufacturers, pooja kit packagers, distributors',
    installationSupport: 'Complete machine setup, formula blending guide, and tool kit.'
  }
];

export const BRAND_PARTNERS: BrandPartner[] = [
  {
    id: 'brand-luxmy-signature',
    name: 'Luxmy Signature',
    tagline: 'सुगंध परंपरा की, विश्वास आपका',
    description: 'Our premier in-house heritage incense line blending Mysore Sandalwood, Kannauj Rose, and rare resins with charcoal-free binders.',
    logo: 'LUXMY',
    established: '1998',
    location: 'Bangalore & Ahmedabad, India',
    productCategories: ['Agarbatti', 'Dhoop Batti', 'Sambrani Cups', 'Bhimseni Karpur', 'Vedic Havan'],
    featuredProductsCount: 24,
    isOfficialPartner: true
  },
  {
    id: 'brand-haridarshan',
    name: 'Hari Darshan Sevashram',
    tagline: 'Spreading Fragrance of Devotion across India',
    description: 'One of North India’s most revered incense institutions with classic floral formulations distributed via Luxmy network.',
    logo: 'HARI DARSHAN',
    established: '1970',
    location: 'Delhi NCR, India',
    productCategories: ['Agarbatti', 'Wet Dhoop', 'Dry Dhoop Cones', 'Pooja Essentials'],
    featuredProductsCount: 18,
    isOfficialPartner: true
  },
  {
    id: 'brand-ullas',
    name: 'Ullas Agarbatti',
    tagline: 'Joy in Every Breath',
    description: 'Master perfumers based in South India renowned for rich temple blends and export-grade natural masala agarbatti.',
    logo: 'ULLAS',
    established: '1978',
    location: 'Bengaluru, Karnataka',
    productCategories: ['Masala Agarbatti', 'Flora Incense', 'Aromatherapy Sticks'],
    featuredProductsCount: 15,
    isOfficialPartner: true
  },
  {
    id: 'brand-mangaldeep',
    name: 'Mangaldeep Temple Line',
    tagline: 'Purity for Prayers',
    description: 'Widely celebrated brand with specially curated temple collections and long burning daily pooja sticks.',
    logo: 'MANGALDEEP',
    established: '2003',
    location: 'Pan India Distribution',
    productCategories: ['Temple Agarbatti', 'Sandalwood Packs', 'Camphor'],
    featuredProductsCount: 12,
    isOfficialPartner: false
  },
  {
    id: 'brand-cycle-heritage',
    name: 'Cycle Pure Heritage',
    tagline: 'Everyone Has a Reason to Pray',
    description: 'India’s largest legacy incense maker offering authentic three-in-one and traditional yajna formulations.',
    logo: 'CYCLE PURE',
    established: '1948',
    location: 'Mysuru, Karnataka',
    productCategories: ['Pure Agarbatti', 'Sambrani', 'Pooja Oils'],
    featuredProductsCount: 14,
    isOfficialPartner: false
  }
];

export const MACHINE_MANUFACTURERS: MachineManufacturer[] = [
  {
    id: 'mfg-sri-vighneshwara',
    name: 'Sri Vighneshwara Industries',
    location: 'Coimbatore, Tamil Nadu & Ahmedabad, Gujarat',
    established: '2004',
    specialties: ['Semi-Automatic Agarbatti Extruders', 'Bamboo Stick Feeders', 'Hardened Carbide Dies'],
    description: 'Pioneers in high-speed semi-automatic piston and rotary gear extruders with over 3,500+ machines operating across 18 Indian states.',
    machinesSupplied: 3500,
    isoCertified: true,
    logo: 'SVI'
  },
  {
    id: 'mfg-venus-engg',
    name: 'Venus Engineering Works',
    location: 'Rajkot, Gujarat',
    established: '2009',
    specialties: ['Fully Automatic Dual Feeder Machines', 'High Output Agarbatti Lines', 'Vibratory Feeders'],
    description: 'Specialists in heavy-gauge automated machinery featuring imported sensor logic and low noise drive trains for continuous 24/7 manufacturing.',
    machinesSupplied: 2200,
    isoCertified: true,
    logo: 'VEW'
  },
  {
    id: 'mfg-harikrishna',
    name: 'HariKrishna Precision Tools',
    location: 'Surat, Gujarat',
    established: '2012',
    specialties: ['Hydraulic Dhoop Cone Presses', 'Backflow Cone Die Sets', 'Sambrani Cup Punching'],
    description: 'Known for high-pressure hydraulic molding presses, precision CNC dies, and customized industrial dhoop production systems.',
    machinesSupplied: 1800,
    isoCertified: true,
    logo: 'HKPT'
  },
  {
    id: 'mfg-bharat-industrial',
    name: 'Bharat Industrial Machines',
    location: 'Indore, Madhya Pradesh',
    established: '2015',
    specialties: ['Camphor Tablet Punching Presses', 'Raw Material Ribbon Blenders', 'Drying Chamber Racks'],
    description: 'Manufacturer of pharmaceutical-grade tablet presses and complete raw material pre-mixing blenders for incense setups.',
    machinesSupplied: 1400,
    isoCertified: true,
    logo: 'BIM'
  }
];

export const FAQS = [
  {
    q: 'How can I place regular or bulk product orders with Luxmy?',
    category: 'Products',
    a: 'You can explore our complete product catalogue freely on the website. For standard household quantities, simply select your required sizes and proceed through our secure cart and online checkout. For wholesale, retail stores, and bulk carton orders (40+ boxes), click "Bulk Order" on any product page to submit your business details and receive instant bulk tiered pricing or quotation.'
  },
  {
    q: 'What is the minimum order quantity (MOQ) for wholesale pricing?',
    category: 'Products',
    a: 'Wholesale pricing generally starts at 25 to 50 boxes (or 1 full master carton) depending on the specific fragrance and brand. Each product page clearly displays both the single unit price and the bulk price with its corresponding minimum quantity.'
  },
  {
    q: 'Can Luxmy help me start an agarbatti manufacturing unit from scratch?',
    category: 'Machines',
    a: 'Yes! Luxmy acts as a complete industry ecosystem partner. We connect you with verified semi-automatic or automatic machine manufacturers, assist with raw material sourcing (raw bamboo sticks, joss powder, charcoal, aromatic fragrances), provide on-site machine setup, operator training, and offer long-term business agreements.'
  },
  {
    q: 'What kind of electricity supply and space is needed for a semi-automatic machine?',
    category: 'Machines',
    a: 'A standard semi-automatic machine like the Luxmy SpeedMaster-400 runs on a regular 1.0 HP motor with standard 220V single-phase household electricity (approx. 0.8 units per operating hour). It requires a compact floor space of only 80 to 120 sq. ft., making it ideal for home setups, garages, or small workshops.'
  },
  {
    q: 'How does the Luxmy 3-Year Long-Term Business Agreement work?',
    category: 'Business',
    a: 'Under our long-term business arrangement, Luxmy provides end-to-end guidance including certified machinery supply, consistent high-grade raw material support, ongoing technical maintenance, and potential buy-back or marketing channel arrangements subject to mutually agreed quality inspection parameters and contractual terms.'
  },
  {
    q: 'What warranty, training, and maintenance are provided with the machines?',
    category: 'Machines',
    a: 'All machines supplied through our verified engineering partner network come with 12 to 24 months manufacturer warranty on motor and gearbox, free on-site installation by a qualified engineer, 2-day practical operator training, and guaranteed spare parts dispatch within 48 hours.'
  },
  {
    q: 'Do I need an account to browse products or book a machine consultation?',
    category: 'Account',
    a: 'No, you can browse all incense products, machinery specifications, and partner brands without registration. You will only be prompted to sign in or create an account when you proceed to final checkout and payment, or when accessing your personal order tracking dashboard.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Rajeshwar Sharma',
    location: 'Varanasi, Uttar Pradesh',
    businessType: 'Retailer & Pooja Bhandar Owner',
    text: 'We have been ordering Luxmy Royal Sandalwood and Devdoot Sambrani Cups for over 2 years now. The burning duration is genuinely 60 minutes without harsh smoke, and our temple devotees specifically ask for Luxmy by name.',
    rating: 5,
    avatar: 'RS'
  },
  {
    id: 'test-2',
    name: 'Gaurav Patel',
    location: 'Ahmedabad, Gujarat',
    businessType: 'Agarbatti Manufacturer (SpeedMaster-400 Owner)',
    text: 'Started our manufacturing unit with one semi-automatic machine through the Luxmy Business Program. The technician came to our workshop for installation, trained our 2 workers, and our daily output now reaches 120 kg per shift smoothly.',
    rating: 5,
    avatar: 'GP'
  },
  {
    id: 'test-3',
    name: 'Meenakshi Sundaram',
    location: 'Madurai, Tamil Nadu',
    businessType: 'Wholesale Distributor',
    text: 'The bulk ordering system on Luxmy is seamless. Getting transparent GST invoices, swift dispatch, and access to both Luxmy and partner brands like Ullas under one platform has simplified our distribution immensely.',
    rating: 5,
    avatar: 'MS'
  }
];
