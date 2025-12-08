import { useState, useEffect, useRef } from 'react';
import { COLORS, getThemeByCategory } from '../config';
import { formatPrice, getDiscount, randomInRange, isValidEmail } from '../utils/helpers';
import Stars from './Stars';
import ImageGallery from './ImageGallery';
import StockCountdown from './StockCountdown';
import YouMightAlsoLike from './YouMightAlsoLike';

const ProductModal = ({ product, show, onClose, country, onAdd, onView }) => {
  const [qty, setQty] = useState(1);
  const [viewers] = useState(randomInRange(12, 89));
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [emailError, setEmailError] = useState('');
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
  
  // Reset qty when product changes
  useEffect(() => {
    setQty(1);
    setNotified(false);
    setNotifyEmail('');
    setEmailError('');
  }, [product?.id]);
  
  if (!show || !product) return null;
  
  const isSoldOut = product.stock === 0;
  const theme = getThemeByCategory(product.cat);
  const images = product.images || [product.img];
  
  const handleNotify = () => {
    if (!notifyEmail) {
      setEmailError('Please enter your email');
      return;
    }
    if (!isValidEmail(notifyEmail)) {
      setEmailError('Please enter a valid email');
      return;
    }
    setNotified(true);
    setEmailError('');
  };
  
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
            <p style={{ color: COLORS.textMuted, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              {product.desc}
            </p>
            
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
                    <div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input 
                          type="email" 
                          placeholder="Enter your email" 
                          value={notifyEmail} 
                          onChange={(e) => { setNotifyEmail(e.target.value); setEmailError(''); }}
                          style={{ 
                            flex: 1, 
                            background: COLORS.bg, 
                            border: emailError ? '1px solid #EF4444' : `1px solid ${COLORS.border}`, 
                            borderRadius: 6, 
                            padding: '12px', 
                            color: '#fff', 
                            fontSize: 14 
                          }} 
                        />
                        <button 
                          onClick={handleNotify}
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
                      {emailError && (
                        <div style={{ color: COLORS.error, fontSize: 12, marginTop: 8 }}>
                          ⚠️ {emailError}
                        </div>
                      )}
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
                      onClick={() => setQty(Math.min(product.stock, qty + 1))} 
                      style={{ background: COLORS.border, border: 'none', color: '#fff', width: 44, height: 44, borderRadius: 8, fontSize: 20, cursor: 'pointer' }}
                    >+</button>
                    {qty >= product.stock && (
                      <span style={{ color: COLORS.warning, fontSize: 12, marginLeft: 8 }}>Max available</span>
                    )}
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
            
            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${COLORS.border}` }}>
                <h4 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                  ⭐ CUSTOMER REVIEWS
                </h4>
                {product.reviews.slice(0, 3).map((review, i) => (
                  <div key={i} style={{ 
                    background: COLORS.bg, 
                    borderRadius: 8, 
                    padding: 16, 
                    marginBottom: 8,
                    border: `1px solid ${COLORS.border}`
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{review.u}</span>
                      <Stars rating={review.r} color={theme.primary} />
                    </div>
                    <p style={{ color: COLORS.textMuted, fontSize: 13 }}>{review.t}</p>
                    {review.v && (
                      <span style={{ color: COLORS.success, fontSize: 11, marginTop: 8, display: 'block' }}>
                        ✓ Verified Purchase
                      </span>
                    )}
                  </div>
                ))}
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

export default ProductModal;
