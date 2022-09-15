import { useState } from 'react';
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

const CardGameContent = ({
  title,
  isComingSoon,
  required,
  description,
  actions,
  onPlayOnDesktopClick,
  onPlayOnWebClick,
  showMore,
}) => {
  const theme = useTheme();
  const [moreStatus, setMoreStatus] = useState(false);
  const handleMoreStatus = () => {
    setMoreStatus(!moreStatus);
  };

  return (
    <Stack justifyContent="space-between" flexGrow={1}>
      <CardContent
        sx={{
          padding: '24px 24px 0',
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h3" component="div">
            {title}
          </Typography>
        </Stack>
        {isComingSoon && (
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              color: theme.palette.warning.main,
            }}
          >
            coming 2023
          </Typography>
        )}
        {required && (
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              color: theme.palette.warning.main,
            }}
          >
            {required}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          whiteSpace="pre-wrap"
          maxHeight={moreStatus ? 'inherit' : 42}
          sx={{ overflowY: 'hidden' }}
        >
          {description}
        </Typography>
        {showMore && !moreStatus && (
          <Typography
            variant="body2"
            color="#620edf"
            whiteSpace="pre-wrap"
            onClick={handleMoreStatus}
            sx={{ cursor: 'pointer' }}
          >
            more..
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          flexWrap="wrap"
          columnGap={1}
          rowGap={2}
          width="100%"
        >
          {actions || (
            <>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  minWidth: 80,
                  flex: 1,
                }}
                onClick={onPlayOnDesktopClick}
              >
                Play on Desktop
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{
                  minWidth: 80,
                  flex: 1,
                }}
                onClick={onPlayOnWebClick}
              >
                Play on Web
              </Button>
            </>
          )}
        </Stack>
      </CardActions>
    </Stack>
  );
};

export interface GameCardProps {
  title?: string;
  required?: string;
  description?: string;
  onlineCounter?: number;
  image?: string;
  isComingSoon?: boolean;
  sx?: SxProps<Theme>;
  onPlayOnDesktopClick?: React.MouseEventHandler<HTMLButtonElement>;
  onPlayOnWebClick?: React.MouseEventHandler<HTMLButtonElement>;
  actions?: React.ReactNode;
  contents?: React.ReactNode;
  showMore?: boolean;
  autoHeight?: boolean;
}

const GameCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<GameCardProps>>
> = ({
  title,
  required,
  description,
  onlineCounter,
  image,
  isComingSoon,
  sx,
  onPlayOnDesktopClick,
  onPlayOnWebClick,
  actions,
  contents,
  showMore = false,
  autoHeight = false,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: autoHeight ? 'auto' : '100%',
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.grey[800]}`,
        ...sx,
      }}
    >
      <CardMedia component="img" height="auto" image={image} alt={title} />
      {contents || (
        <CardGameContent
          title={title}
          required={required}
          isComingSoon={isComingSoon}
          description={description}
          actions={actions}
          onPlayOnDesktopClick={onPlayOnDesktopClick}
          onPlayOnWebClick={onPlayOnWebClick}
          showMore={showMore}
        />
      )}
    </Card>
  );
};

export default GameCard;
