import { useState } from 'react';
import { COLORS } from '../config';
import { isValidEmail } from '../utils/helpers';

const Newsletter = ({ accentColor = COLORS.accent }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    setSubmitted(true); 
    setEmail(''); 
    setError('');
  };
  
  return (
    <section style={{ 
      background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}DD 100%)`, 
      padding: '60px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{ 
        position: 'absolute', 
        top: -50, 
        right: -50, 
        width: 200, 
        height: 200, 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '50%' 
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: -30, 
        left: '20%', 
        width: 100, 
        height: 100, 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '50%' 
      }} />
      
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 style={{ 
          fontSize: 42, 
          fontWeight: 800, 
          color: '#fff', 
          fontFamily: "'Bebas Neue', sans-serif", 
          letterSpacing: 2, 
          marginBottom: 16 
        }}>
          🔔 GET NOTIFIED
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 32 }}>
          Be the first to know when we restock. Plus get 10% off your first order!
        </p>
        {submitted ? (
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: 12, 
            padding: '20px 24px', 
            color: '#fff', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}>
            <span style={{ fontSize: 24 }}>✓</span>
            You're on the list! We'll notify you when items are back.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: '1 1 250px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                style={{ 
                  width: '100%',
                  background: 'rgba(255,255,255,0.2)', 
                  border: error ? '2px solid #EF4444' : '2px solid rgba(255,255,255,0.3)', 
                  borderRadius: 8, 
                  padding: '16px 20px', 
                  color: '#fff', 
                  fontSize: 16 
                }} 
              />
              {error && (
                <div style={{ color: '#fff', fontSize: 12, marginTop: 4, textAlign: 'left' }}>
                  ⚠️ {error}
                </div>
              )}
            </div>
            <button 
              type="submit" 
              style={{ 
                background: '#fff', 
                color: accentColor, 
                border: 'none', 
                borderRadius: 8, 
                padding: '16px 32px', 
                fontSize: 16, 
                fontWeight: 700, 
                fontFamily: "'Bebas Neue', sans-serif", 
                letterSpacing: 1, 
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
            >
              NOTIFY ME
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
