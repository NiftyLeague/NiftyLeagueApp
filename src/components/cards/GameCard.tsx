import { useTheme } from '@mui/material/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';

export interface GameCardProps {
  title?: string;
  description?: string;
  onlineCounter?: number;
  image?: string;
  isComingSoon?: boolean;
  sx?: SxProps<Theme>;
  onPlayOnDesktopClick?: React.MouseEventHandler<HTMLButtonElement>;
  onPlayOnWebClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  onlineCounter,
  image,
  isComingSoon,
  sx,
  onPlayOnDesktopClick,
  onPlayOnWebClick,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        ...sx,
      }}
    >
      <CardMedia component="img" height="200" image={image} alt={title} />
      <Stack justifyContent="space-between" flexGrow={1}>
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
            <Stack
              direction="row"
              flexWrap="wrap"
              columnGap={1}
              rowGap={2}
              width="100%"
            >
              <Button
                variant="contained"
                sx={{ minWidth: 138, flex: 1 }}
                onClick={onPlayOnDesktopClick}
              >
                Play on Desktop
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{ minWidth: 138, flex: 1 }}
                onClick={onPlayOnWebClick}
              >
                Play on Web
              </Button>
            </Stack>
          )}
        </CardActions>
      </Stack>
    </Card>
  );
};

export default GameCard;
