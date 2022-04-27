import { Grid, Button } from '@mui/material';
import GameCard from 'components/cards/GameCard';
import SectionSlider from 'components/sections/SectionSlider';
import { cardSpacing } from 'store/constant';
import NiftySmashers from 'assets/images/gifs/nifty-smashers.gif';
import { Dialog, DialogTrigger, DialogContent } from 'components/dialog';
import Downloader from './Downloader';
import useVersion from 'hooks/useVersion';
import GameWithAuth, { smashersContext } from './GameWithAuth';

const GamesPage = () => {
  const { isWindows, downloadURL, version } = useVersion();
  return (
    <SectionSlider
      firstSection
      isSlider={false}
      title="Games"
      actions={
        <Button
          href={downloadURL}
          disabled={!isWindows || !version}
          variant="outlined"
        >
          {!version && isWindows
            ? 'Fetching installer version...'
            : `Download for ${
                isWindows ? 'Windows' : 'Mac OS will be added soon!'
              }`}
        </Button>
      }
    >
      <Grid container flexDirection="row" flexWrap="wrap" spacing={cardSpacing}>
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
  );
};

export default GamesPage;
