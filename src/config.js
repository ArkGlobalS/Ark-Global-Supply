// =============================================
// ARK GLOBAL SUPPLY - CONFIGURATION V2
// =============================================

// THEME COLORS
export const COLORS = {
  // Base
  bg: '#0A0A0A',
  bgCard: '#141414',
  bgCardHover: '#1a1a1a',
  border: '#2A2A2A',
  borderLight: '#3a3a3a',
  text: '#FFFFFF',
  textMuted: '#888888',
  textDim: '#555555',
  
  // Accent
  accent: '#FF4D00',
  accentGlow: 'rgba(255, 77, 0, 0.3)',
  accentLight: '#FF6B2B',
  
  // Status
  success: '#00FF88',
  error: '#EF4444',
  warning: '#F59E0B',
  gold: '#FFD700',
  
  // Section Themes
  mens: { 
    primary: '#FF4D00', 
    secondary: '#FF6B2B', 
    glow: 'rgba(255, 77, 0, 0.3)',
    gradient: 'linear-gradient(135deg, #FF4D00 0%, #FF6B2B 100%)',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(255, 77, 0, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 43, 0.08) 0%, transparent 50%)',
    icon: '💪'
  },
  womens: { 
    primary: '#EC4899', 
    secondary: '#F472B6', 
    glow: 'rgba(236, 72, 153, 0.3)',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(244, 114, 182, 0.08) 0%, transparent 50%)',
    icon: '👗'
  },
  kids: { 
    primary: '#8B5CF6', 
    secondary: '#A78BFA', 
    glow: 'rgba(139, 92, 246, 0.3)',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    bgPattern: 'radial-gradient(circle at 25% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(167, 139, 250, 0.08) 0%, transparent 50%)',
    icon: '🎨'
  },
  gifts: { 
    primary: '#F59E0B', 
    secondary: '#FBBF24', 
    glow: 'rgba(245, 158, 11, 0.3)',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.08) 0%, transparent 50%)',
    icon: '🎁'
  },
  holiday: { 
    primary: '#EF4444', 
    secondary: '#F87171', 
    glow: 'rgba(239, 68, 68, 0.3)',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(239, 68, 68, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(248, 113, 113, 0.08) 0%, transparent 50%)',
    icon: '🎄'
  },
};

// FLOATING ICONS FOR EACH SECTION
export const FLOATING_ICONS = {
  mens: ['💪', '🏋️', '⚡', '🔥', '🎯', '💼'],
  womens: ['💅', '✨', '🌸', '💝', '🌺', '💫'],
  kids: ['🎨', '🎮', '⭐', '🚀', '🎪', '🌈'],
  gifts: ['🎁', '🎀', '💝', '🎊', '✨', '🎉'],
  home: ['🔥', '⚡', '💎', '🚀', '✨', '💪'],
};

// SITE SETTINGS
export const SITE = {
  name: 'ARK GLOBAL',
  tagline: 'SUPPLY CO.',
  hero: {
    badge: "🇦🇺 AUSTRALIA'S #1 BUNDLE STORE",
    headline: 'EVERYTHING YOU NEED. ONE BOX.',
    subheadline: "Premium curated bundles for everyone. Fast shipping from Sydney.",
  },
  shipping: {
    freeThreshold: 100,
    standardRate: 12.95,
  },
  trustBadges: [
    { icon: '🚀', text: 'FAST SHIPPING' },
    { icon: '💎', text: 'PREMIUM QUALITY' },
    { icon: '↩️', text: '30-DAY RETURNS' },
    { icon: '🔒', text: 'SECURE CHECKOUT' },
  ],
  pages: [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'mens', label: "MEN'S", icon: '💪' },
    { id: 'womens', label: "WOMEN'S", icon: '👗' },
    { id: 'kids', label: 'KIDS', icon: '🎨' },
    { id: 'gifts', label: 'GIFTS', icon: '🎁' },
  ],
  mobileNav: [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'mens', label: "Men's", icon: '💪' },
    { id: 'womens', label: "Women's", icon: '👗' },
    { id: 'kids', label: 'Kids', icon: '🎨' },
    { id: 'cart', label: 'Cart', icon: '🛒' },
  ],
  business: {
    abn: '12 345 678 901',
    location: 'Sydney, NSW',
    country: 'Australia',
    email: 'arkglobalsupply@protonmail.com',
  },
  social: {
    instagram: 'https://instagram.com/arkglobalsupply',
    tiktok: 'https://tiktok.com/@arkglobalsupply',
  },
  payments: ['Visa', 'Mastercard', 'PayPal', 'Afterpay', 'Zip', 'Apple Pay'],
};

// COUNTRIES & CURRENCIES
export const COUNTRIES = {
  AU: { name: 'Australia', symbol: '$', currency: 'AUD', rate: 1, flag: '🇦🇺', default: true },
  NZ: { name: 'New Zealand', symbol: 'NZ$', currency: 'NZD', rate: 1.08, flag: '🇳🇿' },
  US: { name: 'United States', symbol: 'US$', currency: 'USD', rate: 0.65, flag: '🇺🇸' },
  GB: { name: 'United Kingdom', symbol: '£', currency: 'GBP', rate: 0.52, flag: '🇬🇧' },
  SG: { name: 'Singapore', symbol: 'S$', currency: 'SGD', rate: 0.87, flag: '🇸🇬' },
  CA: { name: 'Canada', symbol: 'C$', currency: 'CAD', rate: 0.89, flag: '🇨🇦' },
};

// DISCOUNT CODES (10% only)
export const DISCOUNTS = [
  { code: 'SAVE10', type: 'percent', value: 10, desc: '10% off', active: true },
  { code: 'WELCOME10', type: 'percent', value: 10, desc: '10% off first order', active: true },
  { code: 'FREESHIP', type: 'shipping', value: 0, desc: 'Free shipping', active: true },
];

// SOCIAL PROOF NAMES
export const SOCIAL_PROOF = [
  { name: 'Jake', loc: 'Sydney', prod: 'Alpha Performance Pack', cat: 'mens' },
  { name: 'Sophie', loc: 'Melbourne', prod: 'Luxe Skincare Bundle', cat: 'womens' },
  { name: 'Marcus', loc: 'Brisbane', prod: 'Executive Grooming Kit', cat: 'mens' },
  { name: 'Emma', loc: 'Perth', prod: 'Self Care Pamper Box', cat: 'womens' },
  { name: 'Sarah', loc: 'Adelaide', prod: 'Kids Creative Art Pack', cat: 'kids' },
  { name: 'Olivia', loc: 'Gold Coast', prod: 'Date Night Glam Kit', cat: 'womens' },
  { name: 'Liam', loc: 'Sydney', prod: 'Home Gym Starter', cat: 'mens' },
  { name: 'Mia', loc: 'Melbourne', prod: 'Yoga & Wellness Bundle', cat: 'womens' },
  { name: 'Noah', loc: 'Perth', prod: 'Little Scientist Kit', cat: 'kids' },
  { name: 'Chloe', loc: 'Brisbane', prod: 'Premium Gift Box', cat: 'gifts' },
];

// FAQ
export const FAQ = [
  { q: 'How fast is shipping?', a: 'NSW orders arrive in 1-3 business days! Other Australian states take 3-5 days. International shipping is 5-14 days.' },
  { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Afterpay, and Zip. Pay in 4 interest-free installments with Afterpay!' },
  { q: 'Can I return my bundle?', a: 'Yes! 30-day money-back guarantee on unused items in original packaging. See our Returns Policy for details.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to NZ, USA, UK, Singapore, Canada and more. International shipping rates apply.' },
  { q: 'How does Afterpay work?', a: 'Shop now, pay later! Split your purchase into 4 interest-free payments. Simply select Afterpay at checkout.' },
  { q: 'When will sold out items be restocked?', a: 'Sign up for notifications on sold out items. We restock popular bundles regularly — usually within 1-2 weeks!' },
];

// =============================================
// PRODUCTS - ALL SOLD OUT (Add stock to enable)
// =============================================

export const PRODUCTS = [
  // ========== MEN'S COLLECTION ==========
  {
    id: 101,
    name: "Alpha Performance Pack",
    desc: "Dominate your workouts. Premium gym gear, resistance bands, shaker bottle, protein samples & training gloves.",
    price: 89.99,
    was: 99.99,
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 2341,
    reviews: [
      { u: "Jake M.", r: 5, t: "Beast mode activated! Everything I needed.", v: true },
      { u: "Ryan T.", r: 5, t: "Quality is insane for the price", v: true },
      { u: "Chris B.", r: 4, t: "Great starter pack", v: true }
    ],
    related: [102, 104, 109]
  },
  {
    id: 102,
    name: "Executive Grooming Kit",
    desc: "Look sharp, stay sharp. Premium razor, beard oil, cologne samples, skincare essentials & leather dopp bag.",
    price: 79.99,
    was: 89.99,
    img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800",
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800",
      "https://images.unsplash.com/photo-1581071761900-f8b0593e2a5e?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 1876,
    reviews: [
      { u: "Marcus T.", r: 5, t: "Quality is insane", v: true },
      { u: "David L.", r: 5, t: "Wife loves how I smell now", v: true }
    ],
    related: [101, 105, 107]
  },
  {
    id: 103,
    name: "Tactical EDC Bundle",
    desc: "Be prepared. Multi-tool, flashlight, notebook, premium pen, wallet & survival essentials.",
    price: 69.99,
    was: 77.99,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 943,
    reviews: [{ u: "Chris B.", r: 5, t: "Built to last", v: true }],
    related: [106, 108, 105]
  },
  {
    id: 104,
    name: "Home Gym Starter",
    desc: "No excuses. Adjustable dumbbells, yoga mat, jump rope, foam roller & workout guide.",
    price: 129.99,
    was: 144.99,
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 1567,
    reviews: [{ u: "Ryan K.", r: 5, t: "Game changer for home workouts", v: true }],
    related: [101, 109, 207]
  },
  {
    id: 105,
    name: "Desk Commander Kit",
    desc: "Optimize your workspace. Standing desk mat, blue light glasses, cable organizers & productivity tools.",
    price: 59.99,
    was: 66.99,
    img: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800",
    images: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 2156,
    reviews: [{ u: "Tom S.", r: 5, t: "Productivity went through the roof", v: true }],
    related: [108, 102, 110]
  },
  {
    id: 106,
    name: "Weekend Warrior Kit",
    desc: "Adventure awaits. Waterproof backpack, portable speaker, sunglasses, cooler bag & outdoor essentials.",
    price: 99.99,
    was: 110.99,
    img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800",
    images: [
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 3421,
    reviews: [{ u: "Dan W.", r: 5, t: "Perfect for camping trips", v: true }],
    related: [103, 104, 107]
  },
  {
    id: 107,
    name: "Gentleman's Whiskey Set",
    desc: "Sophisticated taste. Crystal decanter, whiskey stones, premium glasses & cigar accessories.",
    price: 149.99,
    was: 166.99,
    img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
    images: [
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 1892,
    reviews: [{ u: "James R.", r: 5, t: "Classy addition to my bar", v: true }],
    related: [110, 102, 401]
  },
  {
    id: 108,
    name: "Tech Essentials Bundle",
    desc: "Stay connected. Wireless earbuds, power bank, phone stand, cable kit & screen cleaner.",
    price: 79.99,
    was: 88.99,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 4567,
    reviews: [{ u: "Mike T.", r: 5, t: "Everything a tech guy needs", v: true }],
    related: [105, 103, 305]
  },
  {
    id: 109,
    name: "Recovery Pro Bundle",
    desc: "Heal faster. Massage gun, compression sleeves, muscle balm, ice pack & stretching guide.",
    price: 119.99,
    was: 133.99,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 2234,
    reviews: [{ u: "Steve L.", r: 5, t: "My muscles thank me", v: true }],
    related: [101, 104, 204]
  },
  {
    id: 110,
    name: "Coffee Connoisseur Kit",
    desc: "Brew perfection. Manual grinder, pour-over set, premium beans, travel mug & barista tools.",
    price: 89.99,
    was: 99.99,
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 1654,
    reviews: [{ u: "Ben C.", r: 5, t: "Best coffee I've ever made at home", v: true }],
    related: [105, 107, 206]
  },

  // ========== WOMEN'S COLLECTION ==========
  {
    id: 201,
    name: "Luxe Skincare Bundle",
    desc: "Glow like never before. Premium serums, moisturizers, face masks, jade roller & beauty bag.",
    price: 89.99,
    was: 99.99,
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 3456,
    reviews: [
      { u: "Sophie M.", r: 5, t: "My skin has never looked better!", v: true },
      { u: "Emma L.", r: 5, t: "Worth every penny", v: true }
    ],
    related: [202, 205, 210]
  },
  {
    id: 202,
    name: "Self Care Pamper Box",
    desc: "You deserve this. Bath bombs, scented candles, face masks, chocolates & relaxation essentials.",
    price: 69.99,
    was: 77.99,
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 2834,
    reviews: [{ u: "Emma W.", r: 5, t: "Best gift to myself ever!", v: true }],
    related: [201, 206, 403]
  },
  {
    id: 203,
    name: "Date Night Glam Kit",
    desc: "Turn heads. Makeup essentials, perfume samples, jewelry accessories & clutch bag.",
    price: 79.99,
    was: 88.99,
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 1987,
    reviews: [{ u: "Olivia R.", r: 5, t: "Felt like a queen on my date!", v: true }],
    related: [201, 208, 404]
  },
  {
    id: 204,
    name: "Yoga & Wellness Bundle",
    desc: "Find your zen. Premium yoga mat, blocks, strap, essential oils & meditation guide.",
    price: 99.99,
    was: 110.99,
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    images: [
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 2341,
    reviews: [{ u: "Mia L.", r: 5, t: "Perfect for my morning routine", v: true }],
    related: [207, 202, 210]
  },
  {
    id: 205,
    name: "Hair Care Essentials",
    desc: "Salon-worthy locks. Shampoo, conditioner, hair mask, silk scrunchies & styling tools.",
    price: 59.99,
    was: 66.99,
    img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800",
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 1765,
    reviews: [{ u: "Ava T.", r: 5, t: "My hair has never been softer!", v: true }],
    related: [201, 208, 203]
  },
  {
    id: 206,
    name: "Cozy Night In Bundle",
    desc: "Ultimate comfort. Fuzzy socks, silk eye mask, herbal tea, snacks & Netflix essentials.",
    price: 49.99,
    was: 55.99,
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 4123,
    reviews: [{ u: "Grace H.", r: 5, t: "Perfect for my self-care Sundays!", v: true }],
    related: [202, 210, 406]
  },
  {
    id: 207,
    name: "Fitness Queen Pack",
    desc: "Slay your workout. Resistance bands, sports bra, water bottle, gym bag & protein bars.",
    price: 89.99,
    was: 99.99,
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 2567,
    reviews: [{ u: "Isabella K.", r: 5, t: "Everything I needed for the gym!", v: true }],
    related: [204, 101, 104]
  },
  {
    id: 208,
    name: "Nail Art Starter Kit",
    desc: "Salon at home. Gel polishes, UV lamp, nail tools, stickers & storage case.",
    price: 69.99,
    was: 77.99,
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800",
    images: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 1876,
    reviews: [{ u: "Chloe B.", r: 5, t: "Save so much money doing my own nails!", v: true }],
    related: [201, 203, 205]
  },
  {
    id: 209,
    name: "Travel Essentials Bundle",
    desc: "Jet-set ready. Toiletry bag, travel bottles, neck pillow, passport holder & luggage tags.",
    price: 59.99,
    was: 66.99,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 2134,
    reviews: [{ u: "Zoe P.", r: 5, t: "Made packing so much easier!", v: true }],
    related: [206, 202, 106]
  },
  {
    id: 210,
    name: "Morning Routine Box",
    desc: "Start right. Skincare minis, dry brush, journal, green tea & motivational cards.",
    price: 54.99,
    was: 60.99,
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 1543,
    reviews: [{ u: "Lily N.", r: 5, t: "Transformed my mornings!", v: true }],
    related: [201, 204, 206]
  },

  // ========== KIDS COLLECTION ==========
  {
    id: 301,
    name: "Back to School Essentials",
    desc: "Everything they need! Premium notebooks, pens, folders, calculator, pencil case & fun surprises.",
    price: 49.99,
    was: 55.99,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 2847,
    reviews: [{ u: "Sarah M.", r: 5, t: "Kids absolutely loved this!", v: true }],
    related: [302, 308, 310]
  },
  {
    id: 302,
    name: "Creative Art Pack",
    desc: "Unleash creativity! Crayons, markers, paint set, activity books, stickers & craft supplies.",
    price: 39.99,
    was: 44.99,
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800",
    images: [
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 3156,
    reviews: [{ u: "Amy R.", r: 5, t: "Daughter uses this every single day!", v: true }],
    related: [301, 308, 307]
  },
  {
    id: 303,
    name: "Little Scientist Kit",
    desc: "Spark curiosity! Safe experiments, magnifying glass, goggles, lab coat & discovery journal.",
    price: 59.99,
    was: 66.99,
    img: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800",
    images: [
      "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 1876,
    reviews: [{ u: "Kelly P.", r: 5, t: "My son is obsessed with science now!", v: true }],
    related: [308, 304, 310]
  },
  {
    id: 304,
    name: "Outdoor Explorer Bundle",
    desc: "Adventure time! Kids binoculars, compass, bug catcher, nature guide & explorer vest.",
    price: 44.99,
    was: 49.99,
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 2341,
    reviews: [{ u: "David H.", r: 5, t: "Kids won't come inside anymore!", v: true }],
    related: [303, 309, 306]
  },
  {
    id: 305,
    name: "Gaming Starter Pack",
    desc: "Level up! Gaming headset, LED lights, controller grips, snack bowl & gaming accessories.",
    price: 69.99,
    was: 77.99,
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800",
    images: [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 3456,
    reviews: [{ u: "Tyler M.", r: 5, t: "Best birthday gift ever!", v: true }],
    related: [306, 108, 301]
  },
  {
    id: 306,
    name: "Sleepover Party Pack",
    desc: "Ultimate fun! Sleeping bag, flashlight, snacks, games & glow sticks for 4 friends.",
    price: 79.99,
    was: 88.99,
    img: "https://images.unsplash.com/photo-1513807016779-d51c0c026263?w=800",
    images: [
      "https://images.unsplash.com/photo-1513807016779-d51c0c026263?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 1654,
    reviews: [{ u: "Hannah L.", r: 5, t: "Best sleepover we've ever had!", v: true }],
    related: [305, 407, 304]
  },
  {
    id: 307,
    name: "Young Chef Starter Kit",
    desc: "Cook like a pro! Kid-safe utensils, apron, chef hat, recipe cards & baking supplies.",
    price: 49.99,
    was: 55.99,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 1987,
    reviews: [{ u: "Michelle T.", r: 5, t: "My daughter bakes every weekend now!", v: true }],
    related: [302, 301, 110]
  },
  {
    id: 308,
    name: "STEM Building Bundle",
    desc: "Build & learn! Building blocks, engineering challenges, instruction cards & storage box.",
    price: 59.99,
    was: 66.99,
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 2765,
    reviews: [{ u: "Peter W.", r: 5, t: "Educational and fun!", v: true }],
    related: [303, 302, 301]
  },
  {
    id: 309,
    name: "Sports Star Starter",
    desc: "Play like a champ! Mini basketball, soccer ball, jump rope, cones & sports bag.",
    price: 54.99,
    was: 60.99,
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 2123,
    reviews: [{ u: "Coach Dan", r: 5, t: "Great for active kids!", v: true }],
    related: [304, 306, 101]
  },
  {
    id: 310,
    name: "Reading Adventure Box",
    desc: "Books & more! Age-appropriate books, bookmarks, reading light, journal & cozy blanket.",
    price: 44.99,
    was: 49.99,
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 1432,
    reviews: [{ u: "Emma's Mum", r: 5, t: "Got my kids reading more!", v: true }],
    related: [301, 302, 303]
  },

  // ========== GIFTS COLLECTION ==========
  {
    id: 401,
    name: "Premium Gift Box",
    desc: "Luxury curated selection. Hand-picked premium items beautifully packaged for special occasions.",
    price: 129.99,
    was: 144.99,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 892,
    reviews: [{ u: "Emma W.", r: 5, t: "Stunning presentation!", v: true }],
    related: [404, 403, 107]
  },
  {
    id: 402,
    name: "New Dad Survival Kit",
    desc: "For the sleepless hero. Coffee, energy snacks, mini massager, funny dad book & survival guide.",
    price: 59.99,
    was: 66.99,
    img: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800",
    images: [
      "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 1567,
    reviews: [{ u: "Matt K.", r: 5, t: "Got this for my brother, he loved it!", v: true }],
    related: [403, 110, 406]
  },
  {
    id: 403,
    name: "New Mum Pamper Box",
    desc: "She deserves it. Skincare, comfortable robe, snacks, tea & relaxation essentials.",
    price: 79.99,
    was: 88.99,
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 2341,
    reviews: [{ u: "Kate R.", r: 5, t: "Perfect gift for my sister!", v: true }],
    related: [402, 202, 201]
  },
  {
    id: 404,
    name: "Date Night Box",
    desc: "Romance ready. Candles, massage oil, chocolates, wine accessories & couples game.",
    price: 79.99,
    was: 88.99,
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    images: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 2145,
    reviews: [{ u: "Lisa M.", r: 5, t: "Anniversary was perfect!", v: true }],
    related: [401, 203, 107]
  },
  {
    id: 405,
    name: "Retirement Celebration Kit",
    desc: "Cheers to freedom. Premium wine glasses, gourmet snacks, puzzle book & celebration banner.",
    price: 99.99,
    was: 110.99,
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800",
    images: [
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 987,
    reviews: [{ u: "Robert J.", r: 5, t: "Dad absolutely loved this!", v: true }],
    related: [401, 107, 408]
  },
  {
    id: 406,
    name: "Get Well Soon Bundle",
    desc: "Speedy recovery. Cozy socks, herbal tea, comfort snacks, puzzle book & feel-better essentials.",
    price: 49.99,
    was: 55.99,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 1432,
    reviews: [{ u: "Jenny L.", r: 5, t: "Sent this to my friend, she cried happy tears", v: true }],
    related: [202, 206, 403]
  },
  {
    id: 407,
    name: "Birthday Party Pack",
    desc: "Instant celebration! Decorations, balloons, banners, tableware & party favors for 12 guests.",
    price: 34.99,
    was: 38.99,
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    images: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 3891,
    reviews: [{ u: "Lisa P.", r: 5, t: "Saved me hours of shopping!", v: true }],
    related: [306, 408, 301]
  },
  {
    id: 408,
    name: "Housewarming Bundle",
    desc: "Welcome home! Candles, plant, kitchen essentials, coasters & decorative items.",
    price: 69.99,
    was: 77.99,
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"
    ],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 1876,
    reviews: [{ u: "Alex T.", r: 5, t: "Perfect housewarming gift!", v: true }],
    related: [401, 110, 405]
  },
];

// HELPER: Get related products
export const getRelatedProducts = (productId, limit = 4) => {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !product.related) return [];
  return product.related
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, limit);
};

// HELPER: Get products by category
export const getProductsByCategory = (category) => {
  return PRODUCTS.filter(p => p.cat === category);
};

// HELPER: Get theme by category
export const getThemeByCategory = (category) => {
  switch(category) {
    case 'womens': return COLORS.womens;
    case 'kids': return COLORS.kids;
    case 'gifts': return COLORS.gifts;
    case 'mens': return COLORS.mens;
    default: return COLORS.mens;
  }
};
