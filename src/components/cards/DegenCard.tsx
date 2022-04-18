import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import Chip from 'components/extended/Chip';

const styledChip = {
  color: 'white',
  borderRadius: 1,
  width: 'fit-content',
  fontSize: 8,
  fontWeight: 'bold',
  m: 0.5,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'auto',
  },
};

export interface DegenCardProps {
  id?: number;
  title?: string;
  multiplier?: number;
  activeRentals?: number;
  ownerId?: string;
  price?: number;
  image?: string;
  sx?: SxProps<Theme>;
  onClickRent?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDetail?: React.MouseEventHandler<HTMLButtonElement>;
}

const DegenCard: React.FC<DegenCardProps> = ({
  id,
  title,
  multiplier,
  activeRentals,
  ownerId,
  price,
  image,
  sx,
  onClickRent,
  onClickDetail,
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 345, ...sx }}>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ display: 'flex', flexWrap: 'wrap', mt: 1, mb: 1 }}
      >
        <Chip
          chipcolor="error"
          label={`${price} NFTL/ 1 week`}
          sx={styledChip}
          variant="outlined"
          size="small"
        />
        <Chip
          chipcolor="success"
          label={`${activeRentals} active rentals`}
          sx={styledChip}
          variant="outlined"
          size="small"
        />
        <Chip
          chipcolor="warning"
          label={`${multiplier}x Multiplier`}
          sx={styledChip}
          variant="outlined"
          size="small"
        />
      </Stack>
      <CardContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h3">
            {title}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={theme.palette.text.secondary}
            // underline props is not working
            sx={{ textDecoration: 'none' }}
          >
            {`Degen #${id}`}
          </Link>
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={theme.palette.text.secondary}
            // underline props is not working
            sx={{ textDecoration: 'none' }}
          >
            {`Owned by #${ownerId}`}
          </Link>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth sx={{ minWidth: 105 }}>
          Rent Degen
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ minWidth: 105 }}
        >
          View Traits
        </Button>
      </CardActions>
    </Card>
  );
};

export default DegenCard;
