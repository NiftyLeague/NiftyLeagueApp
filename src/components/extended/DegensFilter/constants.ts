import { DegenFilter } from 'types/degenFilter';

const defaultFilterValues: DegenFilter = {
  prices: [0, 3000],
  multipliers: [0, 15],
  rentals: [0, 40],
  tribes: [],
  backgrounds: [],
  sort: 'name',
  cosmetics: [],
};

export default defaultFilterValues;
