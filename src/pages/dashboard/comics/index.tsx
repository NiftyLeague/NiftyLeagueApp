import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Stack, Button } from '@mui/material';

import ComicCard from 'components/cards/ComicCard';
import EmptyState from 'components/EmptyState';
import ViewComicDialog from 'components/dialog/ViewComicDialog';
import ComicsClaim from 'components/extended/ComicsClaim';
import SectionSlider from 'components/sections/SectionSlider';
import ComicPlaceholder from 'components/cards/Skeleton/ComicPlaceholder';

import { ITEMS, COMICS } from 'constants/comics';
import { cardSpacing } from 'store/constant';
import { Comic } from 'types/comic';
import useComicsBalance from 'hooks/useComicsBalance';

const DashboardComicsPage = (): JSX.Element => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const { comicsBalance } = useComicsBalance();
  const filteredComics = useMemo(
    () => comicsBalance.filter((comic) => comic.balance && comic.balance > 0),
    [comicsBalance],
  );
  const handleViewComic = useCallback(
    (comic: Comic) => setSelectedComic(comic),
    [],
  );

  const handleCloseDialog = useCallback(() => {
    setSelectedComic(null);
  }, []);

  const renderComics = useMemo(() => {
    return filteredComics.map((comic) => (
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={uuidv4()}>
        <ComicCard data={comic} onViewComic={() => handleViewComic(comic)} />
      </Grid>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredComics]);

  const renderItems = useMemo(() => {
    return ITEMS.map((item) => (
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={uuidv4()}>
        <ComicCard
          data={item}
          isItem
          actions={
            <>
              <Button variant="contained" fullWidth disabled>
                Equip Item
              </Button>
              <Button variant="contained" fullWidth disabled>
                Unequip Item
              </Button>
            </>
          }
        />
      </Grid>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ITEMS]);

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
      <Stack gap={4}>
        <SectionSlider firstSection title="My Comics" isSlider={false}>
          <Grid container direction="row" flexWrap="wrap" spacing={cardSpacing}>
            {filteredComics.length === 0 &&
              [...Array(4)].map(() => (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={uuidv4()}>
                  <ComicPlaceholder />
                </Grid>
              ))}
            {filteredComics.length > 0 && renderComics}
          </Grid>
        </SectionSlider>
        <SectionSlider firstSection title="My Items" isSlider={false}>
          <Grid container direction="row" flexWrap="wrap" spacing={cardSpacing}>
            {renderItems}
          </Grid>
        </SectionSlider>
      </Stack>
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
