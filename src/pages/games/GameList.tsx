import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import useArcadeBalance from 'hooks/useArcadeBalance';
import useAuth from 'hooks/useAuth';
import BuyArcadeTokensDialog from 'components/dialog/BuyArcadeTokensDialog';
import ConnectWrapper from 'components/wrapper/ConnectWrapper';
import GameCard from 'components/cards/GameCard';
import NiftySmashers from 'assets/images/games/nifty-smashers.gif';
import NiftyTennis from 'assets/images/games/nifty-tennis.jpeg';
import { Dialog, DialogTrigger, DialogContent } from 'components/dialog';
import Downloader from './Downloader';
import WhitelistModal from './WhitelistModal';
import WenThumbnail from 'assets/images/games/wen.gif';
import MtGawxThumbnail from 'assets/images/games/mt-gawx.gif';
import CryptoWinterThumbnail from 'assets/images/games/crypto-winter.png';

const GameList = () => {
  const navigate = useNavigate();
  const {
    arcadeBalance,
    loading: loadingArcadeBalance,
    refetch: refetchArcadeBal,
  } = useArcadeBalance();
  const { isLoggedIn } = useAuth();
  const [openBuyAT, setOpenBuyAT] = useState(false);

  useEffect(() => {
    if (isLoggedIn && !loadingArcadeBalance) {
      refetchArcadeBal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const goToPlayOnGame = useCallback(() => {
    navigate('/games/smashers');
  }, [navigate]);

  const goToPlayWENGame = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      navigate('/games/wen-game');
    } else {
      setOpenBuyAT(true);
    }
  }, [arcadeBalance, navigate]);

  const goToPlayMtGawx = useCallback(() => {
    navigate('/games/mt-gawx');
  }, [navigate]);

  const goToPlayCryptoWinter = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      navigate('/games/crypto-winter');
    } else {
      setOpenBuyAT(true);
    }
  }, [arcadeBalance, navigate]);

  return (
    <>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Nifty Smashers"
          description="The first NFT brawler on the Ethereum blockchain!"
          image={NiftySmashers}
          onlineCounter={200}
          autoHeight={true}
          actions={
            <>
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ minWidth: 80, flex: 1 }}
                  >
                    Desktop App
                  </Button>
                </DialogTrigger>
                <DialogContent
                  aria-labelledby="customized-dialog-title"
                  dialogTitle="Nifty League Desktop"
                >
                  <Downloader />
                </DialogContent>
              </Dialog>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ minWidth: 80, flex: 1 }}
                onClick={goToPlayOnGame}
              >
                Play in Browser
              </Button>
            </>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="WEN Game"
          required="Arcade Tokens Required"
          description="Play this single-player baseball inspired arcade game and rank as high as you can!"
          image={WenThumbnail}
          autoHeight={true}
          actions={
            <ConnectWrapper
              color="primary"
              fullWidth
              buttonText="Connect Wallet to play"
            >
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ minWidth: 80, flex: 1 }}
                onClick={goToPlayWENGame}
              >
                {Number(arcadeBalance) > 0
                  ? 'Play in Browser'
                  : 'Buy Arcade Tokens'}
              </Button>
            </ConnectWrapper>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Crypto Winter"
          required="Arcade Tokens Required"
          description="Play this single-player dodgeball-inspired arcade game and rank as high as you can!"
          image={CryptoWinterThumbnail}
          autoHeight={true}
          actions={
            <ConnectWrapper
              color="primary"
              fullWidth
              buttonText="Connect Wallet to play"
            >
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ minWidth: 80, flex: 1 }}
                onClick={goToPlayCryptoWinter}
              >
                {Number(arcadeBalance) > 0
                  ? 'Play in Browser'
                  : 'Buy Arcade Tokens'}
              </Button>
            </ConnectWrapper>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Nifty Tennis"
          description="The first NFT tennis game on the Ethereum blockchain!"
          isComingSoon
          image={NiftyTennis}
          autoHeight={true}
          actions={
            <>
              <Dialog>
                <DialogTrigger>
                  <Button variant="outlined" fullWidth>
                    Get Exclusive Acess
                  </Button>
                </DialogTrigger>
                <DialogContent
                  aria-labelledby="exclusive-access-to-nifty-tennis"
                  dialogTitle="Be the first one to receive exclusive access to Nifty Tennis"
                  sx={{
                    '& .MuiPaper-root': {
                      maxWidth: 473,
                    },
                    '& h2': {
                      fontSize: '32px',
                      lineHeight: '44px',
                      textAlign: 'center',
                    },
                    '& .MuiDialogContent-root': {
                      border: 'none',
                    },
                  }}
                >
                  <WhitelistModal />
                </DialogContent>
              </Dialog>
            </>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          title="Mt. Gawx"
          required=" "
          description={`Hearing the DEGENs' desperate pleas to spend their hard-earned NFTL and with bigger sinks still under his development, Satoshi suggests the DEGENs climb to the top of the Mt. Gawx volcano to offer their NFTL sacrifices to the fiery depths to see who might burn the most, and to discover whether the rumors of Rugman offering interesting rewards to burners are true.\n\nStrange thing is, every time they lob in NFTL, it's almost as if the volcano's… responding.\n\nCould the fabled 7th tribe be waking up from their centuries-long slumber, deep in the caves where Rugman resides?`}
          showMore={true}
          image={MtGawxThumbnail}
          autoHeight={true}
          actions={
            <ConnectWrapper
              color="primary"
              fullWidth
              buttonText="Connect Wallet to play"
            >
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ minWidth: 80, flex: 1 }}
                onClick={goToPlayMtGawx}
              >
                Burn Now
              </Button>
            </ConnectWrapper>
          }
        />
      </Grid>
      <BuyArcadeTokensDialog
        open={openBuyAT}
        onSuccess={() => {
          setOpenBuyAT(false);
          refetchArcadeBal();
        }}
        onClose={() => setOpenBuyAT(false)}
      />
    </>
  );
};

export default GameList;
