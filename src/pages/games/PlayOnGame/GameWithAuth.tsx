import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isOpera, browserName } from 'react-device-detect';
import Unity, { UnityContext } from 'react-unity-webgl';
import { Box, Button, Stack } from '@mui/material';
import NetworkContext from 'contexts/NetworkContext';
import useArcadeBalance from 'hooks/useArcadeBalance';
// import useFetch from 'hooks/useFetch';
import { NETWORK_NAME } from 'constants/networks';
import { GOOGLE_ANALYTICS } from 'constants/google-analytics';
import { getGameViewedAnalyticsEventName } from 'constants/games';
// import { ALL_RENTAL_API_URL } from 'constants/url';
import { DEBUG } from 'constants/index';
import { sendEvent } from 'utils/google-analytics';
import withVerification from 'components/Authentication';
import Preloader from 'components/Preloader';
// import { Rentals } from 'types/rentals';
// import EarningCap from 'pages/dashboard/overview/EarningCap';
import ArcadeTokensRequired from './ArcadeTokensRequired';
import useAuth from 'hooks/useAuth';

interface GameProps {
  unityContext: UnityContext;
  arcadeTokenRequired?: boolean;
}

const Game = ({ unityContext, arcadeTokenRequired = false }: GameProps) => {
  const { authToken } = useAuth();
  const location = useLocation();
  const { address, targetNetwork } = useContext(NetworkContext);
  const {
    arcadeBalance,
    loading: arcadeLoading,
    refetch: refetchArcadeBal,
  } = useArcadeBalance();
  const authMsg = `true,${address || '0x0'},Vitalik,${authToken}`;
  const authCallback = useRef<null | ((authMsg: string) => void)>();
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // const headers = { authorizationToken: authToken || '' };
  // const { data: rentals } = useFetch<Rentals[]>(ALL_RENTAL_API_URL, {
  //   headers,
  //   enabled:
  //     !!authToken && unityContext.unityConfig.productName === 'NiftySmashers',
  // });

  useEffect(() => {
    if (address.length && authCallback.current) {
      authCallback.current(authMsg);
    }
  }, [address, authMsg]);

  useEffect(() => {
    let eventName = getGameViewedAnalyticsEventName(location?.pathname);
    if (eventName) {
      sendEvent(eventName, GOOGLE_ANALYTICS.CATEGORIES.GAMEPLAY);
    }
  }, [location?.pathname]);

  const startAuthentication = useCallback(
    (e: CustomEvent<{ callback: (auth: string) => void }>) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('Authenticating:', authMsg);
      e.detail.callback(authMsg);
      authCallback.current = e.detail.callback;
    },
    [authMsg],
  );

  const getConfiguration = useCallback(
    (e: CustomEvent<{ callback: (network: string) => void }>) => {
      const networkName = NETWORK_NAME[targetNetwork.chainId];
      const version = process.env.REACT_APP_SUBGRAPH_VERSION;
      // eslint-disable-next-line no-console
      if (DEBUG) console.log(`${networkName},${version ?? ''}`);
      setTimeout(
        () => e.detail.callback(`${networkName},${version ?? ''}`),
        1000,
      );
    },
    [targetNetwork.chainId],
  );

  const onMouse = useCallback(() => {
    const content = Array.from(
      document.getElementsByClassName(
        'game-canvas',
      ) as HTMLCollectionOf<HTMLElement>,
    )[0];
    if (content) {
      content.style['pointer-events' as any] = 'auto';
      content.style.cursor = 'pointer';
    }
  }, []);

  useEffect(() => {
    if (unityContext) {
      (window as any).unityInstance = unityContext;
      (window as any).unityInstance.SendMessage = unityContext.send;
      unityContext.on('loaded', () => setLoaded(true));
      unityContext.on('error', console.error);
      unityContext.on('progress', (p) => setProgress(p * 100));
      (window as any).addEventListener(
        'StartAuthentication',
        startAuthentication,
      );
      (window as any).addEventListener('GetConfiguration', getConfiguration);
      document.addEventListener('mousemove', onMouse, false);
    }
    return () => {
      if ((window as any).unityInstance)
        (window as any).unityInstance.removeAllEventListeners();
      (window as any).removeEventListener(
        'StartAuthentication',
        startAuthentication,
      );
      (window as any).removeEventListener('GetConfiguration', getConfiguration);
      document.removeEventListener('mousemove', onMouse, false);
    };
  }, [unityContext, onMouse, startAuthentication, getConfiguration]);

  const handleOnClickFullscreen = () => {
    (window as any).unityInstance.setFullscreen(true);
  };

  if (arcadeTokenRequired && arcadeLoading) {
    return <></>;
  }

  if (arcadeTokenRequired && Number(arcadeBalance) === 0) {
    return <ArcadeTokensRequired refetchArcadeBal={refetchArcadeBal} />;
  }

  return (
    <>
      <Preloader ready={isLoaded} progress={progress} />
      <Stack direction="row" alignItems="flex-start">
        <Stack alignItems="flex-start">
          <Unity
            key={authToken}
            className="game-canvas"
            unityContext={unityContext}
            style={{
              width: 'calc(77vh * 1.33)',
              height: '77vh',
              visibility: isLoaded ? 'visible' : 'hidden',
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleOnClickFullscreen}
            sx={{ marginTop: '6px' }}
          >
            Fullscreen
          </Button>
        </Stack>
        {/* {unityContext.unityConfig.productName === 'NiftySmashers' && (
          <Box ml={2} minWidth={350}>
            <EarningCap rentals={rentals ?? []} hideTitle={true} />
          </Box>
        )} */}
      </Stack>
    </>
  );
};

const GameWithAuth = withVerification((props: GameProps) =>
  isOpera ? (
    <Box component="h2" textAlign="center" mt={8}>
      {browserName} Browser Not Supported
    </Box>
  ) : (
    Game(props)
  ),
);

export default GameWithAuth;
