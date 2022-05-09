import { useContext, memo } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import Chip from 'components/extended/Chip';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { formatNumberToDisplay } from 'utils/numbers';
import { NetworkContext } from 'NetworkProvider';
import DegenImage from './DegenImage';
import { downloadDegenAsZip } from 'utils/file';
import { ReactComponent as DownloadSolid } from 'assets/images/icons/download-solid.svg';

const chipStyles = {
  color: 'white',
  borderRadius: 1,
  width: '100%',
  fontSize: 11,
  fontWeight: 'bold',
  m: 0.5,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'auto',
    color: 'white',
  },
};

export interface DegenCardProps {
  activeRentals?: number;
  background?: string;
  id: string;
  isDashboardDegen?: boolean;
  isEnabled?: boolean;
  multiplier?: number;
  name?: string;
  onClickClaim?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDetail?: React.MouseEventHandler<HTMLButtonElement>;
  onClickEditName?: React.MouseEventHandler<SVGSVGElement>;
  onClickRent?: React.MouseEventHandler<HTMLButtonElement>;
  onEnableDisable?: React.MouseEventHandler<HTMLDivElement>;
  owner?: string;
  price?: number;
  sx?: SxProps<Theme>;
}

const DegenClaimBal: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<{ tokenId: string }>>
> = memo(({ tokenId }) => {
  const { readContracts } = useContext(NetworkContext);
  const tokenIndices = [parseInt(tokenId, 10)];
  const totalAccumulated = useClaimableNFTL(readContracts, tokenIndices);
  const amountParsed = totalAccumulated
    ? formatNumberToDisplay(totalAccumulated)
    : 0;
  return (
    <Typography
      sx={{ textAlign: 'center' }}
    >{`${amountParsed} NFTL`}</Typography>
  );
});

const DegenCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<DegenCardProps>>
> = memo(
  ({
    activeRentals,
    background,
    id,
    isDashboardDegen = false,
    isEnabled,
    multiplier,
    name,
    onClickClaim,
    onClickDetail,
    onClickEditName,
    onClickRent,
    onEnableDisable,
    owner,
    price,
    sx,
  }) => {
    const { palette } = useTheme();

    const authToken = window.localStorage.getItem('authentication-token');
    const onClickDownload = async () => {
      if (authToken) {
        try {
          await downloadDegenAsZip(authToken, id);
        } catch (err) {
          toast.error(err.message, { theme: 'dark' });
        }
      }
    };
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
        {id && <DegenImage tokenId={id} />}
        <Stack
          direction="row"
          justifyContent="space-evenly"
          sx={{ m: 1, width: 'auto' }}
        >
          <Chip
            chipcolor="rgb(75, 7, 175)"
            label={`${price} NFTL`}
            sx={chipStyles}
            variant="outlined"
            size="small"
          />
          <Chip
            chipcolor="rgb(75, 7, 175)"
            label={`${activeRentals} Rentals`}
            sx={chipStyles}
            variant="outlined"
            size="small"
          />
          <Chip
            chipcolor="rgb(75, 7, 175)"
            label={`${multiplier}x`}
            sx={chipStyles}
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
            <Typography gutterBottom variant="h3">
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
              variant="body2"
              color={palette.text.secondary}
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
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{ minWidth: '32%' }}
            onClick={onClickRent}
          >
            Rent
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ minWidth: '32%' }}
            onClick={onClickDetail}
          >
            Traits
          </Button>
          {isDashboardDegen && (
            <Button
              onClick={onClickClaim}
              variant="contained"
              fullWidth
              sx={{ minWidth: '32%' }}
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
              variant="body2"
              color={palette.grey[700]}
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                textAlign: 'center',
              }}
              onClick={onEnableDisable}
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
                  fontSize: '12px',
                  pr: '4px',
                }}
              >
                IP
              </Typography>

              <DownloadSolid width="16" height="16" />
            </Box>
            <DegenClaimBal tokenId={id} />
          </Stack>
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
