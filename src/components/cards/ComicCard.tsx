import React from 'react';
import {
  Button,
  Card,
  Stack,
  Typography,
  useTheme,
  Theme,
  SxProps,
} from '@mui/material';
import { Comic, Item } from 'types/comic';
import ImageCard from 'components/cards/ImageCard';

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
        <ImageCard
          image={image}
          thumbnail={thumbnail}
          title={title}
          ratio={1}
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
