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

export interface ComicCardProps {
  id?: number;
  title?: string;
  multiplier?: number;
  wearableName?: string;
  image?: string;
  sx?: SxProps<Theme>;
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
        <Button variant="contained" fullWidth onClick={onViewComic}>
          View Comic
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={onBurnComic}
        >
          Burn Comic
        </Button>
      </CardActions>
    </Card>
  );
};

export default ComicCard;
