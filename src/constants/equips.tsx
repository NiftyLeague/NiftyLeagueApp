import { EquipItemSlot } from 'types/equip';
import { GOOGLE_ANALYTICS } from './google-analytics';
import { ReactComponent as CapeSlot } from 'assets/images/equips/cape-slot.svg';
import { ReactComponent as CompanionSlot } from 'assets/images/equips/companion-slot.svg';
import { ReactComponent as HaloSlot } from 'assets/images/equips/halo-slot.svg';
import { ReactComponent as BatSlot } from 'assets/images/equips/bat-slot.svg';
import { ReactComponent as CapeInventoryEmpty } from 'assets/images/equips/cape-inventory-empty.svg';
import { ReactComponent as CompanionInventoryEmpty } from 'assets/images/equips/companion-inventory-empty.svg';
import { ReactComponent as HaloInventoryEmpty } from 'assets/images/equips/halo-inventory-empty.svg';
import { ReactComponent as BatInventoryEmpty } from 'assets/images/equips/bat-inventory-empty.svg';
import CapeImage from 'assets/images/equips/cape.png';
import CompanionImage from 'assets/images/equips/companion.png';
import HaloImage from 'assets/images/equips/halo.png';
import BreadBatImage from 'assets/images/equips/bread-bat.png';
import DiamondBatImage from 'assets/images/equips/diamond-bat.png';
import PurpleBatImage from 'assets/images/equips/purple-bat.png';

export const SLOTS: EquipItemSlot[] = [
  {
    name: 'Back',
    empty: <CapeSlot />,
    filled: <img src={CapeImage} width={40} height={40} alt="Back" />,
  },
  {
    name: 'Head',
    empty: <HaloSlot />,
    filled: <img src={HaloImage} width={40} height={40} alt="Head" />,
  },
  {
    name: 'Pet',
    empty: <CompanionSlot />,
    filled: <img src={CompanionImage} width={40} height={40} alt="Pet" />,
  },
  {
    name: 'Weapon',
    empty: <BatSlot />,
    filledArr: [
      <img src={DiamondBatImage} width={40} height={40} alt="Diamond Bat" />,
      <img src={PurpleBatImage} width={40} height={40} alt="Purple Bat" />,
      <img src={BreadBatImage} width={40} height={40} alt="Bread Bat" />,
    ],
  },
];

export const INVENTORIES: EquipItemSlot[] = [
  {
    name: 'Cape',
    empty: <CapeInventoryEmpty width={30} height={30} />,
    filled: <img src={CapeImage} alt="Cape" className="inventory" />,
  },
  {
    name: 'Halo',
    empty: <HaloInventoryEmpty width={30} height={30} />,
    filled: <img src={HaloImage} alt="Halo" className="inventory" />,
  },
  {
    name: 'Companion',
    empty: <CompanionInventoryEmpty width={30} height={30} />,
    filled: <img src={CompanionImage} alt="Companion" className="inventory" />,
  },
  {
    name: 'Diamond Bat',
    empty: <BatInventoryEmpty width={30} height={30} />,
    filled: (
      <img src={DiamondBatImage} alt="Diamond Bat" className="inventory" />
    ),
  },
  {
    name: 'Purple Bat',
    empty: <BatInventoryEmpty width={30} height={30} />,
    filled: <img src={PurpleBatImage} alt="Purple Bat" className="inventory" />,
  },
  {
    name: 'Bread Bat',
    empty: <BatInventoryEmpty width={30} height={30} />,
    filled: <img src={BreadBatImage} alt="Bread Bat" className="inventory" />,
  },
];

export const getInventoryAnalyticsEventName = (inventory: string) => {
  let eventName = '';
  switch (inventory) {
    case 'Cape':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_CAPE_EQUIPPED;
      break;
    case 'Halo':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_HALO_EQUIPPED;
      break;
    case 'Companion':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_COMPANION_EQUIPPED;
      break;
    case 'Diamond Bat':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_DIAMOND_BAT_EQUIPPED;
      break;
    case 'Purple Bat':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_PURPLE_BAT_EQUIPPED;
      break;
    case 'Bread Bat':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_BREAD_BAT_EQUIPPED;
      break;
    default:
      break;
  }
  return eventName;
};

export const getSlotAnalyticsEventName = (slot: string) => {
  let eventName = '';
  switch (slot) {
    case 'Back':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_SLOT_BACK_UNEQUIPPED;
      break;
    case 'Head':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_SLOT_HEAD_UNEQUIPPED;
      break;
    case 'Pet':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_SLOT_PET_UNEQUIPPED;
      break;
    case 'Weapon':
      eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_SLOT_WEAPON_UNEQUIPPED;
      break;
    default:
      break;
  }
  return eventName;
};
