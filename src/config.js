// =============================================
// ARK GLOBAL SUPPLY - CONFIGURATION
// =============================================
// Edit this file to update products, colors, settings
// =============================================

// THEME COLORS
export const COLORS = {
  bg: '#0A0A0A',
  bgCard: '#141414',
  border: '#2A2A2A',
  accent: '#FF4D00',
  accentGlow: 'rgba(255, 77, 0, 0.3)',
  success: '#00FF88',
  error: '#EF4444',
  text: '#FFFFFF',
  textMuted: '#888888',
  textDim: '#555555',
  gold: '#FFD700',
  purple: '#8B5CF6',
  pink: '#EC4899',
};

// SITE SETTINGS
export const SITE = {
  name: 'ARK GLOBAL',
  tagline: 'SUPPLY CO.',
  hero: {
    badge: "🇦🇺 AUSTRALIA'S #1 BUNDLE STORE",
    headline: 'EVERYTHING. ONE BOX. ZERO EXCUSES.',
    subheadline: "Premium curated bundles for men who get sh*t done.",
  },
  shipping: {
    freeThreshold: 100,
    standardRate: 12.95,
  },
  trustBadges: [
    { icon: '🚀', text: 'FAST SHIPPING' },
    { icon: '💪', text: 'PREMIUM QUALITY' },
    { icon: '↩️', text: '30-DAY RETURNS' },
    { icon: '🔒', text: 'SECURE CHECKOUT' },
  ],
  categories: [
    { id: 'all', label: '🔥 ALL' },
    { id: 'mens', label: "💪 MEN'S" },
    { id: 'kids', label: '🎒 KIDS' },
    { id: 'gift', label: '🎁 GIFTS' },
    { id: 'holiday', label: '🎄 HOLIDAY' },
    { id: 'party', label: '🎉 PARTY' },
  ],
  business: {
    abn: '12 345 678 901',
    location: 'Sydney, NSW',
    country: 'Australia',
    email: 'support@arkglobalsupply.com',
  },
  social: {
    instagram: 'https://instagram.com/arkglobalsupply',
    tiktok: 'https://tiktok.com/@arkglobalsupply',
  },
  payments: ['Visa', 'Mastercard', 'PayPal', 'Afterpay', 'Zip'],
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

// DISCOUNT CODES
export const DISCOUNTS = [
  { code: 'ALPHA20', type: 'percent', value: 20, desc: '20% off', active: true },
  { code: 'WELCOME15', type: 'percent', value: 15, desc: '15% off first order', active: true },
  { code: 'FREESHIP', type: 'shipping', value: 0, desc: 'Free shipping', active: true },
];

// SOCIAL PROOF NAMES
export const SOCIAL_PROOF = [
  { name: 'Jake', loc: 'Sydney', prod: 'Alpha Performance Pack' },
  { name: 'Marcus', loc: 'Melbourne', prod: 'Executive Grooming Kit' },
  { name: 'Sarah', loc: 'Brisbane', prod: 'Kids Creative Art Pack' },
  { name: 'Chris', loc: 'Perth', prod: 'Tactical EDC Bundle' },
  { name: 'Emma', loc: 'Adelaide', prod: 'Self Care Pamper Box' },
  { name: 'Liam', loc: 'Gold Coast', prod: 'Home Gym Starter' },
];

// FAQ
export const FAQ = [
  { q: 'How fast is shipping?', a: 'NSW orders arrive in 1-3 business days! Other Australian states take 3-5 days. International shipping is 5-14 days.' },
  { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Afterpay, and Zip.' },
  { q: 'Can I return my bundle?', a: 'Yes! 30-day money-back guarantee. Not happy? Full refund, no questions asked.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to NZ, USA, UK, Singapore, Canada and more.' },
];

// =============================================
// PRODUCTS - ADD/EDIT/REMOVE PRODUCTS HERE
// =============================================

export const PRODUCTS = [
  // ========== MEN'S COLLECTION ==========
  {
    id: 101,
    name: "Alpha Performance Pack",
    desc: "Dominate your workouts. Premium gym gear, resistance bands, shaker bottle, protein samples & training gloves.",
    price: 89.99,
    was: 149.99,
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    tag: "ALPHA",
    tagBg: "#FF4D00",
    cat: "mens",
    stock: 15,
    sold: 2341,
    reviews: [
      { u: "Jake M.", r: 5, t: "Beast mode activated!", v: true },
      { u: "Ryan T.", r: 5, t: "Everything I needed to start", v: true }
    ]
  },
  {
    id: 102,
    name: "Executive Grooming Kit",
    desc: "Look sharp, stay sharp. Premium razor, beard oil, cologne samples, skincare essentials & leather dopp bag.",
    price: 79.99,
    was: 129.99,
    img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800",
    tag: "BESTSELLER",
    tagBg: "#FFD700",
    cat: "mens",
    stock: 23,
    sold: 1876,
    reviews: [{ u: "Marcus T.", r: 5, t: "Quality is insane", v: true }]
  },
  {
    id: 103,
    name: "Tactical EDC Bundle",
    desc: "Be prepared. Multi-tool, flashlight, notebook, premium pen, wallet & survival essentials.",
    price: 69.99,
    was: 109.99,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    tag: "NEW",
    tagBg: "#00FF88",
    cat: "mens",
    stock: 31,
    sold: 943,
    reviews: [{ u: "Chris B.", r: 5, t: "Built to last", v: true }]
  },
  {
    id: 104,
    name: "Home Gym Starter",
    desc: "No excuses. Adjustable dumbbells, yoga mat, jump rope, foam roller & workout guide.",
    price: 129.99,
    was: 199.99,
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    tag: "35% OFF",
    tagBg: "#FF4D00",
    cat: "mens",
    stock: 12,
    sold: 1567,
    reviews: [{ u: "Ryan K.", r: 5, t: "Game changer for home workouts", v: true }]
  },
  {
    id: 105,
    name: "Desk Commander Kit",
    desc: "Optimize your workspace. Standing desk mat, blue light glasses, cable organizers & productivity tools.",
    price: 59.99,
    was: 89.99,
    img: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800",
    tag: "POPULAR",
    tagBg: "#8B5CF6",
    cat: "mens",
    stock: 28,
    sold: 2156,
    reviews: [{ u: "Tom S.", r: 5, t: "Productivity went through the roof", v: true }]
  },

  // ========== KIDS & FAMILY ==========
  {
    id: 201,
    name: "Back to School Essentials",
    desc: "Everything they need. Premium notebooks, pens, folders, calculator, pencil case & bonus surprises.",
    price: 49.99,
    was: 79.99,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    tag: "BESTSELLER",
    tagBg: "#FFD700",
    cat: "kids",
    stock: 12,
    sold: 847,
    reviews: [{ u: "Sarah M.", r: 5, t: "Kids absolutely loved this!", v: true }]
  },
  {
    id: 202,
    name: "Kids Creative Art Pack",
    desc: "Unleash creativity. Art supplies, craft materials, activity books, stickers & creative tools.",
    price: 39.99,
    was: 59.99,
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800",
    tag: "POPULAR",
    tagBg: "#8B5CF6",
    cat: "kids",
    stock: 34,
    sold: 2156,
    reviews: [{ u: "Amy R.", r: 5, t: "Daughter uses this every single day!", v: true }]
  },

  // ========== GIFTS ==========
  {
    id: 301,
    name: "Premium Gift Box",
    desc: "Luxury curated selection. Hand-picked premium items beautifully packaged for special occasions.",
    price: 129.99,
    was: 199.99,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
    tag: "LUXURY",
    tagBg: "#FFD700",
    cat: "gift",
    stock: 7,
    sold: 892,
    reviews: [{ u: "Emma W.", r: 5, t: "Stunning presentation!", v: true }]
  },
  {
    id: 302,
    name: "Self Care Pamper Box",
    desc: "You deserve this. Face masks, bath bombs, scented candles, chocolates & relaxation goodies.",
    price: 69.99,
    was: 99.99,
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    tag: "TRENDING",
    tagBg: "#EC4899",
    cat: "gift",
    stock: 15,
    sold: 2834,
    reviews: [{ u: "Nina G.", r: 5, t: "Best gift to myself ever!", v: true }]
  },

  // ========== HOLIDAY & PARTY ==========
  {
    id: 401,
    name: "Ultimate Christmas Bundle",
    desc: "Holiday magic. Premium decorations, fairy lights, stockings, gift wrap & festive surprises.",
    price: 89.99,
    was: 149.99,
    img: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800",
    tag: "40% OFF",
    tagBg: "#FF4D00",
    cat: "holiday",
    stock: 8,
    sold: 1243,
    reviews: [{ u: "Jenny L.", r: 5, t: "Made Christmas setup so easy!", v: true }]
  },
  {
    id: 402,
    name: "Birthday Party Pack",
    desc: "Instant celebration. Decorations, balloons, banners, tableware & party favors for 12 guests.",
    price: 34.99,
    was: 54.99,
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    tag: "LOW STOCK",
    tagBg: "#EF4444",
    cat: "party",
    stock: 3,
    sold: 3891,
    reviews: [{ u: "Lisa P.", r: 5, t: "Saved me hours of shopping!", v: true }]
  },

  // ========== ADD NEW PRODUCTS BELOW ==========
  
];
