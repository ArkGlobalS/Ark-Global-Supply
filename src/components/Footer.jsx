import { COLORS, SITE } from '../config';

const Footer = ({ onTerms, onPrivacy, onReturns }) => (
  <footer style={{ 
    background: COLORS.bgCard, 
    borderTop: `1px solid ${COLORS.border}`, 
    padding: '60px 24px 100px'
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
            <span style={{ 
              fontSize: 24, 
              fontWeight: 800, 
              color: '#fff', 
              fontFamily: "'Bebas Neue', sans-serif", 
              letterSpacing: 2 
            }}>
              {SITE.name}
            </span>
            <span style={{ color: COLORS.accent, fontSize: 11, fontWeight: 600 }}>
              {SITE.tagline}
            </span>
          </div>
          <p style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.6 }}>
            Australia's #1 Bundle Store. Premium curated bundles shipped fast from Sydney.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <a 
              href={SITE.social.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 8, 
                background: COLORS.bg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 20,
                textDecoration: 'none'
              }}
            >
              📸
            </a>
            <a 
              href={SITE.social.tiktok} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 8, 
                background: COLORS.bg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 20,
                textDecoration: 'none'
              }}
            >
              🎵
            </a>
          </div>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>
            SHOP
          </h4>
          <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 2.2 }}>
            <div style={{ cursor: 'pointer' }}>Men's Bundles</div>
            <div style={{ cursor: 'pointer' }}>Women's Bundles</div>
            <div style={{ cursor: 'pointer' }}>Kids Bundles</div>
            <div style={{ cursor: 'pointer' }}>Gift Boxes</div>
          </div>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>
            LEGAL
          </h4>
          <button 
            onClick={onTerms} 
            style={{ 
              display: 'block', 
              background: 'none', 
              border: 'none', 
              color: COLORS.textMuted, 
              fontSize: 14, 
              marginBottom: 10, 
              cursor: 'pointer', 
              padding: 0, 
              textAlign: 'left' 
            }}
          >
            Terms of Service
          </button>
          <button 
            onClick={onPrivacy} 
            style={{ 
              display: 'block', 
              background: 'none', 
              border: 'none', 
              color: COLORS.textMuted, 
              fontSize: 14, 
              marginBottom: 10, 
              cursor: 'pointer', 
              padding: 0, 
              textAlign: 'left' 
            }}
          >
            Privacy Policy
          </button>
          <button 
            onClick={onReturns} 
            style={{ 
              display: 'block', 
              background: 'none', 
              border: 'none', 
              color: COLORS.textMuted, 
              fontSize: 14, 
              marginBottom: 10, 
              cursor: 'pointer', 
              padding: 0, 
              textAlign: 'left' 
            }}
          >
            Returns & Refunds
          </button>
          <div style={{ color: COLORS.textMuted, fontSize: 14 }}>Shipping Info</div>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>
            CONTACT
          </h4>
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
          <div 
            key={p} 
            style={{ 
              background: COLORS.bg, 
              padding: '8px 16px', 
              borderRadius: 6, 
              color: COLORS.textMuted, 
              fontSize: 12, 
              fontWeight: 600 
            }}
          >
            {p}
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', color: COLORS.textDim, fontSize: 13 }}>
        © {new Date().getFullYear()} {SITE.name} {SITE.tagline}. All rights reserved. Made in Australia 🇦🇺
      </div>
    </div>
  </footer>
);

export default Footer;
