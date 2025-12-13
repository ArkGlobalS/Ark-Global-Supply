import { COLORS, SITE, getThemeByCategory } from '../config';

const Header = ({ cart, setShowCart, country, setShowCountry, currentPage, setCurrentPage }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  
  const getPageAccent = () => {
    const theme = getThemeByCategory(currentPage);
    return theme.primary;
  };
  
  return (
    <>
      <header style={{ 
        background: COLORS.bg, 
        borderBottom: `1px solid ${COLORS.border}`, 
        padding: '16px 24px', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}>
        <div style={{ 
          maxWidth: 1400, 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <button 
            onClick={() => setCurrentPage('home')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'baseline', 
              gap: 8 
            }}
          >
            <span style={{ 
              fontSize: 28, 
              fontWeight: 800, 
              color: '#fff', 
              fontFamily: "'Bebas Neue', sans-serif", 
              letterSpacing: 2 
            }}>
              {SITE.name}
            </span>
            <span style={{ 
              fontSize: 12, 
              color: getPageAccent(), 
              fontWeight: 600, 
              letterSpacing: 1 
            }}>
              {SITE.tagline}
            </span>
          </button>
          
          <nav className="desktop-nav" style={{ display: 'flex', gap: 8 }}>
            {SITE.pages.map((page) => {
              const theme = getThemeByCategory(page.id);
              return (
                <button 
                  key={page.id} 
                  onClick={() => setCurrentPage(page.id)}
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
                  }}
                >
                  {page.icon} {page.label}
                </button>
              );
            })}
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button 
              onClick={() => setShowCountry(true)} 
              style={{ 
                background: 'transparent', 
                border: `1px solid ${COLORS.border}`, 
                borderRadius: 6, 
                padding: '8px 12px', 
                color: '#fff', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 6, 
                fontSize: 13 
              }}
            >
              <span>{country.flag}</span>
              <span>{country.currency}</span>
            </button>
            <button 
              className="desktop-cart" 
              onClick={() => setShowCart(true)} 
              style={{ 
                background: getPageAccent(), 
                border: 'none', 
                borderRadius: 8, 
                padding: '10px 20px', 
                color: '#fff', 
                cursor: 'pointer', 
                fontWeight: 700, 
                fontSize: 14, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8 
              }}
            >
              🛒 CART 
              {cartCount > 0 && (
                <span style={{ 
                  background: '#fff', 
                  color: getPageAccent(), 
                  borderRadius: '50%', 
                  width: 22, 
                  height: 22, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: 12, 
                  fontWeight: 800 
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
