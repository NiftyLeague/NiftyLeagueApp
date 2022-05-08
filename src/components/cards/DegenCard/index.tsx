import { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Skeleton,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import Chip from 'components/extended/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { useInView } from 'react-intersection-observer';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NetworkContext } from 'NetworkProvider';
import DegenImage from './DegenImage';

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
  checkInView?: boolean;
  id: string | number;
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

const DegenClaimBal = ({ tokenId }) => {
  const { readContracts } = useContext(NetworkContext);
  const tokenIndices = [parseInt(tokenId, 10)];
  const totalAccumulated = useClaimableNFTL(readContracts, tokenIndices);
  const amountParsed = totalAccumulated
    ? totalAccumulated.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : 0;
  return <>{`${amountParsed} NFTL Available`}</>;
};

const DegenCard: React.FC<DegenCardProps> = ({
  activeRentals,
  background,
  checkInView = false,
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
  const { ref, inView } = useInView();

  return (
    <Card
      ref={ref}
      sx={{
        width: '100%',
        height: '100%',
        border: `1px solid ${palette.grey[800]}`,
        backgroundColor: palette.background.default,
        ...sx,
      }}
    >
      {!checkInView || inView ? (
        <DegenImage tokenId={id} />
      ) : (
        <Skeleton variant="rectangular" height={320} />
      )}
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
      <CardContent sx={{ pb: 0, pt: 1 }}>
        <Stack
          direction="row"
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
        </Stack>
        <Stack direction="row" justifyContent="space-between">
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
            {`Degen #${id}`}
          </Link>
          <Link
            href={owner ? `https://opensea.io/${owner}/niftydegen` : '#'}
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.text.secondary}
          >
            {`Owned by ${owner?.substring(0, 5)}`}
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ py: 2 }}>
          {isDashboardDegen && <DegenClaimBal tokenId={id} />}
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
      </Box>
      <Stack direction="row" justifyContent="center" sx={{ py: 2 }}>
        {isDashboardDegen && (
          <Typography
            variant="body2"
            color={palette.grey[700]}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={onEnableDisable}
          >
            {isEnabled ? 'Disable' : 'Enable'} Rentals
          </Typography>
        )}
      </Stack>
    </Card>
  );
};

export default DegenCard;
