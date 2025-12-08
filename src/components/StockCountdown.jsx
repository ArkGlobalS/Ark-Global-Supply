const StockCountdown = ({ stock, theme }) => {
  if (stock === 0) return null;
  
  const urgencyLevel = stock <= 5 ? 'critical' : stock <= 10 ? 'low' : 'normal';
  const colors = {
    critical: { bg: 'rgba(239, 68, 68, 0.2)', border: '#EF4444', text: '#EF4444' },
    low: { bg: 'rgba(245, 158, 11, 0.2)', border: '#F59E0B', text: '#F59E0B' },
    normal: { bg: `${theme.primary}22`, border: theme.primary, text: theme.primary }
  };
  const style = colors[urgencyLevel];
  
  return (
    <div style={{ 
      background: style.bg, 
      border: `1px solid ${style.border}`, 
      borderRadius: 8, 
      padding: '10px 14px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 8,
      animation: urgencyLevel === 'critical' ? 'pulse 2s infinite' : 'none'
    }}>
      <span style={{ fontSize: 16 }}>
        {urgencyLevel === 'critical' ? '🔥' : urgencyLevel === 'low' ? '⚠️' : '📦'}
      </span>
      <span style={{ color: style.text, fontWeight: 700, fontSize: 13 }}>
        {urgencyLevel === 'critical' ? `Only ${stock} left! Selling fast!` : 
         urgencyLevel === 'low' ? `Hurry! Only ${stock} remaining` : 
         `${stock} in stock`}
      </span>
    </div>
  );
};

export default StockCountdown;
