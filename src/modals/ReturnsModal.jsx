import { COLORS, SITE } from '../config';
const ReturnsModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 400 }} />
      <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: COLORS.bgCard, borderRadius: 16, padding: 32, maxWidth: 600, width: '90%', maxHeight: '80vh', overflow: 'auto', zIndex: 401, border: `1px solid ${COLORS.border}` }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>×</button>
        <h2 style={{ color: '#fff', fontSize: 28, fontFamily: "'Bebas Neue', sans-serif", marginBottom: 24 }}>Returns & Refunds</h2>
        <div style={{ color: COLORS.textMuted, fontSize: 14, lineHeight: 1.8 }}>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>30-Day Returns</strong><br/>Return unused items in original packaging within 30 days for a full refund.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>How to Return</strong><br/>Email {SITE.business.email} with your order number. We'll send a return label.</p>
          <p style={{ marginBottom: 16 }}><strong style={{ color: '#fff' }}>Refund Timeline</strong><br/>Refunds are processed within 5-7 business days after we receive your return.</p>
          <p><strong style={{ color: '#fff' }}>Damaged Items</strong><br/>Contact us within 48 hours of delivery for damaged items.</p>
        </div>
      </div>
    </>
  );
};
export default ReturnsModal;
