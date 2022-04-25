import { Degen } from 'types/degens';
import { DegenFilter } from 'types/degenFilter';

const tranformDataByFilter = (
  data: Degen[],
  { prices, multipliers, rentals, tribes, backgrounds }: DegenFilter,
): Degen[] => {
  const result = data.filter((degen: Degen) => {
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
    return (
      priceMatches &&
      multipliersMatches &&
      rentalsMatches &&
      tribesMatches &&
      backgroundsMatches
    );
  });
  return result;
};

export default tranformDataByFilter;
