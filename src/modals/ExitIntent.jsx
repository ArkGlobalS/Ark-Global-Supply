import { useState } from 'react';
import { COLORS } from '../config';
import { isValidEmail } from '../utils/helpers';
const ExitIntent = ({ show, onClose, accentColor = COLORS.accent }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (!show) return null;
  const handleSubmit = () => { if (isValidEmail(email)) { setSubmitted(true); setTimeout(onClose, 2000); } };
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 500 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, padding: 40, maxWidth: 450, width: '90%', zIndex: 501, textAlign: 'center', border: `2px solid ${accentColor}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: COLORS.textMuted, fontSize: 24, cursor: 'pointer' }}>×</button>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎁</div>
        <h2 style={{ color: '#fff', fontSize: 32, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 12 }}>WAIT! DON'T GO EMPTY-HANDED</h2>
        <p style={{ color: COLORS.textMuted, marginBottom: 24 }}>Get 10% off your first order when you subscribe!</p>
        {submitted ? (
          <div style={{ color: COLORS.success, fontWeight: 600, fontSize: 18 }}>✓ Check your email for your code!</div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: '14px', color: '#fff', fontSize: 14 }} />
            <button onClick={handleSubmit} style={{ background: accentColor, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 24px', fontWeight: 700, cursor: 'pointer' }}>GET 10% OFF</button>
          </div>
        )}
      </div>
    </>
  );
};
export default ExitIntent;
