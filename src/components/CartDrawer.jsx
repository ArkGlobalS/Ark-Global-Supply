import { useState, useEffect } from 'react';
import { COLORS, SITE, DISCOUNTS, AU_STATES, getThemeByCategory, getShippingRate, getShippingTime } from '../config';
import { formatPrice, getStoredShipping, saveShipping } from '../utils/helpers';

const CartDrawer = ({ show, onClose, cart, setCart, country, onCheckout, isCheckingOut, accentColor = COLORS.accent }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [shipping, setShipping] = useState(getStoredShipping());
  
  // Save shipping selection
  useEffect(() => {
    saveShipping(shipping);
  }, [shipping]);
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShipping = subtotal >= SITE.shipping.freeThreshold;
  
  // Calculate shipping cost
  const shippingCost = freeShipping 
    ? 0 
    : country.currency === 'AUD' 
      ? getShippingRate('AU', shipping.state, shipping.express)
      : getShippingRate(Object.keys(SITE.shipping.rates).find(k => SITE.shipping.rates[k] && k !== 'AU') || 'US', null, shipping.express);
  
  const shippingTime = country.currency === 'AUD'
    ? getShippingTime('AU', shipping.state)
    : getShippingTime(country.currency === 'NZD' ? 'NZ' : country.currency === 'GBP' ? 'GB' : 'US');
  
  let discount = 0;
  if (appliedCode) {
    if (appliedCode.type === 'percent') discount = (subtotal * appliedCode.value) / 100;
    else if (appliedCode.type === 'shipping') discount = shippingCost;
  }
  const total = subtotal - discount + (appliedCode?.type === 'shipping' ? 0 : shippingCost);
  
  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
      .filter(item => item.qty > 0)
    );
  };
  
  const applyPromo = () => {
    const code = DISCOUNTS.find(d => d.code.toUpperCase() === promoCode.toUpperCase() && d.active);
    if (code) { 
      setAppliedCode(code); 
      setPromoError(''); 
    } else { 
      setPromoError('Invalid code'); 
      setAppliedCode(null); 
    }
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
            {/* Shipping Calculator */}
            {country.currency === 'AUD' && (
              <div style={{ marginBottom: 16, padding: 16, background: COLORS.bgCard, borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 12 }}>📦 SHIPPING OPTIONS</div>
                <select 
                  value={shipping.state} 
                  onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                  style={{ 
                    width: '100%', 
                    background: COLORS.bg, 
                    border: `1px solid ${COLORS.border}`, 
                    borderRadius: 6, 
                    padding: '10px 12px', 
                    color: '#fff', 
                    fontSize: 14,
                    marginBottom: 8,
                    cursor: 'pointer'
                  }}
                >
                  {AU_STATES.map(s => (
                    <option key={s.code} value={s.code}>{s.name}</option>
                  ))}
                </select>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    onClick={() => setShipping({ ...shipping, express: false })}
                    style={{ 
                      flex: 1, 
                      background: !shipping.express ? accentColor : COLORS.bgCard, 
                      border: `1px solid ${!shipping.express ? accentColor : COLORS.border}`,
                      borderRadius: 6, 
                      padding: '10px', 
                      color: '#fff', 
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>Standard</div>
                    <div style={{ color: !shipping.express ? '#fff' : COLORS.textMuted, fontSize: 11 }}>
                      {freeShipping ? 'FREE' : formatPrice(getShippingRate('AU', shipping.state, false), country)}
                    </div>
                  </button>
                  <button 
                    onClick={() => setShipping({ ...shipping, express: true })}
                    style={{ 
                      flex: 1, 
                      background: shipping.express ? accentColor : COLORS.bgCard, 
                      border: `1px solid ${shipping.express ? accentColor : COLORS.border}`,
                      borderRadius: 6, 
                      padding: '10px', 
                      color: '#fff', 
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>Express</div>
                    <div style={{ color: shipping.express ? '#fff' : COLORS.textMuted, fontSize: 11 }}>
                      {formatPrice(getShippingRate('AU', shipping.state, true), country)}
                    </div>
                  </button>
                </div>
                <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 8 }}>
                  Estimated delivery: {shippingTime}
                </div>
              </div>
            )}
            
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
                <span style={{ color: freeShipping ? COLORS.success : undefined }}>{freeShipping ? '✓ FREE' : formatPrice(shippingCost, country)}</span>
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

export default CartDrawer;
