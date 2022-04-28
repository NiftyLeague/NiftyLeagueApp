import { useEffect, useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { cardSpacing } from 'store/constant';
import DegenCard from 'components/cards/DegenCard';
import SectionSlider from 'components/sections/SectionSlider';
import { Degen } from 'types/degens';
import { DEGEN_BASE_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';
import { v4 as uuidv4 } from 'uuid';
import GameList from 'pages/games/GameList';

const NiftyLeagueAppPage = () => {
  const [degens, setDegens] = useState<Degen[]>([]);
  const { data } = useFetch<Degen[]>(
    `${DEGEN_BASE_API_URL}/cache/rentals/rentables.json`,
  );
  useEffect(() => {
    if (data) {
      const degensArray = Object.values(data);
      const sortDegens = degensArray
        .filter((degen) => degen.rental_count > 0)
        .sort((degenA, degenB) => degenB.rental_count - degenA.rental_count);
      setDegens(sortDegens);
    }
    return () => {
      setDegens([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        <Grid
          container
          flexDirection="row"
          flexWrap="wrap"
          spacing={cardSpacing}
        >
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
            <Link to="/degen-rentals">
              <Button variant="outlined">View All Rentals</Button>
            </Link>
          </Box>
        }
      >
        {!data
          ? [...Array(4)].map(() => (
              <Box paddingRight={2} key={uuidv4()}>
                <SkeletonDegenPlaceholder />
              </Box>
            ))
          : degens.map((degen) => (
              <Box paddingRight={2} key={degen.id}>
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
    </>
  );
};

export default NiftyLeagueAppPage;
