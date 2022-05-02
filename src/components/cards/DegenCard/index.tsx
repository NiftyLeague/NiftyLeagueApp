import {
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import Chip from 'components/extended/Chip';
import EditIcon from '@mui/icons-material/Edit';
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
  },
};

export interface DegenCardProps {
  id: string | number;
  name?: string;
  multiplier?: number;
  activeRentals?: number;
  owner?: string;
  price?: number;
  background?: string;
  isDashboardDegen?: boolean;
  isActive?: boolean;
  sx?: SxProps<Theme>;
  onEnableDisable?: React.MouseEventHandler<HTMLDivElement>;
  onClickEditName?: React.MouseEventHandler<SVGSVGElement>;
  onClickRent?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDetail?: React.MouseEventHandler<HTMLButtonElement>;
}

const DegenCard: React.FC<DegenCardProps> = ({
  id,
  name,
  multiplier,
  activeRentals,
  owner,
  price,
  background,
  isDashboardDegen = false,
  isActive,
  sx,
  onEnableDisable,
  onClickEditName,
  onClickRent,
  onClickDetail,
}) => {
  const { palette } = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        border: `1px solid ${palette.grey[800]}`,
        backgroundColor: palette.background.default,
        ...sx,
      }}
    >
      <DegenImage tokenId={id} />
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
            {name || 'No Name Degen'}
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
        <Stack direction="row" justifyContent="center" sx={{ pt: 2 }}>
          {isDashboardDegen && (
            <Link
              href="#"
              target="_blank"
              rel="nofollow"
              variant="body2"
              color={palette.error.main}
            >
              {`${id} NFTL Available`}
            </Link>
          )}
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
        {isDashboardDegen ? (
          <Button variant="contained" fullWidth sx={{ minWidth: '48%' }}>
            Claim MyNFTL
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            sx={{ minWidth: '48%' }}
            onClick={onClickRent}
          >
            Rent Now
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ minWidth: '48%' }}
          onClick={onClickDetail}
        >
          View Traits
        </Button>
      </Box>
      <Stack direction="row" justifyContent="center" sx={{ pb: 2 }}>
        {isDashboardDegen && (
          <Typography
            variant="body2"
            color={palette.grey[700]}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={onEnableDisable}
          >
            {isActive ? 'Disable' : 'Enable'} Rentals
          </Typography>
        )}
      </Stack>
    </Card>
  );
};

export default DegenCard;
