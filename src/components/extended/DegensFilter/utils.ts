import { SetStateAction } from 'react';
import type { Degen } from '@/types/degens';
import type { DegenFilter } from '@/types/degenFilter';
import DEFAULT_STATIC_FILTER from './constants';
import { BURN_ADDYS } from '@/constants/addresses';

export const tranformDataByFilter = (
  degens: Degen[],
  {
    // prices = [],
    // multipliers = [],
    // rentals = [],
    tribes = [],
    backgrounds = [],
    cosmetics = [],
    sort,
    searchTerm = [],
    walletAddress = [],
  }: DegenFilter,
): Degen[] => {
  let result = degens.filter(
    ({
      // price,
      // multiplier,
      // rental_count,
      tribe = '',
      background = '',
      traits_string = '',
      name = '',
      id = '',
      owner = '',
    }: Degen) => {
      // Filter all burn addys
      if (BURN_ADDYS.includes(owner)) return false;

      if (
        walletAddress?.length &&
        walletAddress[0].length > 26 &&
        !(owner.toLowerCase() === walletAddress[0].toLowerCase())
      ) {
        return false;
      }

      // if (prices.length === 2 && !(price >= prices[0] && price <= prices[1])) {
      //   return false;
      // }

      // if (
      //   multipliers.length > 0 &&
      //   !multipliers.find((value: string) =>
      //     value === '3+' ? multiplier >= 3 : multiplier === Number(value),
      //   )
      // ) {
      //   return false;
      // }

      // if (
      //   rentals.length > 0 &&
      //   !rentals.find((value: string) =>
      //     value === '3+' ? rental_count >= 3 : rental_count === Number(value),
      //   )
      // ) {
      //   return false;
      // }

      if (
        tribes.length > 0 &&
        !tribes.find(
          (trb: string) =>
            tribe?.toLocaleLowerCase() === trb.toLocaleLowerCase() ||
            // TODO: remove unnecessary check once fetch data is updated
            (!tribe && trb.toLocaleLowerCase() === 'hydra'),
        )
      ) {
        return false;
      }

      if (
        backgrounds.length > 0 &&
        !backgrounds.find(
          (bg: string) =>
            background?.toLocaleLowerCase() === bg.toLocaleLowerCase(),
        )
      ) {
        return false;
      }

      if (
        cosmetics.length > 0 &&
        !cosmetics.some((cosmetic) =>
          traits_string.split(',').includes(cosmetic),
        )
      ) {
        return false;
      }

      if (
        searchTerm.length === 1 &&
        !(
          name.toLowerCase().includes(searchTerm[0].toLowerCase()) ||
          id.toLocaleLowerCase().includes(searchTerm[0].toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    },
  );

  if (sort === 'idUp') {
    result.sort((a, b) => Number(a.id) - Number(b.id));
  } else if (sort === 'idDown') {
    result.sort((a, b) => Number(b.id) - Number(a.id));
  }
  // else if (sort === 'priceUp') {
  //   result.sort((a, b) => Number(a.price) - Number(b.price));
  // } else if (sort === 'priceDown') {
  //   result.sort((a, b) => Number(b.price) - Number(a.price));
  // } else if (sort === 'mostRented') {
  //   result.sort((a, b) => Number(b.total_rented) - Number(a.total_rented));
  // } else if (sort === 'leastRented') {
  //   result.sort((a, b) => Number(a.total_rented) - Number(b.total_rented));
  // } else if (sort === 'recentRented') {
  //   result.sort((a, b) => b.last_rented_at - a.last_rented_at);
  // }

  return result;
};

export const updateFilterValue = (
  defaultFilter?: DegenFilter,
  params?: {
    [key: string]: string;
  },
  actions?: {
    [key: string]: React.Dispatch<SetStateAction<any[]>>;
  },
) => {
  const newFilter: any = { ...defaultFilter };
  // eslint-disable-next-line guard-for-in
  for (const key in params) {
    const value = params[key as keyof DegenFilter];
    if (key === 'searchTerm' || key === 'walletAddress') {
      newFilter[key] = [value];
    } else {
      if (!value) {
        return;
      }
      const newValue = value
        .split('-')
        .map((type: number | string) =>
          key === 'prices' ? Number(type) : String(type),
        );
      actions &&
        actions[key] &&
        actions[key](
          newValue || DEFAULT_STATIC_FILTER[key as keyof DegenFilter],
        );
      newFilter[key] = newValue;
    }
  }
  // eslint-disable-next-line consistent-return
  return newFilter;
};

export const getDefaultFilterValueFromData = (degens: Degen[] | undefined) => {
  if (!degens?.length) {
    return DEFAULT_STATIC_FILTER;
  }
  let minPrice = degens[0].price;
  let maxPrice = degens[0].price;

  degens.forEach((degen) => {
    const { price } = degen;
    minPrice = price < minPrice ? price : minPrice;
    maxPrice = price > maxPrice ? price : maxPrice;
  });

  const newFilterValues = {
    ...DEFAULT_STATIC_FILTER,
    prices: [minPrice, maxPrice],
  };

  return newFilterValues;
};
