import { COLORS } from '../config';

const Stars = ({ rating = 5, color = COLORS.gold }) => (
  <span style={{ color }}>
    {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
  </span>
);

export default Stars;
