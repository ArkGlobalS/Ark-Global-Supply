import { useState } from 'react';
import { COLORS, FAQ as FAQ_DATA } from '../config';

const FAQ = ({ accentColor = COLORS.accent }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  return (
    <section style={{ padding: '60px 24px', background: COLORS.bg }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 42, 
          fontWeight: 800, 
          color: '#fff', 
          fontFamily: "'Bebas Neue', sans-serif", 
          letterSpacing: 2, 
          textAlign: 'center', 
          marginBottom: 40 
        }}>
          ❓ FREQUENTLY ASKED
        </h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {FAQ_DATA.map((item, i) => (
            <div 
              key={i} 
              style={{ 
                background: COLORS.bgCard, 
                border: `1px solid ${openIndex === i ? accentColor : COLORS.border}`, 
                borderRadius: 12, 
                overflow: 'hidden',
                transition: 'border-color 0.2s'
              }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ 
                  width: '100%', 
                  background: 'transparent', 
                  border: 'none', 
                  padding: '20px 24px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  cursor: 'pointer', 
                  textAlign: 'left' 
                }}
              >
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{item.q}</span>
                <span style={{ 
                  color: accentColor, 
                  fontSize: 24, 
                  transform: openIndex === i ? 'rotate(45deg)' : 'none', 
                  transition: 'transform 0.2s' 
                }}>+</span>
              </button>
              <div style={{ 
                maxHeight: openIndex === i ? 200 : 0, 
                overflow: 'hidden', 
                transition: 'max-height 0.3s ease' 
              }}>
                <div style={{ padding: '0 24px 20px', color: COLORS.textMuted, lineHeight: 1.6 }}>
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
