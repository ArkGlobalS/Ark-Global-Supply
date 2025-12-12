import { useState, useEffect } from 'react';
import './styles/globals.css';
import { COLORS, SITE, PRODUCTS, SOCIAL_PROOF, FLOATING_ICONS, COUNTRIES, getThemeByCategory, getProductsByCategory } from './config';
import { formatPrice, getDiscount, getSaleEndTime, getStoredCart, saveCart, getStoredCountry, saveCountry, randomInRange, shuffleArray } from './utils/helpers';
import Header from './components/Header';
import Footer from './components/Footer';
import { MobileBottomNav, StickyMobileCart } from './components/MobileNav';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CountrySelector from './components/CountrySelector';
import Timer from './components/Timer';
import TrustBar from './components/TrustBar';
import Newsletter from './components/Newsletter';
import FAQ from './components/FAQ';
import FloatingIcons from './components/FloatingIcons';
import { SkeletonGrid } from './components/Skeletons';
import Notification from './components/Notification';
import SocialProof from './components/SocialProof';
import TermsModal from './modals/TermsModal';
import PrivacyModal from './modals/PrivacyModal';
import ReturnsModal from './modals/ReturnsModal';
import ExitIntent from './modals/ExitIntent';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState(() => getStoredCart());
  const [country, setCountry] = useState(() => getStoredCountry(COUNTRIES.AU));
  const [showCart, setShowCart] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReturns, setShowReturns] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [socialProof, setSocialProof] = useState({ show: false, data: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [saleEndTime] = useState(() => getSaleEndTime(SITE.saleEndDate));

  // Save cart to localStorage
  useEffect(() => { saveCart(cart); }, [cart]);
  
  // Save country to localStorage
  useEffect(() => { saveCountry(country); }, [country]);

  // Exit intent
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 10 && !exitIntentShown && cart.length > 0) {
        setShowExitIntent(true);
        setExitIntentShown(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown, cart.length]);

  // Social proof with randomized timing
  useEffect(() => {
    const shuffled = shuffleArray([...SOCIAL_PROOF]);
    let index = 0;
    let lastShown = null;
    
    const showNext = () => {
      // Get next item (skip if same as last)
      let item = shuffled[index % shuffled.length];
      if (item === lastShown && shuffled.length > 1) {
        index++;
        item = shuffled[index % shuffled.length];
      }
      
      setSocialProof({ show: true, data: item });
      lastShown = item;
      index++;
      
      // Hide after 5 seconds
      setTimeout(() => setSocialProof({ show: false, data: null }), 5000);
    };
    
    // Initial delay
    const initialDelay = setTimeout(showNext, randomInRange(8000, 15000));
    
    // Recurring with random intervals
    const interval = setInterval(() => {
      showNext();
    }, randomInRange(25000, 60000));
    
    return () => { clearTimeout(initialDelay); clearInterval(interval); };
  }, []);

  // Page change loading
  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setIsLoading(true);
    setCurrentPage(page);
    window.scrollTo(0, 0);
    setTimeout(() => setIsLoading(false), 600);
  };

  // Add to cart
  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) return prev;
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setNotification({ show: true, message: `${product.name} added to cart!` });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  // View product
  const viewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Checkout
  const handleCheckout = async (checkoutData) => {
    setIsCheckingOut(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: checkoutData.items,
          currency: checkoutData.currency,
          shippingCost: checkoutData.shippingCost,
          discount: checkoutData.discount || 0,
          discountCode: checkoutData.discountCode || null,
        }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
      setIsCheckingOut(false);
    }
  };

  // Get current theme
  const theme = getThemeByCategory(currentPage === 'home' ? 'mens' : currentPage);
  const accentColor = theme.primary;

  // Get products for current page
  const getPageProducts = () => {
    if (currentPage === 'home') {
      // Show featured (in-stock first, then others)
      const inStock = PRODUCTS.filter(p => p.stock > 0);
      const outOfStock = PRODUCTS.filter(p => p.stock === 0).slice(0, 8);
      return [...inStock, ...outOfStock];
    }
    return getProductsByCategory(currentPage);
  };

  const pageProducts = getPageProducts();
  const pageTitle = currentPage === 'home' ? 'FEATURED BUNDLES' : 
    currentPage === 'mens' ? "MEN'S COLLECTION" :
    currentPage === 'womens' ? "WOMEN'S COLLECTION" :
    currentPage === 'kids' ? "KIDS COLLECTION" : "GIFT BOXES";

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg }}>
      {/* Header */}
      <Header 
        cart={cart} 
        setShowCart={setShowCart} 
        country={country} 
        setShowCountry={setShowCountry}
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />

      {/* Hero Section */}
      <section style={{ 
        background: theme.bgPattern,
        padding: '60px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <FloatingIcons 
          icons={FLOATING_ICONS[currentPage] || FLOATING_ICONS.home} 
          color={accentColor} 
        />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-block', 
            background: accentColor, 
            color: '#fff', 
            padding: '8px 16px', 
            borderRadius: 20, 
            fontSize: 12, 
            fontWeight: 700, 
            letterSpacing: 1, 
            marginBottom: 24 
          }}>
            {SITE.hero.badge}
          </div>
          
          <h1 style={{ 
            fontSize: 64, 
            fontWeight: 800, 
            color: '#fff', 
            fontFamily: "'Bebas Neue', sans-serif", 
            letterSpacing: 3, 
            marginBottom: 16,
            lineHeight: 1.1
          }}>
            {SITE.hero.headline}
          </h1>
          
          <p style={{ color: COLORS.textMuted, fontSize: 18, marginBottom: 32, maxWidth: 600, margin: '0 auto 32px' }}>
            {SITE.hero.subheadline}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>
                ⏰ SALE ENDS IN
              </div>
              <Timer endTime={saleEndTime} accentColor={accentColor} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar accentColor={accentColor} />

      {/* Products Section */}
      <section style={{ 
        padding: '60px 24px 80px', 
        maxWidth: 1400, 
        margin: '0 auto',
        position: 'relative'
      }}>
        <h2 style={{ 
          fontSize: 42, 
          fontWeight: 800, 
          color: '#fff', 
          fontFamily: "'Bebas Neue', sans-serif", 
          letterSpacing: 2, 
          textAlign: 'center', 
          marginBottom: 40 
        }}>
          🔥 {pageTitle}
        </h2>
        
        {isLoading ? (
          <SkeletonGrid count={8} />
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: 24 
          }}>
            {pageProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                country={country}
                onAdd={addToCart}
                onView={viewProduct}
                theme={getThemeByCategory(product.cat)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <Newsletter accentColor={accentColor} />

      {/* FAQ */}
      <FAQ accentColor={accentColor} />

      {/* Footer */}
      <Footer 
        onTerms={() => setShowTerms(true)}
        onPrivacy={() => setShowPrivacy(true)}
        onReturns={() => setShowReturns(true)}
      />

      {/* Mobile Navigation */}
      <MobileBottomNav 
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        cart={cart}
        setShowCart={setShowCart}
      />
      
      <StickyMobileCart 
        cart={cart}
        setShowCart={setShowCart}
        theme={theme}
        country={country}
      />

      {/* Modals & Drawers */}
      <CartDrawer 
        show={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        setCart={setCart}
        country={country}
        onCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
        accentColor={accentColor}
      />
      
      <ProductModal 
        product={selectedProduct}
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
        country={country}
        onAdd={addToCart}
        onView={viewProduct}
      />
      
      <CountrySelector 
        show={showCountry}
        onClose={() => setShowCountry(false)}
        country={country}
        setCountry={setCountry}
      />
      
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal show={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <ReturnsModal show={showReturns} onClose={() => setShowReturns(false)} />
      <ExitIntent show={showExitIntent} onClose={() => setShowExitIntent(false)} accentColor={accentColor} />
      
      {/* Notifications */}
      <Notification show={notification.show} message={notification.message} />
      <SocialProof show={socialProof.show} data={socialProof.data} />
    </div>
  );
}

export default App;
