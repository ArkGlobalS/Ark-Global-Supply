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
const Stars = ({ rating = 5 }) => (
  <span style={{ color: COLORS.gold }}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
);

const Timer = ({ endTime }) => {
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
          <div style={{ background: COLORS.accent, color: '#fff', borderRadius: 6, padding: '8px 12px', fontSize: 18, fontWeight: 800, fontFamily: 'monospace', minWidth: 44 }}>
            {String(b.v).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 4, fontWeight: 600, letterSpacing: 1 }}>{b.l}</div>
        </div>
      ))}
    </div>
  );
};

// =============================================
// HEADER
// =============================================
const Header = ({ cart, setShowCart, country, setShowCountry }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  return (
    <>
      <div style={{ background: COLORS.accent, color: '#fff', textAlign: 'center', padding: '10px 20px', fontSize: 13, fontWeight: 600 }}>
        🔥 FREE SHIPPING ON ORDERS OVER ${SITE.shipping.freeThreshold} | USE CODE <strong>ALPHA20</strong> FOR 20% OFF
      </div>
      <header style={{ background: COLORS.bg, borderBottom: `1px solid ${COLORS.border}`, padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>{SITE.name}</span>
            <span style={{ fontSize: 12, color: COLORS.accent, fontWeight: 600, letterSpacing: 1 }}>{SITE.tagline}</span>
          </div>
          <nav style={{ display: 'flex', gap: 32 }}>
            {['SHOP', "MEN'S", 'BUNDLES', 'SALE'].map((item) => (
              <a key={item} href={item === "MEN'S" ? '#mens' : '#products'} style={{ color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>{item}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={() => setShowCountry(true)} style={{ background: 'transparent', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '8px 12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              <span>{country.flag}</span><span>{country.currency}</span>
            </button>
            <button onClick={() => setShowCart(true)} style={{ background: COLORS.accent, border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              🛒 CART {cartCount > 0 && <span style={{ background: '#fff', color: COLORS.accent, borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

// =============================================
// HERO
// =============================================
const Hero = ({ saleEnd }) => (
  <section style={{ background: `linear-gradient(135deg, ${COLORS.bg} 0%, #1a1a1a 100%)`, padding: '80px 24px', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: `radial-gradient(circle at 70% 50%, ${COLORS.accentGlow} 0%, transparent 50%)`, pointerEvents: 'none' }} />
    <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '8px 16px', marginBottom: 24 }}>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{SITE.hero.badge}</span>
        <Stars rating={5} />
        <span style={{ color: COLORS.gold, fontSize: 13, fontWeight: 600 }}>4.9 (2.4k reviews)</span>
      </div>
      <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1, marginBottom: 24, letterSpacing: 2 }}>
        {SITE.hero.headline.split('. ').map((line, i) => <span key={i}>{line}{i < 2 ? '.' : ''}<br /></span>)}
      </h1>
      <p style={{ fontSize: 18, color: COLORS.textMuted, maxWidth: 500, marginBottom: 32, lineHeight: 1.6 }}>{SITE.hero.subheadline}</p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
        <a href="#mens" style={{ background: `linear-gradient(135deg, ${COLORS.accent} 0%, #FF6B2B 100%)`, color: '#fff', padding: '16px 32px', borderRadius: 8, fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, textDecoration: 'none', boxShadow: `0 4px 20px ${COLORS.accentGlow}` }}>SHOP MEN'S →</a>
        <a href="#products" style={{ background: 'transparent', color: '#fff', padding: '16px 32px', borderRadius: 8, fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, textDecoration: 'none', border: `2px solid ${COLORS.border}` }}>ALL BUNDLES</a>
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: '16px 24px' }}>
        <div style={{ color: COLORS.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⚡ FLASH SALE ENDS IN</div>
        <Timer endTime={saleEnd} />
      </div>
    </div>
  </section>
);

// =============================================
// TRUST BAR
// =============================================
const TrustBar = () => (
  <section style={{ background: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: '24px 20px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
      {SITE.trustBadges.map((badge, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{badge.icon}</span>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>{badge.text}</span>
        </div>
      ))}
    </div>
  </section>
);

// =============================================
// PRODUCT CARD
// =============================================
const ProductCard = ({ product, country, onAdd, onView }) => {
  const [hover, setHover] = useState(false);
  const [viewers] = useState(randomInRange(12, 89));
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => onView(product)}
      style={{ background: COLORS.bgCard, borderRadius: 16, overflow: 'hidden', border: `2px solid ${hover ? COLORS.accent : COLORS.border}`, transition: 'all 0.3s ease', cursor: 'pointer', transform: hover ? 'translateY(-4px)' : 'none', boxShadow: hover ? `0 8px 30px ${COLORS.accentGlow}` : 'none' }}>
      <div style={{ position: 'relative' }}>
        <img src={product.img} alt={product.name} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 12, left: 12, background: product.tagBg, color: '#fff', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{product.tag}</div>
        <div style={{ position: 'absolute', top: 12, right: 12, background: COLORS.bg, color: COLORS.accent, padding: '6px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>-{getDiscount(product.price, product.was)}%</div>
        <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '6px 10px', borderRadius: 6, fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, background: COLORS.success, borderRadius: '50%' }} />{viewers} viewing
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>{product.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Stars rating={5} />
          <span style={{ color: COLORS.textMuted, fontSize: 12 }}>({product.reviews?.length || 0}) • {product.sold?.toLocaleString()} sold</span>
        </div>
        <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 16, lineHeight: 1.5, height: 40, overflow: 'hidden' }}>{product.desc}</p>
        {product.stock <= 15 && <div style={{ color: COLORS.accent, fontSize: 12, fontWeight: 600, marginBottom: 12 }}>🔥 ONLY {product.stock} LEFT</div>}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ color: '#fff', fontSize: 28, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif" }}>{formatPrice(product.price, country)}</span>
            <span style={{ color: COLORS.textMuted, fontSize: 14, textDecoration: 'line-through', marginLeft: 8 }}>{formatPrice(product.was, country)}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAdd(product); }} style={{ background: COLORS.accent, color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', fontSize: 14, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1, cursor: 'pointer' }}>ADD</button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// MENS SECTION
// =============================================
const MensSection = ({ country, onAdd, onView }) => {
  const mensProducts = PRODUCTS.filter(p => p.cat === 'mens');
  return (
    <section id="mens" style={{ padding: '80px 24px', background: `linear-gradient(180deg, ${COLORS.bg} 0%, #0F0F0F 100%)`, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ display: 'inline-block', background: COLORS.accent, color: '#fff', padding: '6px 16px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 16 }}>💪 ALPHA COLLECTION</div>
          <h2 style={{ fontSize: 56, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, marginBottom: 16 }}>MEN'S BUNDLES</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 18, maxWidth: 600, margin: '0 auto' }}>Premium bundles for men who demand the best.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {mensProducts.map(product => <ProductCard key={product.id} product={product} country={country} onAdd={onAdd} onView={onView} />)}
        </div>
      </div>
    </section>
  );
};

// =============================================
// ALL PRODUCTS
// =============================================
const ProductGrid = ({ country, onAdd, onView }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCategory);
  return (
    <section id="products" style={{ padding: '60px 24px', background: COLORS.bg }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginBottom: 16 }}>ALL BUNDLES</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 16 }}>Premium curated bundles shipped fast from Sydney</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          {SITE.categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{ background: activeCategory === cat.id ? COLORS.accent : COLORS.bgCard, color: '#fff', border: `1px solid ${activeCategory === cat.id ? COLORS.accent : COLORS.border}`, borderRadius: 50, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              {cat.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {filtered.map(product => <ProductCard key={product.id} product={product} country={country} onAdd={onAdd} onView={onView} />)}
        </div>
      </div>
    </section>
  );
};

// =============================================
// NEWSLETTER
// =============================================
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail(''); } };
  return (
    <section style={{ background: `linear-gradient(135deg, ${COLORS.accent} 0%, #FF6B2B 100%)`, padding: '60px 24px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginBottom: 16 }}>JOIN THE PACK</h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 32 }}>Get exclusive deals, early access & 15% off your first order.</p>
        {submitted ? (
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '20px 24px', color: '#fff', fontWeight: 600 }}>✓ You're in! Check your inbox for your discount code.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
              style={{ flex: 1, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '16px 20px', color: '#fff', fontSize: 16 }} />
            <button type="submit" style={{ background: '#fff', color: COLORS.accent, border: 'none', borderRadius: 8, padding: '16px 32px', fontSize: 16, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1, cursor: 'pointer' }}>SUBSCRIBE</button>
          </form>
        )}
      </div>
    </section>
  );
};

// =============================================
// FAQ
// =============================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section style={{ padding: '60px 24px', background: COLORS.bg }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, textAlign: 'center', marginBottom: 40 }}>QUESTIONS? WE GOT ANSWERS.</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', background: 'transparent', border: 'none', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{item.q}</span>
                <span style={{ color: COLORS.accent, fontSize: 24, transform: openIndex === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
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
const Footer = () => (
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
          {['All Bundles', "Men's Collection", 'Gift Boxes', 'Sale'].map(link => (
            <a key={link} href="#products" style={{ display: 'block', color: COLORS.textMuted, textDecoration: 'none', fontSize: 14, marginBottom: 10 }}>{link}</a>
          ))}
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>CONTACT</h4>
          <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
            <div>📍 {SITE.business.location}</div>
            <div>📧 {SITE.business.email}</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 30, paddingBottom: 30, borderBottom: `1px solid ${COLORS.border}` }}>
        {SITE.payments.map(p => <div key={p} style={{ background: COLORS.bg, padding: '8px 16px', borderRadius: 6, color: COLORS.textMuted, fontSize: 12, fontWeight: 600 }}>{p}</div>)}
      </div>
      <div style={{ textAlign: 'center', color: COLORS.textDim, fontSize: 13 }}>© {new Date().getFullYear()} {SITE.name} {SITE.tagline}. All rights reserved. Made in Australia 🇦🇺</div>
    </div>
  </footer>
);

// =============================================
// CART DRAWER
// =============================================
const CartDrawer = ({ show, onClose, cart, setCart, country, onCheckout }) => {
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
              <div style={{ background: COLORS.accent, height: '100%', width: `${Math.min((subtotal / SITE.shipping.freeThreshold) * 100, 100)}%` }} />
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
                <div style={{ color: COLORS.accent, fontWeight: 700 }}>{formatPrice(item.price, country)}</div>
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
            <button onClick={onCheckout} style={{ width: '100%', background: `linear-gradient(135deg, ${COLORS.accent} 0%, #FF6B2B 100%)`, color: '#fff', border: 'none', borderRadius: 8, padding: '16px', fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, cursor: 'pointer', boxShadow: `0 4px 20px ${COLORS.accentGlow}` }}>CHECKOUT →</button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, color: COLORS.textMuted, fontSize: 12 }}><span>🔒 Secure</span><span>💳 Afterpay</span><span>↩️ 30-Day Returns</span></div>
          </div>
        )}
      </div>
    </>
  );
};

// =============================================
// PRODUCT MODAL
// =============================================
const ProductModal = ({ product, show, onClose, country, onAdd }) => {
  const [qty, setQty] = useState(1);
  const [viewers] = useState(randomInRange(12, 89));
  if (!show || !product) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 300 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 800, width: '90%', maxHeight: '90vh', overflow: 'auto', zIndex: 301, border: `1px solid ${COLORS.border}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: COLORS.bg, border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: 24, cursor: 'pointer', zIndex: 10 }}>×</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ position: 'relative' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', minHeight: 400, objectFit: 'cover', borderRadius: '16px 0 0 16px' }} />
            <div style={{ position: 'absolute', top: 16, left: 16, background: product.tagBg, color: '#fff', padding: '8px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>{product.tag}</div>
          </div>
          <div style={{ padding: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: COLORS.bg, padding: '8px 12px', borderRadius: 6, marginBottom: 16 }}>
              <span style={{ width: 8, height: 8, background: COLORS.success, borderRadius: '50%' }} /><span style={{ color: '#fff', fontSize: 13 }}>{viewers} people viewing</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 12 }}>{product.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}><Stars rating={5} /><span style={{ color: COLORS.textMuted }}>({product.reviews?.length || 0} reviews) • {product.sold?.toLocaleString()} sold</span></div>
            <p style={{ color: COLORS.textMuted, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>{product.desc}</p>
            <div style={{ marginBottom: 24 }}>
              <span style={{ color: '#fff', fontSize: 42, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif" }}>{formatPrice(product.price, country)}</span>
              <span style={{ color: COLORS.textMuted, fontSize: 20, textDecoration: 'line-through', marginLeft: 12 }}>{formatPrice(product.was, country)}</span>
              <span style={{ color: COLORS.success, fontSize: 16, fontWeight: 700, marginLeft: 12 }}>SAVE {getDiscount(product.price, product.was)}%</span>
            </div>
            {product.stock <= 15 && <div style={{ background: 'rgba(255, 77, 0, 0.1)', border: `1px solid ${COLORS.accent}`, borderRadius: 8, padding: '12px 16px', marginBottom: 24, color: COLORS.accent, fontWeight: 600 }}>🔥 Only {product.stock} left in stock!</div>}
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: 1, display: 'block', marginBottom: 8 }}>QUANTITY</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 8, fontSize: 20, cursor: 'pointer' }}>−</button>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 40, height: 40, borderRadius: 8, fontSize: 20, cursor: 'pointer' }}>+</button>
              </div>
            </div>
            <button onClick={() => { for (let i = 0; i < qty; i++) onAdd(product); onClose(); }}
              style={{ width: '100%', background: `linear-gradient(135deg, ${COLORS.accent} 0%, #FF6B2B 100%)`, color: '#fff', border: 'none', borderRadius: 8, padding: '18px', fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, cursor: 'pointer', boxShadow: `0 4px 20px ${COLORS.accentGlow}`, marginBottom: 16 }}>
              ADD TO CART - {formatPrice(product.price * qty, country)}
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, color: COLORS.textMuted, fontSize: 12 }}><span>🚀 Fast Shipping</span><span>↩️ 30-Day Returns</span><span>🔒 Secure</span></div>
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
// POPUPS
// =============================================
const ExitIntent = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 400 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 450, width: '90%', padding: 40, textAlign: 'center', zIndex: 401, border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 60px ${COLORS.accentGlow}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔥</div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginBottom: 12 }}>WAIT. DON'T LEAVE.</h2>
        <p style={{ color: COLORS.textMuted, fontSize: 16, marginBottom: 24 }}>Here's 20% off your order:</p>
        <div style={{ background: COLORS.bg, border: `2px dashed ${COLORS.accent}`, borderRadius: 8, padding: '16px 24px', marginBottom: 24 }}>
          <span style={{ color: COLORS.accent, fontSize: 28, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4 }}>ALPHA20</span>
        </div>
        <button onClick={onClose} style={{ width: '100%', background: `linear-gradient(135deg, ${COLORS.accent} 0%, #FF6B2B 100%)`, color: '#fff', border: 'none', borderRadius: 8, padding: '16px', fontSize: 18, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, cursor: 'pointer' }}>CLAIM MY 20% OFF</button>
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
  // State
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
  const [saleEnd] = useState(() => Date.now() + 24 * 60 * 60 * 1000);

  // Persist cart & country
  useEffect(() => { localStorage.setItem('ark-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('ark-country', JSON.stringify(country)); }, [country]);

  // Add to cart
  const handleAddToCart = (product) => {
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

  // Checkout
  const handleCheckout = () => alert('Stripe checkout integration needed!\n\nSee README.md for setup instructions.');

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

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, fontFamily: "'Inter', sans-serif" }}>
      <Header cart={cart} setShowCart={setShowCart} country={country} setShowCountry={setShowCountry} />
      <Hero saleEnd={saleEnd} />
      <TrustBar />
      <MensSection country={country} onAdd={handleAddToCart} onView={handleViewDetails} />
      <ProductGrid country={country} onAdd={handleAddToCart} onView={handleViewDetails} />
      <Newsletter />
      <FAQSection />
      <Footer />
      
      <CartDrawer show={showCart} onClose={() => setShowCart(false)} cart={cart} setCart={setCart} country={country} onCheckout={handleCheckout} />
      <ProductModal product={selectedProduct} show={showProductModal} onClose={() => setShowProductModal(false)} country={country} onAdd={handleAddToCart} />
      <CountrySelector show={showCountry} onClose={() => setShowCountry(false)} country={country} setCountry={setCountry} />
      <ExitIntent show={showExitIntent} onClose={() => setShowExitIntent(false)} />
      <SocialProofPopup show={!!socialProof} data={socialProof} />
      <Notification show={!!notification} message={notification} />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; color: ${COLORS.text}; }
        ::placeholder { color: ${COLORS.textMuted}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }
        @media (max-width: 768px) { nav { display: none !important; } }
      `}</style>
    </div>
  );
};

export default App;
