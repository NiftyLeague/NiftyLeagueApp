import { SetStateAction } from 'react';
import { Degen } from 'types/degens';
import { DegenFilter } from 'types/degenFilter';
import DEFAULT_STATIC_FILTER from './constants';

export const tranformDataByFilter = (
  degens: Degen[],
  {
    prices = [],
    multipliers = [],
    rentals = [],
    tribes = [],
    backgrounds = [],
    cosmetics = [],
    sort,
    searchTerm = [],
  }: DegenFilter,
): Degen[] => {
  const walletAddress = window.location.pathname.replace(
    /(\/(degen-rentals)|\/)/g,
    '',
  );
  let result = degens.filter((degen: Degen) => {
    const {
      price,
      multiplier,
      rental_count,
      tribe,
      background,
      traits_string,
      name,
      id,
      owner,
    } = degen;

    if (
      walletAddress?.length > 26 &&
      !(owner.toLowerCase() === walletAddress.toLowerCase())
    ) {
      return false;
    }

    if (prices.length === 2 && !(price >= prices[0] && price <= prices[1])) {
      return false;
    }

    if (
      multipliers.length === 2 &&
      !(multiplier >= multipliers[0] && multiplier <= multipliers[1])
    ) {
      return false;
    }

    if (
      rentals.length === 2 &&
      !(rental_count >= rentals[0] && rental_count <= rentals[1])
    ) {
      return false;
    }

    if (
      tribes.length > 0 &&
      !tribes.find((trb: string) => tribe === trb.toLocaleLowerCase())
    ) {
      return false;
    }

    if (
      backgrounds.length > 0 &&
      !backgrounds.find((bg: string) => background === bg.toLocaleLowerCase())
    ) {
      return false;
    }

    if (
      cosmetics.length > 0 &&
      !cosmetics.some((cosmetic) => traits_string.split(',').includes(cosmetic))
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
  });

  if (sort === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === 'multiplier') {
    result.sort((a, b) => Number(b.multiplier) - Number(a.multiplier));
  }
  if (sort === 'rentals') {
    result.sort((a, b) => Number(b.rental_count) - Number(a.rental_count));
  }
  if (sort === 'price') {
    result.sort((a, b) => Number(b.price) - Number(a.price));
  }

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
    if (key === 'searchTerm') {
      newFilter[key] = [value];
      actions && actions[key]([value] || ['']);
    } else {
      const isOverviewFilter =
        ['prices', 'multipliers', 'rentals'].indexOf(key) !== -1;
      if (!value) {
        return;
      }
      const newValue = value
        .split('-')
        .map((type: number | string) =>
          isOverviewFilter ? Number(type) : String(type),
        );
      actions &&
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
  let minMultiplier = degens[0].multiplier;
  let maxMultiplier = degens[0].multiplier;
  let minRental = degens[0].rental_count;
  let maxRental = degens[0].rental_count;

  degens.forEach((degen) => {
    const { price, multiplier, rental_count } = degen;
    minPrice = price < minPrice ? price : minPrice;
    maxPrice = price > maxPrice ? price : maxPrice;
    minMultiplier = multiplier < minMultiplier ? multiplier : minMultiplier;
    maxMultiplier = multiplier > maxMultiplier ? multiplier : maxMultiplier;
    minRental = rental_count < minRental ? rental_count : minRental;
    maxRental = rental_count > maxRental ? rental_count : maxRental;
  });

  const newFilterValues = {
    ...DEFAULT_STATIC_FILTER,
    prices: [minPrice, maxPrice],
    multipliers: [minMultiplier, maxMultiplier],
    rentals: [minRental, maxRental],
  };

  return newFilterValues;
};
