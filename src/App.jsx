import { useState, useEffect } from 'react';
import { COLORS, SITE, COUNTRIES, DISCOUNTS, SOCIAL_PROOF, FAQ, PRODUCTS } from './config';

// =============================================
// HELPER FUNCTIONS
// =============================================
const formatPrice = (price, country) => `${country.symbol}${(price * country.rate).toFixed(2)}`;
const getDiscount = (price, was) => Math.round(((was - price) / was) * 100);
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// =============================================
// SMALL COMPONENTS
// =============================================
const Stars = ({ rating = 5, color = COLORS.gold }) => (
  <span style={{ color }}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
);

const Timer = ({ endTime, accentColor = COLORS.accent }) => {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTime - Date.now();
      if (diff < 0) return;
      setTime({ h: Math.floor(diff / 3600000) % 24, m: Math.floor(diff / 60000) % 60, s: Math.floor(diff / 1000) % 60 });
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {[{ v: time.h, l: 'HRS' }, { v: time.m, l: 'MIN' }, { v: time.s, l: 'SEC' }].map((b, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ background: accentColor, color: '#fff', borderRadius: 6, padding: '8px 12px', fontSize: 18, fontWeight: 800, fontFamily: 'monospace', minWidth: 44 }}>
            {String(b.v).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 4, fontWeight: 600, letterSpacing: 1 }}>{b.l}</div>
        </div>
      ))}
    </div>
  );
};

// =============================================
// HEADER WITH NAVIGATION
// =============================================
const Header = ({ cart, setShowCart, country, setShowCountry, currentPage, setCurrentPage }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  
  const getPageAccent = () => {
    switch(currentPage) {
      case 'womens': return COLORS.womens.primary;
      case 'kids': return COLORS.kids.primary;
      case 'gifts': return COLORS.gifts.primary;
      default: return COLORS.accent;
    }
  };
  
  return (
    <>
      <div style={{ background: getPageAccent(), color: '#fff', textAlign: 'center', padding: '10px 20px', fontSize: 13, fontWeight: 600 }}>
        🔥 FREE SHIPPING ON ORDERS OVER ${SITE.shipping.freeThreshold} | USE CODE <strong>SAVE10</strong> FOR 10% OFF
      </div>
      <header style={{ background: COLORS.bg, borderBottom: `1px solid ${COLORS.border}`, padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>{SITE.name}</span>
            <span style={{ fontSize: 12, color: getPageAccent(), fontWeight: 600, letterSpacing: 1 }}>{SITE.tagline}</span>
          </button>
          <nav style={{ display: 'flex', gap: 8 }}>
            {SITE.pages.map((page) => (
              <button key={page.id} onClick={() => setCurrentPage(page.id)}
                style={{ 
                  background: currentPage === page.id ? (
                    page.id === 'womens' ? COLORS.womens.primary :
                    page.id === 'kids' ? COLORS.kids.primary :
                    page.id === 'gifts' ? COLORS.gifts.primary :
                    page.id === 'mens' ? COLORS.mens.primary : COLORS.accent
                  ) : 'transparent',
                  border: `1px solid ${currentPage === page.id ? 'transparent' : COLORS.border}`,
                  color: '#fff', 
                  padding: '10px 20px', 
                  borderRadius: 8, 
                  fontSize: 13, 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  letterSpacing: 1
                }}>
                {page.icon} {page.label}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setShowCountry(true)} style={{ background: 'transparent', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '8px 12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              <span>{country.flag}</span><span>{country.currency}</span>
            </button>
            <button onClick={() => setShowCart(true)} style={{ background: getPageAccent(), border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              🛒 CART {cartCount > 0 && <span style={{ background: '#fff', color: getPageAccent(), borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

// =============================================
// HOME PAGE HERO
// =============================================
const HomeHero = ({ saleEnd, setCurrentPage }) => (
  <section style={{ background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1a1a1a 100%)`, padding: '80px 24px', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: `radial-gradient(circle at 70% 50%, ${COLORS.accentGlow} 0%, transparent 50%)`, pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '8px 16px', marginBottom: 24 }}>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{SITE.hero.badge}</span>
        <Stars rating={5} />
        <span style={{ color: COLORS.gold, fontSize: 13, fontWeight: 600 }}>4.9 (2.4k reviews)</span>
      </div>
      <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1.1, marginBottom: 24, letterSpacing: 2 }}>
        {SITE.hero.headline}
      </h1>
      <p style={{ fontSize: 18, color: COLORS.textMuted, maxWidth: 500, marginBottom: 32, lineHeight: 1.6 }}>{SITE.hero.subheadline}</p>
      
      {/* Category Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40, maxWidth: 800 }}>
        <button onClick={() => setCurrentPage('mens')} style={{ background: `linear-gradient(135deg, ${COLORS.mens.primary} 0%, ${COLORS.mens.secondary} 100%)`, border: 'none', borderRadius: 12, padding: '24px 16px', cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💪</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>MEN'S</div>
        </button>
        <button onClick={() => setCurrentPage('womens')} style={{ background: `linear-gradient(135deg, ${COLORS.womens.primary} 0%, ${COLORS.womens.secondary} 100%)`, border: 'none', borderRadius: 12, padding: '24px 16px', cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>👗</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>WOMEN'S</div>
        </button>
        <button onClick={() => setCurrentPage('kids')} style={{ background: `linear-gradient(135deg, ${COLORS.kids.primary} 0%, ${COLORS.kids.secondary} 100%)`, border: 'none', borderRadius: 12, padding: '24px 16px', cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎨</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>KIDS</div>
        </button>
        <button onClick={() => setCurrentPage('gifts')} style={{ background: `linear-gradient(135deg, ${COLORS.gifts.primary} 0%, ${COLORS.gifts.secondary} 100%)`, border: 'none', borderRadius: 12, padding: '24px 16px', cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎁</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>GIFTS</div>
        </button>
      </div>
      
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '16px 24px' }}>
        <div style={{ color: COLORS.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⚡ RESTOCK COMING SOON</div>
        <Timer endTime={saleEnd} />
      </div>
    </div>
  </section>
);

// =============================================
// TRUST BAR
// =============================================
const TrustBar = ({ accentColor = COLORS.accent }) => (
  <section style={{ background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: '24px 20px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
      {SITE.trustBadges.map((badge, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{badge.icon}</span>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>{badge.text}</span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>💳</span>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>AFTERPAY AVAILABLE</span>
      </div>
    </div>
  </section>
);

// =============================================
// PRODUCT CARD
// =============================================
const ProductCard = ({ product, country, onAdd, onView, theme = COLORS.mens }) => {
  const [hover, setHover] = useState(false);
  const [viewers] = useState(randomInRange(12, 89));
  const isSoldOut = product.stock === 0;
  
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => onView(product)}
      style={{ background: COLORS.bgCard, borderRadius: 16, overflow: 'hidden', border: `2px solid ${hover && !isSoldOut ? theme.primary : COLORS.border}`, transition: 'all 0.3s ease', cursor: 'pointer', transform: hover && !isSoldOut ? 'translateY(-4px)' : 'none', boxShadow: hover && !isSoldOut ? `0 8px 30px ${theme.glow}` : 'none', opacity: isSoldOut ? 0.8 : 1 }}>
      <div style={{ position: 'relative' }}>
        <img src={product.img} alt={product.name} style={{ width: '100%', height: 220, objectFit: 'cover', filter: isSoldOut ? 'grayscale(40%)' : 'none' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: isSoldOut ? '#555555' : theme.primary, color: '#fff', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{isSoldOut ? 'SOLD OUT' : `${getDiscount(product.price, product.was)}% OFF`}</div>
        {isSoldOut && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ background: '#000', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>SOLD OUT</span>
        </div>}
        {!isSoldOut && <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '6px 10px', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, background: COLORS.success, borderRadius: '50%' }} />{viewers} viewing
        </div>}
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>{product.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Stars rating={5} color={theme.primary} />
          <span style={{ color: COLORS.textMuted, fontSize: 12 }}>({product.reviews?.length || 0}) • {product.sold?.toLocaleString()} sold</span>
        </div>
        <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 16, lineHeight: 1.5, height: 40, overflow: 'hidden' }}>{product.desc}</p>
        {isSoldOut && <div style={{ color: theme.primary, fontSize: 12, fontWeight: 600, marginBottom: 12 }}>📧 Get notified when back</div>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: isSoldOut ? COLORS.textMuted : '#fff', fontSize: 28, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif" }}>{formatPrice(product.price, country)}</span>
            <span style={{ color: COLORS.textDim, fontSize: 14, textDecoration: 'line-through', marginLeft: 8 }}>{formatPrice(product.was, country)}</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); if (!isSoldOut) onAdd(product); }} 
            disabled={isSoldOut}
            style={{ background: isSoldOut ? COLORS.border : theme.primary, color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 14, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1, cursor: isSoldOut ? 'not-allowed' : 'pointer' }}>
            {isSoldOut ? 'NOTIFY' : 'ADD'}
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// CATEGORY PAGE COMPONENT
// =============================================
const CategoryPage = ({ category, title, subtitle, icon, theme, country, onAdd, onView, saleEnd }) => {
  const products = PRODUCTS.filter(p => p.cat === category);
  
  return (
    <div>
      {/* Category Hero */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1a1a1a 100%)`, padding: '60px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: `radial-gradient(circle at 70% 50%, ${theme.glow} 0%, transparent 50%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: theme.primary, color: '#fff', padding: '8px 20px', borderRadius: 50, fontSize: 14, fontWeight: 700, letterSpacing: 2, marginBottom: 20 }}>
            {icon} {title.toUpperCase()} COLLECTION
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1, marginBottom: 16, letterSpacing: 2 }}>
            {title.toUpperCase()} BUNDLES
          </h1>
          <p style={{ fontSize: 18, color: COLORS.textMuted, maxWidth: 500, marginBottom: 24, lineHeight: 1.6 }}>{subtitle}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '16px 24px' }}>
            <div style={{ color: theme.primary, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⚡ RESTOCK IN</div>
            <Timer endTime={saleEnd} accentColor={theme.primary} />
          </div>
        </div>
      </section>
      
      <TrustBar accentColor={theme.primary} />
      
      {/* Products Grid */}
      <section style={{ padding: '60px 24px', background: COLORS.bg }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} country={country} onAdd={onAdd} onView={onView} theme={theme} />
            ))}
          </div>
          
          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: COLORS.textMuted }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
              <h3 style={{ color: '#fff', fontSize: 24, marginBottom: 8 }}>Coming Soon!</h3>
              <p>New bundles are being curated. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// =============================================
// HOME PAGE
// =============================================
const HomePage = ({ country, onAdd, onView, saleEnd, setCurrentPage }) => {
  const featuredProducts = PRODUCTS.slice(0, 8);
  
  return (
    <div>
      <HomeHero saleEnd={saleEnd} setCurrentPage={setCurrentPage} />
      <TrustBar />
      
      {/* Featured Products */}
      <section style={{ padding: '60px 24px', background: COLORS.bg }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginBottom: 16 }}>POPULAR BUNDLES</h2>
            <p style={{ color: COLORS.textMuted, fontSize: 16 }}>Our most loved bundles — selling fast!</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {featuredProducts.map(product => {
              const theme = product.cat === 'womens' ? COLORS.womens : product.cat === 'kids' ? COLORS.kids : product.cat === 'gifts' ? COLORS.gifts : COLORS.mens;
              return <ProductCard key={product.id} product={product} country={country} onAdd={onAdd} onView={onView} theme={theme} />;
            })}
          </div>
        </div>
      </section>
      
      {/* Category Showcase */}
      <section style={{ padding: '60px 24px', background: COLORS.bgCard }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, textAlign: 'center', marginBottom: 40 }}>SHOP BY CATEGORY</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            <button onClick={() => setCurrentPage('mens')} style={{ background: `linear-gradient(135deg, ${COLORS.mens.primary}22 0%, ${COLORS.mens.primary}44 100%)`, border: `2px solid ${COLORS.mens.primary}`, borderRadius: 16, padding: '40px 24px', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💪</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>MEN'S</div>
              <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 8 }}>Bundles for the modern man</div>
            </button>
            <button onClick={() => setCurrentPage('womens')} style={{ background: `linear-gradient(135deg, ${COLORS.womens.primary}22 0%, ${COLORS.womens.primary}44 100%)`, border: `2px solid ${COLORS.womens.primary}`, borderRadius: 16, padding: '40px 24px', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>👗</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>WOMEN'S</div>
              <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 8 }}>Self-care & beauty essentials</div>
            </button>
            <button onClick={() => setCurrentPage('kids')} style={{ background: `linear-gradient(135deg, ${COLORS.kids.primary}22 0%, ${COLORS.kids.primary}44 100%)`, border: `2px solid ${COLORS.kids.primary}`, borderRadius: 16, padding: '40px 24px', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎨</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>KIDS</div>
              <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 8 }}>Fun & educational packs</div>
            </button>
            <button onClick={() => setCurrentPage('gifts')} style={{ background: `linear-gradient(135deg, ${COLORS.gifts.primary}22 0%, ${COLORS.gifts.primary}44 100%)`, border: `2px solid ${COLORS.gifts.primary}`, borderRadius: 16, padding: '40px 24px', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎁</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>GIFTS</div>
              <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 8 }}>Perfect for every occasion</div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// =============================================
// NEWSLETTER
// =============================================
const Newsletter = ({ accentColor = COLORS.accent }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail(''); } };
  return (
    <section style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}DD 100%)`, padding: '60px 24px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginBottom: 16 }}>GET NOTIFIED</h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 32 }}>Be the first to know when we restock. Plus get 10% off your first order!</p>
        {submitted ? (
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 24px', color: '#fff', fontWeight: 600 }}>✓ You're on the list! We'll notify you when items are back.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ flex: 1, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '16px 20px', color: '#fff', fontSize: 16 }} />
            <button type="submit" style={{ background: '#fff', color: accentColor, border: 'none', borderRadius: 8, padding: '16px 32px', fontSize: 16, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1, cursor: 'pointer' }}>NOTIFY ME</button>
          </form>
        )}
      </div>
    </section>
  );
};

// =============================================
// FAQ
// =============================================
const FAQSection = ({ accentColor = COLORS.accent }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section style={{ padding: '60px 24px', background: COLORS.bg }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, textAlign: 'center', marginBottom: 40 }}>FREQUENTLY ASKED</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', background: 'transparent', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{item.q}</span>
                <span style={{ color: accentColor, fontSize: 24, transform: openIndex === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
              </button>
              {openIndex === i && <div style={{ padding: '0 24px 20px', color: COLORS.textMuted, lineHeight: 1.6 }}>{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// =============================================
// FOOTER
// =============================================
const Footer = ({ onTerms, onPrivacy, onReturns }) => (
  <footer style={{ background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, padding: '60px 24px 30px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>{SITE.name}</span>
            <span style={{ color: COLORS.accent, fontSize: 11, fontWeight: 600 }}>{SITE.tagline}</span>
          </div>
          <p style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.6 }}>Australia's #1 Bundle Store. Premium curated bundles shipped fast from Sydney.</p>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>SHOP</h4>
          <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 2 }}>
            <div>Men's Bundles</div>
            <div>Women's Bundles</div>
            <div>Kids Bundles</div>
            <div>Gift Boxes</div>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>LEGAL</h4>
          <button onClick={onTerms} style={{ display: 'block', background: 'none', border: 'none', color: COLORS.textMuted, fontSize: 14, marginBottom: 10, cursor: 'pointer', padding: 0, textAlign: 'left' }}>Terms of Service</button>
          <button onClick={onPrivacy} style={{ display: 'block', background: 'none', border: 'none', color: COLORS.textMuted, fontSize: 14, marginBottom: 10, cursor: 'pointer', padding: 0, textAlign: 'left' }}>Privacy Policy</button>
          <button onClick={onReturns} style={{ display: 'block', background: 'none', border: 'none', color: COLORS.textMuted, fontSize: 14, marginBottom: 10, cursor: 'pointer', padding: 0, textAlign: 'left' }}>Returns & Refunds</button>
          <div style={{ color: COLORS.textMuted, fontSize: 14 }}>Shipping Info</div>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>CONTACT</h4>
          <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
            <div>📍 {SITE.business.location}</div>
            <div>📧 {SITE.business.email}</div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.textMuted, fontSize: 20 }}>📸</a>
            <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.textMuted, fontSize: 20 }}>🎵</a>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 30, paddingBottom: 30, borderBottom: `1px solid ${COLORS.border}`, flexWrap: 'wrap' }}>
        {SITE.payments.map(p => <div key={p} style={{ background: COLORS.bg, padding: '8px 16px', borderRadius: 6, color: COLORS.textMuted, fontSize: 12, fontWeight: 600 }}>{p}</div>)}
      </div>
      <div style={{ textAlign: 'center', color: COLORS.textDim, fontSize: 13 }}>© {new Date().getFullYear()} {SITE.name} {SITE.tagline}. All rights reserved. Made in Australia 🇦🇺</div>
    </div>
  </footer>
);

// =============================================
// CART DRAWER
// =============================================
const CartDrawer = ({ show, onClose, cart, setCart, country, onCheckout, isCheckingOut, accentColor = COLORS.accent }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState(null);
  const [promoError, setPromoError] = useState('');
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShipping = subtotal >= SITE.shipping.freeThreshold;
  const shipping = freeShipping ? 0 : SITE.shipping.standardRate;
  let discount = 0;
  if (appliedCode) {
    if (appliedCode.type === 'percent') discount = (subtotal * appliedCode.value) / 100;
    else if (appliedCode.type === 'shipping') discount = shipping;
  }
  const total = subtotal - discount + (appliedCode?.type === 'shipping' ? 0 : shipping);
  
  const updateQty = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter(item => item.qty > 0));
  const applyPromo = () => {
    const code = DISCOUNTS.find(d => d.code.toUpperCase() === promoCode.toUpperCase() && d.active);
    if (code) { setAppliedCode(code); setPromoError(''); } else { setPromoError('Invalid code'); setAppliedCode(null); }
  };
  
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: 420, height: '100%', background: COLORS.bgCard, zIndex: 201, display: 'flex', flexDirection: 'column', borderLeft: `1px solid ${COLORS.border}` }}>
        <div style={{ padding: 20, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>YOUR CART ({cart.length})</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        </div>
        {!freeShipping && subtotal > 0 && (
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 8 }}>Add {formatPrice(SITE.shipping.freeThreshold - subtotal, country)} more for FREE SHIPPING!</div>
            <div style={{ background: COLORS.border, borderRadius: 10, height: 8, overflow: 'hidden' }}>
              <div style={{ background: accentColor, height: '100%', width: `${Math.min((subtotal / SITE.shipping.freeThreshold) * 100, 100)}%` }} />
            </div>
          </div>
        )}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: COLORS.textMuted }}><div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div><p>Your cart is empty</p></div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
              <img src={item.img} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>{item.name}</h4>
                <div style={{ color: accentColor, fontWeight: 700 }}>{formatPrice(item.price, country)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 28, height: 28, borderRadius: 4, cursor: 'pointer' }}>−</button>
                  <span style={{ color: '#fff' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 28, height: 28, borderRadius: 4, cursor: 'pointer' }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: 20, borderTop: `1px solid ${COLORS.border}`, background: COLORS.bg }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input type="text" placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                style={{ flex: 1, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '10px 12px', color: '#fff', fontSize: 14 }} />
              <button onClick={applyPromo} style={{ background: COLORS.border, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>APPLY</button>
            </div>
            {promoError && <div style={{ color: COLORS.error, fontSize: 12, marginBottom: 8 }}>{promoError}</div>}
            {appliedCode && <div style={{ color: COLORS.success, fontSize: 12, marginBottom: 8 }}>✓ {appliedCode.desc} applied!</div>}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.textMuted, fontSize: 14, marginBottom: 8 }}><span>Subtotal</span><span>{formatPrice(subtotal, country)}</span></div>
              {discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.success, fontSize: 14, marginBottom: 8 }}><span>Discount</span><span>-{formatPrice(discount, country)}</span></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.textMuted, fontSize: 14, marginBottom: 8 }}><span>Shipping</span><span style={{ color: freeShipping ? COLORS.success : undefined }}>{freeShipping ? 'FREE' : formatPrice(shipping, country)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 18, fontWeight: 700, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}><span>Total</span><span>{formatPrice(total, country)}</span></div>
            </div>
            <button onClick={onCheckout} disabled={isCheckingOut} style={{ width: '100%', background: isCheckingOut ? COLORS.border : `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}DD 100%)`, color: '#fff', border: 'none', borderRadius: 8, padding: '16px', fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, cursor: isCheckingOut ? 'wait' : 'pointer' }}>
              {isCheckingOut ? 'REDIRECTING...' : 'CHECKOUT →'}
            </button>
            <div style={{ textAlign: 'center', marginTop: 12, padding: '12px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: 8, border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <span style={{ color: '#8B5CF6', fontSize: 13, fontWeight: 600 }}>💳 Pay in 4 with Afterpay</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, color: COLORS.textMuted, fontSize: 12 }}><span>🔒 Secure</span><span>↩️ 30-Day Returns</span></div>
          </div>
        )}
      </div>
    </>
  );
};

// =============================================
// PRODUCT MODAL
// =============================================
const ProductModal = ({ product, show, onClose, country, onAdd, theme = COLORS.mens }) => {
  const [qty, setQty] = useState(1);
  const [viewers] = useState(randomInRange(12, 89));
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);
  
  if (!show || !product) return null;
  const isSoldOut = product.stock === 0;
  
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 300 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 800, width: '90%', maxHeight: '90vh', overflow: 'auto', zIndex: 301, border: `1px solid ${COLORS.border}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: COLORS.bg, border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: 24, cursor: 'pointer', zIndex: 10 }}>×</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ position: 'relative' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', minHeight: 400, objectFit: 'cover', borderRadius: '16px 0 0 16px', filter: isSoldOut ? 'grayscale(40%)' : 'none' }} />
            <div style={{ position: 'absolute', top: 16, left: 16, background: isSoldOut ? '#555' : theme.primary, color: '#fff', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>{isSoldOut ? 'SOLD OUT' : `${getDiscount(product.price, product.was)}% OFF`}</div>
            {isSoldOut && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px 0 0 16px' }}>
              <span style={{ background: '#000', color: '#fff', padding: '16px 32px', borderRadius: 8, fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>SOLD OUT</span>
            </div>}
          </div>
          <div style={{ padding: 32 }}>
            {!isSoldOut && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: COLORS.bg, padding: '8px 12px', borderRadius: 6, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, background: COLORS.success, borderRadius: '50%' }} /><span style={{ color: '#fff', fontSize: 13 }}>{viewers} people viewing</span>
            </div>}
            {isSoldOut && <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: COLORS.error, padding: '8px 12px', borderRadius: 6, marginBottom: 16 }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Currently Unavailable</span>
            </div>}
            <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 12 }}>{product.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><Stars rating={5} color={theme.primary} /><span style={{ color: COLORS.textMuted }}>({product.reviews?.length || 0} reviews) • {product.sold?.toLocaleString()} sold</span></div>
            <p style={{ color: COLORS.textMuted, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>{product.desc}</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ color: isSoldOut ? COLORS.textMuted : '#fff', fontSize: 42, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif" }}>{formatPrice(product.price, country)}</span>
              <span style={{ color: COLORS.textDim, fontSize: 20, textDecoration: 'line-through', marginLeft: 12 }}>{formatPrice(product.was, country)}</span>
              {!isSoldOut && <span style={{ color: COLORS.success, fontSize: 16, fontWeight: 700, marginLeft: 12 }}>SAVE {getDiscount(product.price, product.was)}%</span>}
            </div>
            
            {isSoldOut ? (
              <div>
                <div style={{ background: `${theme.primary}22`, border: `1px solid ${theme.primary}`, borderRadius: 8, padding: '16px', marginBottom: 24, textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontWeight: 600, marginBottom: 8 }}>🔔 Get notified when back in stock</div>
                  {notified ? (
                    <div style={{ color: COLORS.success, fontWeight: 600 }}>✓ We'll email you when it's available!</div>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input type="email" placeholder="Enter your email" value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)}
                        style={{ flex: 1, background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '10px 12px', color: '#fff', fontSize: 14 }} />
                      <button onClick={() => { if (notifyEmail) setNotified(true); }} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>NOTIFY ME</button>
                    </div>
                  )}
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: 13, textAlign: 'center' }}>This bundle was a hit! We're restocking soon.</div>
              </div>
            ) : (
              <>
                {product.stock <= 15 && product.stock > 0 && <div style={{ background: `${theme.primary}22`, border: `1px solid ${theme.primary}`, borderRadius: 8, padding: '12px 16px', marginBottom: 24, color: theme.primary, fontWeight: 600 }}>🔥 Only {product.stock} left in stock!</div>}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: 1, display: 'block', marginBottom: 8 }}>QUANTITY</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 8, fontSize: 20, cursor: 'pointer' }}>−</button>
                    <span style={{ color: '#fff', fontSize: 18, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>{qty}</span>
                    <button onClick={() => setQty(qty + 1)} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 8, fontSize: 20, cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <button onClick={() => { for (let i = 0; i < qty; i++) onAdd(product); onClose(); }}
                  style={{ width: '100%', background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, color: '#fff', border: 'none', borderRadius: 8, padding: '18px', fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, cursor: 'pointer', boxShadow: `0 4px 20px ${theme.glow}`, marginBottom: 12 }}>
                  ADD TO CART - {formatPrice(product.price * qty, country)}
                </button>
                <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: 8, border: '1px solid rgba(139, 92, 246, 0.3)', marginBottom: 16 }}>
                  <span style={{ color: '#8B5CF6', fontSize: 13, fontWeight: 600 }}>💳 Or 4 payments of {formatPrice(product.price * qty / 4, country)} with Afterpay</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, color: COLORS.textMuted, fontSize: 12 }}><span>🚀 Fast Shipping</span><span>↩️ 30-Day Returns</span><span>🔒 Secure</span></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// =============================================
// COUNTRY SELECTOR
// =============================================
const CountrySelector = ({ show, onClose, country, setCountry }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 300 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, padding: 24, maxWidth: 400, width: '90%', zIndex: 301, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 20 }}>SELECT YOUR COUNTRY</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {Object.entries(COUNTRIES).map(([code, c]) => (
            <button key={code} onClick={() => { setCountry(c); onClose(); }}
              style={{ background: country.currency === c.currency ? COLORS.accent : COLORS.bg, border: `1px solid ${country.currency === c.currency ? COLORS.accent : COLORS.border}`, borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ fontSize: 24 }}>{c.flag}</span><span style={{ color: '#fff', fontWeight: 600 }}>{c.name}</span></div>
              <div style={{ color: COLORS.textMuted, fontSize: 13 }}>{c.currency}</div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// =============================================
// LEGAL MODALS
// =============================================
const TermsModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 500 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 700, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 501, border: `1px solid ${COLORS.border}`, padding: 32 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24, letterSpacing: 2 }}>TERMS OF SERVICE</h2>
        <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>1. Agreement to Terms</strong><br/>By accessing ARK Global Supply ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you disagree with any part, please do not use our website.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>2. Products & Pricing</strong><br/>All prices are displayed in Australian Dollars (AUD) unless otherwise stated. Prices may change without notice. Product images are for illustration; actual items may vary.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>3. Orders & Payment</strong><br/>Orders are subject to availability. Payment is processed securely via Stripe. We accept Visa, Mastercard, American Express, PayPal, Afterpay, and Zip.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>4. Afterpay</strong><br/>Afterpay allows you to pay in 4 interest-free installments. Afterpay's terms and conditions apply. You must be 18+ and an Australian resident.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>5. Shipping</strong><br/>We ship within Australia and select international destinations. Estimated delivery times are guides only. We are not liable for carrier delays.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>6. Returns</strong><br/>We offer a 30-day money-back guarantee on unused items in original packaging. See our Returns Policy for details.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>7. Limitation of Liability</strong><br/>ARK Global Supply shall not be liable for any indirect, incidental, or consequential damages arising from use of our products or website.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>8. Governing Law</strong><br/>These terms are governed by the laws of New South Wales, Australia.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>9. Contact</strong><br/>Questions? Email {SITE.business.email}</p>
          <p style={{ color: COLORS.textDim, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${COLORS.border}` }}>Last updated: December 2024</p>
        </div>
      </div>
    </>
  );
};

const PrivacyModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 500 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 700, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 501, border: `1px solid ${COLORS.border}`, padding: 32 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24, letterSpacing: 2 }}>PRIVACY POLICY</h2>
        <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ marginBottom: 16 }}>ARK Global Supply is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Information We Collect</strong><br/>Name, email, shipping address, phone number, payment information, and browsing data via cookies.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>How We Use Your Information</strong><br/>Process orders, send confirmations and shipping updates, improve our services, and send marketing emails (with consent).</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Information Sharing</strong><br/>We do not sell your data. We share information only with: Stripe (payments), Afterpay (buy-now-pay-later), shipping carriers, and analytics providers.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Data Security</strong><br/>We use SSL encryption. Payment data is handled by Stripe/Afterpay and never stored on our servers.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Your Rights</strong><br/>You can access, correct, or delete your data. Contact us to exercise these rights.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Contact</strong><br/>Privacy questions? Email {SITE.business.email}</p>
          <p style={{ color: COLORS.textDim, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${COLORS.border}` }}>Last updated: December 2024</p>
        </div>
      </div>
    </>
  );
};

const ReturnsModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 500 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 700, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 501, border: `1px solid ${COLORS.border}`, padding: 32 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24, letterSpacing: 2 }}>RETURNS & REFUNDS</h2>
        <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
          <div style={{ background: COLORS.success + '22', border: `1px solid ${COLORS.success}`, borderRadius: 8, padding: 16, marginBottom: 24, textAlign: 'center' }}>
            <span style={{ color: COLORS.success, fontWeight: 700, fontSize: 16 }}>✓ 30-DAY MONEY-BACK GUARANTEE</span>
          </div>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Our Promise</strong><br/>We want you to love your bundle! If you're not completely satisfied, we'll make it right.</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Eligibility for Returns</strong><br/>
          • Items must be returned within 30 days of delivery<br/>
          • Items must be unused and in original packaging<br/>
          • Items must include all original contents and tags<br/>
          • Proof of purchase is required</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Non-Returnable Items</strong><br/>
          • Opened skincare, cosmetics, or hygiene products<br/>
          • Personalized or custom items<br/>
          • Perishable goods (food, chocolates)<br/>
          • Items marked as "Final Sale"</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>How to Return</strong><br/>
          1. Email {SITE.business.email} with your order number<br/>
          2. We'll send you a return authorization and instructions<br/>
          3. Package items securely and ship to provided address<br/>
          4. Refund processed within 5-10 business days of receiving return</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Refund Method</strong><br/>
          Refunds are issued to the original payment method. Afterpay orders will be refunded according to Afterpay's policy.</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Shipping Costs</strong><br/>
          • Return shipping costs are the customer's responsibility<br/>
          • Original shipping charges are non-refundable<br/>
          • If item is faulty or incorrect, we'll cover return shipping</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Damaged or Faulty Items</strong><br/>
          Contact us within 48 hours of delivery with photos. We'll arrange a replacement or full refund including shipping.</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Exchanges</strong><br/>
          We don't offer direct exchanges. Please return your item for a refund and place a new order.</p>
          
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Contact Us</strong><br/>
          Questions about returns? Email {SITE.business.email}<br/>
          We aim to respond within 24 hours.</p>
          
          <p style={{ color: COLORS.textDim, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${COLORS.border}` }}>Last updated: December 2024</p>
        </div>
      </div>
    </>
  );
};

// =============================================
// POPUPS
// =============================================
const ExitIntent = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 400 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 450, width: '90%', padding: 40, textAlign: 'center', zIndex: 401, border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 60px ${COLORS.accentGlow}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔔</div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginBottom: 12 }}>DON'T MISS OUT!</h2>
        <p style={{ color: COLORS.textMuted, fontSize: 16, marginBottom: 24 }}>Get 10% off when we restock:</p>
        <div style={{ background: COLORS.bg, border: `2px dashed ${COLORS.accent}`, borderRadius: 8, padding: '16px 24px', marginBottom: 24 }}>
          <span style={{ color: COLORS.accent, fontSize: 28, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4 }}>SAVE10</span>
        </div>
        <button onClick={onClose} style={{ width: '100%', background: `linear-gradient(135deg, ${COLORS.accent} 0%, #FF6B2B 100%)`, color: '#fff', border: 'none', borderRadius: 8, padding: '16px', fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, cursor: 'pointer' }}>GOT IT!</button>
      </div>
    </>
  );
};

const SocialProofPopup = ({ show, data }) => {
  if (!show || !data) return null;
  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, zIndex: 100, boxShadow: '0 8px 30px rgba(0,0,0,0.3)', maxWidth: 320 }}>
      <div style={{ width: 44, height: 44, background: COLORS.accent, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>{data.name[0]}</div>
      <div>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{data.name} from {data.loc}<span style={{ color: COLORS.success, fontSize: 11, marginLeft: 6 }}>✓</span></div>
        <div style={{ color: COLORS.textMuted, fontSize: 13 }}>Just purchased <strong style={{ color: COLORS.accent }}>{data.prod}</strong></div>
        <div style={{ color: COLORS.textDim, fontSize: 11, marginTop: 2 }}>{Math.floor(Math.random() * 5) + 1} minutes ago</div>
      </div>
    </div>
  );
};

const Notification = ({ show, message }) => {
  if (!show) return null;
  return <div style={{ position: 'fixed', top: 100, right: 20, background: COLORS.success, color: '#000', padding: '16px 24px', borderRadius: 8, fontWeight: 600, fontSize: 14, zIndex: 500, boxShadow: '0 4px 20px rgba(0, 255, 136, 0.3)' }}>✓ {message}</div>;
};

// =============================================
// MAIN APP
// =============================================
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('ark-cart')) || []; } catch { return []; } });
  const [country, setCountry] = useState(() => { try { return JSON.parse(localStorage.getItem('ark-country')) || COUNTRIES.AU; } catch { return COUNTRIES.AU; } });
  const [showCart, setShowCart] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [socialProof, setSocialProof] = useState(null);
  const [notification, setNotification] = useState(null);
  const [saleEnd] = useState(() => Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReturns, setShowReturns] = useState(false);

  // Get current page theme
  const getPageTheme = () => {
    switch(currentPage) {
      case 'womens': return COLORS.womens;
      case 'kids': return COLORS.kids;
      case 'gifts': return COLORS.gifts;
      case 'mens': return COLORS.mens;
      default: return COLORS.mens;
    }
  };

  // Persist cart & country
  useEffect(() => { localStorage.setItem('ark-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('ark-country', JSON.stringify(country)); }, [country]);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  // Add to cart
  const handleAddToCart = (product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  // View product
  const handleViewDetails = (product) => { setSelectedProduct(product); setShowProductModal(true); };

  // Checkout with Stripe
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, country }),
      });
      const { url, error } = await response.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch (err) {
      alert('Checkout error: ' + err.message);
      setIsCheckingOut(false);
    }
  };

  // Exit intent
  useEffect(() => {
    const handleMouseLeave = (e) => { if (e.clientY <= 0 && !exitIntentShown && cart.length === 0) { setShowExitIntent(true); setExitIntentShown(true); } };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown, cart.length]);

  // Social proof
  useEffect(() => {
    const showProof = () => { setSocialProof(SOCIAL_PROOF[Math.floor(Math.random() * SOCIAL_PROOF.length)]); setTimeout(() => setSocialProof(null), 4000); };
    const initial = setTimeout(showProof, 8000);
    const interval = setInterval(() => setTimeout(showProof, Math.random() * 30000 + 30000), 60000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'mens':
        return <CategoryPage category="mens" title="Men's" subtitle="Premium bundles for the modern man. Grooming, fitness, tech & lifestyle essentials." icon="💪" theme={COLORS.mens} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} />;
      case 'womens':
        return <CategoryPage category="womens" title="Women's" subtitle="Self-care, beauty & wellness essentials. Treat yourself to something special." icon="👗" theme={COLORS.womens} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} />;
      case 'kids':
        return <CategoryPage category="kids" title="Kids" subtitle="Fun, educational & creative bundles for little ones. Learning through play!" icon="🎨" theme={COLORS.kids} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} />;
      case 'gifts':
        return <CategoryPage category="gifts" title="Gifts" subtitle="Perfect presents for every occasion. Beautifully packaged & ready to give." icon="🎁" theme={COLORS.gifts} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} />;
      default:
        return <HomePage country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} setCurrentPage={setCurrentPage} />;
    }
  };

  // Get product theme for modal
  const getProductTheme = () => {
    if (!selectedProduct) return COLORS.mens;
    switch(selectedProduct.cat) {
      case 'womens': return COLORS.womens;
      case 'kids': return COLORS.kids;
      case 'gifts': return COLORS.gifts;
      default: return COLORS.mens;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, fontFamily: "'Inter', sans-serif" }}>
      <Header cart={cart} setShowCart={setShowCart} country={country} setShowCountry={setShowCountry} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {renderPage()}
      
      <Newsletter accentColor={getPageTheme().primary} />
      <FAQSection accentColor={getPageTheme().primary} />
      <Footer onTerms={() => setShowTerms(true)} onPrivacy={() => setShowPrivacy(true)} onReturns={() => setShowReturns(true)} />
      
      <CartDrawer show={showCart} onClose={() => setShowCart(false)} cart={cart} setCart={setCart} country={country} onCheckout={handleCheckout} isCheckingOut={isCheckingOut} accentColor={getPageTheme().primary} />
      <ProductModal product={selectedProduct} show={showProductModal} onClose={() => setShowProductModal(false)} country={country} onAdd={handleAddToCart} theme={getProductTheme()} />
      <CountrySelector show={showCountry} onClose={() => setShowCountry(false)} country={country} setCountry={setCountry} />
      <ExitIntent show={showExitIntent} onClose={() => setShowExitIntent(false)} />
      <SocialProofPopup show={!!socialProof} data={socialProof} />
      <Notification show={!!notification} message={notification} />
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal show={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <ReturnsModal show={showReturns} onClose={() => setShowReturns(false)} />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; color: ${COLORS.text}; }
        ::placeholder { color: ${COLORS.textMuted}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }
        @media (max-width: 900px) {
          nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
