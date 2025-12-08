import { COLORS, COUNTRIES } from '../config';

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
        <h3 style={{ 
          color: '#fff', 
          fontSize: 24, 
          fontWeight: 700, 
          fontFamily: "'Bebas Neue', sans-serif", 
          marginBottom: 20 
        }}>
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

export default CountrySelector;
