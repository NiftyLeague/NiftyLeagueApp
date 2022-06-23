import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { Box, Stack } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import useArcadeBalance from 'hooks/useArcadeBalance';
import withVerification from 'components/Authentication';
import { NETWORK_NAME } from 'constants/networks';
import { DEBUG } from 'constants/index';
import Preloader from './Preloader';
import ArcadeTokensRequired from './ArcadeTokensRequired';
import { ALL_RENTAL_API_URL } from 'constants/url';
import { Rentals } from 'types/rentals';
import EarningCap from 'pages/dashboard/overview/EarningCap';
import useFetch from 'hooks/useFetch';

interface GameProps {
  auth: string;
  unityContext: UnityContext;
  arcadeTokenRequired?: boolean;
}

const Game = ({
  auth,
  unityContext,
  arcadeTokenRequired = false,
}: GameProps) => {
  const { address, targetNetwork } = useContext(NetworkContext);
  const { arcadeBalance, refetch: refetchArcadeBal } = useArcadeBalance();
  const favs = window.localStorage.getItem('FAV_DEGENS') || '';
  const authMsg = `true,${address || '0x0'},Vitalik,${auth},${favs}`;
  const authCallback = useRef<null | ((authMsg: string) => void)>();
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const authToken = window.localStorage.getItem('authentication-token');
  let headers;
  if (authToken) {
    headers = {
      authorizationToken: authToken,
    };
  }
  const { data } = useFetch<Rentals[]>(ALL_RENTAL_API_URL, {
    headers,
  });

  const [rentals, setRentals] = useState<Rentals[] | any>([]);

  useEffect(() => {
    if (data) {
      setRentals(data);
    }
  }, [data]);

  useEffect(() => {
    if (address.length && authCallback.current) {
      authCallback.current(authMsg);
    }
  }, [address, authMsg]);

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

  if (arcadeTokenRequired && Number(arcadeBalance) === 0) {
    return <ArcadeTokensRequired refetchArcadeBal={refetchArcadeBal} />;
  }

  return (
    <>
      <Preloader ready={isLoaded} progress={progress} />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        width="100%"
        gap={1}
      >
        <Unity
          className="game-canvas"
          unityContext={unityContext}
          style={{
            width: 'calc(89vh * 1.33)',
            height: '89vh',
            visibility: isLoaded ? 'visible' : 'hidden',
          }}
        />
        <Box ml={4} minWidth={360}>
          <EarningCap rentals={rentals} hideTitle={true} />
        </Box>
      </Stack>
    </>
  );
};

const GameWithAuth = withVerification((props: GameProps) => Game(props));

export default GameWithAuth;
