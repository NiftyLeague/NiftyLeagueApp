import { ReactComponent as ApeIcon } from 'assets/images/tribe/ape.svg';
import { ReactComponent as AlienIcon } from 'assets/images/tribe/alien.svg';
import { ReactComponent as CatIcon } from 'assets/images/tribe/cat.svg';
import { ReactComponent as DegoIcon } from 'assets/images/tribe/doge.svg';
import { ReactComponent as FrogIcon } from 'assets/images/tribe/frog.svg';
import { ReactComponent as HumanIcon } from 'assets/images/tribe/human.svg';
// import { ReactComponent as HydraEggIcon } from 'assets/images/tribe/egg.svg';

const tribes = [
  {
    name: 'Ape',
    icon: ApeIcon,
  },
  {
    name: 'Alien',
    icon: AlienIcon,
  },
  {
    name: 'Cat',
    icon: CatIcon,
  },
  {
    name: 'Doge',
    icon: DegoIcon,
  },
  {
    name: 'Frog',
    icon: FrogIcon,
  },
  {
    name: 'Human',
    icon: HumanIcon,
  },
  // {
  //   name: 'Hydra',
  //   icon: HydraEggIcon,
  // },
];

const backgrounds = ['Common', 'Rare', 'Meta', 'Legendary'];

const rentals = ['1', '2', '3+'];

const multipliers = ['1', '2', '3+'];

const wearables = ['Hand', 'Back', 'Head', 'Pet'];

export type FilterSource =
  | 'prices'
  | 'multipliers'
  | 'rentals'
  | 'tribes'
  | 'backgrounds'
  | 'cosmetics'
  | 'wearables'
  | 'searchTerm';

export { tribes, backgrounds, rentals, multipliers, wearables };
