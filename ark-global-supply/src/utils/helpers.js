// =============================================
// UTILITY FUNCTIONS
// =============================================

// Format price with currency symbol
export const formatPrice = (price, country) => {
  return `${country.symbol}${(price * country.rate).toFixed(2)}`;
};

// Calculate discount percentage
export const getDiscount = (price, was) => {
  return Math.round(((was - price) / was) * 100);
};

// Generate random number in range
export const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get sale end time from localStorage or config
export const getSaleEndTime = (configDate) => {
  const storageKey = 'ark-sale-end';
  const stored = localStorage.getItem(storageKey);
  
  if (stored) {
    const storedTime = parseInt(stored, 10);
    // If stored time is still in the future, use it
    if (storedTime > Date.now()) {
      return storedTime;
    }
  }
  
  // Parse the config date or create a new one 7 days from now
  let endTime;
  if (configDate) {
    endTime = new Date(configDate).getTime();
  } else {
    endTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from now
  }
  
  // Store it
  localStorage.setItem(storageKey, endTime.toString());
  return endTime;
};

// Generate realistic random time ago for social proof
export const getRandomTimeAgo = () => {
  const times = [
    '2 minutes ago',
    '5 minutes ago',
    '8 minutes ago',
    '12 minutes ago',
    '15 minutes ago',
    '23 minutes ago',
    '31 minutes ago',
    '45 minutes ago',
    '1 hour ago',
    '2 hours ago',
  ];
  return times[Math.floor(Math.random() * times.length)];
};

// Shuffle array (Fisher-Yates)
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get cart from localStorage
export const getStoredCart = () => {
  try {
    return JSON.parse(localStorage.getItem('ark-cart')) || [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart) => {
  localStorage.setItem('ark-cart', JSON.stringify(cart));
};

// Get country from localStorage
export const getStoredCountry = (defaultCountry) => {
  try {
    return JSON.parse(localStorage.getItem('ark-country')) || defaultCountry;
  } catch {
    return defaultCountry;
  }
};

// Save country to localStorage
export const saveCountry = (country) => {
  localStorage.setItem('ark-country', JSON.stringify(country));
};

// Get shipping selection from localStorage
export const getStoredShipping = () => {
  try {
    return JSON.parse(localStorage.getItem('ark-shipping')) || { state: 'NSW', express: false };
  } catch {
    return { state: 'NSW', express: false };
  }
};

// Save shipping selection to localStorage
export const saveShipping = (shipping) => {
  localStorage.setItem('ark-shipping', JSON.stringify(shipping));
};
