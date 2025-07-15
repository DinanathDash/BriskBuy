// Product categories
export const CATEGORIES = [
  'fashion',
  'electronics',
  'kitchen',
  'books',
  'sports',
  'beauty',
  'home'
];

// Fashion specific options
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const COLORS = [
  'Black',
  'White',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Pink',
  'Purple',
  'Orange',
  'Brown',
  'Gray',
  'Navy'
];

// Coupon codes
export const COUPONS = [
  { code: 'WELCOME10', discount: 10, description: '10% off on first order' },
  { code: 'SAVE20', discount: 20, description: '20% off on orders above $100' },
  { code: 'SUMMER15', discount: 15, description: '15% summer discount' }
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' }
];

// Price ranges for filters
export const PRICE_RANGES = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 - $50' },
  { min: 50, max: 100, label: '$50 - $100' },
  { min: 100, max: 200, label: '$100 - $200' },
  { min: 200, max: Infinity, label: 'Over $200' }
];

// Rating options for filters
export const RATING_OPTIONS = [
  { value: 4, label: '4+ Stars' },
  { value: 3, label: '3+ Stars' },
  { value: 2, label: '2+ Stars' },
  { value: 1, label: '1+ Stars' }
];
