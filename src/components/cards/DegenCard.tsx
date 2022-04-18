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
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ display: 'flex', flexWrap: 'wrap', mb: 1 }}
        >
          <Chip
            chipcolor="error"
            label={`${price} NFTL/ 1 week`}
            sx={{
              color: 'white',
              borderRadius: 1,
              m: 0.5,
              '&:hover': {
                backgroundColor: 'transparent',
                cursor: 'auto',
              },
            }}
            variant="outlined"
            size="small"
          />
          <Chip
            chipcolor="success"
            label={`${activeRentals} active rentals`}
            sx={{
              color: 'white',
              borderRadius: 1,
              m: 0.5,
              '&:hover': {
                backgroundColor: 'transparent',
                cursor: 'auto',
              },
            }}
            variant="outlined"
            size="small"
          />
          <Chip
            chipcolor="warning"
            label={`${multiplier}x Multiplier`}
            sx={{
              color: 'white',
              borderRadius: 1,
              m: 0.5,
              '&:hover': {
                backgroundColor: 'transparent',
                cursor: 'auto',
              },
            }}
            variant="outlined"
            size="small"
          />
        </Stack>
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
