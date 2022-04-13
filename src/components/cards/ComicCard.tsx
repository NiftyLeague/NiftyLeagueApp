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

export interface ComicCardProps {
  id?: number;
  title?: string;
  multiplier?: number;
  wearableName?: string;
  image?: string;
  onViewComic?: React.MouseEventHandler<HTMLButtonElement>;
  onBurnComic?: React.MouseEventHandler<HTMLButtonElement>;
}

const ComicCard: React.FC<ComicCardProps> = ({
  id,
  title,
  multiplier,
  wearableName,
  image,
  onViewComic,
  onBurnComic,
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h3" component="div">
            {`${title} #${id}`}
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
          <Typography variant="body2">Wearable Name</Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.success.main }}
          >
            {wearableName}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth>
          View Comic
        </Button>
        <Button variant="contained" color="secondary" fullWidth>
          Burn Comic
        </Button>
      </CardActions>
    </Card>
  );
};

export default ComicCard;
