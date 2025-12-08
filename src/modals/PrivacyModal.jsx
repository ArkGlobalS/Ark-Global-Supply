import { COLORS, SITE } from '../config';
const PrivacyModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 400 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, padding: 32, maxWidth: 600, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 401, border: `1px solid ${COLORS.border}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24 }}>Privacy Policy</h2>
        <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Information We Collect</strong><br/>We collect email, shipping address, and payment info to process orders.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>How We Use It</strong><br/>Your data is used only for order fulfillment and communication about your purchase.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Data Security</strong><br/>We use SSL encryption and never store full payment details.</p>
          <p><strong style={{ color: '#fff' }}>Contact</strong><br/>Questions? Email {SITE.business.email}</p>
        </div>
      </div>
    </>
  );
};
export default PrivacyModal;
