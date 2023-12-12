'use client';

import { useContext, memo } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
  // Dialog,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIconFilled from '@mui/icons-material/Favorite';
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import { toast } from 'react-toastify';
// import Chip from '@/components/extended/Chip';
import SkeletonDegenPlaceholder from '@/components/cards/Skeleton/DegenPlaceholder';
import useClaimableNFTL from '@/hooks/useClaimableNFTL';
import { formatNumberToDisplay } from '@/utils/numbers';
import NetworkContext from '@/contexts/NetworkContext';
import DegenImage from './DegenImage';
import { downloadDegenAsZip } from '@/utils/file';
import { errorMsgHandler } from '@/utils/errorHandlers';
// import EnableDisableDegenDialogContent from '@/app/dashboard/degens/dialogs/EnableDegenDialogContent';
import { Degen } from '@/types/degens';
// import { DISABLE_RENT_API_URL } from '@/constants/url';
import useAuth from '@/hooks/useAuth';

// const chipStyles = (isSmall: boolean) => ({
//   color: 'white',
//   borderRadius: 1,
//   width: '100%',
//   fontSize: isSmall ? 9 : 11,
//   fontWeight: 'bold',
//   m: isSmall ? 0.25 : 0.5,
//   '&:hover': {
//     backgroundColor: 'transparent',
//     cursor: 'auto',
//     color: 'white',
//   },
// });

export interface DegenCardProps {
  degen: Degen;
  size?: 'small' | 'normal';
  isDashboardDegen?: boolean;
  isSelectableDegen?: boolean;
  isSelected?: boolean;
  isSelectionDisabled?: boolean;
  degenEquipEnabled?: boolean;
  favs?: string[];
  onClickClaim?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDetail?: React.MouseEventHandler<HTMLButtonElement>;
  onClickEditName?: React.MouseEventHandler<SVGSVGElement>;
  onClickEquip?: React.MouseEventHandler<HTMLButtonElement>;
  onClickFavorite?: React.MouseEventHandler<HTMLDivElement>;
  onClickRent?: React.MouseEventHandler<HTMLButtonElement>;
  onClickSelect?: React.MouseEventHandler<HTMLButtonElement>;
  sx?: SxProps<Theme>;
}

const DegenClaimBal: React.FC<
  React.PropsWithChildren<
    React.PropsWithChildren<{ tokenId: string; fontSize: string }>
  >
> = memo(({ tokenId, fontSize }) => {
  const { readContracts } = useContext(NetworkContext);
  const tokenIndices = [parseInt(tokenId, 10)];
  const totalAccumulated = useClaimableNFTL(readContracts, tokenIndices);
  const amountParsed = totalAccumulated
    ? formatNumberToDisplay(totalAccumulated)
    : 0;
  return (
    <Typography
      sx={{ textAlign: 'center', fontSize }}
    >{`${amountParsed} NFTL`}</Typography>
  );
});

DegenClaimBal.displayName = 'DegenClaimBal';

const DegenCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<DegenCardProps>>
> = memo(
  ({
    degen,
    // degenEquipEnabled = false,
    favs = [],
    isDashboardDegen = false,
    isSelectableDegen = false,
    isSelected = false,
    isSelectionDisabled = false,
    size = 'normal',
    sx,
    onClickClaim,
    onClickDetail,
    onClickEditName,
    // onClickRent,
    // onClickEquip,
    onClickFavorite,
    onClickSelect,
  }) => {
    const { palette } = useTheme();
    const {
      id,
      name,
      // multiplier, price, rental_count, is_active
    } = degen;
    const fav = favs.some((f) => f === id);
    const { authToken } = useAuth();
    // const [isEnableDisableDegenModalOpen, setIsEnableDisableDegenModalOpen] =
    //   useState<boolean>(false);
    // const [isEnabled, setIsEnabled] = useState(is_active);
    // useEffect(() => {
    //   const getIsEnabled = async () => {
    //     if (authToken && id) {
    //       const res = await fetch(
    //         `${DISABLE_RENT_API_URL}activate?degen_id=${id}`,
    //         {
    //           method: 'GET',
    //           headers: { authorizationToken: authToken },
    //         },
    //       );
    //       const json = await res.json();
    //       setIsEnabled(!json?.price);
    //     }
    //   };
    //   if (isDashboardDegen) getIsEnabled();
    // }, [authToken, id, isDashboardDegen]);

    const onClickDownload = async () => {
      if (authToken) {
        try {
          await downloadDegenAsZip(authToken, id);
        } catch (err) {
          toast.error(errorMsgHandler(err), { theme: 'dark' });
        }
      }
    };

    const buttonFontSize = size === 'small' ? '10px' : '14px';
    const tinyFontSize = size === 'small' ? '8px' : '12px';

    return (
      <Card
        sx={{
          width: '100%',
          height: '100%',
          border: `1px solid ${palette.grey[800]}`,
          backgroundColor: palette.background.default,
          pb: 2,
          ...sx,
        }}
      >
        {id && (
          <DegenImage
            tokenId={id}
            sx={{ height: size === 'small' ? 200 : undefined }}
          />
        )}
        {/* <Stack
          direction="row"
          justifyContent="space-evenly"
          sx={{ m: size === 'small' ? 0.5 : 1, width: 'auto' }}
        >
          <Chip
            chipcolor="rgb(75, 7, 175)"
            label={`${price} NFTL`}
            sx={chipStyles(size === 'small')}
            variant="outlined"
            size="small"
          />
          <Chip
            chipcolor="rgb(75, 7, 175)"
            label={`${rental_count} Rentals`}
            sx={chipStyles(size === 'small')}
            variant="outlined"
            size="small"
          />
          <Chip
            chipcolor="rgb(75, 7, 175)"
            label={`${multiplier}x`}
            sx={chipStyles(size === 'small')}
            variant="outlined"
            size="small"
          />
        </Stack> */}
        <CardContent sx={{ py: 2, px: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            gap={1}
            sx={{
              '&:hover': {
                '& svg': {
                  display: 'block',
                },
              },
            }}
          >
            <Typography gutterBottom variant={size === 'small' ? 'h4' : 'h3'}>
              {name || 'No Name DEGEN'}
            </Typography>
            {isDashboardDegen && (
              <EditIcon
                sx={{ cursor: 'pointer', display: 'none' }}
                onClick={onClickEditName}
                fontSize="small"
              />
            )}
            <Link
              href={
                id
                  ? `https://opensea.io/assets/0x986aea67c7d6a15036e18678065eb663fc5be883/${id}`
                  : '#'
              }
              target="_blank"
              rel="nofollow"
              color={palette.text.secondary}
              sx={{ fontSize: buttonFontSize }}
            >
              {`#${id}`}
            </Link>
          </Stack>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            px: 2,
            gap: size === 'small' ? 0.5 : 1,
          }}
        >
          {/* {false && (
            <Button
              variant="contained"
              fullWidth
              sx={{
                minWidth: '32%',
                fontSize: buttonFontSize,
              }}
              onClick={onClickRent}
            >
              Rent
            </Button>
          )} */}
          {/* {degenEquipEnabled && isDashboardDegen && onClickEquip ? (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                minWidth: '32%',
                fontSize: buttonFontSize,
              }}
              onClick={onClickEquip}
            >
              Equip
            </Button>
          ) : ( */}

          {isSelectableDegen ? (
            <Button
              variant={isSelected ? 'contained' : 'outlined'}
              color="primary"
              fullWidth
              sx={{
                minWidth: '32%',
                fontSize: buttonFontSize,
              }}
              onClick={onClickSelect}
              disabled={isSelectionDisabled && !isSelected}
            >
              {isSelected ? 'Selected' : 'Select'}
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                minWidth: '32%',
                fontSize: buttonFontSize,
              }}
              onClick={onClickDetail}
            >
              Details
            </Button>
          )}
          {/* )} */}
          {isDashboardDegen && (
            <Button
              onClick={onClickClaim}
              variant="contained"
              fullWidth
              sx={{
                minWidth: '32%',
                fontSize: buttonFontSize,
              }}
            >
              Claim
            </Button>
          )}
        </Box>
        {isDashboardDegen && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ pt: 2, px: 2, lineHeight: '1.5em' }}
          >
            {/* {false && (
              <Typography
                color={palette.grey[700]}
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: tinyFontSize,
                }}
                onClick={() => setIsEnableDisableDegenModalOpen(true)}
              >
                {isEnabled ? 'Disable' : 'Enable'} Rentals
              </Typography>
            )} */}
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{ cursor: 'pointer', marginRight: 1 }}
                onClick={onClickFavorite}
              >
                {fav ? (
                  <FavoriteIconFilled
                    sx={{ fontSize: size === 'small' ? 12 : 16 }}
                  />
                ) : (
                  <FavoriteIconOutlined
                    sx={{ fontSize: size === 'small' ? 12 : 16 }}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  cursor: 'pointer',
                }}
                onClick={onClickDownload}
              >
                <Typography
                  sx={{
                    fontSize: tinyFontSize,
                    pr: '4px',
                  }}
                >
                  IP
                </Typography>
                <Image
                  src="/images/icons/download-solid.svg"
                  alt="Download Icon"
                  width={size === 'small' ? 12 : 16}
                  height={size === 'small' ? 12 : 16}
                />
              </Box>
            </Box>
            <DegenClaimBal tokenId={id} fontSize={tinyFontSize} />
          </Stack>
        )}
        {/* {isDashboardDegen && (
          <Dialog
            open={isEnableDisableDegenModalOpen}
            onClose={() => setIsEnableDisableDegenModalOpen(false)}
          >
            <EnableDisableDegenDialogContent
              degen={degen}
              isEnabled={isEnabled}
              onClose={() => {
                setIsEnabled(!isEnabled);
                setIsEnableDisableDegenModalOpen(false);
              }}
            />
          </Dialog>
        )} */}
      </Card>
    );
  },
);

DegenCard.displayName = 'DegenCard';

const DegenCardInView: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<DegenCardProps>>
> = (props) => {
  const { ref, inView } = useInView();

  return (
    <div ref={ref}>
      {inView ? <DegenCard {...props} /> : <SkeletonDegenPlaceholder />}
    </div>
  );
};

export { DegenCardInView };

export default DegenCard;
