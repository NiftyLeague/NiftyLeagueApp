import { useTheme } from '@mui/material/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';

export interface DegenCardProps {
  id?: number;
  title?: string;
  multiplier?: number;
  activeRentals?: number;
  ownerId?: string;
  price?: number;
  image?: string;
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
  onClickRent,
  onClickDetail,
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h3" component="div">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              color: theme.palette.warning.main,
            }}
          >
            {`${multiplier}x Multiplier`}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{`Degen #${id}`}</Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.success.main }}
          >
            {`${activeRentals} active rentals`}
          </Typography>
        </Stack>
        <Stack mt={0.5} direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: theme.palette.error.main }}>
            {`${price} NFTL/ 1 week`}
          </Typography>
          <Typography variant="body2">{`Owned by ${ownerId}`}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth>
          Rent Degen
        </Button>
        <Button variant="contained" color="secondary" fullWidth>
          View Traits
        </Button>
      </CardActions>
    </Card>
  );
};

export default DegenCard;
