/* eslint-disable no-nested-ternary */
import { Box, Button, Grid, Dialog, Stack } from '@mui/material';
import { DegenCardInView as DegenCard } from 'components/cards/DegenCardV3';
import SectionSlider from 'components/sections/SectionSlider';
import { useContext, useMemo, useState } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { useNavigate } from 'react-router-dom';
import { Owner } from 'types/graph';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../../constants';
import useFetch from 'hooks/useFetch';
import { Degen, DegenViewType } from 'types/degens';
import { DEGEN_BASE_API_URL } from 'constants/url';
import { useQuery } from '@apollo/client';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import { v4 as uuidv4 } from 'uuid';
import EmptyState from 'components/EmptyState';
import DegenDialog from 'components/dialog/DegenDialogV3';
import RenameDegenDialogContent from 'pages/dashboard/degens/dialogs/RenamDegenDialogContent';

const BoxDegenStyles = {
  px: 1,
  '& .MuiCardContent-root': {
    p: '12px',
  },
  '& .MuiTypography-h3': {
    fontSize: '16px',
  },
  '& .MuiCardActions-root': {
    p: '12px',
  },
};

const MyDegens = (): JSX.Element => {
  const { address } = useContext(NetworkContext);
  const [selectedDegen, setSelectedDegen] = useState<Degen>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] =
    useState<boolean>(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [degenDialogView, setDegenDialogView] =
    useState<DegenViewType>('default');
  const navigate = useNavigate();

  const {
    loading,
    data: userDegens,
  }: { loading: boolean; data?: { owner: Owner } } = useQuery(OWNER_QUERY, {
    pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });

  const { data: degensData } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const characters = useMemo(() => {
    const characterList = userDegens?.owner?.characters
      ? [...userDegens.owner.characters]
      : [];
    return characterList.sort(
      (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
    );
  }, [userDegens]);

  const degens = useMemo(() => {
    if (characters.length && degensData) {
      const mapDegens = characters.map((character) => degensData[character.id]);
      return mapDegens;
    }
    return [];
  }, [characters, degensData]);

  const settings = {
    slidesToShow: 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
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

  const handleBuyDegen = () => {
    window.open('https://opensea.io/collection/niftydegen', '_blank');
  };

  const handleClickEditName = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRenameDegenModalOpen(true);
  };

  const handleViewTraits = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsDegenModalOpen(true);
    setDegenDialogView('traits');
  };

  const handleClaimDegen = (degen: Degen): void => {
    setSelectedDegen(degen);
    // setIsClaimDialog(true);
    // setIsRentDialog(false);
    setIsDegenModalOpen(true);
  };

  const handleRentDegen = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsDegenModalOpen(true);
    setDegenDialogView('rent');
  };

  return (
    <>
      <SectionSlider
        isSlider={degens.length > 0 && characters.length > 0}
        firstSection
        title="My DEGENs"
        sliderSettingsOverride={settings}
        actions={
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard/degens')}
          >
            View All DEGENs
          </Button>
        }
      >
        {loading ? (
          [...Array(8)].map(() => (
            <Grid item xs={12} sm={11} md={11} lg={11} xl={11} key={uuidv4()}>
              <SkeletonDegenPlaceholder />
            </Grid>
          ))
        ) : degens.length && characters.length ? (
          degens.map((degen) => (
            <Box sx={BoxDegenStyles} key={degen.id}>
              <DegenCard
                degen={degen}
                isDashboardDegen
                isEnabled={degen.is_active}
                onEditName={() => handleClickEditName(degen)}
                onClaim={() => handleClaimDegen(degen)}
                onOpenRentDialog={() => handleRentDegen(degen)}
                onOpenTraitsDialog={() => handleViewTraits(degen)}
              />
            </Box>
          ))
        ) : (
          <Stack justifyContent="center" alignItems="center">
            <EmptyState
              message="No DEGENs found. Please check your address or go purchase a DEGEN if you have not done so already!"
              buttonText="Buy a DEGEN"
              onClick={handleBuyDegen}
            />
          </Stack>
        )}
      </SectionSlider>
      <DegenDialog
        open={isDegenModalOpen}
        degen={selectedDegen}
        view={degenDialogView}
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

export default MyDegens;
