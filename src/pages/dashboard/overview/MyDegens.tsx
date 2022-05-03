/* eslint-disable no-nested-ternary */
import { Box, Button, Grid, Dialog } from '@mui/material';
import DegenCard from 'components/cards/DegenCard';
import SectionSlider from 'components/sections/SectionSlider';
import { useContext, useMemo, useState } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { useNavigate } from 'react-router-dom';
import { Owner } from 'types/graph';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../../constants';
import useFetch from 'hooks/useFetch';
import { Degen } from 'types/degens';
import { DEGEN_BASE_API_URL } from 'constants/url';
import { useQuery } from '@apollo/client';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import { v4 as uuidv4 } from 'uuid';
import EmptyState from 'components/EmptyState';
import DegenDialog from 'components/dialog/DegenDialog';
import RenameDegenDialogContent from 'pages/dashboard/degens/dialogs/RenamDegenDialogContent';
import EnableDisableDegenDialogContent from 'pages/dashboard/degens/dialogs/EnableDegenDialogContent';

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
  const [isEnableDisableDegenModalOpen, setIsEnableDisableDegenModalOpen] =
    useState<boolean>(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [isClaimDialog, setIsClaimDialog] = useState<boolean>(false);
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
    responsive: [
      {
        breakpoint: 1500,
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

  const handleEnableDisable = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsEnableDisableDegenModalOpen(true);
  };

  const handleClickEditName = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsRenameDegenModalOpen(true);
  };

  const handleViewTraits = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsClaimDialog(false);
    setIsDegenModalOpen(true);
  };

  const handleClaimDegen = (degen: Degen): void => {
    setSelectedDegen(degen);
    setIsClaimDialog(true);
    setIsDegenModalOpen(true);
  };

  return (
    <>
      <SectionSlider
        firstSection
        title="My Degens"
        sliderSettingsOverride={settings}
        actions={
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard/degens')}
          >
            View All Degens
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
                id={degen.id}
                name={degen.name}
                isDashboardDegen
                multiplier={degen.multiplier}
                owner={degen.owner}
                price={degen.price}
                background={degen.background}
                activeRentals={degen.rental_count}
                onClickDetail={() => handleViewTraits(degen)}
                onClickEditName={() => handleClickEditName(degen)}
                onClickClaim={() => handleClaimDegen(degen)}
                onEnableDisable={() => handleEnableDisable(degen)}
              />
            </Box>
          ))
        ) : (
          <EmptyState
            message="No Degens found. Please check your address or go purchase a degen if you have not done so already!"
            buttonText="Buy a Degen"
            onClick={handleBuyDegen}
          />
        )}
      </SectionSlider>
      <DegenDialog
        open={isDegenModalOpen}
        degen={selectedDegen}
        isClaim={isClaimDialog}
        setIsClaim={setIsClaimDialog}
        onClose={() => setIsDegenModalOpen(false)}
      />
      <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameDegenDialogContent degen={selectedDegen} />
      </Dialog>
      <Dialog
        open={isEnableDisableDegenModalOpen}
        onClose={() => setIsEnableDisableDegenModalOpen(false)}
      >
        <EnableDisableDegenDialogContent
          degen={selectedDegen}
          isEnabled={selectedDegen?.is_active}
        />
      </Dialog>
    </>
  );
};

export default MyDegens;
