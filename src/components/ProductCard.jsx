import { useState } from 'react';
import { COLORS } from '../config';
import { formatPrice, getDiscount, randomInRange } from '../utils/helpers';
import Stars from './Stars';

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
          background: isSoldOut ? '#555555' : product.tagBg || theme.primary, 
          color: '#fff', 
          padding: '6px 12px', 
          borderRadius: 6, 
          fontSize: 11, 
          fontWeight: 700, 
          letterSpacing: 1 
        }}>
          {isSoldOut ? 'SOLD OUT' : (product.tag || `${getDiscount(product.price, product.was)}% OFF`)}
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
            }}>
              SOLD OUT
            </span>
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
            <span style={{ 
              width: 8, 
              height: 8, 
              background: COLORS.success, 
              borderRadius: '50%', 
              animation: 'pulse 2s infinite' 
            }} />
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
              animation: 'fadeInSimple 0.2s ease',
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

export default ProductCard;
