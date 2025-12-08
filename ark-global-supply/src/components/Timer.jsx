import { useState, useEffect } from 'react';
import { COLORS } from '../config';

const Timer = ({ endTime, accentColor = COLORS.accent }) => {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  
  useEffect(() => {
    const updateTimer = () => {
      const diff = endTime - Date.now();
      if (diff < 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);
  
  const boxes = [
    { v: time.d, l: 'DAYS' },
    { v: time.h, l: 'HRS' },
    { v: time.m, l: 'MIN' },
    { v: time.s, l: 'SEC' }
  ].filter((b, i) => i > 0 || b.v > 0); // Hide days if 0
  
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {boxes.map((b, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{ 
            background: accentColor, 
            color: '#fff', 
            borderRadius: 6, 
            padding: '8px 12px', 
            fontSize: 18, 
            fontWeight: 800, 
            fontFamily: 'monospace', 
            minWidth: 44 
          }}>
            {String(b.v).padStart(2, '0')}
          </div>
          <div style={{ 
            fontSize: 9, 
            color: 'rgba(255,255,255,0.7)', 
            marginTop: 4, 
            fontWeight: 600, 
            letterSpacing: 1 
          }}>
            {b.l}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timer;
