import { COLORS, getThemeByCategory } from '../config';
import { getRandomTimeAgo } from '../utils/helpers';

const SocialProof = ({ show, data }) => {
  if (!show || !data) return null;
  
  const theme = getThemeByCategory(data.cat);
  const timeAgo = getRandomTimeAgo();
  
  // Different message based on action type
  const getMessage = () => {
    switch (data.action) {
      case 'just purchased':
        return (
          <>
            Just purchased <strong style={{ color: theme.primary }}>{data.prod}</strong>
          </>
        );
      case 'added to cart':
        return (
          <>
            Added <strong style={{ color: theme.primary }}>{data.prod}</strong> to cart
          </>
        );
      case 'is viewing':
        return (
          <>
            Is looking at <strong style={{ color: theme.primary }}>{data.prod}</strong>
          </>
        );
      default:
        return (
          <>
            Just purchased <strong style={{ color: theme.primary }}>{data.prod}</strong>
          </>
        );
    }
  };
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 90, 
      left: 20, 
      background: COLORS.bgCard, 
      border: `1px solid ${COLORS.border}`, 
      borderRadius: 12, 
      padding: '16px 20px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 12, 
      zIndex: 100, 
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)', 
      maxWidth: 320,
      animation: 'slideUp 0.5s ease'
    }}>
      <div style={{ 
        width: 44, 
        height: 44, 
        background: theme.gradient, 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#fff', 
        fontWeight: 700, 
        fontSize: 18 
      }}>
        {data.name[0]}
      </div>
      <div>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>
          {data.name} from {data.loc}
          {data.action === 'just purchased' && (
            <span style={{ color: COLORS.success, fontSize: 11, marginLeft: 6 }}>✓</span>
          )}
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: 13 }}>
          {getMessage()}
        </div>
        <div style={{ color: COLORS.textDim, fontSize: 11, marginTop: 2 }}>
          {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
