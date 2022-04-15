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
      <CardContent sx={{ paddingBottom: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h3">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{
              color: theme.palette.warning.main,
            }}
          >
            {`${multiplier}x Multiplier`}
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
            sx={{ textDecoration: 'underline' }}
          >
            {`Degen #${id}`}
          </Link>
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
          <Link
            href="#"
            target="_blank"
            rel="nofollow"
            variant="body2"
            color={theme.palette.text.secondary}
            // underline props is not working
            sx={{ textDecoration: 'underline' }}
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
          variant="contained"
          color="secondary"
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
