import { useState } from 'react';
import { randomInRange } from '../utils/helpers';

const FloatingIcons = ({ icons, color }) => {
  const [positions] = useState(() => 
    icons.map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: randomInRange(20, 40),
      duration: randomInRange(15, 30),
      delay: Math.random() * -20
    }))
  );

  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      overflow: 'hidden', 
      pointerEvents: 'none', 
      zIndex: 0 
    }}>
      {icons.map((icon, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
            fontSize: positions[i].size,
            opacity: 0.15,
            animation: `float ${positions[i].duration}s ease-in-out ${positions[i].delay}s infinite`,
            filter: `drop-shadow(0 0 10px ${color})`
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
