import { useState, useEffect } from 'react';
import { COLORS, SITE, getThemeByCategory } from '../config';
import { formatPrice } from '../utils/helpers';

export const MobileBottomNav = ({ currentPage, setCurrentPage, cart, setShowCart }) => {
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

export const StickyMobileCart = ({ cart, setShowCart, theme, country }) => {
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
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>
        {formatPrice(cartTotal, country)}
      </span>
    </button>
  );
};

export default MobileBottomNav;
