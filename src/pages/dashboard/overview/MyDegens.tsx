import { Box, Button } from '@mui/material';
import DegenCard from 'components/cards/DegenCard';
import dummyData from 'constants/degens';
import SectionSlider from 'components/sections/SectionSlider';
import { useContext, useMemo } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { Owner } from 'types/graph';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../../constants';
import useFetch from 'hooks/useFetch';
import { Degen } from 'types/degens';
import {
  DEGEN_BASE_API_URL,
  MY_PROFILE_API_URL,
  MY_RENTAL_API_URL,
} from 'constants/url';
import { useQuery } from '@apollo/client';
import { Rentals } from 'types/rentals';

interface MyDegensProps {
  onViewAllDegens?: React.MouseEventHandler<HTMLButtonElement>;
}

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

const MyDegens = ({ onViewAllDegens }: MyDegensProps): JSX.Element => {
  const authToken = window.localStorage.getItem('authentication-token');
  const { address } = useContext(NetworkContext);

  let headers;
  if (authToken) {
    headers = {
      authorizationToken: authToken,
    };
  }

  const { data: userDegens }: { loading: boolean; data?: { owner: Owner } } =
    useQuery(OWNER_QUERY, {
      pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
      variables: { address: address?.toLowerCase() },
      skip: !address,
    });

  const { data: userRentals } = useFetch<Rentals[]>(MY_RENTAL_API_URL, {
    headers,
  });

  const { data: degensData } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );

  const { data: profile } = useFetch(MY_PROFILE_API_URL, { headers });

  const degens = useMemo(() => {
    console.log('test');
    if (userRentals && userRentals.length) {
      const mapDegens = userRentals.map((rental) => {
        console.log(degensData?.[rental.degen_id]);
        return degensData?.[rental.degen_id];
      });

      return mapDegens;
    }
    return [];
  }, [userRentals, degensData]);

  // useEffect(() => {
  //   if (userRentals?.length) {
  //     const degens = characters.map((character) => {
  //       const degen = degensData?.[character.id];
  //       return degen;
  //     });
  //     setOwnedDegens(degens);
  //   }
  // }, [userRentals, degensData, ownedDegens]);
  console.log({ userDegens, userRentals, degens, profile });
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

  return (
    <SectionSlider
      firstSection
      title="My Degens"
      sliderSettingsOverride={settings}
      actions={
        <Button variant="outlined" onClick={onViewAllDegens}>
          View All Degens
        </Button>
      }
    >
      {dummyData.map((degen) => (
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
      ))}
    </SectionSlider>
  );
};

export default MyDegens;
