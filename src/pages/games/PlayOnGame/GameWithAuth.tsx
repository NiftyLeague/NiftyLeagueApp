import { useCallback, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isOpera, browserName } from 'react-device-detect';
import { Unity } from 'react-unity-webgl';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import { Box, Button, Stack } from '@mui/material';
import NetworkContext from 'contexts/NetworkContext';
import useArcadeBalance from 'hooks/useArcadeBalance';
import { NETWORK_NAME } from 'constants/networks';
import { GOOGLE_ANALYTICS } from 'constants/google-analytics';
import { getGameViewedAnalyticsEventName } from 'constants/games';
import { DEBUG } from 'constants/index';
import { sendEvent } from 'utils/google-analytics';
import withVerification from 'components/Authentication';
import Preloader from 'components/Preloader';
import ArcadeTokensRequired from './ArcadeTokensRequired';
import useAuth from 'hooks/useAuth';

interface GameProps {
  unityContext: UnityContextHook;
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
    (e) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('Authenticating:', authMsg);
      console.log('======== startAuthentication ========', e);
      e.detail.callback(authMsg);
      authCallback.current = e.detail.callback;
    },
    [authMsg],
  );

  const getConfiguration = useCallback(
    (e) => {
      console.log('======== getConfiguration ========', e);
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
      (window as any).unityInstance = unityContext.UNSAFE__unityInstance;
      if (window.unityInstance)
        (window as any).unityInstance.SendMessage = unityContext.sendMessage;
      // unityContext.addEventListener('error', console.error);
      unityContext.addEventListener('StartAuthentication', startAuthentication);
      unityContext.addEventListener('GetConfiguration', getConfiguration);
      document.addEventListener('mousemove', onMouse, false);
    }
    return () => {
      // unityContext.removeEventListener('error', console.error);
      unityContext.removeEventListener(
        'StartAuthentication',
        startAuthentication,
      );
      unityContext.removeEventListener('GetConfiguration', getConfiguration);
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
      <Preloader
        ready={unityContext.isLoaded}
        progress={unityContext.loadingProgression * 100}
      />
      <Stack direction="row" alignItems="flex-start">
        <Stack alignItems="flex-start">
          <Unity
            key={authToken}
            className="game-canvas"
            unityProvider={unityContext.unityProvider}
            style={{
              width: 'calc(77vh * 1.33)',
              height: '77vh',
              visibility: unityContext.isLoaded ? 'visible' : 'hidden',
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
