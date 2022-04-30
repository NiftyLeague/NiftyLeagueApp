import { SetStateAction } from 'react';
import { Degen } from 'types/degens';
import { DegenFilter } from 'types/degenFilter';
import defaultFilterValues from './constants';

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

  const result = degens.filter((degen: Degen) => {
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
        ? cosmetics.some((cosmetic) =>
            degen.traits_string.split(',').includes(cosmetic),
          )
        : true;
    return (
      priceMatches &&
      multipliersMatches &&
      rentalsMatches &&
      tribesMatches &&
      backgroundsMatches &&
      cosmeticsMatches
    );
  });
  return result;
};

export const updateFilterValue = (
  params?: {
    [key: string]: string;
  },
  actions?: {
    [key: string]: React.Dispatch<SetStateAction<any[]>>;
  },
) => {
  const newFilter: any = { ...defaultFilterValues };
  // eslint-disable-next-line guard-for-in
  for (const key in params) {
    const value = params[key as keyof DegenFilter];
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
      actions[key](newValue || defaultFilterValues[key as keyof DegenFilter]);
    newFilter[key] = newValue;
  }
  // eslint-disable-next-line consistent-return
  return newFilter;
};
