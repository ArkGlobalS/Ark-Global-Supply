import { COLORS, getRelatedProducts, getThemeByCategory } from '../config';
import { formatPrice } from '../utils/helpers';
import Stars from './Stars';

const YouMightAlsoLike = ({ product, country, onAdd, onView }) => {
  const relatedProducts = getRelatedProducts(product.id, 4);
  
  if (relatedProducts.length === 0) return null;
  
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

export default YouMightAlsoLike;
