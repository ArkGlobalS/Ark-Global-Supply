import { COLORS } from '../config';

const Notification = ({ show, message, type = 'success' }) => {
  if (!show) return null;
  
  const colors = {
    success: { bg: COLORS.success, text: '#000', icon: '✓' },
    error: { bg: COLORS.error, text: '#fff', icon: '✕' },
    info: { bg: COLORS.accent, text: '#fff', icon: 'ℹ' }
  };
  const style = colors[type];
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 100, 
      right: 20, 
      background: style.bg, 
      color: style.text, 
      padding: '16px 24px', 
      borderRadius: 8, 
      fontWeight: 600, 
      fontSize: 14, 
      zIndex: 500, 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      animation: 'slideDown 0.3s ease'
    }}>
      <span style={{ fontSize: 18 }}>{style.icon}</span>
      {message}
    </div>
  );
};

export default Notification;
