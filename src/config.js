// =============================================
// ARK GLOBAL SUPPLY - CONFIGURATION V4
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
  saleEndDate: '2025-02-28T23:59:59+11:00',
  shipping: {
    freeThreshold: 200,
    rates: {
      AU: {
        NSW: { standard: 19.95, express: 29.95, time: '1-2 weeks' },
        VIC: { standard: 19.95, express: 29.95, time: '1-2 weeks' },
        QLD: { standard: 19.95, express: 29.95, time: '1-2 weeks' },
        SA: { standard: 19.95, express: 29.95, time: '1-2 weeks' },
        WA: { standard: 19.95, express: 34.95, time: '1-2 weeks' },
        TAS: { standard: 19.95, express: 29.95, time: '1-2 weeks' },
        NT: { standard: 19.95, express: 34.95, time: '1-2 weeks' },
        ACT: { standard: 19.95, express: 29.95, time: '1-2 weeks' },
      },
      NZ: { standard: 29.95, express: 44.95, time: '2-3 weeks' },
      US: { standard: 34.95, express: 54.95, time: '2-4 weeks' },
      GB: { standard: 34.95, express: 54.95, time: '2-4 weeks' },
      SG: { standard: 24.95, express: 39.95, time: '2-3 weeks' },
      CA: { standard: 34.95, express: 54.95, time: '2-4 weeks' },
    },
    deliveryNote: 'Delivery times may be extended during holiday periods and peak seasons.',
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

// AUSTRALIAN STATES
export const AU_STATES = [
  { code: 'NSW', name: 'New South Wales' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'SA', name: 'South Australia' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'NT', name: 'Northern Territory' },
  { code: 'ACT', name: 'Australian Capital Territory' },
];

// DISCOUNT CODES
export const DISCOUNTS = [
  { code: 'SAVE10', type: 'percent', value: 10, desc: '10% off', active: true },
  { code: 'WELCOME10', type: 'percent', value: 10, desc: '10% off first order', active: true },
  { code: 'FREESHIP', type: 'shipping', value: 0, desc: 'Free shipping', active: true },
];

// SOCIAL PROOF DATA
export const SOCIAL_PROOF = [
  { name: 'Jake', loc: 'Sydney', prod: 'Level Up Kit', cat: 'mens', action: 'just purchased' },
  { name: 'Sophie', loc: 'Melbourne', prod: 'New Mum Pamper Box', cat: 'womens', action: 'just purchased' },
  { name: 'Marcus', loc: 'Brisbane', prod: 'Coffee Connoisseur Kit', cat: 'gifts', action: 'added to cart' },
  { name: 'Emma', loc: 'Perth', prod: 'Kids Creative Art Kit', cat: 'kids', action: 'just purchased' },
  { name: 'Sarah', loc: 'Adelaide', prod: 'Bluey Ultimate Bundle', cat: 'kids', action: 'is viewing' },
  { name: 'Olivia', loc: 'Gold Coast', prod: 'Executive Grooming Kit', cat: 'mens', action: 'just purchased' },
  { name: 'Liam', loc: 'Sydney', prod: 'Home Gym Starter Kit', cat: 'mens', action: 'added to cart' },
  { name: 'Mia', loc: 'Canberra', prod: 'Little Explorer Kit', cat: 'kids', action: 'just purchased' },
  { name: 'Noah', loc: 'Hobart', prod: 'Level Up Kit', cat: 'mens', action: 'is viewing' },
  { name: 'Chloe', loc: 'Darwin', prod: 'New Mum Pamper Box', cat: 'womens', action: 'just purchased' },
];

// FAQ
export const FAQ = [
  { q: 'How fast is shipping?', a: 'Australian orders typically arrive within 1-2 weeks. International shipping takes 2-4 weeks depending on location. Please note: delivery times may be extended during holiday periods and peak seasons.' },
  { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Afterpay, and Zip. Pay in 4 interest-free instalments with Afterpay!' },
  { q: 'Can I return my bundle?', a: 'Yes! 30-day money-back guarantee on unused items in original packaging. See our Returns Policy for details.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to NZ, USA, UK, Singapore, Canada and more. International shipping rates apply.' },
  { q: 'How does Afterpay work?', a: 'Shop now, pay later! Split your purchase into 4 interest-free payments. Simply select Afterpay at checkout.' },
  { q: 'Are these genuine products?', a: 'Absolutely! We only source authentic, quality products from trusted suppliers. Every bundle is carefully curated and checked before shipping.' },
];

// =============================================
// PRODUCTS
// =============================================

export const PRODUCTS = [
  // ========== MEN'S COLLECTION ==========
  {
    id: 101,
    name: "Level Up Kit – New Year, New You",
    desc: "No more excuses. This is your sign to lock in and build the version of yourself you've been putting off. The Level Up Kit has everything you need to start dominating your days – a goal journal to map out your wins, a 1.3L water bottle to keep you hydrated, and a full bodyweight training setup including resistance bands, push-up bars, and a skipping rope.\n\nWhether it's 5am cold showers or finally sticking to a routine, this kit meets you where you're at. The hand grip strengthener is perfect for building discipline one squeeze at a time – because strength starts with the small stuff.\n\nInside: Daily Planner & Goal Journal, 1.3L Water Bottle, Hand Grip Strengthener, Skipping Rope, Resistance Bands (3-pack), Push-Up Bars",
    price: 89,
    was: 99,
    img: "https://i.ibb.co/0pjjzY76/unnamed.jpg",
    images: ["https://i.ibb.co/0pjjzY76/unnamed.jpg"],
    tag: "🔥 ONLY 5 LEFT",
    tagBg: "#EF4444",
    cat: "mens",
    stock: 5,
    sold: 1247,
    reviews: [
      { u: "Daniel M.", r: 5, t: "This kit actually got me off the couch. No excuses now.", v: true },
      { u: "Steve R.", r: 5, t: "Perfect for my morning routine. Quality stuff.", v: true },
      { u: "Josh K.", r: 5, t: "Bought this as a new year reset. Best decision.", v: true }
    ],
    related: [102, 103, 104]
  },
  {
    id: 102,
    name: "Home Gym Starter Kit",
    desc: "Skip the crowded gym and overpriced memberships. The Home Gym Starter Kit gives you everything you need to get moving from your lounge room, garage, or backyard. Inside you'll find a quality fitness mat, ankle weights for added resistance, a protein shaker for post-workout fuel, and a complete home gym set with an ab wheel and resistance bands.\n\nThis is the perfect gift for someone starting their fitness journey – or restarting it. No judgement, no excuses, just results. New Year's resolution? Sorted.\n\nInside: Yoga/Fitness Mat, Ankle Weights, Protein Shaker, Ab Wheel, Resistance Bands",
    price: 99,
    was: 109,
    img: "https://i.ibb.co/hR180S5P/unnamed.jpg",
    images: ["https://i.ibb.co/hR180S5P/unnamed.jpg"],
    tag: "⚡ 4 LEFT",
    tagBg: "#F59E0B",
    cat: "mens",
    stock: 4,
    sold: 892,
    reviews: [
      { u: "Ryan T.", r: 5, t: "Finally cancelled my gym membership. This has everything.", v: true },
      { u: "Chris L.", r: 5, t: "Great quality mat and the ab wheel is brutal!", v: true },
      { u: "Mike P.", r: 5, t: "Perfect starter kit. Wish I got this sooner.", v: true }
    ],
    related: [101, 103, 104]
  },
  {
    id: 103,
    name: "Executive Grooming Kit",
    desc: "First impressions matter. The Executive Grooming Kit is for the man who takes pride in how he presents himself – whether that's in the boardroom, on a date, or just looking sharp for no reason at all. This set includes an all-in-one grooming trimmer with attachments, a quality face wash, luxe bath and body essentials, and a comb and brush set.\n\nIt's the kind of gift that says \"you're worth it\" without being over the top. Perfect for partners, dads, grads, or any bloke who deserves an upgrade.\n\nInside: All-in-One Grooming Kit (trimmer + attachments), Face Wash, Bath & Body Tin, Comb & Brush Set",
    price: 79,
    was: 89,
    img: "https://i.ibb.co/VWSD9pjT/unnamed.jpg",
    images: ["https://i.ibb.co/VWSD9pjT/unnamed.jpg"],
    tag: "🔥 ONLY 3 LEFT",
    tagBg: "#EF4444",
    cat: "mens",
    stock: 3,
    sold: 1156,
    reviews: [
      { u: "James W.", r: 5, t: "My wife bought this for me. Best gift she's ever given.", v: true },
      { u: "Tom H.", r: 5, t: "The trimmer alone is worth the price. Everything else is a bonus.", v: true },
      { u: "Ben S.", r: 5, t: "Feeling fresh. Great quality products.", v: true }
    ],
    related: [101, 102, 104]
  },

  // ========== WOMEN'S COLLECTION ==========
  {
    id: 201,
    name: "New Mum Pamper Box",
    desc: "She's given everything. Now it's her turn. The New Mum Pamper Box is a thoughtful gift for the incredible woman who just brought life into the world – and probably hasn't had five minutes to herself since. Inside you'll find a soft robe, a soothing face mask, Epsom bath salts, a beautifully scented candle, a silk sleep mask, a spa headband, and nourishing body oil.\n\nThis isn't just a gift – it's permission to slow down. Perfect for baby showers, push presents, or just saying \"you're doing amazing.\"\n\nInside: Robe/Dressing Gown, Face Mask, Epsom Bath Salts, Scented Candle, Sleep Mask, Headband, Body Oil",
    price: 99,
    was: 109,
    img: "https://i.ibb.co/bRzcgk71/unnamed.jpg",
    images: ["https://i.ibb.co/bRzcgk71/unnamed.jpg"],
    tag: "💝 5 LEFT",
    tagBg: "#EC4899",
    cat: "womens",
    stock: 5,
    sold: 2341,
    reviews: [
      { u: "Emily R.", r: 5, t: "Gave this to my sister after her baby. She cried happy tears.", v: true },
      { u: "Kate M.", r: 5, t: "The robe is SO soft. This whole box is perfect.", v: true },
      { u: "Sarah L.", r: 5, t: "Best baby shower gift. She absolutely loved it.", v: true },
      { u: "Jess T.", r: 5, t: "Bought this for myself honestly. No regrets!", v: true }
    ],
    related: [104, 301, 302]
  },

  // ========== KIDS COLLECTION ==========
  {
    id: 300,
    name: "Bluey Ultimate Bundle",
    desc: "🔥 SELLING FAST! Everything your little one needs for adventure! Includes official Bluey backpack, Crayola colouring sticker sheet, adorable 2-tier Bluey snack box & 24-pack of Crayola crayons. Perfect for school, daycare or weekend fun. Limited stock - when they're gone, they're gone!",
    price: 93,
    was: 103.33,
    img: "https://i.ibb.co/7t8tKxWT/bluey-bundle.png",
    images: ["https://i.ibb.co/7t8tKxWT/bluey-bundle.png"],
    tag: "🔥 ONLY 5 LEFT",
    tagBg: "#EF4444",
    cat: "kids",
    stock: 5,
    sold: 847,
    reviews: [
      { u: "Sarah M.", r: 5, t: "My daughter is OBSESSED! Best value ever.", v: true },
      { u: "Mike T.", r: 5, t: "Got this for my son's birthday - huge hit!", v: true },
      { u: "Emma L.", r: 5, t: "Amazing quality, shipped super fast!", v: true },
      { u: "Chris P.", r: 5, t: "Bought 2 - one for each kid. They love it!", v: true }
    ],
    related: [301, 302, 201]
  },
  {
    id: 301,
    name: "Kids Creative Art Kit",
    desc: "Finally – a gift that keeps them busy AND off screens. The Kids Creative Art Kit is packed with over 208 pieces of creative goodness, including pencils, crayons, markers, watercolours, brushes, and pastels all in a handy carry case. Add in a quality sketchbook, modelling clay, a paint-your-own canvas with easel, and a fun stamp set – and you've got hours of mess-free(ish) creativity.\n\nPerfect for rainy days, school holidays, or any time you need a break. Suits ages 5-12 and every kind of little artist.\n\nInside: 208-Piece Artist Case, Sketchbook/Drawing Pad, Modelling Clay, Paint Your Own Canvas & Easel Set, Stamp Set",
    price: 85,
    was: 95,
    img: "https://i.ibb.co/qF7Cg6dt/unnamed.jpg",
    images: ["https://i.ibb.co/qF7Cg6dt/unnamed.jpg"],
    tag: "⚡ 4 LEFT",
    tagBg: "#F59E0B",
    cat: "kids",
    stock: 4,
    sold: 1432,
    reviews: [
      { u: "Michelle K.", r: 5, t: "My kids haven't touched the iPad in days. Worth every cent.", v: true },
      { u: "David R.", r: 5, t: "So much stuff in this kit! Incredible value.", v: true },
      { u: "Amy T.", r: 5, t: "Perfect birthday gift. The carry case is great quality.", v: true }
    ],
    related: [300, 302, 201]
  },
  {
    id: 302,
    name: "Little Explorer Kit",
    desc: "Get them off the couch and into the backyard – or beyond. The Little Explorer Kit is made for curious kids who love bugs, birds, and big adventures. Inside you'll find a pair of walkie talkies (because every mission needs comms), a bug explorer activity set, two camping torches, a beautifully illustrated \"Nature Explained\" book by Helen Brown, and an adorable dinosaur backpack to carry it all.\n\nPerfect for camping trips, nature walks, or just exploring the local park. Suits ages 4-10.\n\nInside: Walkie Talkies, Bug Explorer Activity Set, Camping Torches (2-pack), \"Nature Explained\" Book, Dinosaur Backpack",
    price: 109,
    was: 119,
    img: "https://i.ibb.co/MwR5Ffq/unnamed.jpg",
    images: ["https://i.ibb.co/MwR5Ffq/unnamed.jpg"],
    tag: "🔥 ONLY 3 LEFT",
    tagBg: "#EF4444",
    cat: "kids",
    stock: 3,
    sold: 876,
    reviews: [
      { u: "Peter M.", r: 5, t: "My son won't take off the backpack. Obsessed with the walkie talkies!", v: true },
      { u: "Laura S.", r: 5, t: "Finally got the kids outside. This kit is amazing.", v: true },
      { u: "Dan W.", r: 5, t: "Great quality and so much in the box. Kids love it.", v: true }
    ],
    related: [300, 301, 201]
  },

  // ========== GIFTS COLLECTION ==========
  {
    id: 104,
    name: "Coffee Connoisseur Kit",
    desc: "Ditch the instant and start brewing like you mean it. The Coffee Connoisseur Kit is for anyone who believes mornings should start with a proper cup – not whatever's left in the office kitchen. You'll get an electric grinder for fresh beans, a 3-cup French press, a handheld milk frother for café-style foam, an insulated travel mug, and a storage canister to keep your beans fresh.\n\nWhether you're working from home or just serious about your coffee ritual, this kit delivers barista-quality brews without leaving the house. A dream gift for the coffee snob in your life.\n\nInside: Electric Coffee Grinder, Coffee Canister, 3-Cup French Press, Insulated Travel Mug, Handheld Milk Frother",
    price: 89,
    was: 99,
    img: "https://i.ibb.co/nMkSKSJk/unnamed.jpg",
    images: ["https://i.ibb.co/nMkSKSJk/unnamed.jpg"],
    tag: "☕ 5 LEFT",
    tagBg: "#78350F",
    cat: "gifts",
    stock: 5,
    sold: 1678,
    reviews: [
      { u: "Mark T.", r: 5, t: "Best coffee I've made at home. The grinder is a game changer.", v: true },
      { u: "Sophie L.", r: 5, t: "Bought for my husband. He uses it every single day.", v: true },
      { u: "James R.", r: 5, t: "The frother makes amazing foam. Great kit overall.", v: true },
      { u: "Nicole P.", r: 5, t: "Perfect WFH setup. Coffee shop quality at home.", v: true }
    ],
    related: [101, 103, 201]
  },

  // ========== SOLD OUT - MEN'S ==========
  {
    id: 105,
    name: "Tactical EDC Bundle",
    desc: "Be prepared for anything. Multi-tool, tactical flashlight, premium notebook, pen, minimalist wallet & survival essentials.",
    price: 79,
    was: 89,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 943,
    reviews: [{ u: "Chris B.", r: 5, t: "Built to last", v: true }],
    related: [101, 102, 103]
  },
  {
    id: 106,
    name: "Weekend Warrior Kit",
    desc: "Adventure awaits. Waterproof backpack, portable speaker, premium sunglasses, cooler bag & outdoor essentials.",
    price: 99,
    was: 110,
    img: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800",
    images: ["https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 1421,
    reviews: [{ u: "Dan W.", r: 5, t: "Perfect for camping trips", v: true }],
    related: [101, 102, 103]
  },
  {
    id: 107,
    name: "Gentleman's Whiskey Set",
    desc: "Sophisticated taste. Crystal decanter, whiskey stones, premium glasses & cigar accessories.",
    price: 149,
    was: 169,
    img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
    images: ["https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 892,
    reviews: [{ u: "James R.", r: 5, t: "Classy addition to my bar", v: true }],
    related: [103, 104, 101]
  },
  {
    id: 108,
    name: "Tech Essentials Bundle",
    desc: "Stay connected. Wireless earbuds, power bank, phone stand, cable kit & screen cleaner.",
    price: 79,
    was: 89,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "mens",
    stock: 0,
    sold: 2567,
    reviews: [{ u: "Mike T.", r: 5, t: "Everything a tech guy needs", v: true }],
    related: [101, 102, 103]
  },

  // ========== SOLD OUT - WOMEN'S ==========
  {
    id: 202,
    name: "Luxe Skincare Bundle",
    desc: "Glow like never before. Premium serums, moisturisers, face masks, jade roller & beauty bag.",
    price: 89,
    was: 99,
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 1456,
    reviews: [{ u: "Sophie M.", r: 5, t: "My skin has never looked better!", v: true }],
    related: [201, 203, 204]
  },
  {
    id: 203,
    name: "Self Care Pamper Box",
    desc: "You deserve this. Bath bombs, scented candles, face masks, chocolates & relaxation essentials.",
    price: 69,
    was: 79,
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 1834,
    reviews: [{ u: "Emma W.", r: 5, t: "Best gift to myself ever!", v: true }],
    related: [201, 202, 204]
  },
  {
    id: 204,
    name: "Date Night Glam Kit",
    desc: "Turn heads. Makeup essentials, perfume samples, jewellery accessories & clutch bag.",
    price: 79,
    was: 89,
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 987,
    reviews: [{ u: "Olivia R.", r: 5, t: "Felt like a queen on my date!", v: true }],
    related: [201, 202, 203]
  },
  {
    id: 205,
    name: "Yoga & Wellness Bundle",
    desc: "Find your zen. Premium yoga mat, blocks, strap, essential oils & meditation guide.",
    price: 99,
    was: 109,
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    images: ["https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "womens",
    stock: 0,
    sold: 1341,
    reviews: [{ u: "Mia L.", r: 5, t: "Perfect for my morning routine", v: true }],
    related: [201, 202, 203]
  },

  // ========== SOLD OUT - KIDS ==========
  {
    id: 303,
    name: "STEM Building Bundle",
    desc: "Build & learn! Building blocks, engineering challenges, instruction cards & storage box. Ages 6-12.",
    price: 69,
    was: 79,
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800",
    images: ["https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 1765,
    reviews: [{ u: "Peter W.", r: 5, t: "Educational and fun!", v: true }],
    related: [300, 301, 302]
  },
  {
    id: 304,
    name: "Gaming Starter Pack",
    desc: "Level up! Gaming headset, LED lights, controller grips, snack bowl & gaming accessories.",
    price: 79,
    was: 89,
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800",
    images: ["https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 2456,
    reviews: [{ u: "Tyler M.", r: 5, t: "Best birthday gift ever!", v: true }],
    related: [300, 301, 302]
  },
  {
    id: 305,
    name: "Back to School Essentials",
    desc: "Everything they need! Premium notebooks, pens, folders, calculator, pencil case & fun surprises.",
    price: 59,
    was: 69,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    images: ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "kids",
    stock: 0,
    sold: 1847,
    reviews: [{ u: "Sarah M.", r: 5, t: "Kids absolutely loved this!", v: true }],
    related: [300, 301, 302]
  },

  // ========== SOLD OUT - GIFTS ==========
  {
    id: 401,
    name: "Premium Gift Box",
    desc: "Luxury curated selection. Hand-picked premium items beautifully packaged for special occasions.",
    price: 129,
    was: 149,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
    images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 892,
    reviews: [{ u: "Emma W.", r: 5, t: "Stunning presentation!", v: true }],
    related: [104, 201, 103]
  },
  {
    id: 402,
    name: "Date Night Box",
    desc: "Romance ready. Candles, massage oil, chocolates, wine accessories & couples game.",
    price: 79,
    was: 89,
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    images: ["https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 1145,
    reviews: [{ u: "Lisa M.", r: 5, t: "Anniversary was perfect!", v: true }],
    related: [104, 201, 401]
  },
  {
    id: 403,
    name: "Housewarming Bundle",
    desc: "Welcome home! Candles, plant, kitchen essentials, coasters & decorative items.",
    price: 69,
    was: 79,
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800",
    images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 1876,
    reviews: [{ u: "Alex T.", r: 5, t: "Perfect housewarming gift!", v: true }],
    related: [104, 401, 402]
  },
  {
    id: 404,
    name: "Get Well Soon Bundle",
    desc: "Speedy recovery. Cosy socks, herbal tea, comfort snacks, puzzle book & feel-better essentials.",
    price: 59,
    was: 69,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800"],
    tag: "SOLD OUT",
    tagBg: "#555555",
    cat: "gifts",
    stock: 0,
    sold: 1432,
    reviews: [{ u: "Jenny L.", r: 5, t: "Sent this to my friend, she cried happy tears", v: true }],
    related: [104, 201, 401]
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

// HELPER: Get shipping rate
export const getShippingRate = (countryCode, stateCode = null, express = false) => {
  const rates = SITE.shipping.rates;
  
  if (countryCode === 'AU' && stateCode && rates.AU[stateCode]) {
    return express ? rates.AU[stateCode].express : rates.AU[stateCode].standard;
  }
  
  if (rates[countryCode]) {
    return express ? rates[countryCode].express : rates[countryCode].standard;
  }
  
  return express ? 49.95 : 29.95;
};

// HELPER: Get shipping time
export const getShippingTime = (countryCode, stateCode = null) => {
  const rates = SITE.shipping.rates;
  
  if (countryCode === 'AU' && stateCode && rates.AU[stateCode]) {
    return rates.AU[stateCode].time;
  }
  
  if (rates[countryCode]) {
    return rates[countryCode].time;
  }
  
  return '7-14 days';
};
