import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
  Theme,
  SxProps,
} from '@mui/material';
import { Comic } from 'types/comic';

export interface ComicCardProps {
  comic: Comic;
  sx?: SxProps<Theme>;
  onViewComic?: React.MouseEventHandler<HTMLButtonElement>;
  onBurnComic?: React.MouseEventHandler<HTMLButtonElement>;
}

const ComicCard: React.FC<ComicCardProps> = ({
  comic,
  onViewComic,
  onBurnComic,
  sx,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        border: `1px solid ${theme.palette.grey[800]}`,
        backgroundColor: theme.palette.background.default,
        ...sx,
      }}
    >
      <CardMedia
        component="img"
        height="auto"
        image={comic.image}
        alt={comic.title}
      />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h3" component="div">
            {`${comic.title} #${comic.id}`}
          </Typography>
          {/* <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              color: theme.palette.warning.main,
            }}
          >
            {`${comic.multiplier}x Multiplier`}
          </Typography> */}
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">{comic.wearableName}</Typography>
          {/* <Typography
            variant="body2"
            sx={{ color: theme.palette.success.main }}
          >
            {comic.viewsCount}
          </Typography> */}
          {comic.balance ? (
            <Typography
              variant="body2"
              sx={{ color: theme.palette.success.main }}
            >
              Owned: {comic.balance}
            </Typography>
          ) : null}
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth onClick={onViewComic}>
          View Comic
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onBurnComic}
          disabled
        >
          Burn Comic
        </Button>
      </CardActions>
    </Card>
  );
};

export default ComicCard;
