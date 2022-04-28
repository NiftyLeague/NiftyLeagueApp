import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  useMediaQuery,
  DialogActions,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import comics from 'constants/comics';
import ComicCard from 'components/cards/ComicCard';
import EmptyState from 'components/EmptyState';
import { cardSpacing } from 'store/constant';
import { Comic } from 'types/comic';
import { useState } from 'react';

const DashboardComicsPage = (): JSX.Element => {
  const theme = useTheme();
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewComic = (comic: Comic) => {
    setSelectedComic(comic);
  };

  const handleCloseDialog = () => {
    setSelectedComic(null);
  };

  if (!comics.length)
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        display="flex"
        height="100%"
      >
        <EmptyState
          message="You don't own any Comics yet."
          buttonText="Buy a Comic"
        />
      </Grid>
    );

  return (
    <>
      <Grid container spacing={cardSpacing}>
        <Grid item md={8} xs={12}>
          <Grid
            container
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            spacing={cardSpacing}
          >
            {comics.map((comic) => (
              <Grid key={comic.id} item xs={12} sm={6} md={6} lg={6} xl={4}>
                <ComicCard
                  {...comic}
                  onViewComic={() => handleViewComic(comic)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{
              width: '100%',
              height: '100%',
              background: theme.palette.primary.light,
            }}
          >
            Burn Animation area?
          </Box>
        </Grid>
      </Grid>
      <Dialog
        maxWidth="lg"
        open={Boolean(selectedComic)}
        onClose={handleCloseDialog}
        fullScreen={fullScreen}
      >
        <DialogContent>
          <img
            src={selectedComic?.image}
            alt={selectedComic?.title}
            style={{
              width: fullScreen ? '100%' : 500,
              height: 'auto',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardComicsPage;
