import { useState, useRef } from 'react';
import { COLORS } from '../config';

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
            }}>
              SOLD OUT
            </span>
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

export default ImageGallery;
