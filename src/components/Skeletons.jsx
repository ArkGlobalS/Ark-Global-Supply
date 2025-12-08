import { COLORS } from '../config';

export const SkeletonCard = () => (
  <div style={{ 
    background: COLORS.bgCard, 
    borderRadius: 16, 
    overflow: 'hidden', 
    border: `1px solid ${COLORS.border}` 
  }}>
    <div style={{ 
      height: 220, 
      background: `linear-gradient(90deg, ${COLORS.bgCard} 25%, ${COLORS.border} 50%, ${COLORS.bgCard} 75%)`, 
      backgroundSize: '200% 100%', 
      animation: 'shimmer 1.5s infinite' 
    }} />
    <div style={{ padding: 20 }}>
      <div style={{ 
        height: 20, 
        width: '70%', 
        background: COLORS.border, 
        borderRadius: 4, 
        marginBottom: 12, 
        animation: 'shimmer 1.5s infinite' 
      }} />
      <div style={{ 
        height: 14, 
        width: '100%', 
        background: COLORS.border, 
        borderRadius: 4, 
        marginBottom: 8, 
        animation: 'shimmer 1.5s infinite' 
      }} />
      <div style={{ 
        height: 14, 
        width: '60%', 
        background: COLORS.border, 
        borderRadius: 4, 
        marginBottom: 16, 
        animation: 'shimmer 1.5s infinite' 
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ 
          height: 28, 
          width: '40%', 
          background: COLORS.border, 
          borderRadius: 4, 
          animation: 'shimmer 1.5s infinite' 
        }} />
        <div style={{ 
          height: 40, 
          width: '30%', 
          background: COLORS.border, 
          borderRadius: 8, 
          animation: 'shimmer 1.5s infinite' 
        }} />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 4 }) => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: 24 
  }}>
    {Array(count).fill(0).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

export default SkeletonGrid;
