import { useState, useEffect, useRef } from 'react';

// ===========================================
// ARK GLOBAL SUPPLY - V6 ULTIMATE
// Australia-Based E-Commerce Platform
// ===========================================

const ADMIN_PASSWORD = "30920654IC@&";

// Color Themes - Bright & Lively
const THEMES = {
  sunrise: {
    name: "Sunrise",
    bg: "#FFFBF7",
    bgSecondary: "#FFF5EB",
    bgCard: "#FFFFFF",
    text: "#1A1A2E",
    textMuted: "#6B7280",
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    accent: "#FFE66D",
    purple: "#A855F7",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 50%, #4ECDC4 100%)",
    gradientBtn: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    glow: "rgba(255, 107, 107, 0.3)",
    border: "rgba(0,0,0,0.08)",
    shadow: "0 4px 24px rgba(255, 107, 107, 0.15)"
  },
  ocean: {
    name: "Ocean",
    bg: "#F0FDFF",
    bgSecondary: "#E0F7FA",
    bgCard: "#FFFFFF",
    text: "#1A1A2E",
    textMuted: "#6B7280",
    primary: "#00BCD4",
    secondary: "#FF6B6B",
    accent: "#FFE66D",
    purple: "#7C4DFF",
    gradient: "linear-gradient(135deg, #00BCD4 0%, #7C4DFF 100%)",
    gradientBtn: "linear-gradient(135deg, #00BCD4 0%, #00ACC1 100%)",
    glow: "rgba(0, 188, 212, 0.3)",
    border: "rgba(0,0,0,0.08)",
    shadow: "0 4px 24px rgba(0, 188, 212, 0.15)"
  },
  sunset: {
    name: "Sunset",
    bg: "#FFF8F5",
    bgSecondary: "#FFEDE5",
    bgCard: "#FFFFFF",
    text: "#1A1A2E",
    textMuted: "#6B7280",
    primary: "#F97316",
    secondary: "#EC4899",
    accent: "#FBBF24",
    purple: "#8B5CF6",
    gradient: "linear-gradient(135deg, #F97316 0%, #EC4899 100%)",
    gradientBtn: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
    glow: "rgba(249, 115, 22, 0.3)",
    border: "rgba(0,0,0,0.08)",
    shadow: "0 4px 24px rgba(249, 115, 22, 0.15)"
  },
  midnight: {
    name: "Midnight",
    bg: "#0F0F1A",
    bgSecondary: "#1A1A2E",
    bgCard: "#252540",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.6)",
    primary: "#FF6B6B",
    secondary: "#4ECDC4",
    accent: "#FFE66D",
    purple: "#A855F7",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #A855F7 100%)",
    gradientBtn: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
    glow: "rgba(255, 107, 107, 0.4)",
    border: "rgba(255,255,255,0.1)",
    shadow: "0 4px 24px rgba(0, 0, 0, 0.3)"
  }
};

const LANGUAGES = {
  en: { name: 'English', flag: '🇦🇺' },
  zh: { name: '中文', flag: '🇨🇳' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  hi: { name: 'हिन्दी', flag: '🇮🇳' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  es: { name: 'Español', flag: '🇪🇸' }
};

const COUNTRIES = {
  AU: { name: 'Australia', currency: 'AUD', symbol: '$', rate: 1, etaDays: [1, 3], flag: '🇦🇺', expressZone: true },
  NZ: { name: 'New Zealand', currency: 'NZD', symbol: 'NZ$', rate: 1.08, etaDays: [3, 7], flag: '🇳🇿', expressZone: false },
  US: { name: 'United States', currency: 'USD', symbol: 'US$', rate: 0.65, etaDays: [7, 14], flag: '🇺🇸', expressZone: false },
  GB: { name: 'United Kingdom', currency: 'GBP', symbol: '£', rate: 0.52, etaDays: [7, 14], flag: '🇬🇧', expressZone: false },
  SG: { name: 'Singapore', currency: 'SGD', symbol: 'S$', rate: 0.87, etaDays: [5, 10], flag: '🇸🇬', expressZone: false },
  JP: { name: 'Japan', currency: 'JPY', symbol: '¥', rate: 97, etaDays: [5, 10], flag: '🇯🇵', expressZone: false },
  CN: { name: 'China', currency: 'CNY', symbol: '¥', rate: 4.7, etaDays: [7, 14], flag: '🇨🇳', expressZone: false },
  IN: { name: 'India', currency: 'INR', symbol: '₹', rate: 54, etaDays: [10, 18], flag: '🇮🇳', expressZone: false },
  DE: { name: 'Germany', currency: 'EUR', symbol: '€', rate: 0.60, etaDays: [7, 14], flag: '🇩🇪', expressZone: false },
  FR: { name: 'France', currency: 'EUR', symbol: '€', rate: 0.60, etaDays: [7, 14], flag: '🇫🇷', expressZone: false }
};

// NSW gets express shipping
const NSW_POSTCODES_START = ['2'];

const DEFAULT_PRODUCTS = [
  { id: 1, name: "Back to School Bundle", description: "Everything they need to crush the new year! Notebooks, pens, folders, calculator, pencil case & more goodies.", price: 49.99, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80", tag: "🔥 BESTSELLER", category: "kids", stock: 50, reviews: [{user: "Sarah M.", rating: 5, text: "Perfect for my kids!", date: "2024-11-15"}, {user: "Mike T.", rating: 5, text: "Great value bundle", date: "2024-11-10"}] },
  { id: 2, name: "Ultimate Christmas Bundle", description: "Festive magic delivered! Decorations, lights, stockings, gift wrap, and holiday surprises for the whole family.", price: 89.99, image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&q=80", tag: "🎄 SEASONAL", category: "holiday", stock: 25, reviews: [{user: "Jenny L.", rating: 5, text: "Made our Christmas so easy!", date: "2024-11-20"}] },
  { id: 3, name: "Kids Creative Pack", description: "Unleash their imagination! Art supplies, craft materials, coloring books, stickers & creative tools galore.", price: 39.99, image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&auto=format&fit=crop&q=80", tag: "⭐ POPULAR", category: "kids", stock: 100, reviews: [{user: "Amy R.", rating: 4, text: "Kids love it!", date: "2024-11-18"}, {user: "David K.", rating: 5, text: "So much stuff in here", date: "2024-11-12"}] },
  { id: 4, name: "Home Office Starter", description: "Work from anywhere in style! Desk organizers, tech accessories, stationery & productivity essentials.", price: 79.99, image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop&q=80", tag: "✨ NEW", category: "office", stock: 35, reviews: [{user: "Chris B.", rating: 5, text: "Perfect for WFH setup", date: "2024-11-22"}] },
  { id: 5, name: "Birthday Party Pack", description: "Instant celebration! Decorations, tableware, balloons, banners, and party favors for up to 12 guests.", price: 34.99, image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80", tag: "🎉 FUN", category: "party", stock: 5, reviews: [{user: "Lisa P.", rating: 5, text: "Saved me so much time!", date: "2024-11-14"}] },
  { id: 6, name: "Premium Gift Box", description: "Luxury curated. Hand-picked premium items beautifully packaged. Perfect for special occasions.", price: 129.99, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80", tag: "💎 LUXURY", category: "gift", stock: 15, reviews: [{user: "Emma W.", rating: 5, text: "Beautiful presentation!", date: "2024-11-19"}, {user: "James H.", rating: 5, text: "My wife loved it", date: "2024-11-16"}] },
  { id: 7, name: "Summer Beach Bundle", description: "Sun's out! Beach towel, sunscreen, hat, sunglasses, waterproof phone pouch & summer essentials.", price: 59.99, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80", tag: "☀️ SUMMER", category: "outdoor", stock: 40, reviews: [{user: "Tom S.", rating: 4, text: "Great for beach trips", date: "2024-11-21"}] },
  { id: 8, name: "Self Care Pamper Box", description: "Treat yourself! Face masks, bath bombs, candles, chocolates & relaxation goodies for the ultimate chill day.", price: 69.99, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80", tag: "💆 WELLNESS", category: "gift", stock: 30, reviews: [{user: "Nina G.", rating: 5, text: "Best gift to myself!", date: "2024-11-17"}] }
];

const DEFAULT_DISCOUNT_CODES = [
  { code: 'WELCOME15', type: 'percent', value: 15, active: true },
  { code: 'AUSSIE10', type: 'percent', value: 10, active: true },
  { code: 'FLAT20', type: 'fixed', value: 20, active: true },
  { code: 'FREESHIP', type: 'shipping', value: 0, active: true }
];

const FAQ_DATA = [
  { q: 'How long does shipping take?', a: 'NSW orders arrive in 1-3 business days! Other Australian states take 3-5 days. International shipping varies from 5-18 business days depending on destination.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to over 10 countries including NZ, USA, UK, Singapore, Japan, and more. Select your country at checkout for accurate pricing.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all products under Australian Consumer Law. Not happy? Contact us for a full refund or exchange.' },
  { q: 'Can I pay with Afterpay or Zip?', a: 'Absolutely! We accept Afterpay, Zip Pay, and all major credit cards. Buy now, pay later with 4 interest-free payments.' },
  { q: 'How do I track my order?', a: 'Once shipped, you\'ll get an email with tracking info. You can also track orders in your account dashboard or contact us anytime.' },
  { q: 'Are bundles customizable?', a: 'Currently we offer pre-curated bundles for the best value. We\'re working on custom options - sign up to our newsletter to be first to know!' },
  { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Afterpay, and Zip Pay through our secure checkout.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes! Add gift wrapping at checkout for just $5. We\'ll beautifully wrap your bundle with a personalized message card.' }
];

const SOCIAL_PROOF_NAMES = ['Emma from Sydney', 'Liam from Melbourne', 'Olivia from Brisbane', 'Noah from Perth', 'Ava from Adelaide', 'Jack from Gold Coast', 'Sophie from Canberra', 'William from Hobart'];

const ANNOUNCEMENTS = [
  '🎉 FREE SHIPPING on orders over $75!',
  '🔥 SUMMER SALE: Up to 30% off selected bundles!',
  '⚡ NSW Express: Order before 2pm for next-day delivery!',
  '💜 New customers: Use code WELCOME15 for 15% off!'
];

// Legal Content
const LEGAL_CONTENT = {
  privacy: `# Privacy Policy\n\n**Ark Global Supply Pty Ltd** | ABN: 12 345 678 901 | Last updated: December 2024\n\n## Information We Collect\nWe collect personal information including name, email, shipping address, payment details (processed securely via Stripe), and phone number.\n\n## How We Use Your Information\n- Process and fulfill your orders\n- Send order confirmations and shipping updates\n- Respond to your questions\n- Send promotional emails (with consent)\n- Improve our services\n\n## Your Rights Under Australian Privacy Law\nYou have the right to access, correct, or delete your personal data. Contact us at privacy@arkglobalsupply.com.au`,
  terms: `# Terms of Service\n\n**Ark Global Supply Pty Ltd** | ABN: 12 345 678 901 | Last updated: December 2024\n\n## Agreement\nBy using our website, you agree to these terms.\n\n## Products & Pricing\nPrices are in AUD unless otherwise stated. We reserve the right to modify prices.\n\n## Orders\nOrders are subject to availability. Payment is processed securely via Stripe.\n\n## Australian Consumer Law\nOur goods come with guarantees that cannot be excluded under Australian Consumer Law.`,
  refund: `# Refund Policy\n\n**30-Day Money-Back Guarantee**\n\nUnder Australian Consumer Law, you're entitled to a refund if goods are faulty, don't match the description, or don't do what they're supposed to.\n\n## How to Request a Refund\n1. Email support@arkglobalsupply.com.au within 30 days\n2. Include your order number and reason\n3. We'll process your refund within 5-10 business days\n\n## Shipping Returns\nWe provide prepaid return labels for Australian addresses.`
};

// ==========================================
// COMPONENTS
// ==========================================

// Logo Component
const ArkLogo = ({ size = 40, theme }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{
      width: size, height: size, background: theme.gradientBtn, borderRadius: size * 0.3,
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      boxShadow: theme.shadow
    }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M12 6L6 9V15L12 18L18 15V9L12 6Z" fill="white" opacity="0.9"/>
        <path d="M12 10L9 11.5V14.5L12 16L15 14.5V11.5L12 10Z" fill={theme.primary}/>
      </svg>
    </div>
    <div>
      <div style={{ fontSize: size * 0.4, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif", color: theme.text }}>ARK GLOBAL</div>
      <div style={{ fontSize: size * 0.22, fontWeight: 500, letterSpacing: '0.15em', color: theme.textMuted, marginTop: -2 }}>SUPPLY CO.</div>
    </div>
  </div>
);

// Star Rating Component
const StarRating = ({ rating, size = 16, interactive = false, onChange }) => {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star}
          style={{ fontSize: size, cursor: interactive ? 'pointer' : 'default', color: star <= (hover || rating) ? '#FFB800' : '#DDD', transition: 'all 0.2s' }}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange && onChange(star)}>★</span>
      ))}
    </div>
  );
};

// Image Upload Component
const ImageUpload = ({ currentImage, onImageChange, theme }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const uploadImage = async (file) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=c08b37c3a5e1478cb0e50d3afb33db3e', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) onImageChange(data.data.url);
    } catch (e) {}
    setIsUploading(false);
  };
  return (
    <div onClick={() => fileInputRef.current?.click()} style={{ border: `2px dashed ${theme.border}`, borderRadius: 16, padding: 20, textAlign: 'center', cursor: 'pointer', background: theme.bgSecondary }}>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => e.target.files[0] && uploadImage(e.target.files[0])} style={{ display: 'none' }} />
      {isUploading ? <div style={{ color: theme.textMuted }}>Uploading...</div> : currentImage ? <img src={currentImage} alt="" style={{ maxWidth: '100%', maxHeight: 100, borderRadius: 8 }} /> : <div style={{ color: theme.textMuted }}>📷 Click to upload</div>}
    </div>
  );
};

// Confetti Component
const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {[...Array(50)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 10, height: 10,
          background: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A855F7', '#FF8E53'][i % 5],
          left: `${Math.random() * 100}%`,
          top: -20,
          borderRadius: i % 2 === 0 ? '50%' : 0,
          animation: `confetti-fall ${2 + Math.random()}s ease-out forwards`,
          animationDelay: `${Math.random() * 0.5}s`
        }} />
      ))}
    </div>
  );
};

// Social Proof Popup
const SocialProofPopup = ({ show, name, product, theme }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, background: theme.bgCard, borderRadius: 16,
      padding: 16, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      border: `1px solid ${theme.border}`, animation: 'slideInLeft 0.5s ease', zIndex: 100, maxWidth: 320
    }}>
      <div style={{ width: 50, height: 50, borderRadius: 12, background: theme.bgSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🛍️</div>
      <div>
        <div style={{ fontSize: 13, color: theme.textMuted }}>{name} just purchased</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{product}</div>
        <div style={{ fontSize: 11, color: theme.primary, marginTop: 2 }}>✓ Verified purchase</div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP
// ==========================================
export default function ArkGlobalSupply() {
  // State
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [notification, setNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('sunrise');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminTab, setAdminTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', tag: '', category: '', stock: 50 });
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('AU');
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountInput, setDiscountInput] = useState('');
  const [discountCodes, setDiscountCodes] = useState(DEFAULT_DISCOUNT_CODES);
  const [showLegal, setShowLegal] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [socialProof, setSocialProof] = useState({ show: false, name: '', product: '' });
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showProductModal, setShowProductModal] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [userOrders, setUserOrders] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '' });

  const theme = THEMES[currentTheme];
  const countryData = COUNTRIES[country];

  // Rotate announcements
  useEffect(() => {
    const interval = setInterval(() => setAnnouncementIndex(i => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(interval);
  }, []);

  // Social proof popup
  useEffect(() => {
    const showRandomProof = () => {
      if (Math.random() > 0.5) {
        const name = SOCIAL_PROOF_NAMES[Math.floor(Math.random() * SOCIAL_PROOF_NAMES.length)];
        const product = products[Math.floor(Math.random() * products.length)];
        setSocialProof({ show: true, name, product: product.name });
        setTimeout(() => setSocialProof({ show: false, name: '', product: '' }), 5000);
      }
    };
    const interval = setInterval(showRandomProof, 15000);
    setTimeout(showRandomProof, 5000);
    return () => clearInterval(interval);
  }, [products]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      ['hero', 'products', 'about', 'faq', 'newsletter', 'contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          setVisibleSections(prev => ({ ...prev, [id]: rect.top < window.innerHeight * 0.8 }));
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved data
  useEffect(() => {
    setIsLoaded(true);
    const load = (key, setter, parser = JSON.parse) => {
      const val = localStorage.getItem(key);
      if (val) try { setter(parser(val)); } catch (e) {}
    };
    load('ark-theme', setCurrentTheme, v => v);
    load('ark-products', setProducts);
    load('ark-subscribers', setSubscribers);
    load('ark-discounts', setDiscountCodes);
    load('ark-wishlist', setWishlist);
    load('ark-user', setUser);
    load('ark-users', setUsers);
    load('ark-orders', setUserOrders);
    load('ark-recently-viewed', setRecentlyViewed);
  }, []);

  // Save data
  useEffect(() => { localStorage.setItem('ark-theme', currentTheme); }, [currentTheme]);
  useEffect(() => { localStorage.setItem('ark-products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('ark-subscribers', JSON.stringify(subscribers)); }, [subscribers]);
  useEffect(() => { localStorage.setItem('ark-discounts', JSON.stringify(discountCodes)); }, [discountCodes]);
  useEffect(() => { localStorage.setItem('ark-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('ark-user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('ark-users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('ark-orders', JSON.stringify(userOrders)); }, [userOrders]);
  useEffect(() => { localStorage.setItem('ark-recently-viewed', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);

  // Helpers
  const formatPrice = (aud) => {
    const converted = aud * countryData.rate;
    if (['JPY', 'CNY', 'INR'].includes(countryData.currency)) return `${countryData.symbol}${Math.round(converted).toLocaleString()}`;
    return `${countryData.symbol}${converted.toFixed(2)}`;
  };

  const getETA = () => {
    const [min, max] = countryData.etaDays;
    const isNSW = country === 'AU';
    return isNSW ? `${min}-${max} days (Express NSW! 🚀)` : `${min}-${max} business days`;
  };

  const showNotif = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product) => {
    if (product.stock <= 0) return showNotif('Out of stock!', 'error');
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    showNotif(`${product.name} added to cart! 🎉`);
  };

  const toggleWishlist = (product) => {
    const isWished = wishlist.some(w => w.id === product.id);
    if (isWished) {
      setWishlist(prev => prev.filter(w => w.id !== product.id));
      showNotif('Removed from wishlist');
    } else {
      setWishlist(prev => [...prev, product]);
      showNotif('Added to wishlist! ❤️');
    }
  };

  const removeFromCart = (productId) => setCart(prev => prev.filter(item => item.id !== productId));
  
  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const product = products.find(p => p.id === productId);
        const newQty = Math.max(0, Math.min(item.quantity + delta, product?.stock || 99));
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const applyDiscountCode = () => {
    const code = discountCodes.find(c => c.code.toLowerCase() === discountInput.toLowerCase() && c.active);
    if (code) { setAppliedDiscount(code); showNotif('Discount applied! 🎉'); setDiscountInput(''); }
    else showNotif('Invalid code', 'error');
  };

  const handleSignup = () => {
    if (!authForm.email || !authForm.password || !authForm.name) return showNotif('Please fill all fields', 'error');
    if (users.find(u => u.email === authForm.email)) return showNotif('Email already exists', 'error');
    const newUser = { id: Date.now(), email: authForm.email, password: authForm.password, name: authForm.name, joined: new Date().toISOString() };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    setShowAuthModal(null);
    setAuthForm({ email: '', password: '', name: '' });
    showNotif(`Welcome, ${newUser.name}! 🎉`);
  };

  const handleLogin = () => {
    const found = users.find(u => u.email === authForm.email && u.password === authForm.password);
    if (found) {
      setUser(found);
      setShowAuthModal(null);
      setAuthForm({ email: '', password: '', name: '' });
      showNotif(`Welcome back, ${found.name}! 👋`);
    } else showNotif('Invalid credentials', 'error');
  };

  const handleLogout = () => {
    setUser(null);
    showNotif('Logged out successfully');
  };

  const submitReview = () => {
    if (!user) return showNotif('Please login to review', 'error');
    if (!reviewForm.text) return showNotif('Please write a review', 'error');
    const newReview = { user: user.name, rating: reviewForm.rating, text: reviewForm.text, date: new Date().toISOString().split('T')[0] };
    setProducts(prev => prev.map(p => p.id === showReviewModal ? { ...p, reviews: [...(p.reviews || []), newReview] } : p));
    setShowReviewModal(null);
    setReviewForm({ rating: 5, text: '' });
    showNotif('Review submitted! ⭐');
  };

  const viewProduct = (product) => {
    setShowProductModal(product);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) { setAdminAuth(true); setAdminPassword(''); }
    else showNotif('Incorrect password', 'error');
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return showNotif('Fill name and price', 'error');
    setProducts(prev => [...prev, { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) || 50, reviews: [] }]);
    setNewProduct({ name: '', description: '', price: '', image: '', tag: '', category: '', stock: 50 });
    showNotif('Product added!');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    if (!subscribers.includes(newsletterEmail)) setSubscribers(prev => [...prev, newsletterEmail]);
    setNewsletterEmail('');
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 3000);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedDiscount ? (appliedDiscount.type === 'percent' ? cartSubtotal * (appliedDiscount.value / 100) : appliedDiscount.type === 'fixed' ? appliedDiscount.value : 0) : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const getAvgRating = (reviews) => reviews?.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', -apple-system, sans-serif", position: 'relative', overflow: 'hidden', transition: 'all 0.5s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Confetti */}
      <Confetti active={showConfetti} />
      
      {/* Social Proof */}
      <SocialProofPopup show={socialProof.show} name={socialProof.name} product={socialProof.product} theme={theme} />

      {/* Background decorations */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, background: `radial-gradient(circle, ${theme.primary}20 0%, transparent 70%)`, borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -200, left: -200, width: 600, height: 600, background: `radial-gradient(circle, ${theme.secondary}20 0%, transparent 70%)`, borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, background: `radial-gradient(circle, ${theme.accent}10 0%, transparent 70%)`, borderRadius: '50%' }} />
        {/* Floating shapes */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 20 + i * 10, height: 20 + i * 10,
            background: [theme.primary, theme.secondary, theme.accent, theme.purple][i % 4],
            borderRadius: i % 2 === 0 ? '50%' : '30%',
            left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 25}%`,
            opacity: 0.15,
            animation: `float ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`
          }} />
        ))}
      </div>

      {/* Announcement Bar */}
      <div style={{
        background: theme.gradientBtn, color: '#fff', padding: '10px 20px',
        textAlign: 'center', fontSize: 13, fontWeight: 600,
        position: 'relative', zIndex: 101
      }}>
        <div style={{ animation: 'fadeInUp 0.5s ease' }} key={announcementIndex}>
          {ANNOUNCEMENTS[announcementIndex]}
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 70, right: 24, background: notification.type === 'error' ? '#EF4444' : theme.gradientBtn,
          color: '#fff', padding: '16px 28px', borderRadius: 16, fontSize: 14, fontWeight: 600, zIndex: 1000,
          animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          {notification.msg}
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100, padding: '12px 24px',
        background: scrollY > 50 ? `${theme.bg}f5` : theme.bg,
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${theme.border}`,
        transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ArkLogo size={44} theme={theme} />

          <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {['products', 'about', 'faq', 'contact'].map(section => (
              <a key={section} href={`#${section}`} style={{
                color: theme.textMuted, textDecoration: 'none', fontSize: 14, fontWeight: 500,
                padding: '10px 16px', borderRadius: 12, transition: 'all 0.3s', textTransform: 'capitalize'
              }}
              onMouseEnter={e => { e.target.style.background = theme.bgSecondary; e.target.style.color = theme.text; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = theme.textMuted; }}>
                {section}
              </a>
            ))}

            {/* Country/Currency */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => { setShowCountryPicker(!showCountryPicker); setShowLangPicker(false); setShowThemePicker(false); }}
                style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                {countryData.flag} {countryData.symbol}
              </button>
              {showCountryPicker && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 8, zIndex: 150, minWidth: 200, maxHeight: 300, overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                  {Object.entries(COUNTRIES).map(([code, c]) => (
                    <button key={code} onClick={() => { setCountry(code); setShowCountryPicker(false); }}
                      style={{ width: '100%', padding: '12px 14px', background: country === code ? theme.gradientBtn : 'transparent', color: country === code ? '#fff' : theme.text, border: 'none', borderRadius: 10, cursor: 'pointer', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                      {c.flag} {c.name} ({c.symbol})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme */}
            <button onClick={() => { setShowThemePicker(!showThemePicker); setShowCountryPicker(false); }}
              style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 15 }}>🎨</button>
            
            {/* Admin */}
            <button onClick={() => setShowAdmin(true)}
              style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 15 }}>⚙️</button>

            {/* Wishlist */}
            <button onClick={() => viewProduct({ isWishlistView: true })}
              style={{ position: 'relative', background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 14px', color: theme.text, cursor: 'pointer', fontSize: 15 }}>
              ❤️
              {wishlist.length > 0 && <span style={{ position: 'absolute', top: -6, right: -6, background: theme.primary, color: '#fff', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlist.length}</span>}
            </button>

            {/* User Account */}
            {user ? (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowAuthModal('account')} style={{ background: theme.gradientBtn, border: 'none', borderRadius: 12, padding: '10px 16px', color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  👤 {user.name.split(' ')[0]}
                </button>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal('login')} style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '10px 16px', color: theme.text, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
                Sign In
              </button>
            )}

            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)} style={{
              position: 'relative', background: theme.gradientBtn, border: 'none', borderRadius: 14,
              padding: '12px 24px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: 8, fontSize: 14, fontWeight: 600, boxShadow: theme.shadow
            }}>
              🛒 Cart
              {cartCount > 0 && (
                <span style={{ background: '#fff', color: theme.primary, fontSize: 11, fontWeight: 700, minWidth: 22, height: 22, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>{cartCount}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Theme Picker */}
      {showThemePicker && (
        <>
          <div onClick={() => setShowThemePicker(false)} style={{ position: 'fixed', inset: 0, zIndex: 140 }} />
          <div style={{ position: 'fixed', top: 130, right: 180, background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 20, zIndex: 150, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 14, fontWeight: 600 }}>THEME</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {Object.entries(THEMES).map(([key, t]) => (
                <button key={key} onClick={() => { setCurrentTheme(key); setShowThemePicker(false); }}
                  style={{ padding: 12, borderRadius: 12, border: currentTheme === key ? `2px solid ${t.primary}` : `1px solid ${theme.border}`, background: t.bg, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: t.gradientBtn }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <>
          <div onClick={() => setShowAuthModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bgCard, borderRadius: 24, padding: 32, zIndex: 201, width: '90%', maxWidth: 420, boxShadow: '0 30px 80px rgba(0,0,0,0.2)' }}>
            {showAuthModal === 'account' && user ? (
              <div>
                <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700 }}>My Account</h2>
                <p style={{ color: theme.textMuted, marginBottom: 24 }}>Welcome back, {user.name}!</p>
                <div style={{ background: theme.bgSecondary, borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 4 }}>Email</div>
                  <div style={{ fontWeight: 600 }}>{user.email}</div>
                </div>
                <div style={{ background: theme.bgSecondary, borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 4 }}>Member since</div>
                  <div style={{ fontWeight: 600 }}>{new Date(user.joined).toLocaleDateString()}</div>
                </div>
                <div style={{ background: theme.bgSecondary, borderRadius: 16, padding: 20, marginBottom: 24 }}>
                  <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 8 }}>Wishlist</div>
                  <div style={{ fontWeight: 600 }}>{wishlist.length} items saved</div>
                </div>
                <button onClick={handleLogout} style={{ width: '100%', background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 16, color: theme.text, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  Sign Out
                </button>
              </div>
            ) : showAuthModal === 'signup' ? (
              <div>
                <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700 }}>Create Account</h2>
                <p style={{ color: theme.textMuted, marginBottom: 24 }}>Join the Ark family! 🎉</p>
                <input placeholder="Full name" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                  style={{ width: '100%', padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }} />
                <input placeholder="Email" type="email" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                  style={{ width: '100%', padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }} />
                <input placeholder="Password" type="password" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                  style={{ width: '100%', padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 15, marginBottom: 20, outline: 'none', boxSizing: 'border-box' }} />
                <button onClick={handleSignup} style={{ width: '100%', background: theme.gradientBtn, border: 'none', borderRadius: 14, padding: 16, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>
                  Create Account
                </button>
                <div style={{ textAlign: 'center', color: theme.textMuted, fontSize: 14 }}>
                  Already have an account? <button onClick={() => setShowAuthModal('login')} style={{ background: 'none', border: 'none', color: theme.primary, cursor: 'pointer', fontWeight: 600 }}>Sign in</button>
                </div>
              </div>
            ) : (
              <div>
                <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700 }}>Welcome Back!</h2>
                <p style={{ color: theme.textMuted, marginBottom: 24 }}>Sign in to your account</p>
                <input placeholder="Email" type="email" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                  style={{ width: '100%', padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 15, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }} />
                <input placeholder="Password" type="password" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                  style={{ width: '100%', padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 15, marginBottom: 20, outline: 'none', boxSizing: 'border-box' }} />
                <button onClick={handleLogin} style={{ width: '100%', background: theme.gradientBtn, border: 'none', borderRadius: 14, padding: 16, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>
                  Sign In
                </button>
                <div style={{ textAlign: 'center', color: theme.textMuted, fontSize: 14 }}>
                  New here? <button onClick={() => setShowAuthModal('signup')} style={{ background: 'none', border: 'none', color: theme.primary, cursor: 'pointer', fontWeight: 600 }}>Create account</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Product Modal */}
      {showProductModal && !showProductModal.isWishlistView && (
        <>
          <div onClick={() => setShowProductModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bgCard, borderRadius: 28, padding: 0, zIndex: 201, width: '90%', maxWidth: 800, maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.2)' }}>
            <button onClick={() => setShowProductModal(null)} style={{ position: 'absolute', top: 16, right: 16, background: theme.bgSecondary, border: 'none', borderRadius: 12, width: 40, height: 40, color: theme.text, cursor: 'pointer', fontSize: 18, zIndex: 10 }}>×</button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ position: 'relative' }}>
                <img src={showProductModal.image} alt={showProductModal.name} style={{ width: '100%', height: 400, objectFit: 'cover' }} />
                {showProductModal.tag && <div style={{ position: 'absolute', top: 16, left: 16, background: theme.gradientBtn, padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, color: '#fff' }}>{showProductModal.tag}</div>}
              </div>
              <div style={{ padding: 32, overflow: 'auto', maxHeight: 400 }}>
                <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 700 }}>{showProductModal.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  {getAvgRating(showProductModal.reviews) && (
                    <>
                      <StarRating rating={parseFloat(getAvgRating(showProductModal.reviews))} />
                      <span style={{ fontSize: 14, color: theme.textMuted }}>({showProductModal.reviews?.length} reviews)</span>
                    </>
                  )}
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: theme.primary, marginBottom: 16 }}>{formatPrice(showProductModal.price)}</div>
                <p style={{ color: theme.textMuted, lineHeight: 1.7, marginBottom: 20 }}>{showProductModal.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '12px 16px', background: theme.bgSecondary, borderRadius: 12 }}>
                  <span>🚚</span>
                  <span style={{ fontSize: 14 }}>{getETA()}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => { addToCart(showProductModal); setShowProductModal(null); }}
                    style={{ flex: 1, background: theme.gradientBtn, border: 'none', borderRadius: 14, padding: 16, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                    Add to Cart
                  </button>
                  <button onClick={() => toggleWishlist(showProductModal)}
                    style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '16px 20px', color: wishlist.some(w => w.id === showProductModal.id) ? '#EF4444' : theme.text, cursor: 'pointer', fontSize: 18 }}>
                    {wishlist.some(w => w.id === showProductModal.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                {/* Reviews */}
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${theme.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Reviews</h3>
                    <button onClick={() => { setShowProductModal(null); setShowReviewModal(showProductModal.id); }}
                      style={{ background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 10, padding: '8px 16px', color: theme.text, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                      Write Review
                    </button>
                  </div>
                  {showProductModal.reviews?.length ? showProductModal.reviews.slice(0, 3).map((review, i) => (
                    <div key={i} style={{ background: theme.bgSecondary, borderRadius: 14, padding: 16, marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{review.user}</div>
                        <StarRating rating={review.rating} size={14} />
                      </div>
                      <p style={{ margin: 0, fontSize: 14, color: theme.textMuted }}>{review.text}</p>
                    </div>
                  )) : <p style={{ color: theme.textMuted, fontSize: 14 }}>No reviews yet. Be the first!</p>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Wishlist Modal */}
      {showProductModal?.isWishlistView && (
        <>
          <div onClick={() => setShowProductModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bgCard, borderRadius: 28, padding: 32, zIndex: 201, width: '90%', maxWidth: 500, maxHeight: '80vh', overflow: 'auto' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700 }}>❤️ My Wishlist</h2>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: theme.textMuted }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💔</div>
                <p>Your wishlist is empty</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {wishlist.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 16, background: theme.bgSecondary, borderRadius: 16, padding: 16, alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 12 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                      <div style={{ color: theme.primary, fontWeight: 700 }}>{formatPrice(item.price)}</div>
                    </div>
                    <button onClick={() => { addToCart(item); toggleWishlist(item); }} style={{ background: theme.gradientBtn, border: 'none', borderRadius: 10, padding: '10px 16px', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Add to Cart</button>
                    <button onClick={() => toggleWishlist(item)} style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: 18 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <>
          <div onClick={() => setShowReviewModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bgCard, borderRadius: 24, padding: 32, zIndex: 201, width: '90%', maxWidth: 450 }}>
            <h2 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700 }}>Write a Review</h2>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: theme.textMuted, marginBottom: 8 }}>Your rating</div>
              <StarRating rating={reviewForm.rating} size={32} interactive onChange={r => setReviewForm({ ...reviewForm, rating: r })} />
            </div>
            <textarea placeholder="Share your experience..." value={reviewForm.text} onChange={e => setReviewForm({ ...reviewForm, text: e.target.value })}
              style={{ width: '100%', padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 15, marginBottom: 20, outline: 'none', resize: 'none', height: 120, fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <button onClick={submitReview} style={{ width: '100%', background: theme.gradientBtn, border: 'none', borderRadius: 14, padding: 16, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Submit Review
            </button>
          </div>
        </>
      )}

      {/* Admin Panel */}
      {showAdmin && (
        <>
          <div onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bgCard, borderRadius: 24, padding: 0, zIndex: 201, width: '95%', maxWidth: 900, maxHeight: '90vh', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.bgSecondary }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>⚙️ Admin Panel</h2>
              <button onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{ background: 'transparent', border: 'none', color: theme.text, fontSize: 24, cursor: 'pointer' }}>×</button>
            </div>
            {!adminAuth ? (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>🔐</div>
                <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminLogin()} placeholder="Password"
                  style={{ width: '100%', maxWidth: 280, padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, background: theme.bgSecondary, color: theme.text, fontSize: 16, marginBottom: 20, outline: 'none', textAlign: 'center' }} />
                <br />
                <button onClick={handleAdminLogin} style={{ background: theme.gradientBtn, border: 'none', borderRadius: 14, padding: '14px 40px', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Login</button>
              </div>
            ) : (
              <div style={{ display: 'flex', height: 'calc(90vh - 80px)' }}>
                <div style={{ width: 180, borderRight: `1px solid ${theme.border}`, padding: 16, background: theme.bgSecondary }}>
                  {[{ id: 'products', icon: '📦', label: 'Products' }, { id: 'discounts', icon: '🏷️', label: 'Discounts' }, { id: 'subscribers', icon: '📧', label: `Emails (${subscribers.length})` }, { id: 'users', icon: '👥', label: `Users (${users.length})` }].map(tab => (
                    <button key={tab.id} onClick={() => setAdminTab(tab.id)} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: 'none', background: adminTab === tab.id ? theme.gradientBtn : 'transparent', color: adminTab === tab.id ? '#fff' : theme.text, fontSize: 13, fontWeight: 500, cursor: 'pointer', textAlign: 'left', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>
                <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
                  {adminTab === 'products' && (
                    <div>
                      <div style={{ background: theme.bgSecondary, borderRadius: 16, padding: 20, marginBottom: 24 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 15 }}>➕ Add Product</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                          <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} style={{ padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.bgCard, color: theme.text, outline: 'none' }} />
                          <input placeholder="Price (AUD)" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} style={{ padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.bgCard, color: theme.text, outline: 'none' }} />
                          <input placeholder="Stock" type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} style={{ padding: 12, borderRadius: 10, border: `1px solid ${theme.border}`, background: theme.bgCard, color: theme.text, outline: 'none' }} />
                        </div>
                        <button onClick={addProduct} style={{ marginTop: 12, background: theme.gradientBtn, border: 'none', borderRadius: 10, padding: '12px 24px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Add Product</button>
                      </div>
                      <h3 style={{ margin: '0 0 16px', fontSize: 15 }}>📦 Products ({products.length})</h3>
                      <div style={{ display: 'grid', gap: 10 }}>
                        {products.map(p => (
                          <div key={p.id} style={{ display: 'flex', gap: 12, background: theme.bgSecondary, borderRadius: 12, padding: 12, alignItems: 'center' }}>
                            <img src={p.image || 'https://via.placeholder.com/50'} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }} />
                            <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div><div style={{ fontSize: 12, color: theme.textMuted }}>${p.price} • Stock: {p.stock}</div></div>
                            <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))} style={{ background: '#EF4444', border: 'none', borderRadius: 8, padding: '6px 12px', color: '#fff', cursor: 'pointer', fontSize: 12 }}>Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {adminTab === 'discounts' && (
                    <div>
                      <h3 style={{ margin: '0 0 16px', fontSize: 15 }}>🏷️ Discount Codes</h3>
                      {discountCodes.map((code, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, background: theme.bgSecondary, borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 10 }}>
                          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 16, fontFamily: 'monospace' }}>{code.code}</div><div style={{ fontSize: 13, color: theme.textMuted }}>{code.type === 'percent' ? `${code.value}% off` : code.type === 'fixed' ? `$${code.value} off` : 'Free shipping'}</div></div>
                          <div style={{ padding: '6px 12px', borderRadius: 20, background: code.active ? '#10B98122' : '#EF444422', color: code.active ? '#10B981' : '#EF4444', fontSize: 12, fontWeight: 600 }}>{code.active ? 'Active' : 'Inactive'}</div>
                          <button onClick={() => { const updated = [...discountCodes]; updated[i].active = !updated[i].active; setDiscountCodes(updated); }} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '6px 12px', color: theme.text, cursor: 'pointer', fontSize: 12 }}>{code.active ? 'Disable' : 'Enable'}</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {adminTab === 'subscribers' && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ margin: 0, fontSize: 15 }}>📧 Subscribers ({subscribers.length})</h3>
                        <button onClick={() => { const csv = subscribers.join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click(); }} style={{ background: theme.gradientBtn, border: 'none', borderRadius: 10, padding: '8px 16px', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Export CSV</button>
                      </div>
                      {subscribers.length ? subscribers.map((email, i) => (
                        <div key={i} style={{ padding: '12px 16px', background: theme.bgSecondary, borderRadius: 10, marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                          <span>{email}</span>
                          <button onClick={() => setSubscribers(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Remove</button>
                        </div>
                      )) : <p style={{ color: theme.textMuted }}>No subscribers yet</p>}
                    </div>
                  )}
                  {adminTab === 'users' && (
                    <div>
                      <h3 style={{ margin: '0 0 16px', fontSize: 15 }}>👥 Registered Users ({users.length})</h3>
                      {users.length ? users.map((u, i) => (
                        <div key={i} style={{ padding: '16px', background: theme.bgSecondary, borderRadius: 12, marginBottom: 10 }}>
                          <div style={{ fontWeight: 600 }}>{u.name}</div>
                          <div style={{ fontSize: 13, color: theme.textMuted }}>{u.email} • Joined {new Date(u.joined).toLocaleDateString()}</div>
                        </div>
                      )) : <p style={{ color: theme.textMuted }}>No users yet</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Legal Modal */}
      {showLegal && (
        <>
          <div onClick={() => setShowLegal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: theme.bgCard, borderRadius: 24, padding: 32, zIndex: 201, width: '90%', maxWidth: 600, maxHeight: '80vh', overflow: 'auto' }}>
            <button onClick={() => setShowLegal(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: theme.text, fontSize: 24, cursor: 'pointer' }}>×</button>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: theme.textMuted }}>
              {LEGAL_CONTENT[showLegal].split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} style={{ color: theme.text, fontSize: 24, fontWeight: 700, marginTop: i > 0 ? 24 : 0 }}>{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} style={{ color: theme.text, fontSize: 18, fontWeight: 600, marginTop: 20 }}>{line.replace('## ', '')}</h2>;
                if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ fontWeight: 600, color: theme.text }}>{line.replace(/\*\*/g, '')}</p>;
                return <p key={i}>{line}</p>;
              })}
            </div>
          </div>
        </>
      )}

      {/* ==================== HERO ==================== */}
      <section id="hero" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '80px 24px 60px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${theme.primary}15`, border: `2px solid ${theme.primary}30`, borderRadius: 100, padding: '10px 20px', fontSize: 13, fontWeight: 600, marginBottom: 24, color: theme.primary }}>
              <span style={{ animation: 'bounce 1s infinite' }}>🇦🇺</span> Australia's #1 Bundle Store
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', margin: '0 0 24px', fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ display: 'block' }}>Everything</span>
              <span style={{ display: 'block' }}>You Need.</span>
              <span style={{ display: 'block', background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One Box. 📦</span>
            </h1>
            <p style={{ fontSize: 18, color: theme.textMuted, lineHeight: 1.7, margin: '0 0 32px', maxWidth: 500 }}>
              Curated bundles for every moment. From back-to-school essentials to holiday magic — we pack it all so you don't have to think twice!
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#products" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: theme.gradientBtn, color: '#fff', padding: '18px 36px', borderRadius: 16, fontSize: 16, fontWeight: 700, textDecoration: 'none', boxShadow: theme.shadow, transition: 'all 0.3s' }}>
                Shop Bundles 🛍️
              </a>
              <a href="#about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: theme.bgCard, border: `2px solid ${theme.border}`, color: theme.text, padding: '18px 32px', borderRadius: 16, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
                Learn More
              </a>
            </div>
            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              {[{ icon: '🚚', text: 'Free Shipping $75+' }, { icon: '💳', text: 'Afterpay & Zip' }, { icon: '🔒', text: 'Secure Checkout' }, { icon: '↩️', text: '30-Day Returns' }].map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: theme.textMuted }}>
                  <span style={{ fontSize: 18 }}>{badge.icon}</span> {badge.text}
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0) rotate(0deg)' : 'translateY(60px) rotate(3deg)', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
            {/* Floating elements */}
            <div style={{ position: 'absolute', top: -20, right: 40, background: theme.accent, borderRadius: 16, padding: '12px 20px', fontSize: 14, fontWeight: 700, color: '#1A1A2E', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', animation: 'float 4s ease-in-out infinite', zIndex: 10 }}>⭐ 4.9 Rating</div>
            <div style={{ position: 'absolute', bottom: 40, left: -20, background: theme.secondary, borderRadius: 16, padding: '12px 20px', fontSize: 14, fontWeight: 700, color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', animation: 'float 5s ease-in-out infinite', animationDelay: '1s', zIndex: 10 }}>🎁 10K+ Happy Customers</div>
            <div style={{ background: theme.bgCard, borderRadius: 32, padding: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.08)', border: `1px solid ${theme.border}` }}>
              <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=80" alt="Bundles" style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 24 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRODUCTS ==================== */}
      <section id="products" style={{ padding: '80px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48, opacity: visibleSections.products ? 1 : 0, transform: visibleSections.products ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 16px', fontFamily: "'Space Grotesk', sans-serif" }}>
              Our <span style={{ background: theme.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Bundles</span> 🎉
            </h2>
            <p style={{ fontSize: 18, color: theme.textMuted }}>Curated with love. Delivered with speed.</p>
          </div>

          {/* Search */}
          <div style={{ maxWidth: 500, margin: '0 auto 32px', position: 'relative' }}>
            <input type="text" placeholder="Search bundles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '18px 24px 18px 56px', borderRadius: 20, border: `2px solid ${theme.border}`, background: theme.bgCard, color: theme.text, fontSize: 16, outline: 'none', boxSizing: 'border-box', transition: 'all 0.3s' }}
              onFocus={e => e.target.style.borderColor = theme.primary}
              onBlur={e => e.target.style.borderColor = theme.border} />
            <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding: '12px 24px', borderRadius: 100, border: 'none', background: activeCategory === cat ? theme.gradientBtn : theme.bgCard, color: activeCategory === cat ? '#fff' : theme.text, fontSize: 14, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', boxShadow: activeCategory === cat ? theme.shadow : 'none', border: `2px solid ${activeCategory === cat ? 'transparent' : theme.border}`, transition: 'all 0.3s' }}>
                {cat === 'all' ? '✨ All' : cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filteredProducts.map((product, index) => {
              const avgRating = getAvgRating(product.reviews);
              const isWished = wishlist.some(w => w.id === product.id);
              return (
                <div key={product.id}
                  style={{
                    background: theme.bgCard, border: `2px solid ${theme.border}`, borderRadius: 24,
                    overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'pointer',
                    opacity: visibleSections.products ? 1 : 0,
                    transform: visibleSections.products ? 'translateY(0)' : 'translateY(40px)',
                    transitionDelay: `${index * 0.05}s`
                  }}
                  onClick={() => viewProduct(product)}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'; e.currentTarget.style.borderColor = theme.primary; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = theme.border; }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: 220, objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.05)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    {product.tag && <div style={{ position: 'absolute', top: 12, left: 12, background: theme.bgCard, padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 700, color: theme.text, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>{product.tag}</div>}
                    <button onClick={e => { e.stopPropagation(); toggleWishlist(product); }}
                      style={{ position: 'absolute', top: 12, right: 12, background: theme.bgCard, border: 'none', borderRadius: 12, width: 40, height: 40, cursor: 'pointer', fontSize: 18, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isWished ? '❤️' : '🤍'}
                    </button>
                    {product.stock <= 5 && product.stock > 0 && (
                      <div style={{ position: 'absolute', bottom: 12, left: 12, background: '#FEF3C7', padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: '#92400E' }}>Only {product.stock} left!</div>
                    )}
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{product.name}</h3>
                    {avgRating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <StarRating rating={parseFloat(avgRating)} size={14} />
                        <span style={{ fontSize: 13, color: theme.textMuted }}>({product.reviews?.length})</span>
                      </div>
                    )}
                    <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 0 16px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 24, fontWeight: 800, color: theme.primary }}>{formatPrice(product.price)}</div>
                      <button onClick={e => { e.stopPropagation(); addToCart(product); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, background: theme.gradientBtn, border: 'none', borderRadius: 12, padding: '12px 20px', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: theme.shadow }}>
                        Add 🛒
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Afterpay Banner */}
          <div style={{ marginTop: 48, background: `linear-gradient(135deg, #B2FCE4 0%, #84FAB0 100%)`, borderRadius: 24, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#1A1A2E' }}>Buy Now, Pay Later 💳</h3>
              <p style={{ margin: 0, color: '#1A1A2E', opacity: 0.8 }}>Pay in 4 interest-free instalments with Afterpay or Zip</p>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ background: '#000', borderRadius: 8, padding: '8px 16px', color: '#B2FCE4', fontWeight: 700, fontSize: 14 }}>afterpay</div>
              <div style={{ background: '#7B35E0', borderRadius: 8, padding: '8px 16px', color: '#fff', fontWeight: 700, fontSize: 14 }}>zip</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section style={{ padding: '40px 24px 80px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Recently Viewed 👀</h3>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 10 }}>
              {recentlyViewed.map(product => (
                <div key={product.id} onClick={() => viewProduct(product)}
                  style={{ minWidth: 200, background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: 12, cursor: 'pointer', flexShrink: 0 }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{product.name}</div>
                  <div style={{ color: theme.primary, fontWeight: 700 }}>{formatPrice(product.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== ABOUT ==================== */}
      <section id="about" style={{ padding: '80px 24px', background: theme.bgSecondary, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.8s' }}>
            <div style={{ display: 'inline-block', background: `${theme.secondary}20`, border: `2px solid ${theme.secondary}40`, borderRadius: 100, padding: '8px 18px', fontSize: 12, fontWeight: 600, marginBottom: 20, color: theme.secondary }}>🇦🇺 PROUDLY AUSTRALIAN</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif" }}>
              We Bundle.<br />You <span style={{ color: theme.primary }}>Unbox Joy!</span> 🎁
            </h2>
            <p style={{ fontSize: 17, color: theme.textMuted, lineHeight: 1.8, marginBottom: 32 }}>
              Ark Global Supply was born in Sydney from a simple idea: shopping for multiple items shouldn't feel like a chore. We curate premium bundles for life's biggest moments, saving you time and money!
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: '🚀', title: 'Fast Shipping', desc: 'NSW Express 1-3 days!' },
                { icon: '✨', title: 'Premium Quality', desc: 'Hand-picked items' },
                { icon: '↩️', title: 'Easy Returns', desc: '30-day guarantee' },
                { icon: '💬', title: '24/7 Support', desc: 'Always here to help' }
              ].map((item, i) => (
                <div key={i} style={{ background: theme.bgCard, border: `2px solid ${theme.border}`, borderRadius: 20, padding: 20, transition: 'all 0.3s' }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: theme.textMuted }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.8s 0.2s' }}>
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80" alt="About" style={{ width: '100%', height: 450, objectFit: 'cover', borderRadius: 28, boxShadow: '0 30px 80px rgba(0,0,0,0.1)' }} />
            <div style={{ position: 'absolute', bottom: -20, left: -20, background: theme.accent, borderRadius: 16, padding: '16px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1A1A2E' }}>10K+</div>
              <div style={{ fontSize: 13, color: '#1A1A2E', opacity: 0.8 }}>Happy Aussies!</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" style={{ padding: '80px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px', fontFamily: "'Space Grotesk', sans-serif" }}>Got Questions? 🤔</h2>
            <p style={{ fontSize: 17, color: theme.textMuted }}>We've got answers!</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQ_DATA.map((faq, i) => (
              <div key={i} style={{ background: theme.bgCard, border: `2px solid ${expandedFaq === i ? theme.primary : theme.border}`, borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{ width: '100%', padding: '20px 24px', background: 'transparent', border: 'none', color: theme.text, fontSize: 16, fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <span style={{ fontSize: 20, transition: 'transform 0.3s', transform: expandedFaq === i ? 'rotate(45deg)' : 'rotate(0deg)', color: theme.primary }}>+</span>
                </button>
                <div style={{ maxHeight: expandedFaq === i ? 200 : 0, overflow: 'hidden', transition: 'all 0.4s' }}>
                  <div style={{ padding: '0 24px 20px', color: theme.textMuted, lineHeight: 1.7 }}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section id="newsletter" style={{ padding: '80px 24px', background: theme.gradientBtn, position: 'relative', zIndex: 2, overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 200, height: 200, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, margin: '0 0 12px', color: '#fff' }}>Join the Ark Family! 💌</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 32 }}>Get exclusive deals, new arrivals & Aussie-only offers!</p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: 12, maxWidth: 450, margin: '0 auto' }}>
            <input type="email" value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="Your email"
              style={{ flex: 1, background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: 14, padding: '18px 24px', color: '#1A1A2E', fontSize: 16, outline: 'none' }} />
            <button type="submit" style={{ background: '#1A1A2E', border: 'none', borderRadius: 14, padding: '18px 32px', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Subscribe</button>
          </form>
          {newsletterSuccess && <div style={{ marginTop: 16, color: '#fff', fontWeight: 600 }}>✓ You're in! Check your inbox 📬</div>}
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" style={{ padding: '80px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, margin: '0 0 12px', fontFamily: "'Space Grotesk', sans-serif" }}>Say G'day! 👋</h2>
          <p style={{ fontSize: 16, color: theme.textMuted, marginBottom: 32 }}>Questions? Ideas? We'd love to hear from you!</p>
          <div style={{ background: theme.bgCard, border: `2px solid ${theme.border}`, borderRadius: 24, padding: 32 }}>
            <input type="email" placeholder="Your email"
              style={{ width: '100%', background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, color: theme.text, fontSize: 15, marginBottom: 14, outline: 'none', boxSizing: 'border-box' }} />
            <textarea placeholder="Your message" rows={4}
              style={{ width: '100%', background: theme.bgSecondary, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, color: theme.text, fontSize: 15, marginBottom: 14, outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            <button onClick={() => showNotif('Message sent! 📨')}
              style={{ width: '100%', background: theme.gradientBtn, border: 'none', borderRadius: 14, padding: 18, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: theme.shadow }}>Send Message</button>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{ padding: '60px 24px 30px', background: theme.bgSecondary, borderTop: `1px solid ${theme.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
            <div>
              <ArkLogo size={36} theme={theme} />
              <p style={{ color: theme.textMuted, fontSize: 14, marginTop: 16, lineHeight: 1.7 }}>Australia's favourite bundle store. Premium quality, delivered fast!</p>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: theme.textMuted }}>ABN: 12 345 678 901</div>
                <div style={{ fontSize: 12, color: theme.textMuted }}>Sydney, NSW Australia 🇦🇺</div>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Shop</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['All Bundles', 'Kids', 'Holiday', 'Office', 'Gift'].map(link => <a key={link} href="#products" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 14 }}>{link}</a>)}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Help</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#faq" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 14 }}>FAQ</a>
                <a href="#contact" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 14 }}>Contact</a>
                <button onClick={() => setShowLegal('refund')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: 0 }}>Returns</button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button onClick={() => setShowLegal('privacy')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: 0 }}>Privacy Policy</button>
                <button onClick={() => setShowLegal('terms')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: 0 }}>Terms of Service</button>
                <button onClick={() => setShowLegal('refund')} style={{ background: 'none', border: 'none', color: theme.textMuted, fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: 0 }}>Refund Policy</button>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>We Accept</h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['💳 Visa', '💳 Mastercard', '🅿️ PayPal'].map(p => <span key={p} style={{ background: theme.bgCard, padding: '6px 10px', borderRadius: 8, fontSize: 12 }}>{p}</span>)}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <div style={{ background: '#000', borderRadius: 6, padding: '4px 10px', color: '#B2FCE4', fontWeight: 600, fontSize: 11 }}>afterpay</div>
                <div style={{ background: '#7B35E0', borderRadius: 6, padding: '4px 10px', color: '#fff', fontWeight: 600, fontSize: 11 }}>zip</div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ color: theme.textMuted, fontSize: 13 }}>© 2024 Ark Global Supply Pty Ltd. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Instagram', 'Facebook', 'TikTok'].map(s => <a key={s} href="#" style={{ color: theme.textMuted, fontSize: 13, textDecoration: 'none' }}>{s}</a>)}
            </div>
          </div>
        </div>
      </footer>

      {/* ==================== CART DRAWER ==================== */}
      {isCartOpen && (
        <>
          <div onClick={() => setIsCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 200 }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 440, background: theme.bgCard, zIndex: 201, display: 'flex', flexDirection: 'column', animation: 'slideInRight 0.4s ease' }}>
            <div style={{ padding: 24, borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Your Cart 🛒 ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: theme.bgSecondary, border: 'none', borderRadius: 12, width: 40, height: 40, color: theme.text, cursor: 'pointer', fontSize: 20 }}>×</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: theme.textMuted }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
                  <p style={{ fontSize: 16 }}>Your cart is empty!</p>
                  <button onClick={() => setIsCartOpen(false)} style={{ marginTop: 16, background: theme.gradientBtn, border: 'none', borderRadius: 12, padding: '12px 24px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Start Shopping</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: 14, background: theme.bgSecondary, borderRadius: 16, padding: 14 }}>
                      <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12 }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600 }}>{item.name}</h4>
                        <div style={{ color: theme.primary, fontWeight: 700 }}>{formatPrice(item.price)}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, cursor: 'pointer', fontSize: 16 }}>−</button>
                          <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ width: 30, height: 30, borderRadius: 8, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, cursor: 'pointer', fontSize: 16 }}>+</button>
                          <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: 12 }}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: 24, borderTop: `1px solid ${theme.border}`, background: theme.bgSecondary }}>
                {/* Discount Code */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                  <input type="text" placeholder="Discount code" value={discountInput} onChange={e => setDiscountInput(e.target.value)}
                    style={{ flex: 1, padding: 14, borderRadius: 12, border: `1px solid ${theme.border}`, background: theme.bgCard, color: theme.text, fontSize: 14, outline: 'none' }} />
                  <button onClick={applyDiscountCode} style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 12, padding: '14px 20px', color: theme.text, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>Apply</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: theme.textMuted }}><span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
                {appliedDiscount && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: '#10B981' }}><span>Discount ({appliedDiscount.code})</span><span>-{formatPrice(discountAmount)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, color: theme.textMuted }}><span>Shipping</span><span style={{ color: '#10B981' }}>FREE 🎉</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: theme.secondary }}><span>Estimated delivery</span><span>{getETA()}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, fontSize: 20, fontWeight: 700, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}><span>Total</span><span>{formatPrice(cartTotal)}</span></div>
                <button onClick={() => alert(`Ready for Stripe! 🎉\n\nTotal: ${formatPrice(cartTotal)}\nCountry: ${countryData.name}\nDelivery: ${getETA()}`)}
                  style={{ width: '100%', background: theme.gradientBtn, border: 'none', borderRadius: 14, padding: 18, color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: theme.shadow }}>
                  Checkout — {formatPrice(cartTotal)}
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 16 }}>
                  <div style={{ background: '#000', borderRadius: 6, padding: '4px 12px', color: '#B2FCE4', fontWeight: 600, fontSize: 11 }}>afterpay</div>
                  <div style={{ background: '#7B35E0', borderRadius: 6, padding: '4px 12px', color: '#fff', fontWeight: 600, fontSize: 11 }}>zip</div>
                </div>
                <p style={{ textAlign: 'center', fontSize: 12, color: theme.textMuted, marginTop: 12 }}>🔒 Secure checkout powered by Stripe</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes confetti-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::placeholder { color: ${theme.textMuted}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
        @media (max-width: 900px) {
          section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
