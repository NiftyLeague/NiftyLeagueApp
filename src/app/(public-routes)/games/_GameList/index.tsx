'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Button, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import useArcadeBalance from '@/hooks/useArcadeBalance';
import useAuth from '@/hooks/useAuth';
import BuyArcadeTokensDialog from '@/components/dialog/BuyArcadeTokensDialog';
import ConnectWrapper from '@/components/wrapper/ConnectWrapper';
import GameCard from '@/components/cards/GameCard';
import DownloadGameDialog from '@/components/dialog/DownloadGameDialog';
// import WhitelistDialog from '@/components/dialog/WhitelistDialog';

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    paddingRight: 16,
    paddingBottom: 32,
    border: 'none',
    [theme.breakpoints.between('md', 'xl')]: {
      '&:nth-child(-n+3)': {
        borderBottom: '1px solid #474747',
      },
    },
    [theme.breakpoints.up('xl')]: {
      '&:nth-child(-n+4)': {
        borderBottom: '1px solid #474747',
      },
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
}));

const GameList = () => {
  const { gridItem } = useStyles();
  const router = useRouter();
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
    router.push('/games/smashers');
  }, [router]);

  const goToPlayWENGame = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      router.push('/games/wen-game');
    } else {
      setOpenBuyAT(true);
    }
  }, [arcadeBalance, router]);

  const goToPlayMtGawx = useCallback(() => {
    router.push('/games/mt-gawx');
  }, [router]);

  const goToPlayCryptoWinter = useCallback(() => {
    if (Number(arcadeBalance) > 0) {
      router.push('/games/crypto-winter');
    } else {
      setOpenBuyAT(true);
    }
  }, [arcadeBalance, router]);

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className={gridItem}>
        <GameCard
          title="2D Smashers"
          externalLink={{
            title: 'Smashers Mobile',
            src: 'https://niftysmashers.com/',
          }}
          required="DEPRECATED - Please download our mobile app!"
          description="The first NFT brawler on the Ethereum blockchain. Now available free-to-play on all mobile platforms!"
          image="/images/games/nifty-smashers.gif"
          onlineCounter={200}
          autoHeight={false}
          actions={
            <>
              <DownloadGameDialog />
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
                  onClick={goToPlayOnGame}
                >
                  Play in Browser (Deprecated)
                </Button>
              </ConnectWrapper>
            </>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className={gridItem}>
        <GameCard
          title="WEN Game"
          required="Arcade Tokens Required"
          description="Nifty League's first arcade mini-game! This single-player baseball game is sure to test your reflexes."
          image="/images/games/wen.gif"
          autoHeight={false}
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
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className={gridItem}>
        <GameCard
          title="Crypto Winter"
          required="Arcade Tokens Required"
          description="Winter is here... Play this single-player dodgeball-inspired arcade game and rank as high as you can!"
          image="/images/games/crypto-winter.png"
          autoHeight={false}
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
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className={gridItem}>
        <GameCard
          title="Mt. Gawx"
          required="NFTL required"
          description={`Hearing the DEGENs' desperate pleas to spend their hard-earned NFTL and with bigger sinks still under his development, Satoshi suggests the DEGENs climb to the top of the Mt. Gawx volcano to offer their NFTL sacrifices to the fiery depths to see who might burn the most, and to discover whether the rumors of Rugman offering interesting rewards to burners are true.\n\nStrange thing is, every time they lob in NFTL, it's almost as if the volcano's… responding.\n\nCould the fabled 7th tribe be waking up from their centuries-long slumber, deep in the caves where Rugman resides?`}
          showMore={true}
          image="/images/games/mt-gawx.gif"
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
      {/* <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className={gridItem}>
        <GameCard
          title="Nifty Tennis"
          description={
            'The first NFT tennis game on the Ethereum blockchain!\n\n'
          }
          isComingSoon
          image='/images/games/nifty-tennis.jpeg'
          autoHeight={true}
          actions={<WhitelistDialog />}
        />
      </Grid> */}
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
