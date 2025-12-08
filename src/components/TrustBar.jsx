import { COLORS, SITE } from '../config';

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
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
            {badge.text}
          </span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>💳</span>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>
          AFTERPAY AVAILABLE
        </span>
      </div>
    </div>
  </section>
);

export default TrustBar;
