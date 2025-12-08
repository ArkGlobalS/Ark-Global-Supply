import { useState, useEffect, useRef } from 'react';
import { COLORS, SITE, COUNTRIES, DISCOUNTS, SOCIAL_PROOF, FAQ, PRODUCTS, FLOATING_ICONS, getRelatedProducts, getThemeByCategory } from './config';

// =============================================
// HELPER FUNCTIONS
// =============================================
const formatPrice = (price, country) => `${country.symbol}${(price * country.rate).toFixed(2)}`;
const getDiscount = (price, was) => Math.round(((was - price) / was) * 100);
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// =============================================
// FLOATING ICONS BACKGROUND
// =============================================
const FloatingIcons = ({ icons, color }) => {
  const [positions] = useState(() => 
    icons.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: randomInRange(20, 40),
      duration: randomInRange(15, 30),
      delay: Math.random() * -20
    }))
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {icons.map((icon, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
            fontSize: positions[i].size,
            opacity: 0.15,
            animation: `float ${positions[i].duration}s ease-in-out ${positions[i].delay}s infinite`,
            filter: `drop-shadow(0 0 10px ${color})`
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

// =============================================
// LOADING SKELETON
// =============================================
const SkeletonCard = () => (
  <div style={{ background: COLORS.bgCard, borderRadius: 16, overflow: 'hidden', border: `1px solid ${COLORS.border}` }}>
    <div style={{ height: 220, background: `linear-gradient(90deg, ${COLORS.bgCard} 25%, ${COLORS.border} 50%, ${COLORS.bgCard} 75%)`, backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
    <div style={{ padding: 20 }}>
      <div style={{ height: 20, width: '70%', background: COLORS.border, borderRadius: 4, marginBottom: 12, animation: 'shimmer 1.5s infinite' }} />
      <div style={{ height: 14, width: '100%', background: COLORS.border, borderRadius: 4, marginBottom: 8, animation: 'shimmer 1.5s infinite' }} />
      <div style={{ height: 14, width: '60%', background: COLORS.border, borderRadius: 4, marginBottom: 16, animation: 'shimmer 1.5s infinite' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ height: 28, width: '40%', background: COLORS.border, borderRadius: 4, animation: 'shimmer 1.5s infinite' }} />
        <div style={{ height: 40, width: '30%', background: COLORS.border, borderRadius: 8, animation: 'shimmer 1.5s infinite' }} />
      </div>
    </div>
  </div>
);

const SkeletonGrid = ({ count = 4 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
    {Array(count).fill(0).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

// =============================================
// STARS COMPONENT
// =============================================
const Stars = ({ rating = 5, color = COLORS.gold }) => (
  <span style={{ color }}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
);

// =============================================
// COUNTDOWN TIMER
// =============================================
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
// STOCK COUNTDOWN
// =============================================
const StockCountdown = ({ stock, theme }) => {
  if (stock === 0) return null;
  
  const urgencyLevel = stock <= 5 ? 'critical' : stock <= 10 ? 'low' : 'normal';
  const colors = {
    critical: { bg: 'rgba(239, 68, 68, 0.2)', border: '#EF4444', text: '#EF4444' },
    low: { bg: 'rgba(245, 158, 11, 0.2)', border: '#F59E0B', text: '#F59E0B' },
    normal: { bg: `${theme.primary}22`, border: theme.primary, text: theme.primary }
  };
  const style = colors[urgencyLevel];
  
  return (
    <div style={{ 
      background: style.bg, 
      border: `1px solid ${style.border}`, 
      borderRadius: 8, 
      padding: '10px 14px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 8,
      animation: urgencyLevel === 'critical' ? 'pulse 2s infinite' : 'none'
    }}>
      <span style={{ fontSize: 16 }}>{urgencyLevel === 'critical' ? '🔥' : urgencyLevel === 'low' ? '⚠️' : '📦'}</span>
      <span style={{ color: style.text, fontWeight: 700, fontSize: 13 }}>
        {urgencyLevel === 'critical' ? `Only ${stock} left! Selling fast!` : 
         urgencyLevel === 'low' ? `Hurry! Only ${stock} remaining` : 
         `${stock} in stock`}
      </span>
    </div>
  );
};

// =============================================
// IMAGE GALLERY WITH SWIPE
// =============================================
const ImageGallery = ({ images, name, isSoldOut, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Main Image */}
      <div
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          cursor: isSoldOut ? 'default' : (isZoomed ? 'zoom-out' : 'zoom-in'),
          borderRadius: '16px 0 0 16px'
        }}
        onMouseEnter={() => !isSoldOut && setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={images[currentIndex]} 
          alt={name} 
          style={{ 
            width: '100%', 
            height: 450, 
            objectFit: 'cover',
            filter: isSoldOut ? 'grayscale(40%)' : 'none',
            transform: isZoomed ? 'scale(2)' : 'scale(1)',
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            transition: isZoomed ? 'none' : 'transform 0.3s ease'
          }} 
        />
        
        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(0,0,0,0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            <span style={{ 
              background: '#000', 
              color: '#fff', 
              padding: '16px 32px', 
              borderRadius: 8, 
              fontSize: 20, 
              fontWeight: 700, 
              letterSpacing: 2 
            }}>SOLD OUT</span>
          </div>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div style={{ 
          display: 'flex', 
          gap: 8, 
          padding: '12px 16px',
          background: COLORS.bg,
          justifyContent: 'center'
        }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                border: currentIndex === i ? `2px solid ${theme.primary}` : `1px solid ${COLORS.border}`,
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                opacity: currentIndex === i ? 1 : 0.6,
                transition: 'all 0.2s'
              }}
            >
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
      
      {/* Swipe Indicators (Mobile) */}
      {images.length > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 6, 
          position: 'absolute', 
          bottom: images.length > 1 ? 80 : 16, 
          left: '50%', 
          transform: 'translateX(-50%)'
        }}>
          {images.map((_, i) => (
            <div
              key={i}
              style={{
                width: currentIndex === i ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: currentIndex === i ? theme.primary : 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================
// HEADER
// =============================================
const Header = ({ cart, setShowCart, country, setShowCountry, currentPage, setCurrentPage }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const getPageAccent = () => {
    const theme = getThemeByCategory(currentPage);
    return theme.primary;
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
          <nav className="desktop-nav" style={{ display: 'flex', gap: 8 }}>
            {SITE.pages.map((page) => {
              const theme = getThemeByCategory(page.id);
              return (
                <button key={page.id} onClick={() => setCurrentPage(page.id)}
                  style={{ 
                    background: currentPage === page.id ? theme.primary : 'transparent',
                    border: `1px solid ${currentPage === page.id ? 'transparent' : COLORS.border}`,
                    color: '#fff', 
                    padding: '10px 20px', 
                    borderRadius: 8, 
                    fontSize: 13, 
                    fontWeight: 600, 
                    cursor: 'pointer',
                    letterSpacing: 1,
                    transition: 'all 0.2s'
                  }}>
                  {page.icon} {page.label}
                </button>
              );
            })}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setShowCountry(true)} style={{ background: 'transparent', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '8px 12px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              <span>{country.flag}</span><span>{country.currency}</span>
            </button>
            <button className="desktop-cart" onClick={() => setShowCart(true)} style={{ background: getPageAccent(), border: 'none', borderRadius: 8, padding: '10px 20px', color: '#fff', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              🛒 CART {cartCount > 0 && <span style={{ background: '#fff', color: getPageAccent(), borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

// =============================================
// MOBILE BOTTOM NAV
// =============================================
const MobileBottomNav = ({ currentPage, setCurrentPage, cart, setShowCart }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  
  return (
    <nav className="mobile-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: COLORS.bgCard,
      borderTop: `1px solid ${COLORS.border}`,
      display: 'none',
      justifyContent: 'space-around',
      padding: '8px 0 12px',
      zIndex: 200
    }}>
      {SITE.mobileNav.map((item) => {
        const isCart = item.id === 'cart';
        const isActive = !isCart && currentPage === item.id;
        const theme = getThemeByCategory(item.id);
        
        return (
          <button
            key={item.id}
            onClick={() => isCart ? setShowCart(true) : setCurrentPage(item.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              position: 'relative',
              padding: '4px 12px'
            }}
          >
            <span style={{ 
              fontSize: 24,
              filter: isActive ? `drop-shadow(0 0 8px ${theme.primary})` : 'none'
            }}>
              {item.icon}
            </span>
            <span style={{ 
              fontSize: 10, 
              color: isActive ? theme.primary : COLORS.textMuted,
              fontWeight: isActive ? 700 : 500
            }}>
              {item.label}
            </span>
            {isCart && cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 4,
                background: COLORS.accent,
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                width: 18,
                height: 18,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

// =============================================
// STICKY MOBILE CART BUTTON
// =============================================
const StickyMobileCart = ({ cart, setShowCart, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300 && cartCount > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cartCount]);

  if (!isVisible) return null;

  return (
    <button
      className="mobile-sticky-cart"
      onClick={() => setShowCart(true)}
      style={{
        position: 'fixed',
        bottom: 80,
        right: 16,
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
        border: 'none',
        borderRadius: 50,
        padding: '14px 24px',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: 14,
        display: 'none',
        alignItems: 'center',
        gap: 10,
        boxShadow: `0 4px 20px ${theme.glow}`,
        zIndex: 150,
        animation: 'slideUp 0.3s ease'
      }}
    >
      <span>🛒</span>
      <span>{cartCount} items</span>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>${cartTotal.toFixed(2)}</span>
    </button>
  );
};
// =============================================
// PRODUCT CARD WITH HOVER ZOOM
// =============================================
const ProductCard = ({ product, country, onAdd, onView, theme = COLORS.mens }) => {
  const [hover, setHover] = useState(false);
  const [imgHover, setImgHover] = useState(false);
  const [viewers] = useState(randomInRange(12, 89));
  const isSoldOut = product.stock === 0;
  
  return (
    <div 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)} 
      onClick={() => onView(product)}
      style={{ 
        background: COLORS.bgCard, 
        borderRadius: 16, 
        overflow: 'hidden', 
        border: `2px solid ${hover && !isSoldOut ? theme.primary : COLORS.border}`, 
        transition: 'all 0.3s ease', 
        cursor: 'pointer', 
        transform: hover && !isSoldOut ? 'translateY(-8px)' : 'none', 
        boxShadow: hover && !isSoldOut ? `0 12px 40px ${theme.glow}` : 'none',
        opacity: isSoldOut ? 0.85 : 1 
      }}
    >
      {/* Image Container with Zoom */}
      <div 
        style={{ position: 'relative', overflow: 'hidden' }}
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      >
        <img 
          src={product.img} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: 220, 
            objectFit: 'cover', 
            filter: isSoldOut ? 'grayscale(40%)' : 'none',
            transform: imgHover && !isSoldOut ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.4s ease'
          }} 
        />
        
        {/* Tag */}
        <div style={{ 
          position: 'absolute', 
          top: 12, 
          left: 12, 
          background: isSoldOut ? '#555555' : theme.primary, 
          color: '#fff', 
          padding: '6px 12px', 
          borderRadius: 6, 
          fontSize: 11, 
          fontWeight: 700, 
          letterSpacing: 1 
        }}>
          {isSoldOut ? 'SOLD OUT' : `${getDiscount(product.price, product.was)}% OFF`}
        </div>
        
        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'rgba(0,0,0,0.4)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <span style={{ 
              background: '#000', 
              color: '#fff', 
              padding: '12px 24px', 
              borderRadius: 8, 
              fontSize: 14, 
              fontWeight: 700, 
              letterSpacing: 2 
            }}>SOLD OUT</span>
          </div>
        )}
        
        {/* Viewers Badge */}
        {!isSoldOut && (
          <div style={{ 
            position: 'absolute', 
            bottom: 12, 
            left: 12, 
            background: 'rgba(0,0,0,0.8)', 
            color: '#fff', 
            padding: '6px 10px', 
            borderRadius: 6, 
            fontSize: 11, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6 
          }}>
            <span style={{ width: 8, height: 8, background: COLORS.success, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            {viewers} viewing
          </div>
        )}
        
        {/* Quick Add Button (on hover) */}
        {!isSoldOut && hover && (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              background: theme.primary,
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 16px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              animation: 'fadeIn 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>+</span> QUICK ADD
          </button>
        )}
      </div>
      
      {/* Product Info */}
      <div style={{ padding: 20 }}>
        <h3 style={{ 
          color: '#fff', 
          fontSize: 18, 
          fontWeight: 700, 
          marginBottom: 8, 
          fontFamily: "'Bebas Neue', sans-serif", 
          letterSpacing: 1 
        }}>
          {product.name}
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Stars rating={5} color={theme.primary} />
          <span style={{ color: COLORS.textMuted, fontSize: 12 }}>
            ({product.reviews?.length || 0}) • {product.sold?.toLocaleString()} sold
          </span>
        </div>
        
        <p style={{ 
          color: COLORS.textMuted, 
          fontSize: 13, 
          marginBottom: 16, 
          lineHeight: 1.5, 
          height: 40, 
          overflow: 'hidden' 
        }}>
          {product.desc}
        </p>
        
        {/* Stock Warning */}
        {!isSoldOut && product.stock <= 10 && (
          <div style={{ 
            color: product.stock <= 5 ? COLORS.error : COLORS.warning, 
            fontSize: 12, 
            fontWeight: 600, 
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <span>{product.stock <= 5 ? '🔥' : '⚠️'}</span>
            {product.stock <= 5 ? `Only ${product.stock} left!` : `${product.stock} remaining`}
          </div>
        )}
        
        {isSoldOut && (
          <div style={{ 
            color: theme.primary, 
            fontSize: 12, 
            fontWeight: 600, 
            marginBottom: 12 
          }}>
            📧 Get notified when back
          </div>
        )}
        
        {/* Price & Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ 
              color: isSoldOut ? COLORS.textMuted : '#fff', 
              fontSize: 28, 
              fontWeight: 800, 
              fontFamily: "'Bebas Neue', sans-serif" 
            }}>
              {formatPrice(product.price, country)}
            </span>
            <span style={{ 
              color: COLORS.textDim, 
              fontSize: 14, 
              textDecoration: 'line-through', 
              marginLeft: 8 
            }}>
              {formatPrice(product.was, country)}
            </span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); if (!isSoldOut) onAdd(product); }} 
            disabled={isSoldOut}
            style={{ 
              background: isSoldOut ? COLORS.border : theme.primary, 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '12px 20px', 
              fontSize: 14, 
              fontWeight: 700, 
              fontFamily: "'Bebas Neue', sans-serif", 
              letterSpacing: 1, 
              cursor: isSoldOut ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s',
              transform: hover && !isSoldOut ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {isSoldOut ? 'NOTIFY' : 'ADD'}
          </button>
        </div>
      </div>
    </div>
  );
};

// =============================================
// YOU MIGHT ALSO LIKE
// =============================================
const YouMightAlsoLike = ({ product, country, onAdd, onView }) => {
  const relatedProducts = getRelatedProducts(product.id, 4);
  
  if (relatedProducts.length === 0) return null;
  
  const theme = getThemeByCategory(product.cat);
  
  return (
    <div style={{ 
      marginTop: 40, 
      paddingTop: 40, 
      borderTop: `1px solid ${COLORS.border}` 
    }}>
      <h3 style={{ 
        color: '#fff', 
        fontSize: 24, 
        fontWeight: 700, 
        fontFamily: "'Bebas Neue', sans-serif", 
        letterSpacing: 2,
        marginBottom: 24,
        textAlign: 'center'
      }}>
        ✨ YOU MIGHT ALSO LIKE
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: 16 
      }}>
        {relatedProducts.map(relProduct => {
          const relTheme = getThemeByCategory(relProduct.cat);
          return (
            <div 
              key={relProduct.id}
              onClick={() => onView(relProduct)}
              style={{ 
                background: COLORS.bg, 
                borderRadius: 12, 
                overflow: 'hidden',
                border: `1px solid ${COLORS.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={relProduct.img} 
                  alt={relProduct.name} 
                  style={{ 
                    width: '100%', 
                    height: 120, 
                    objectFit: 'cover',
                    filter: relProduct.stock === 0 ? 'grayscale(40%)' : 'none'
                  }} 
                />
                {relProduct.stock === 0 && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 8, 
                    left: 8, 
                    background: '#555', 
                    color: '#fff', 
                    padding: '4px 8px', 
                    borderRadius: 4, 
                    fontSize: 9, 
                    fontWeight: 700 
                  }}>
                    SOLD OUT
                  </div>
                )}
              </div>
              <div style={{ padding: 12 }}>
                <h4 style={{ 
                  color: '#fff', 
                  fontSize: 13, 
                  fontWeight: 600, 
                  marginBottom: 6,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {relProduct.name}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    color: relTheme.primary, 
                    fontWeight: 700, 
                    fontSize: 16,
                    fontFamily: "'Bebas Neue', sans-serif"
                  }}>
                    {formatPrice(relProduct.price, country)}
                  </span>
                  <Stars rating={5} color={relTheme.primary} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =============================================
// TRUST BAR
// =============================================
const TrustBar = ({ accentColor = COLORS.accent }) => (
  <section style={{ 
    background: COLORS.bgCard, 
    borderTop: `1px solid ${COLORS.border}`, 
    borderBottom: `1px solid ${COLORS.border}`, 
    padding: '24px 20px' 
  }}>
    <div style={{ 
      maxWidth: 1400, 
      margin: '0 auto', 
      display: 'flex', 
      justifyContent: 'space-around', 
      flexWrap: 'wrap', 
      gap: 20 
    }}>
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
// HOME PAGE HERO
// =============================================
const HomeHero = ({ saleEnd, setCurrentPage }) => (
  <section style={{ 
    background: COLORS.bg,
    padding: '80px 24px', 
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Background Pattern */}
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      background: 'radial-gradient(circle at 20% 50%, rgba(255, 77, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
      pointerEvents: 'none'
    }} />
    
    {/* Floating Icons */}
    <FloatingIcons icons={FLOATING_ICONS.home} color={COLORS.accent} />
    
    <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: 8, 
        background: 'rgba(255,255,255,0.1)', 
        border: '1px solid rgba(255,255,255,0.2)', 
        borderRadius: 50, 
        padding: '8px 16px', 
        marginBottom: 24 
      }}>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{SITE.hero.badge}</span>
        <Stars rating={5} />
        <span style={{ color: COLORS.gold, fontSize: 13, fontWeight: 600 }}>4.9 (2.4k reviews)</span>
      </div>
      
      <h1 style={{ 
        fontSize: 'clamp(40px, 7vw, 72px)', 
        fontWeight: 800, 
        color: '#fff', 
        fontFamily: "'Bebas Neue', sans-serif", 
        lineHeight: 1.1, 
        marginBottom: 24, 
        letterSpacing: 2 
      }}>
        {SITE.hero.headline}
      </h1>
      
      <p style={{ 
        fontSize: 18, 
        color: COLORS.textMuted, 
        maxWidth: 500, 
        marginBottom: 32, 
        lineHeight: 1.6 
      }}>
        {SITE.hero.subheadline}
      </p>
      
      {/* Category Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: 16, 
        marginBottom: 40, 
        maxWidth: 700 
      }}>
        {[
          { id: 'mens', ...COLORS.mens },
          { id: 'womens', ...COLORS.womens },
          { id: 'kids', ...COLORS.kids },
          { id: 'gifts', ...COLORS.gifts }
        ].map(cat => (
          <button 
            key={cat.id}
            onClick={() => setCurrentPage(cat.id)} 
            style={{ 
              background: cat.gradient, 
              border: 'none', 
              borderRadius: 16, 
              padding: '28px 16px', 
              cursor: 'pointer', 
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: `0 4px 20px ${cat.glow}`
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: 36, marginBottom: 8 }}>{cat.icon}</div>
            <div style={{ 
              color: '#fff', 
              fontWeight: 700, 
              fontSize: 14, 
              fontFamily: "'Bebas Neue', sans-serif", 
              letterSpacing: 1 
            }}>
              {cat.id.toUpperCase()}{cat.id === 'mens' || cat.id === 'womens' ? "'S" : ''}
            </div>
          </button>
        ))}
      </div>
      
      <div style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: 16, 
        background: COLORS.bgCard, 
        border: `1px solid ${COLORS.border}`, 
        borderRadius: 12, 
        padding: '16px 24px' 
      }}>
        <div style={{ color: COLORS.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⚡ RESTOCK COMING SOON</div>
        <Timer endTime={saleEnd} />
      </div>
    </div>
  </section>
);

// =============================================
// CATEGORY PAGE
// =============================================
const CategoryPage = ({ category, title, subtitle, theme, country, onAdd, onView, saleEnd, isLoading }) => {
  const products = PRODUCTS.filter(p => p.cat === category);
  const icons = FLOATING_ICONS[category] || FLOATING_ICONS.home;
  
  return (
    <div>
      {/* Category Hero with Background */}
      <section style={{ 
        background: COLORS.bg,
        padding: '60px 24px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Themed Background Pattern */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: theme.bgPattern,
          pointerEvents: 'none'
        }} />
        
        {/* Animated Floating Icons */}
        <FloatingIcons icons={icons} color={theme.primary} />
        
        {/* Gradient Orbs */}
        <div style={{ 
          position: 'absolute', 
          top: '-20%', 
          right: '-10%', 
          width: 400, 
          height: 400, 
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
        <div style={{ 
          position: 'absolute', 
          bottom: '-20%', 
          left: '-10%', 
          width: 300, 
          height: 300, 
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
        
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-block', 
            background: theme.gradient, 
            color: '#fff', 
            padding: '8px 20px', 
            borderRadius: 50, 
            fontSize: 14, 
            fontWeight: 700, 
            letterSpacing: 2, 
            marginBottom: 20,
            boxShadow: `0 4px 20px ${theme.glow}`
          }}>
            {theme.icon} {title.toUpperCase()} COLLECTION
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(48px, 8vw, 72px)', 
            fontWeight: 800, 
            color: '#fff', 
            fontFamily: "'Bebas Neue', sans-serif", 
            lineHeight: 1, 
            marginBottom: 16, 
            letterSpacing: 2 
          }}>
            {title.toUpperCase()} BUNDLES
          </h1>
          
          <p style={{ 
            fontSize: 18, 
            color: COLORS.textMuted, 
            maxWidth: 500, 
            marginBottom: 24, 
            lineHeight: 1.6 
          }}>
            {subtitle}
          </p>
          
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 16, 
            background: COLORS.bgCard, 
            border: `1px solid ${COLORS.border}`, 
            borderRadius: 12, 
            padding: '16px 24px' 
          }}>
            <div style={{ color: theme.primary, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>⚡ RESTOCK IN</div>
            <Timer endTime={saleEnd} accentColor={theme.primary} />
          </div>
        </div>
      </section>
      
      <TrustBar accentColor={theme.primary} />
      
      {/* Products Grid */}
      <section style={{ 
        padding: '60px 24px', 
        background: COLORS.bg,
        position: 'relative'
      }}>
        {/* Subtle Background */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: theme.bgPattern,
          opacity: 0.5,
          pointerEvents: 'none'
        }} />
        
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Product Count */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 32 
          }}>
            <p style={{ color: COLORS.textMuted, fontSize: 14 }}>
              Showing <strong style={{ color: '#fff' }}>{products.length}</strong> bundles
            </p>
            <div style={{ 
              display: 'flex', 
              gap: 8, 
              alignItems: 'center', 
              color: COLORS.textMuted, 
              fontSize: 13 
            }}>
              <span>Sort by:</span>
              <select style={{ 
                background: COLORS.bgCard, 
                border: `1px solid ${COLORS.border}`, 
                borderRadius: 6, 
                padding: '8px 12px', 
                color: '#fff', 
                fontSize: 13,
                cursor: 'pointer'
              }}>
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          {/* Grid */}
          {isLoading ? (
            <SkeletonGrid count={6} />
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: 24 
            }}>
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  country={country} 
                  onAdd={onAdd} 
                  onView={onView} 
                  theme={theme} 
                />
              ))}
            </div>
          )}
          
          {products.length === 0 && !isLoading && (
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
const HomePage = ({ country, onAdd, onView, saleEnd, setCurrentPage, isLoading }) => {
  const featuredProducts = PRODUCTS.slice(0, 8);
  
  return (
    <div>
      <HomeHero saleEnd={saleEnd} setCurrentPage={setCurrentPage} />
      <TrustBar />
      
      {/* Featured Products */}
      <section style={{ 
        padding: '60px 24px', 
        background: COLORS.bg,
        position: 'relative'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 77, 0, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ 
              fontSize: 48, 
              fontWeight: 800, 
              color: '#fff', 
              fontFamily: "'Bebas Neue', sans-serif", 
              letterSpacing: 2, 
              marginBottom: 16 
            }}>
              🔥 POPULAR BUNDLES
            </h2>
            <p style={{ color: COLORS.textMuted, fontSize: 16 }}>Our most loved bundles — selling fast!</p>
          </div>
          
          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: 24 
            }}>
              {featuredProducts.map(product => {
                const theme = getThemeByCategory(product.cat);
                return (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    country={country} 
                    onAdd={onAdd} 
                    onView={onView} 
                    theme={theme} 
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      {/* Category Showcase */}
      <section style={{ 
        padding: '60px 24px', 
        background: COLORS.bgCard,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 42, 
            fontWeight: 800, 
            color: '#fff', 
            fontFamily: "'Bebas Neue', sans-serif", 
            letterSpacing: 2, 
            textAlign: 'center', 
            marginBottom: 40 
          }}>
            SHOP BY CATEGORY
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 24 
          }}>
            {[
              { id: 'mens', desc: 'Bundles for the modern man', ...COLORS.mens },
              { id: 'womens', desc: 'Self-care & beauty essentials', ...COLORS.womens },
              { id: 'kids', desc: 'Fun & educational packs', ...COLORS.kids },
              { id: 'gifts', desc: 'Perfect for every occasion', ...COLORS.gifts }
            ].map(cat => (
              <button 
                key={cat.id}
                onClick={() => setCurrentPage(cat.id)} 
                style={{ 
                  background: `linear-gradient(135deg, ${cat.primary}22 0%, ${cat.primary}44 100%)`, 
                  border: `2px solid ${cat.primary}`, 
                  borderRadius: 16, 
                  padding: '40px 24px', 
                  cursor: 'pointer', 
                  textAlign: 'center', 
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 12px 40px ${cat.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>{cat.icon}</div>
                <div style={{ 
                  color: '#fff', 
                  fontWeight: 700, 
                  fontSize: 20, 
                  fontFamily: "'Bebas Neue', sans-serif", 
                  letterSpacing: 2 
                }}>
                  {cat.id.toUpperCase()}{cat.id === 'mens' || cat.id === 'womens' ? "'S" : ''}
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 8 }}>{cat.desc}</div>
                <div style={{ 
                  color: cat.primary, 
                  fontSize: 13, 
                  fontWeight: 600, 
                  marginTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6
                }}>
                  Shop Now <span>→</span>
                </div>
              </button>
            ))}
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
    <section style={{ 
      background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}DD 100%)`, 
      padding: '60px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{ 
        position: 'absolute', 
        top: -50, 
        right: -50, 
        width: 200, 
        height: 200, 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '50%' 
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: -30, 
        left: '20%', 
        width: 100, 
        height: 100, 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '50%' 
      }} />
      
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 style={{ 
          fontSize: 42, 
          fontWeight: 800, 
          color: '#fff', 
          fontFamily: "'Bebas Neue', sans-serif", 
          letterSpacing: 2, 
          marginBottom: 16 
        }}>
          🔔 GET NOTIFIED
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 32 }}>
          Be the first to know when we restock. Plus get 10% off your first order!
        </p>
        {submitted ? (
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: 12, 
            padding: '20px 24px', 
            color: '#fff', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}>
            <span style={{ fontSize: 24 }}>✓</span>
            You're on the list! We'll notify you when items are back.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              style={{ 
                flex: '1 1 250px', 
                background: 'rgba(255,255,255,0.2)', 
                border: '2px solid rgba(255,255,255,0.3)', 
                borderRadius: 8, 
                padding: '16px 20px', 
                color: '#fff', 
                fontSize: 16 
              }} 
            />
            <button 
              type="submit" 
              style={{ 
                background: '#fff', 
                color: accentColor, 
                border: 'none', 
                borderRadius: 8, 
                padding: '16px 32px', 
                fontSize: 16, 
                fontWeight: 700, 
                fontFamily: "'Bebas Neue', sans-serif", 
                letterSpacing: 1, 
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              NOTIFY ME
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

// =============================================
// FAQ SECTION
// =============================================
const FAQSection = ({ accentColor = COLORS.accent }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section style={{ padding: '60px 24px', background: COLORS.bg }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 42, 
          fontWeight: 800, 
          color: '#fff', 
          fontFamily: "'Bebas Neue', sans-serif", 
          letterSpacing: 2, 
          textAlign: 'center', 
          marginBottom: 40 
        }}>
          ❓ FREQUENTLY ASKED
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {FAQ.map((item, i) => (
            <div 
              key={i} 
              style={{ 
                background: COLORS.bgCard, 
                border: `1px solid ${openIndex === i ? accentColor : COLORS.border}`, 
                borderRadius: 12, 
                overflow: 'hidden',
                transition: 'border-color 0.2s'
              }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ 
                  width: '100%', 
                  background: 'transparent', 
                  border: 'none', 
                  padding: '20px 24px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  cursor: 'pointer', 
                  textAlign: 'left' 
                }}
              >
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{item.q}</span>
                <span style={{ 
                  color: accentColor, 
                  fontSize: 24, 
                  transform: openIndex === i ? 'rotate(45deg)' : 'none', 
                  transition: 'transform 0.2s' 
                }}>+</span>
              </button>
              <div style={{ 
                maxHeight: openIndex === i ? 200 : 0, 
                overflow: 'hidden', 
                transition: 'max-height 0.3s ease' 
              }}>
                <div style={{ padding: '0 24px 20px', color: COLORS.textMuted, lineHeight: 1.6 }}>
                  {item.a}
                </div>
              </div>
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
  <footer style={{ 
    background: COLORS.bgCard, 
    borderTop: `1px solid ${COLORS.border}`, 
    padding: '60px 24px 100px' // Extra bottom padding for mobile nav
  }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 40, 
        marginBottom: 40 
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>{SITE.name}</span>
            <span style={{ color: COLORS.accent, fontSize: 11, fontWeight: 600 }}>{SITE.tagline}</span>
          </div>
          <p style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.6 }}>
            Australia's #1 Bundle Store. Premium curated bundles shipped fast from Sydney.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 8, 
              background: COLORS.bg, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: 20,
              textDecoration: 'none'
            }}>📸</a>
            <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" style={{ 
              width: 40, 
              height: 40, 
              borderRadius: 8, 
              background: COLORS.bg, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: 20,
              textDecoration: 'none'
            }}>🎵</a>
          </div>
        </div>
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>SHOP</h4>
          <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 2.2 }}>
            <div style={{ cursor: 'pointer' }}>Men's Bundles</div>
            <div style={{ cursor: 'pointer' }}>Women's Bundles</div>
            <div style={{ cursor: 'pointer' }}>Kids Bundles</div>
            <div style={{ cursor: 'pointer' }}>Gift Boxes</div>
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
        </div>
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 12, 
        marginBottom: 30, 
        paddingBottom: 30, 
        borderBottom: `1px solid ${COLORS.border}`, 
        flexWrap: 'wrap' 
      }}>
        {SITE.payments.map(p => (
          <div key={p} style={{ 
            background: COLORS.bg, 
            padding: '8px 16px', 
            borderRadius: 6, 
            color: COLORS.textMuted, 
            fontSize: 12, 
            fontWeight: 600 
          }}>{p}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: COLORS.textDim, fontSize: 13 }}>
        © {new Date().getFullYear()} {SITE.name} {SITE.tagline}. All rights reserved. Made in Australia 🇦🇺
      </div>
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
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        width: '100%', 
        maxWidth: 420, 
        height: '100%', 
        background: COLORS.bgCard, 
        zIndex: 201, 
        display: 'flex', 
        flexDirection: 'column', 
        borderLeft: `1px solid ${COLORS.border}`,
        animation: 'slideInRight 0.3s ease'
      }}>
        <div style={{ padding: 20, borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>
            YOUR CART ({cart.length})
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        </div>
        
        {/* Free Shipping Progress */}
        {!freeShipping && subtotal > 0 && (
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bg }}>
            <div style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 8 }}>
              Add <strong style={{ color: accentColor }}>{formatPrice(SITE.shipping.freeThreshold - subtotal, country)}</strong> more for FREE SHIPPING! 🚚
            </div>
            <div style={{ background: COLORS.border, borderRadius: 10, height: 8, overflow: 'hidden' }}>
              <div style={{ 
                background: `linear-gradient(90deg, ${accentColor} 0%, ${COLORS.accentLight} 100%)`, 
                height: '100%', 
                width: `${Math.min((subtotal / SITE.shipping.freeThreshold) * 100, 100)}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}
        
        {/* Cart Items */}
        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: COLORS.textMuted }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>Your cart is empty</p>
              <p style={{ fontSize: 13 }}>Start shopping to add items!</p>
            </div>
          ) : cart.map(item => {
            const theme = getThemeByCategory(item.cat);
            return (
              <div key={item.id} style={{ 
                display: 'flex', 
                gap: 16, 
                marginBottom: 20, 
                paddingBottom: 20, 
                borderBottom: `1px solid ${COLORS.border}` 
              }}>
                <img src={item.img} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', fontSize: 14, marginBottom: 4, fontWeight: 600 }}>{item.name}</h4>
                  <div style={{ color: theme.primary, fontWeight: 700, fontSize: 16 }}>{formatPrice(item.price, country)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 28, height: 28, borderRadius: 4, cursor: 'pointer', fontSize: 16 }}>−</button>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ background: COLORS.border, border: 'none', color: '#fff', width: 28, height: 28, borderRadius: 4, cursor: 'pointer', fontSize: 16 }}>+</button>
                    <button onClick={() => updateQty(item.id, -item.qty)} style={{ background: 'transparent', border: 'none', color: COLORS.error, fontSize: 12, cursor: 'pointer', marginLeft: 'auto' }}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Checkout Section */}
        {cart.length > 0 && (
          <div style={{ padding: 20, borderTop: `1px solid ${COLORS.border}`, background: COLORS.bg }}>
            {/* Promo Code */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input 
                type="text" 
                placeholder="Promo code" 
                value={promoCode} 
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ flex: 1, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '10px 12px', color: '#fff', fontSize: 14 }} 
              />
              <button onClick={applyPromo} style={{ background: COLORS.border, color: '#fff', border: 'none', borderRadius: 6, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>APPLY</button>
            </div>
            {promoError && <div style={{ color: COLORS.error, fontSize: 12, marginBottom: 8 }}>❌ {promoError}</div>}
            {appliedCode && <div style={{ color: COLORS.success, fontSize: 12, marginBottom: 8 }}>✓ {appliedCode.desc} applied!</div>}
            
            {/* Totals */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.textMuted, fontSize: 14, marginBottom: 8 }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, country)}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.success, fontSize: 14, marginBottom: 8 }}>
                  <span>Discount</span>
                  <span>-{formatPrice(discount, country)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.textMuted, fontSize: 14, marginBottom: 8 }}>
                <span>Shipping</span>
                <span style={{ color: freeShipping ? COLORS.success : undefined }}>{freeShipping ? '✓ FREE' : formatPrice(shipping, country)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 20, fontWeight: 700, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
                <span>Total</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>{formatPrice(total, country)}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button 
              onClick={onCheckout} 
              disabled={isCheckingOut} 
              style={{ 
                width: '100%', 
                background: isCheckingOut ? COLORS.border : `linear-gradient(135deg, ${accentColor} 0%, ${COLORS.accentLight} 100%)`, 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '16px', 
                fontSize: 18, 
                fontWeight: 700, 
                fontFamily: "'Bebas Neue', sans-serif", 
                letterSpacing: 2, 
                cursor: isCheckingOut ? 'wait' : 'pointer',
                boxShadow: isCheckingOut ? 'none' : `0 4px 20px ${COLORS.accentGlow}`
              }}
            >
              {isCheckingOut ? '⏳ REDIRECTING...' : '🔒 SECURE CHECKOUT →'}
            </button>
            
            {/* Afterpay */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: 12, 
              padding: '12px', 
              background: 'rgba(139, 92, 246, 0.1)', 
              borderRadius: 8, 
              border: '1px solid rgba(139, 92, 246, 0.3)' 
            }}>
              <span style={{ color: '#8B5CF6', fontSize: 13, fontWeight: 600 }}>
                💳 Or 4 payments of {formatPrice(total / 4, country)} with Afterpay
              </span>
            </div>
            
            {/* Trust Badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, color: COLORS.textMuted, fontSize: 11 }}>
              <span>🔒 SSL Secure</span>
              <span>↩️ 30-Day Returns</span>
              <span>🚚 Fast Shipping</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// =============================================
// PRODUCT MODAL WITH STICKY ADD TO CART
// =============================================
const ProductModal = ({ product, show, onClose, country, onAdd, onView }) => {
  const [qty, setQty] = useState(1);
  const [viewers] = useState(randomInRange(12, 89));
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addButtonRef = useRef(null);
  
  useEffect(() => {
    if (!show) return;
    
    const handleScroll = (e) => {
      if (!addButtonRef.current) return;
      const rect = addButtonRef.current.getBoundingClientRect();
      setShowStickyBar(rect.bottom < 0);
    };
    
    const modalContent = document.getElementById('product-modal-content');
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }
  }, [show]);
  
  if (!show || !product) return null;
  
  const isSoldOut = product.stock === 0;
  const theme = getThemeByCategory(product.cat);
  const images = product.images || [product.img];
  
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 300 }} />
      <div 
        id="product-modal-content"
        style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: COLORS.bgCard, 
          borderRadius: 16, 
          maxWidth: 900, 
          width: '95%', 
          maxHeight: '90vh', 
          overflow: 'auto', 
          zIndex: 301, 
          border: `1px solid ${COLORS.border}`,
          animation: 'fadeIn 0.3s ease'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            background: COLORS.bg, 
            border: 'none', 
            color: '#fff', 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            fontSize: 24, 
            cursor: 'pointer', 
            zIndex: 10 
          }}
        >×</button>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Image Gallery */}
          <ImageGallery images={images} name={product.name} isSoldOut={isSoldOut} theme={theme} />
          
          {/* Product Details */}
          <div style={{ padding: 32 }}>
            {/* Viewers */}
            {!isSoldOut && (
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 8, 
                background: COLORS.bg, 
                padding: '8px 12px', 
                borderRadius: 6, 
                marginBottom: 16 
              }}>
                <span style={{ width: 8, height: 8, background: COLORS.success, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                <span style={{ color: '#fff', fontSize: 13 }}>{viewers} people viewing now</span>
              </div>
            )}
            
            {isSoldOut && (
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 8, 
                background: COLORS.error, 
                padding: '8px 12px', 
                borderRadius: 6, 
                marginBottom: 16 
              }}>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>Currently Unavailable</span>
              </div>
            )}
            
            {/* Title & Reviews */}
            <h2 style={{ 
              color: '#fff', 
              fontSize: 32, 
              fontWeight: 800, 
              fontFamily: "'Bebas Neue', sans-serif", 
              marginBottom: 12,
              letterSpacing: 1
            }}>
              {product.name}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Stars rating={5} color={theme.primary} />
              <span style={{ color: COLORS.textMuted }}>
                ({product.reviews?.length || 0} reviews) • {product.sold?.toLocaleString()} sold
              </span>
            </div>
            
            {/* Description */}
            <p style={{ color: COLORS.textMuted, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>{product.desc}</p>
            
            {/* Price */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ 
                color: isSoldOut ? COLORS.textMuted : '#fff', 
                fontSize: 42, 
                fontWeight: 800, 
                fontFamily: "'Bebas Neue', sans-serif" 
              }}>
                {formatPrice(product.price, country)}
              </span>
              <span style={{ color: COLORS.textDim, fontSize: 20, textDecoration: 'line-through', marginLeft: 12 }}>
                {formatPrice(product.was, country)}
              </span>
              {!isSoldOut && (
                <span style={{ 
                  color: COLORS.success, 
                  fontSize: 16, 
                  fontWeight: 700, 
                  marginLeft: 12,
                  background: `${COLORS.success}22`,
                  padding: '4px 8px',
                  borderRadius: 4
                }}>
                  SAVE {getDiscount(product.price, product.was)}%
                </span>
              )}
            </div>
            
            {/* Stock Countdown */}
            {!isSoldOut && <StockCountdown stock={product.stock} theme={theme} />}
            
            {isSoldOut ? (
              /* Notify Me Form */
              <div style={{ marginTop: 24 }}>
                <div style={{ 
                  background: `${theme.primary}22`, 
                  border: `1px solid ${theme.primary}`, 
                  borderRadius: 8, 
                  padding: '20px', 
                  marginBottom: 24, 
                  textAlign: 'center' 
                }}>
                  <div style={{ color: '#fff', fontWeight: 600, marginBottom: 12, fontSize: 16 }}>
                    🔔 Get notified when back in stock
                  </div>
                  {notified ? (
                    <div style={{ color: COLORS.success, fontWeight: 600 }}>
                      ✓ We'll email you when it's available!
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={notifyEmail} 
                        onChange={(e) => setNotifyEmail(e.target.value)}
                        style={{ 
                          flex: 1, 
                          background: COLORS.bg, 
                          border: `1px solid ${COLORS.border}`, 
                          borderRadius: 6, 
                          padding: '12px', 
                          color: '#fff', 
                          fontSize: 14 
                        }} 
                      />
                      <button 
                        onClick={() => { if (notifyEmail) setNotified(true); }} 
                        style={{ 
                          background: theme.primary, 
                          color: '#fff', 
                          border: 'none', 
                          borderRadius: 6, 
                          padding: '12px 20px', 
                          fontWeight: 600, 
                          cursor: 'pointer' 
                        }}
                      >
                        NOTIFY ME
                      </button>
                    </div>
                  )}
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: 13, textAlign: 'center' }}>
                  This bundle was a hit! We're restocking soon.
                </div>
              </div>
            ) : (
              /* Add to Cart */
              <div style={{ marginTop: 24 }} ref={addButtonRef}>
                {/* Quantity Selector */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ color: COLORS.textMuted, fontSize: 12, fontWeight: 600, letterSpacing: 1, display: 'block', marginBottom: 8 }}>
                    QUANTITY
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))} 
                      style={{ background: COLORS.border, border: 'none', color: '#fff', width: 44, height: 44, borderRadius: 8, fontSize: 20, cursor: 'pointer' }}
                    >−</button>
                    <span style={{ color: '#fff', fontSize: 20, fontWeight: 600, minWidth: 40, textAlign: 'center' }}>{qty}</span>
                    <button 
                      onClick={() => setQty(qty + 1)} 
                      style={{ background: COLORS.border, border: 'none', color: '#fff', width: 44, height: 44, borderRadius: 8, fontSize: 20, cursor: 'pointer' }}
                    >+</button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button 
                  onClick={() => { for (let i = 0; i < qty; i++) onAdd(product); onClose(); }}
                  style={{ 
                    width: '100%', 
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 8, 
                    padding: '18px', 
                    fontSize: 18, 
                    fontWeight: 700, 
                    fontFamily: "'Bebas Neue', sans-serif", 
                    letterSpacing: 2, 
                    cursor: 'pointer', 
                    boxShadow: `0 4px 20px ${theme.glow}`, 
                    marginBottom: 12,
                    transition: 'transform 0.2s'
                  }}
                >
                  ADD TO CART — {formatPrice(product.price * qty, country)}
                </button>
                
                {/* Afterpay */}
                <div style={{ 
                  textAlign: 'center', 
                  padding: '12px', 
                  background: 'rgba(139, 92, 246, 0.1)', 
                  borderRadius: 8, 
                  border: '1px solid rgba(139, 92, 246, 0.3)', 
                  marginBottom: 16 
                }}>
                  <span style={{ color: '#8B5CF6', fontSize: 13, fontWeight: 600 }}>
                    💳 Or 4 payments of {formatPrice((product.price * qty) / 4, country)} with Afterpay
                  </span>
                </div>
                
                {/* Trust Badges */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, color: COLORS.textMuted, fontSize: 12, flexWrap: 'wrap' }}>
                  <span>🚀 Fast Shipping</span>
                  <span>↩️ 30-Day Returns</span>
                  <span>🔒 Secure Checkout</span>
                </div>
              </div>
            )}
            
            {/* You Might Also Like */}
            <YouMightAlsoLike product={product} country={country} onAdd={onAdd} onView={onView} />
          </div>
        </div>
        
        {/* Sticky Add to Cart Bar */}
        {!isSoldOut && showStickyBar && (
          <div style={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            background: COLORS.bg,
            borderTop: `1px solid ${COLORS.border}`,
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            animation: 'slideUp 0.3s ease'
          }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{product.name}</div>
              <div style={{ color: theme.primary, fontWeight: 700, fontSize: 18, fontFamily: "'Bebas Neue', sans-serif" }}>
                {formatPrice(product.price, country)}
              </div>
            </div>
            <button 
              onClick={() => { onAdd(product); onClose(); }}
              style={{ 
                background: theme.gradient, 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '14px 28px', 
                fontSize: 14, 
                fontWeight: 700, 
                fontFamily: "'Bebas Neue', sans-serif", 
                letterSpacing: 1, 
                cursor: 'pointer' 
              }}
            >
              ADD TO CART
            </button>
          </div>
        )}
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
      <div style={{ 
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        background: COLORS.bgCard, 
        borderRadius: 16, 
        padding: 24, 
        maxWidth: 400, 
        width: '90%', 
        zIndex: 301, 
        border: `1px solid ${COLORS.border}`,
        animation: 'fadeIn 0.3s ease'
      }}>
        <h3 style={{ color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 20 }}>
          🌍 SELECT YOUR COUNTRY
        </h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {Object.entries(COUNTRIES).map(([code, c]) => (
            <button 
              key={code} 
              onClick={() => { setCountry(c); onClose(); }}
              style={{ 
                background: country.currency === c.currency ? COLORS.accent : COLORS.bg, 
                border: `1px solid ${country.currency === c.currency ? COLORS.accent : COLORS.border}`, 
                borderRadius: 8, 
                padding: '14px 16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>{c.flag}</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{c.name}</span>
              </div>
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
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 700, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 501, border: `1px solid ${COLORS.border}`, padding: 32, animation: 'fadeIn 0.3s ease' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24, letterSpacing: 2 }}>📜 TERMS OF SERVICE</h2>
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
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 700, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 501, border: `1px solid ${COLORS.border}`, padding: 32, animation: 'fadeIn 0.3s ease' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24, letterSpacing: 2 }}>🔒 PRIVACY POLICY</h2>
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
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, maxWidth: 700, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 501, border: `1px solid ${COLORS.border}`, padding: 32, animation: 'fadeIn 0.3s ease' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24, letterSpacing: 2 }}>↩️ RETURNS & REFUNDS</h2>
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
      <div style={{ 
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        background: COLORS.bgCard, 
        borderRadius: 16, 
        maxWidth: 450, 
        width: '90%', 
        padding: 40, 
        textAlign: 'center', 
        zIndex: 401, 
        border: `2px solid ${COLORS.accent}`, 
        boxShadow: `0 0 60px ${COLORS.accentGlow}`,
        animation: 'fadeIn 0.3s ease'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 28, cursor: 'pointer' }}>×</button>
        <div style={{ fontSize: 60, marginBottom: 20 }}>🔔</div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, marginBottom: 12 }}>DON'T MISS OUT!</h2>
        <p style={{ color: COLORS.textMuted, fontSize: 16, marginBottom: 24 }}>Get 10% off when we restock:</p>
        <div style={{ background: COLORS.bg, border: `2px dashed ${COLORS.accent}`, borderRadius: 8, padding: '16px 24px', marginBottom: 24 }}>
          <span style={{ color: COLORS.accent, fontSize: 28, fontWeight: 800, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4 }}>SAVE10</span>
        </div>
        <button onClick={onClose} style={{ 
          width: '100%', 
          background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accentLight} 100%)`, 
          color: '#fff', 
          border: 'none', 
          borderRadius: 8, 
          padding: '16px', 
          fontSize: 18, 
          fontWeight: 700, 
          fontFamily: "'Bebas Neue', sans-serif", 
          letterSpacing: 2, 
          cursor: 'pointer' 
        }}>
          GOT IT! 🎉
        </button>
      </div>
    </>
  );
};

const SocialProofPopup = ({ show, data }) => {
  if (!show || !data) return null;
  const theme = getThemeByCategory(data.cat);
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 90, 
      left: 20, 
      background: COLORS.bgCard, 
      border: `1px solid ${COLORS.border}`, 
      borderRadius: 12, 
      padding: '16px 20px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      zIndex: 100, 
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)', 
      maxWidth: 320,
      animation: 'slideUp 0.5s ease'
    }}>
      <div style={{ 
        width: 44, 
        height: 44, 
        background: theme.gradient, 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#fff', 
        fontWeight: 700, 
        fontSize: 18 
      }}>
        {data.name[0]}
      </div>
      <div>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
          {data.name} from {data.loc}
          <span style={{ color: COLORS.success, fontSize: 11, marginLeft: 6 }}>✓</span>
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: 13 }}>
          Just purchased <strong style={{ color: theme.primary }}>{data.prod}</strong>
        </div>
        <div style={{ color: COLORS.textDim, fontSize: 11, marginTop: 2 }}>
          {Math.floor(Math.random() * 5) + 1} minutes ago
        </div>
      </div>
    </div>
  );
};

const Notification = ({ show, message, type = 'success' }) => {
  if (!show) return null;
  const colors = {
    success: { bg: COLORS.success, text: '#000', icon: '✓' },
    error: { bg: COLORS.error, text: '#fff', icon: '✕' },
    info: { bg: COLORS.accent, text: '#fff', icon: 'ℹ' }
  };
  const style = colors[type];
  return (
    <div style={{ 
      position: 'fixed', 
      top: 100, 
      right: 20, 
      background: style.bg, 
      color: style.text, 
      padding: '16px 24px', 
      borderRadius: 8, 
      fontWeight: 600, 
      fontSize: 14, 
      zIndex: 500, 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      animation: 'slideDown 0.3s ease'
    }}>
      <span style={{ fontSize: 18 }}>{style.icon}</span>
      {message}
    </div>
  );
};

// =============================================
// MAIN APP
// =============================================
const App = () => {
  // State
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
  const [saleEnd] = useState(() => Date.now() + 3 * 24 * 60 * 60 * 1000);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReturns, setShowReturns] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Get current page theme
  const getPageTheme = () => getThemeByCategory(currentPage);

  // Persist cart & country
  useEffect(() => { localStorage.setItem('ark-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('ark-country', JSON.stringify(country)); }, [country]);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentPage]);

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
  const handleViewDetails = (product) => { 
    setSelectedProduct(product); 
    setShowProductModal(true); 
  };

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
    const handleMouseLeave = (e) => { 
      if (e.clientY <= 0 && !exitIntentShown && cart.length === 0) { 
        setShowExitIntent(true); 
        setExitIntentShown(true); 
      } 
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown, cart.length]);

  // Social proof
  useEffect(() => {
    const showProof = () => { 
      setSocialProof(SOCIAL_PROOF[Math.floor(Math.random() * SOCIAL_PROOF.length)]); 
      setTimeout(() => setSocialProof(null), 4000); 
    };
    const initial = setTimeout(showProof, 8000);
    const interval = setInterval(() => setTimeout(showProof, Math.random() * 30000 + 30000), 60000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'mens':
        return <CategoryPage category="mens" title="Men's" subtitle="Premium bundles for the modern man. Grooming, fitness, tech & lifestyle essentials." theme={COLORS.mens} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} isLoading={isLoading} />;
      case 'womens':
        return <CategoryPage category="womens" title="Women's" subtitle="Self-care, beauty & wellness essentials. Treat yourself to something special." theme={COLORS.womens} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} isLoading={isLoading} />;
      case 'kids':
        return <CategoryPage category="kids" title="Kids" subtitle="Fun, educational & creative bundles for little ones. Learning through play!" theme={COLORS.kids} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} isLoading={isLoading} />;
      case 'gifts':
        return <CategoryPage category="gifts" title="Gifts" subtitle="Perfect presents for every occasion. Beautifully packaged & ready to give." theme={COLORS.gifts} country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} isLoading={isLoading} />;
      default:
        return <HomePage country={country} onAdd={handleAddToCart} onView={handleViewDetails} saleEnd={saleEnd} setCurrentPage={setCurrentPage} isLoading={isLoading} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg, fontFamily: "'Inter', sans-serif" }}>
      <Header cart={cart} setShowCart={setShowCart} country={country} setShowCountry={setShowCountry} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {renderPage()}
      
      <Newsletter accentColor={getPageTheme().primary} />
      <FAQSection accentColor={getPageTheme().primary} />
      <Footer onTerms={() => setShowTerms(true)} onPrivacy={() => setShowPrivacy(true)} onReturns={() => setShowReturns(true)} />
      
      {/* Mobile Navigation */}
      <MobileBottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} cart={cart} setShowCart={setShowCart} />
      <StickyMobileCart cart={cart} setShowCart={setShowCart} theme={getPageTheme()} />
      
      {/* Modals & Popups */}
      <CartDrawer show={showCart} onClose={() => setShowCart(false)} cart={cart} setCart={setCart} country={country} onCheckout={handleCheckout} isCheckingOut={isCheckingOut} accentColor={getPageTheme().primary} />
      <ProductModal product={selectedProduct} show={showProductModal} onClose={() => setShowProductModal(false)} country={country} onAdd={handleAddToCart} onView={handleViewDetails} />
      <CountrySelector show={showCountry} onClose={() => setShowCountry(false)} country={country} setCountry={setCountry} />
      <ExitIntent show={showExitIntent} onClose={() => setShowExitIntent(false)} />
      <SocialProofPopup show={!!socialProof} data={socialProof} />
      <Notification show={!!notification} message={notification} />
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
      <PrivacyModal show={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <ReturnsModal show={showReturns} onClose={() => setShowReturns(false)} />

      {/* Global Styles & Animations */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; color: ${COLORS.text}; }
        ::placeholder { color: ${COLORS.textMuted}; }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.textDim}; }
        
        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
          75% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -48%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        /* Desktop Navigation */
        .desktop-nav { display: flex; }
        .desktop-cart { display: flex; }
        
        /* Mobile Navigation */
        .mobile-nav { display: none !important; }
        .mobile-sticky-cart { display: none !important; }
        
        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cart { display: none !important; }
          .mobile-nav { display: flex !important; }
          .mobile-sticky-cart { display: flex !important; }
        }
        
        @media (max-width: 600px) {
          h1 { font-size: 36px !important; }
          h2 { font-size: 28px !important; }
        }
        
        /* Hover Effects */
        @media (hover: hover) {
          button:hover { filter: brightness(1.1); }
        }
        
        /* Touch Devices */
        @media (hover: none) {
          button:active { filter: brightness(0.9); }
        }
        
        /* Print Styles */
        @media print {
          .mobile-nav, .desktop-nav, button { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
