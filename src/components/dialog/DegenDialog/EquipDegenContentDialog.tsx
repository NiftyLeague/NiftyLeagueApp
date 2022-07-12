import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';
import { isEqual } from 'lodash';
import useComicsBalance from 'hooks/useComicsBalance';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { sendEvent } from 'utils/google-analytics';
import { GOOGLE_ANALYTICS } from 'constants/google-analytics';
import { COMIC_PURCHASE_URL } from 'constants/url';
import { Degen } from 'types/degens';
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
import DegenImage from 'components/cards/DegenCard/DegenImage';
import EmptyState from 'components/EmptyState';

export interface EquipDegenContentDialogProps {
  degen?: Degen;
  name?: string;
}

interface Slot {
  name: string;
  empty: JSX.Element;
  filled?: JSX.Element;
  filledArr?: JSX.Element[];
}

const slots: Slot[] = [
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

const inventories: Slot[] = [
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

// Hardcoded multipliers by inventories order
// Should be given from BE later
// each multiplier will be larger than 2
const multipliers: number[] = [2, 3, 2, 3, 4, 2];

// Hardcoded DEGEN equipped status by inventories order
// Should be given from BE later
const initEquipped: boolean[] = new Array(6).fill(false);

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#FFFFFF',
  },
  label: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  animTypeButton: {
    borderRadius: '2px',
    height: 24,
    border: '1px solid #757575',
    color: '#757575',
    fontSize: 12,
    background: 'transparent',
  },
  animTypeActiveButton: {
    borderRadius: '2px',
    height: 24,
    fontSize: 12,
  },
  tag: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#5820D6',
    color: '#FFFFFF',
    fontSize: '8px',
    lineHeight: '8px',
    position: 'absolute',
    right: -5,
    top: -3,
  },
}));

const EquipDegenContentDialog = ({
  degen,
  name,
}: EquipDegenContentDialogProps) => {
  const dispatch = useDispatch();
  const { comicsBalance, loading: loadingComics } = useComicsBalance();
  const filteredComics = useMemo(
    () => comicsBalance.filter((comic) => comic.balance && comic.balance > 0),
    [comicsBalance],
  );
  const [animationType, setAnimationType] = useState<string>('pose');
  const [equipped, setEquipped] = useState<boolean[]>(initEquipped);
  const [pendingEquipped, setPendingEquipped] =
    useState<boolean[]>(initEquipped);
  const { animTypeActiveButton, animTypeButton, label, tag, title } =
    useStyles();

  useEffect(() => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.DEGEN_EQUIP_CLICKED,
      GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
    );
  }, []);

  const handleEquip = useCallback(
    (index: number) => {
      const newEquipped = [...pendingEquipped];
      // If bat, unequip existing bat.
      if (index >= 3) {
        for (let i = 3; i < 6; i++) {
          newEquipped[i] = false;
        }
      }
      newEquipped[index] = true;
      setPendingEquipped(newEquipped);
      let eventName = '';
      switch (inventories[index].name) {
        case 'Cape':
          eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_CAPE_EQUIPPED;
          break;
        case 'Halo':
          eventName = GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_HALO_EQUIPPED;
          break;
        case 'Companion':
          eventName =
            GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_COMPANION_EQUIPPED;
          break;
        case 'Diamond Bat':
          eventName =
            GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_DIAMOND_BAT_EQUIPPED;
          break;
        case 'Purple Bat':
          eventName =
            GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_PURPLE_BAT_EQUIPPED;
          break;
        case 'Bread Bat':
          eventName =
            GOOGLE_ANALYTICS.EVENTS.DEGEN_INVENTORY_BREAD_BAT_EQUIPPED;
          break;
        default:
          break;
      }
      if (eventName) {
        sendEvent(eventName, GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE);
      }
    },
    [pendingEquipped],
  );

  const handleUnequip = useCallback(
    (index: number) => {
      const newEquipped = [...pendingEquipped];
      if (index >= 3) {
        for (let i = 3; i < 6; i++) {
          newEquipped[i] = false;
        }
      } else {
        newEquipped[index] = false;
      }
      setPendingEquipped(newEquipped);
      let eventName = '';
      switch (slots[index].name) {
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
      if (eventName) {
        sendEvent(eventName, GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE);
      }
    },
    [pendingEquipped],
  );

  const stateChanged = useMemo(
    () => !isEqual(equipped, pendingEquipped),
    [equipped, pendingEquipped],
  );

  const handleSave = useCallback(() => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.DEGEN_EQUIP_STARTED,
      GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
    );
    // Should call proper api here
    setEquipped(pendingEquipped);
    dispatch(
      openSnackbar({
        open: true,
        message: 'Settings saved successfuly...',
        variant: 'alert',
        alert: {
          color: 'success',
        },
        close: false,
      }),
    );
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.DEGEN_EQUIP_SUCCESS,
      GOOGLE_ANALYTICS.CATEGORIES.ECOMMERCE,
    );
  }, [dispatch, pendingEquipped]);

  const getSlotImage = useCallback(
    (index: number) => {
      if (index < 3) {
        return pendingEquipped[index]
          ? slots[index].filled
          : slots[index].empty;
      }
      const slicedArr = pendingEquipped.slice(3);
      const equippedBatIndex = slicedArr.findIndex((item) => !!item);
      const filledArr = slots[index].filledArr;
      if (equippedBatIndex >= 0 && filledArr) {
        return filledArr[equippedBatIndex];
      } else {
        return slots[index].empty;
      }
    },
    [pendingEquipped],
  );

  const isEquippedSlot = useCallback(
    (index: number) => {
      if (index < 3) {
        return pendingEquipped[index];
      }
      const slicedArr = pendingEquipped.slice(3);
      const equippedBatIndex = slicedArr.findIndex((item) => !!item);
      return equippedBatIndex >= 0;
    },
    [pendingEquipped],
  );

  const totalMultiplierApplied = useMemo(() => {
    let totalMultipliers = 0;
    pendingEquipped.forEach((status, index) => {
      if (status) totalMultipliers += multipliers[index];
    });
    if (totalMultipliers > 0) {
      return `${totalMultipliers}X Earnings Multiplier`;
    }
    return 'No Multiplier Applied';
  }, [pendingEquipped]);

  const handleSetPose = () => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.DEGEN_EQUIP_ANIMATION_POSE_CLICKED,
      GOOGLE_ANALYTICS.CATEGORIES.ENGAGEMENT,
    );
    setAnimationType('pose');
  };

  const handleSetRotate = () => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.DEGEN_EQUIP_ANIMATION_ROTATE_CLICKED,
      GOOGLE_ANALYTICS.CATEGORIES.ENGAGEMENT,
    );
    setAnimationType('rotate');
  };

  const handleBuyComic = () => {
    window.open(COMIC_PURCHASE_URL, '_blank');
  };

  if (filteredComics.length === 0) {
    if (loadingComics) {
      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          height={200}
          mx="auto"
        >
          <CircularProgress />
        </Stack>
      );
    }
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        display="flex"
        height={200}
      >
        <EmptyState
          message="You don't own any Comics yet."
          buttonText="Buy a Comic"
          onClick={handleBuyComic}
          noBorder
        />
      </Grid>
    );
  }

  return (
    <Stack py={1} maxWidth={330} mx="auto">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        p={1.25}
        mx={1.25}
        sx={{ backgroundColor: '#262930' }}
      >
        <Typography variant="h5" className={title}>
          {name || `DEGEN #${degen?.id}`}
        </Typography>
      </Box>
      <Stack direction="row" mt={2.25}>
        <Stack alignItems="center">
          <Typography variant="body1" mb={2} className={label}>
            SLOTS
          </Typography>
          <Stack rowGap={3}>
            {slots.map((slot, index) => (
              <Box key={slot.name} width={40} height={40} position="relative">
                {getSlotImage(index)}
                {isEquippedSlot(index) && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={tag}
                    onClick={() => handleUnequip(index)}
                  >
                    <CloseIcon sx={{ fontSize: '10px', cursor: 'pointer' }} />
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Stack>
        <Stack mt={2.75} ml={3.75} mr={1.5}>
          {degen?.id && (
            <DegenImage
              sx={{
                objectFit: 'cover',
                width: 183,
                height: 244,
                borderRadius: '10px',
              }}
              tokenId={degen.id}
            />
          )}
          <Stack mt={1.25} gap={1.5} direction="row">
            <Button
              variant="contained"
              fullWidth
              className={
                animationType === 'pose' ? animTypeActiveButton : animTypeButton
              }
              onClick={handleSetPose}
            >
              POSE
            </Button>
            <Button
              variant="contained"
              fullWidth
              className={
                animationType === 'rotate'
                  ? animTypeActiveButton
                  : animTypeButton
              }
              onClick={handleSetRotate}
            >
              ROTATE
            </Button>
          </Stack>
          <Typography
            variant="body1"
            my={2.25}
            mx="auto"
            fontWeight={700}
            className={label}
          >
            {totalMultiplierApplied}
          </Typography>
          <Button
            variant="contained"
            disabled={!stateChanged}
            sx={{ width: 116, mx: 'auto' }}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </Stack>
        <Stack alignItems="center">
          <Typography
            variant="body1"
            mb={2}
            textAlign="center"
            className={label}
          >
            INVENTORY
          </Typography>
          <Stack rowGap={1.25}>
            {inventories.map((inventory, index) => (
              <Box
                key={inventory.name}
                width={30}
                height={30}
                position="relative"
                sx={{ cursor: pendingEquipped[index] ? 'inherit' : 'pointer' }}
                onClick={() => handleEquip(index)}
              >
                {pendingEquipped[index] ? inventory.empty : inventory.filled}
                {!pendingEquipped[index] && multipliers[index] >= 2 && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={tag}
                  >{`${multipliers[index]}x`}</Box>
                )}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EquipDegenContentDialog;
