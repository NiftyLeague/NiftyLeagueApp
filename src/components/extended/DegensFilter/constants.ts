import { DegenFilter } from 'types/degenFilter';

const DEFAULT_STATIC_FILTER: DegenFilter = {
  prices: [100, 3500],
  multipliers: [1, 10],
  rentals: [0, 10],
  tribes: [],
  backgrounds: [],
  sort: 'name',
  cosmetics: [],
  searchTerm: [''],
};

export default DEFAULT_STATIC_FILTER;
