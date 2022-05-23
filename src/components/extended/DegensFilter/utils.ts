import { SetStateAction } from 'react';
import { Degen } from 'types/degens';
import { DegenFilter } from 'types/degenFilter';
import DEFAULT_STATIC_FILTER from './constants';

export const tranformDataByFilter = (
  degens: Degen[],
  {
    prices,
    multipliers,
    rentals,
    tribes,
    backgrounds,
    cosmetics,
    sort,
    searchTerm,
  }: DegenFilter,
): Degen[] => {
  if (sort === 'name') {
    degens.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === 'multiplier') {
    degens.sort((a, b) => Number(b.multiplier) - Number(a.multiplier));
  }
  if (sort === 'rentals') {
    degens.sort((a, b) => Number(b.rental_count) - Number(a.rental_count));
  }
  if (sort === 'price') {
    degens.sort((a, b) => Number(b.price) - Number(a.price));
  }

  const walletAddress = window.location.pathname.replace(
    /(\/(degen-rentals)|\/)/g,
    '',
  );
  let result = degens;
  if (walletAddress?.length > 26) {
    result = result.filter(
      (degen: Degen) =>
        degen.owner.toLowerCase() === walletAddress.toLowerCase(),
    );
  }

  result = result.filter((degen: Degen) => {
    const priceMatches = prices
      ? degen.price >= prices[0] && degen.price <= prices[1]
      : true;
    const multipliersMatches = multipliers
      ? degen.multiplier >= multipliers[0] && degen.multiplier <= multipliers[1]
      : true;
    const rentalsMatches = rentals
      ? degen.rental_count >= rentals[0] && degen.rental_count <= rentals[1]
      : true;
    const tribesMatches =
      tribes.length > 0
        ? tribes.find(
            (tribe: string) => degen.tribe === tribe.toLocaleLowerCase(),
          )
        : true;
    const backgroundsMatches =
      backgrounds.length > 0
        ? backgrounds.find(
            (background: string) =>
              degen.background === background.toLocaleLowerCase(),
          )
        : true;
    const cosmeticsMatches =
      cosmetics.length > 0
        ? cosmetics.every((cosmetic) =>
            degen.traits_string.split(',').includes(cosmetic),
          )
        : true;
    const searchTermMatches = searchTerm[0]
      ? degen.name.toLowerCase().includes(searchTerm[0].toLowerCase()) ||
        degen.id.toLocaleLowerCase().includes(searchTerm[0].toLowerCase())
      : true;
    return (
      priceMatches &&
      multipliersMatches &&
      rentalsMatches &&
      tribesMatches &&
      backgroundsMatches &&
      cosmeticsMatches &&
      searchTermMatches
    );
  });
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
  let minPrice = DEFAULT_STATIC_FILTER.prices[0];
  let maxPrice = DEFAULT_STATIC_FILTER.prices[1];
  let minMultiplier = DEFAULT_STATIC_FILTER.multipliers[0];
  let maxMultiplier = DEFAULT_STATIC_FILTER.multipliers[1];
  let minRental = DEFAULT_STATIC_FILTER.rentals[0];
  let maxRental = DEFAULT_STATIC_FILTER.rentals[1];

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
