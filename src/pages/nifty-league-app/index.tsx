import { useEffect, useState } from 'react';
import { Grid, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import GameCard from 'components/cards/GameCard';
import { cardSpacing } from 'store/constant';
import DegenCard from 'components/cards/DegenCard';
import SectionSlider from 'components/sections/SectionSlider';
import GameWithAuth, { smashersContext } from 'pages/games/GameWithAuth';
import NiftySmashers from 'assets/images/gifs/nifty-smashers.gif';
import { Dialog, DialogTrigger, DialogContent } from 'components/dialog';
import Downloader from 'pages/games/Downloader';
import { Degen } from 'types/degens';
import { DEGEN_BASE_API_URL } from 'constants/url';
import useFetch from 'hooks/useFetch';
import SkeletonDegenPlaceholder from 'components/cards/Skeleton/DegenPlaceholder';

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
          <Grid item sm={12} md={6} lg={4} xl={3}>
            <GameCard
              title="Nifty Smashers"
              description="The first NFT brawler on the Ethereum blockchain!"
              image={NiftySmashers}
              onlineCounter={200}
              actions={
                <>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ minWidth: 80, flex: 1 }}
                      >
                        Play on Desktop
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-labelledby="customized-dialog-title"
                      dialogTitle="Nifty League Desktop"
                    >
                      <Downloader />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{ minWidth: 80, flex: 1 }}
                      >
                        Play on Web
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-labelledby="customized-dialog-title"
                      dialogTitle="Nifty League Web"
                    >
                      <GameWithAuth unityContext={smashersContext} />
                    </DialogContent>
                  </Dialog>
                </>
              }
            />
          </Grid>
          <Grid item sm={12} md={6} lg={4} xl={3}>
            <GameCard
              title="Nifty Tennis"
              description="The first ever NFT tennis game on the Ethereum blockchain"
              isComingSoon
              image={NiftySmashers}
            />
          </Grid>
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
              <Box paddingRight={2}>
                <SkeletonDegenPlaceholder />
              </Box>
            ))
          : degens.map((degen) => (
              <Box paddingRight={2}>
                <DegenCard
                  key={degen.id}
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
