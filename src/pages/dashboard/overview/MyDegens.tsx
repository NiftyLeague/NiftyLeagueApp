/* eslint-disable no-nested-ternary */
import { Box, Button, Grid } from '@mui/material';
import DegenCard from 'components/cards/DegenCard';
import SectionSlider from 'components/sections/SectionSlider';
import { useContext, useMemo } from 'react';
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

  return (
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
              multiplier={degen.multiplier}
              owner={degen.owner}
              price={degen.price}
              background={degen.background}
              activeRentals={degen.rental_count}
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
  );
};

export default MyDegens;
