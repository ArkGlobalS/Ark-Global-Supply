import { COLORS, SITE } from '../config';
const TermsModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 400 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, padding: 32, maxWidth: 600, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 401, border: `1px solid ${COLORS.border}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24 }}>Terms of Service</h2>
        <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>1. Acceptance of Terms</strong><br/>By accessing {SITE.name}, you agree to these terms.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>2. Products</strong><br/>All products are subject to availability. Prices may change without notice.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>3. Payment</strong><br/>We accept major credit cards, PayPal, and Afterpay. All transactions are secure.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>4. Shipping</strong><br/>Orders are processed within 1-2 business days. Shipping times vary by location.</p>
          <p><strong style={{ color: '#fff' }}>5. Contact</strong><br/>Email: {SITE.business.email}</p>
        </div>
      </div>
    </>
  );
};
export default TermsModal;
