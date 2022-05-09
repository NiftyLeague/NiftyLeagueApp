import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import COMICS from 'constants/comics';
import ComicCard from 'components/cards/ComicCard';
import EmptyState from 'components/EmptyState';
import { cardSpacing } from 'store/constant';
import { Comic } from 'types/comic';
import { useMemo, useState } from 'react';
import ViewComicDialog from 'components/dialog/ViewComicDialog';
import ComicsClaim from 'components/extended/ComicsClaim';
import useComicsBalance from 'hooks/useComicsBalance';

const DashboardComicsPage = (): JSX.Element => {
  const theme = useTheme();
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const { comicsBalance } = useComicsBalance();
  const filteredComics = useMemo(
    () => comicsBalance.filter((comic) => comic.balance && comic.balance > 0),
    [comicsBalance],
  );
  const handleViewComic = (comic: Comic) => {
    setSelectedComic(comic);
  };

  const handleCloseDialog = () => {
    setSelectedComic(null);
  };

  if (!COMICS.length)
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
            {filteredComics.map((comic) => (
              <Grid key={comic.id} item xs={12} sm={6} md={6} lg={6} xl={4}>
                <ComicCard
                  comic={comic}
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
            Burn Animation Area
          </Box>
        </Grid>
      </Grid>
      <ComicsClaim />
      <ViewComicDialog
        comic={selectedComic}
        open={Boolean(selectedComic)}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default DashboardComicsPage;
