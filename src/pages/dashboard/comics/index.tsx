import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Divider,
  Grid,
  Stack,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useFlags } from 'launchdarkly-react-client-sdk';

import ComicCard from 'components/cards/ComicCard';
import ViewComicDialog from 'components/dialog/ViewComicDialog';
import SectionSlider from 'components/sections/SectionSlider';

import { ITEMS } from 'constants/comics';
import { Comic, Item } from 'types/comic';
import useComicsBalance from 'hooks/useComicsBalance';
import { COMIC_PURCHASE_URL } from 'constants/url';
import ComicDetail from 'components/cards/ComicDetail';
import ComicPlaceholder from 'components/cards/Skeleton/ComicPlaceholder';
import BuyComicCard from 'components/cards/BuyComicCard';
import WearableItemCard from 'components/cards/WearableItemCard';
import WearableSubItemCard from 'components/cards/WearableSubItemCard';
import ItemDetail from 'components/cards/ItemDetail';
import ViewItemDialog from 'components/dialog/ViewItemDialog';

const DashboardComicsPage = (): JSX.Element => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState<number>(-1);
  const { comicsBalance, loading: loadingComics } = useComicsBalance();
  const { displayMyItems } = useFlags();
  const navigate = useNavigate();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewComic = (comic: Comic) => {
    setSelectedComic(comic);
  };

  const handleViewItem = (item: Item) => {
    removeSubItemSelection();
    setSelectedItem(item);
  };

  const handleViewSubItem = (index: number) => {
    setSelectedSubIndex(index);
  };

  const removeComicSelection = () => {
    setSelectedComic(null);
  };

  const removeItemSelection = () => {
    setSelectedItem(null);
    removeSubItemSelection();
  };

  const removeSubItemSelection = () => {
    setSelectedSubIndex(-1);
  };

  const handleCloseComicDialog = () => {
    removeComicSelection();
  };

  const handleCloseItemDialog = () => {
    removeItemSelection();
  };

  const handleBuyComic = () => {
    window.open(COMIC_PURCHASE_URL, '_blank');
  };

  const handleLaunchBurner = () => navigate('burner');

  const renderComics = useMemo(() => {
    if (comicsBalance.length === 0 && loadingComics) {
      if (loadingComics) {
        return [...Array(6)].map(() => (
          <Grid item key={uuidv4()}>
            <ComicPlaceholder />
          </Grid>
        ));
      }
    } else if (comicsBalance.length > 0) {
      return comicsBalance.map((comic) => (
        <Grid item key={comic.id}>
          <ComicCard
            data={comic}
            onViewComic={() => handleViewComic(comic)}
            isSelected={comic.id === selectedComic?.id}
          />
        </Grid>
      ));
    }
    return null;
  }, [comicsBalance, loadingComics, selectedComic]);

  const renderItems = useMemo(() => {
    return ITEMS.filter(
      (item) =>
        !selectedItem?.balance ||
        selectedItem?.balance <= 1 ||
        item.id !== selectedItem?.id,
    ).map((item) => (
      <Grid item key={item.id}>
        <WearableItemCard
          data={item}
          onViewItem={() => handleViewItem(item)}
          isSelected={item.id === selectedItem?.id}
        />
      </Grid>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  const renderSubItems = useMemo(() => {
    if (!selectedItem?.balance || selectedItem?.balance <= 1) return null;
    return Array.from(Array(selectedItem?.balance).keys()).map((itemIndex) => (
      <Grid item key={`WearableSubItem-${itemIndex}`}>
        <WearableSubItemCard
          data={selectedItem}
          itemIndex={itemIndex}
          onViewItem={() => handleViewSubItem(itemIndex)}
          isSelected={itemIndex === selectedSubIndex}
          sx={{ height: '100%', justifyContent: 'center' }}
        />
      </Grid>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, selectedSubIndex]);

  return (
    <>
      <Stack gap={4}>
        <Stack direction="row" gap={5}>
          <SectionSlider
            firstSection
            title="My Comics"
            isSlider={false}
            actions={
              <Box>
                <Button
                  variant="contained"
                  sx={{ height: 28 }}
                  onClick={handleLaunchBurner}
                >
                  Launch Comics Burner
                </Button>
              </Box>
            }
          >
            <Stack>
              <Grid
                container
                flexWrap="wrap"
                gap={2}
                minHeight={375}
                border="1px solid #363636"
                borderRadius="5px"
                px={2}
                py={3}
                width="100%"
                justifyContent={{ xs: 'space-between', sm: 'inherit' }}
                onClick={removeComicSelection}
              >
                {renderComics}
                {comicsBalance.length > 0 && (
                  <Grid item>
                    <BuyComicCard
                      onBuyComic={handleBuyComic}
                      isNew={
                        !comicsBalance.some(
                          (comic) => comic.balance && comic.balance > 0,
                        )
                      }
                    />
                  </Grid>
                )}
              </Grid>
            </Stack>
          </SectionSlider>
          {!isTablet && (
            <Stack mt={7.5}>
              <ComicDetail data={selectedComic} />
            </Stack>
          )}
        </Stack>
        {displayMyItems && (
          <Stack direction="row" gap={5}>
            <SectionSlider firstSection title="My Wearables" isSlider={false}>
              <Stack>
                <Stack
                  minHeight={375}
                  border="1px solid #363636"
                  borderRadius="5px"
                  px={2}
                  pt={4}
                  pb={2}
                  width="100%"
                  spacing={3}
                  onClick={removeItemSelection}
                >
                  {selectedItem?.balance && selectedItem?.balance > 1 && (
                    <Stack spacing={4}>
                      <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        spacing={{ xs: 2, lg: 10 }}
                      >
                        <WearableItemCard data={selectedItem} />
                        <Grid container flexWrap="wrap" gap={2.5}>
                          {renderSubItems}
                        </Grid>
                      </Stack>
                      <Divider color="#363636" />
                    </Stack>
                  )}
                  <Grid
                    container
                    flexWrap="wrap"
                    gap={2}
                    justifyContent={{ xs: 'space-between', sm: 'inherit' }}
                  >
                    {renderItems}
                  </Grid>
                </Stack>
              </Stack>
            </SectionSlider>
            {!isTablet && (
              <Stack mt={7.5}>
                <ItemDetail data={selectedItem} subIndex={selectedSubIndex} />
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
      {isTablet && (
        <ViewComicDialog
          comic={selectedComic}
          open={Boolean(selectedComic)}
          onClose={handleCloseComicDialog}
        />
      )}
      {isTablet && (
        <ViewItemDialog
          item={selectedItem}
          subIndex={selectedSubIndex}
          open={
            Boolean(selectedItem) &&
            !!selectedItem?.balance &&
            (selectedItem?.balance === 1 || selectedSubIndex >= 0)
          }
          onClose={handleCloseItemDialog}
        />
      )}
    </>
  );
};

export default DashboardComicsPage;
