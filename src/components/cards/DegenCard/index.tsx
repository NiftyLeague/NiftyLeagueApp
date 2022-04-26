import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
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
  sx?: SxProps<Theme>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
  sx,
  onClick,
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
      onClick={onClick}
    >
      <DegenImage tokenId={id} />
      <Stack
        direction="row"
        justifyContent="space-evenly"
        sx={{ m: 1, width: 'auto' }}
      >
        <Chip
          chipcolor="error"
          label={`${price} NFTL`}
          sx={chipStyles}
          variant="outlined"
          size="small"
        />
        <Chip
          chipcolor="success"
          label={`${activeRentals} {Rentals}`}
          sx={chipStyles}
          variant="outlined"
          size="small"
        />
        <Chip
          chipcolor="warning"
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
          {name && (
            <EditIcon
              sx={{ cursor: 'pointer', display: 'none' }}
              onClick={onClickEditName}
              fontSize="small"
            />
          )}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.text.secondary}
            sx={{ textDecoration: 'none' }}
          >
            {`Degen #${id}`}
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.text.secondary}
            sx={{ textDecoration: 'none' }}
          >
            {`Owned by ${owner?.substring(0, 5)}`}
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.error.main}
            sx={{ textDecoration: 'none' }}
          >
            {`${id} NFTL Available`}
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={palette.grey[700]}
          >
            Disable Rentals
          </Link>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth sx={{ minWidth: 80 }}>
          Claim NFTL
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ minWidth: 80 }}
        >
          View Traits
        </Button>
      </CardActions>
    </Card>
  );
};

export default DegenCard;
