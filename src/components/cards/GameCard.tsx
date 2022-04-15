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

export interface GameCardProps {
  title?: string;
  description?: string;
  onlineCounter?: number;
  image?: string;
  isComingSoon?: boolean;
  onPlayOnDesktopClick?: React.MouseEventHandler<HTMLButtonElement>;
  onPlayOnWebClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  onlineCounter,
  image,
  isComingSoon,
  onPlayOnDesktopClick,
  onPlayOnWebClick,
}) => {
  const theme = useTheme();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h3" component="div">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{
              color: isComingSoon
                ? theme.palette.warning.main
                : theme.palette.success.main,
            }}
          >
            {isComingSoon ? 'coming soon' : `${onlineCounter} online`}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {isComingSoon ? (
          <Button variant="contained" fullWidth disabled color="inherit">
            Coming Soon
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              fullWidth
              onClick={onPlayOnDesktopClick}
            >
              Play on Desktop
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={onPlayOnWebClick}
            >
              Play on Web
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default GameCard;
