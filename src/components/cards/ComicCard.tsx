import React from 'react';
import {
  Button,
  Card,
  CardMedia,
  Stack,
  Typography,
  useTheme,
  Theme,
  SxProps,
} from '@mui/material';
import useImageOnLoad from 'hooks/useImageOnLoad';
import { Comic, Item } from 'types/comic';

export interface ComicCardProps {
  data: Comic | Item;
  sx?: SxProps<Theme>;
  actions?: React.ReactNode;
  isItem?: boolean;
  onViewComic?: React.MouseEventHandler<HTMLButtonElement>;
  onBurnComic?: React.MouseEventHandler<HTMLButtonElement>;
}

const ComicCard: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<ComicCardProps>>
> = ({ data, onViewComic, onBurnComic, sx, actions, isItem = false }) => {
  const { image, title, balance, id, wearableName, thumbnail } = data;
  const theme = useTheme();
  const { handleImageOnLoad, css } = useImageOnLoad();

  const getActionsDefault = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <Card
      sx={{
        maxWidth: '425px',
        border: `1px solid ${theme.palette.grey[800]}`,
        backgroundColor: theme.palette.background.default,
        flexDirection: 'row',
        display: 'flex',
        ...sx,
      }}
    >
      <Stack flex="50%" sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={thumbnail}
          alt={`thumbnail-${title}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `100%`,
            height: `100%`,
            ...css.thumbnail,
          }}
        />
        <CardMedia
          onLoad={handleImageOnLoad}
          component="img"
          image={image}
          alt={title}
          sx={{ height: '100%', ...css.fullSize }}
        />
      </Stack>
      <Stack
        justifyContent="space-between"
        sx={{ width: '100%', padding: '12px' }}
        flex="50%"
      >
        <Stack gap={1}>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3" component="div">
              {`${title} ${!isItem ? `#${id}` : ''}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  balance === 0
                    ? theme.palette.grey[800]
                    : theme.palette.success.main,
              }}
            >
              {balance || 0}x
            </Typography>
          </Stack>
          {wearableName && (
            <Stack justifyContent="flex-start">
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '95%',
                }}
                variant="body2"
              >
                {wearableName}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack gap={1} width="100%">
          {actions || getActionsDefault()}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ComicCard;
