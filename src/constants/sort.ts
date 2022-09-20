import { MenuItemBaseProps } from 'types';

const DegenSortOptions: MenuItemBaseProps[] = [
  {
    value: 'priceUp',
    label: 'Price Low to High',
  },
  {
    value: 'priceDown',
    label: 'Price High to Low',
  },
  {
    value: 'mostRented',
    label: 'Most Rented',
  },
  {
    value: 'leastRented',
    label: 'Least Rented',
  },
  {
    value: 'recentRented',
    label: 'Recently Rented',
  },
];

export default DegenSortOptions;
