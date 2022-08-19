import { useContext, memo, useState, useEffect } from 'react';
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
  Dialog,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import Chip from 'components/extended/Chip';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { formatNumberToDisplay } from 'utils/numbers';
import NetworkContext from 'contexts/NetworkContext';
import DegenImage from './DegenImage';
import { downloadDegenAsZip } from 'utils/file';
import { ReactComponent as DownloadSolid } from 'assets/images/icons/download-solid.svg';
import EnableDisableDegenDialogContent from 'pages/dashboard/degens/dialogs/EnableDegenDialogContent';
import { Degen } from 'types/degens';
import { DISABLE_RENT_API_URL } from 'constants/url';

const chipStyles = (isSmall: boolean) => ({
  color: 'white',
  borderRadius: 1,
  width: '100%',
  fontSize: isSmall ? 9 : 11,
  fontWeight: 'bold',
  m: isSmall ? 0.25 : 0.5,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'auto',
    color: 'white',
  },
});

export interface DegenCardProps {
  degen: Degen;
  size?: 'small' | 'normal';
  isDashboardDegen?: boolean;
  degenEquipEnabled?: boolean;
  onClickClaim?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDetail?: React.MouseEventHandler<HTMLButtonElement>;
  onClickEditName?: React.MouseEventHandler<SVGSVGElement>;
  onClickRent?: React.MouseEventHandler<HTMLButtonElement>;
  onClickEquip?: React.MouseEventHandler<HTMLButtonElement>;
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

const DegenCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<DegenCardProps>>
> = memo(
  ({
    degen,
    size = 'normal',
    isDashboardDegen = false,
    degenEquipEnabled = false,
    onClickClaim,
    onClickDetail,
    onClickEditName,
    onClickRent,
    onClickEquip,
    sx,
  }) => {
    const { palette } = useTheme();
    const { id, name, multiplier, price, rental_count, is_active } = degen;
    const authToken = window.localStorage.getItem('authentication-token');
    const [isEnableDisableDegenModalOpen, setIsEnableDisableDegenModalOpen] =
      useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState(is_active);
    useEffect(() => {
      const getIsEnabled = async () => {
        if (authToken && id) {
          const res = await fetch(
            `${DISABLE_RENT_API_URL}activate?degen_id=${id}`,
            {
              method: 'GET',
              headers: { authorizationToken: authToken },
            },
          );
          const json = await res.json();
          setIsEnabled(!json?.price);
        }
      };
      if (isDashboardDegen) getIsEnabled();
    }, [authToken, id, isDashboardDegen]);

    const onClickDownload = async () => {
      if (authToken) {
        try {
          await downloadDegenAsZip(authToken, id);
        } catch (err) {
          toast.error(err.message, { theme: 'dark' });
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
        <Stack
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
        </Stack>
        <CardContent sx={{ py: 1, px: 2 }}>
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
          {degenEquipEnabled && isDashboardDegen && onClickEquip ? (
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
              Traits
            </Button>
          )}
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
              <DownloadSolid
                width={size === 'small' ? 12 : 16}
                height={size === 'small' ? 12 : 16}
              />
            </Box>
            <DegenClaimBal tokenId={id} fontSize={tinyFontSize} />
          </Stack>
        )}
        {isDashboardDegen && (
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
        )}
      </Card>
    );
  },
);

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
