import { useEffect, useState } from 'react';
import { Grid, Button, Box, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import { DegenCardInView as DegenCard } from 'components/cards/DegenCard';
import SectionSlider from 'components/sections/SectionSlider';
import { Degen } from 'types/degens';
import { DEGEN_BASE_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import { v4 as uuidv4 } from 'uuid';
import GameList from 'pages/games/GameList';
import DegenDialog from 'components/dialog/DegenDialog';
import RenameDegenDialogContent from 'pages/dashboard/degens/dialogs/RenamDegenDialogContent';
import { sendEvent } from 'utils/google-analytics';
import { GOOGLE_ANALYTICS } from 'constants/google-analytics';

const NiftyLeagueAppPage = () => {
  const [degens, setDegens] = useState<Degen[]>([]);
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [isRentDialog, setIsRentDialog] = useState<boolean>(false);

  const { data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );
  useEffect(() => {
    if (data) {
      const degensArray = Object.values(data);
      const sortDegens = degensArray
        .filter((degen) => degen.rental_count > 0)
        .sort((degenA, degenB) => degenB.rental_count - degenA.rental_count)
        .slice(0, 100);
      setDegens(sortDegens);
    }
    return () => {
      setDegens([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClickEditName = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRenameDegenModalOpen(true);
  };

  const handleViewTraits = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRentDialog(false);
    setIsDegenModalOpen(true);
  };

  const handleRentDegen = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRentDialog(true);
    setIsDegenModalOpen(true);
  };

  const handleViewAllTraits = (event: React.MouseEvent<HTMLAnchorElement>) => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.VIEW_ITEM_LIST,
      GOOGLE_ANALYTICS.CATEGORIES.ENGAGEMENT,
    );
  };

  const settings = {
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <SectionSlider
        firstSection
        title="Games"
        isSlider={false}
        actions={
          <Box
            sx={{
              '& a': {
                textDecoration: 'none',
              },
            }}
          >
            <Link to="/games">
              <Button variant="outlined">View All Games</Button>
            </Link>
          </Box>
        }
      >
        <Grid container flexDirection="row" flexWrap="wrap" rowSpacing={4}>
          <GameList />
        </Grid>
      </SectionSlider>
      <SectionSlider
        title="Popular Degen Rentals"
        actions={
          <Box
            sx={{
              '& a': {
                textDecoration: 'none',
              },
            }}
          >
            <Link to="/all-degens" onClick={handleViewAllTraits}>
              <Button variant="outlined">View All Rentals</Button>
            </Link>
          </Box>
        }
        sliderSettingsOverride={settings}
      >
        {!degens.length
          ? [...Array(4)].map(() => (
              <Box paddingRight={2} key={uuidv4()}>
                <SkeletonDegenPlaceholder />
              </Box>
            ))
          : degens.map((degen) => (
              <Box paddingRight={2} key={degen.id}>
                <DegenCard
                  degen={degen}
                  onClickDetail={() => handleViewTraits(degen)}
                  onClickEditName={() => handleClickEditName(degen)}
                  onClickRent={() => handleRentDegen(degen)}
                />
              </Box>
            ))}
      </SectionSlider>
      <DegenDialog
        open={isDegenModalOpen}
        degen={selectedDegen}
        isRent={isRentDialog}
        setIsRent={setIsRentDialog}
        onClose={() => setIsDegenModalOpen(false)}
      />
      <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameDegenDialogContent degen={selectedDegen} />
      </Dialog>
    </>
  );
};

export default NiftyLeagueAppPage;
