/* eslint-disable no-console */
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { isMobileOnly, withOrientationChange } from 'react-device-detect';
import { BigNumber } from 'ethers';

import useRemovedTraits from 'hooks/useRemovedTraits';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import { NotifyCallback } from 'types/notify';
import NetworkContext from 'contexts/NetworkContext';
import CharacterBGImg from 'assets/images/backgrounds/character-creator-repeat.png';
import { DEGEN_CONTRACT } from 'constants/contracts';
import { NETWORK_NAME } from 'constants/networks';
import { DEBUG } from 'constants/index';
import { getMintableTraits } from './helpers';
import { UnityInstance } from 'react-unity-webgl/declarations/unity-instance';
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook';
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters';

const baseUrl = isMobileOnly
  ? (process.env.REACT_APP_UNITY_MOBILE_CREATOR_BASE_URL as string)
  : (process.env.REACT_APP_UNITY_CREATOR_BASE_URL as string);
const buildVersion = isMobileOnly
  ? (process.env.REACT_APP_UNITY_MOBILE_CREATOR_BASE_VERSION as string)
  : (process.env.REACT_APP_UNITY_CREATOR_BASE_VERSION as string);

const useCompressed = process.env.REACT_APP_UNITY_USE_COMPRESSED !== 'false';

const getMobileSize = (isPortrait: boolean) => {
  const { innerWidth } = window;
  const width = innerWidth > 0 ? innerWidth : window.screen.width;
  let height = width;
  if (!isPortrait) {
    height = width / 1.333333;
  }
  return { width, height };
};

const getBrowserGameSize = () => {
  const { innerWidth, innerHeight } = window;
  const scale = 1.333333;
  const percent = 93;
  let height = Math.floor((innerHeight * percent) / 100);
  let width = height * scale;
  if (width > innerWidth) {
    width = innerWidth;
    height = innerWidth / scale;
  }
  return { width, height };
};

const WIDTH_SCALE = 280;
const HEIGHT_SCALE = 210;
let DEFAULT_WIDTH = WIDTH_SCALE * 3;
let DEFAULT_HEIGHT = HEIGHT_SCALE * 3;

if (isMobileOnly) {
  const { width, height } = getMobileSize(true);
  DEFAULT_WIDTH = width;
  DEFAULT_HEIGHT = height;
} else {
  const { width, height } = getBrowserGameSize();
  DEFAULT_WIDTH = width;
  DEFAULT_HEIGHT = height;
}

const RemovedTraits = ({
  callback,
  refreshKey,
}: {
  callback: (string) => void;
  refreshKey: number;
}) => {
  const { readContracts } = useContext(NetworkContext);
  const removedTraits = useRemovedTraits(readContracts);

  useEffect(() => {
    if (DEBUG) console.log('Removed Traits:', removedTraits);
    callback(JSON.stringify(removedTraits));
  }, [callback, removedTraits, refreshKey]);

  return null;
};

interface CharacterCreatorContainerProps {
  isPortrait?: boolean;
  setLoaded: (boolean) => void;
  setProgress: (number) => void;
}
interface CharacterCreatorProps {
  isLoaded: boolean;
  isPortrait?: boolean;
  onMintCharacter: (
    ...parameters: ReactUnityEventParameter[]
  ) => ReactUnityEventParameter;
  unityContext: UnityContextHook;
}

// type MintEvent = CustomEvent<{
//   callback: (reset: string) => void;
//   traits: TraitArray;
// }>;

const CharacterCreator = memo(
  ({
    isLoaded,
    isPortrait,
    onMintCharacter,
    unityContext,
  }: CharacterCreatorProps) => {
    const { targetNetwork } = useContext(NetworkContext);
    const removedTraitsCallback = useRef<
      null | ((removedTraits: string) => void)
    >();
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [height, setHeight] = useState(DEFAULT_HEIGHT);
    const [refreshKey, setRefreshKey] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isMinting, setIsMinting] = useState(false);

    const getRemovedTraits = useCallback((e) => {
      removedTraitsCallback.current = e.detail.callback;
      setRefreshKey(Math.random() + 1);
    }, []);

    useEffect(() => {
      if (isMobileOnly && isLoaded) {
        unityContext.sendMessage(
          'CharacterCreatorLevel',
          'UI_SetPortrait',
          isPortrait ? 'true' : 'false',
        );
        const safeIsPortrait = isPortrait ?? true;
        const { width: newWidth, height: newHeight } =
          getMobileSize(safeIsPortrait);
        setWidth(newWidth);
        setHeight(newHeight);
      }
    }, [isPortrait, isLoaded]);

    const reportWindowSize = useCallback(
      (e) => {
        if (isMobileOnly) {
          const safeIsPortrait = isPortrait ?? true;
          const { width: newWidth, height: newHeight } =
            getMobileSize(safeIsPortrait);
          setWidth(newWidth);
          setHeight(newHeight);
        } else {
          const { width: newWidth, height: newHeight } = getBrowserGameSize();
          setWidth(newWidth);
          setHeight(newHeight);
        }
      },
      [isPortrait],
    );

    const getConfiguration = useCallback(
      (e) => {
        const networkName = NETWORK_NAME[targetNetwork.chainId];
        const version = process.env.REACT_APP_SUBGRAPH_VERSION ?? '';
        setTimeout(() => e.detail.callback(`${networkName},${version}`), 1000);
      },
      [targetNetwork.chainId],
    );

    const toggleIsMinting = useCallback((e) => {
      setIsMinting(e.detail);
    }, []);

    const onScroll = useCallback(() => {
      const content = Array.from(
        document.getElementsByClassName(
          'character-canvas',
        ) as HTMLCollectionOf<HTMLElement>,
      )[0];
      if (content) content.style['pointer-events'] = 'none';
    }, []);

    const onMouse = useCallback(() => {
      const content = Array.from(
        document.getElementsByClassName(
          'character-canvas',
        ) as HTMLCollectionOf<HTMLElement>,
      )[0];
      if (content) {
        content.style['pointer-events'] = 'auto';
        content.style.cursor = 'pointer';
      }
    }, []);

    useEffect(() => {
      if (unityContext) {
        unityContext.addEventListener('error', console.error);
        unityContext.addEventListener('resize', reportWindowSize);
        unityContext.addEventListener('GetConfiguration', getConfiguration);
        unityContext.addEventListener('GetRemovedTraits', getRemovedTraits);
        unityContext.addEventListener('OnMintEffectToggle', toggleIsMinting);
        unityContext.addEventListener('SubmitTraits', onMintCharacter);
        document.addEventListener('wheel', onScroll, false);
        document.addEventListener('mousemove', onMouse, false);
      }
      return () => {
        unityContext.removeEventListener('error', console.error);
        unityContext.removeEventListener('resize', reportWindowSize);
        unityContext.removeEventListener('GetConfiguration', getConfiguration);
        unityContext.removeEventListener('GetRemovedTraits', getRemovedTraits);
        unityContext.removeEventListener('OnMintEffectToggle', toggleIsMinting);
        unityContext.removeEventListener('SubmitTraits', onMintCharacter);
        document.removeEventListener('wheel', onScroll, false);
        document.removeEventListener('mousemove', onMouse, false);
      };
    }, [
      getConfiguration,
      getRemovedTraits,
      isPortrait,
      onMintCharacter,
      onMouse,
      onScroll,
      reportWindowSize,
      toggleIsMinting,
    ]);

    return (
      <>
        <div
          className="pixelated"
          style={{
            backgroundSize: height / 21,
            backgroundImage: `url(${CharacterBGImg})`,
            backgroundRepeat: 'repeat-x',
          }}
        >
          <Unity
            className="character-canvas"
            unityProvider={unityContext.unityProvider}
            style={{
              width,
              height,
              visibility: isLoaded ? 'visible' : 'hidden',
            }}
          />
        </div>
        {removedTraitsCallback.current && refreshKey ? (
          <RemovedTraits
            callback={removedTraitsCallback.current}
            refreshKey={refreshKey}
          />
        ) : null}
      </>
    );
  },
);

const CharacterCreatorContainer = memo(
  ({ isPortrait, setLoaded, setProgress }: CharacterCreatorContainerProps) => {
    const { address, tx, writeContracts } = useContext(NetworkContext);
    const [saleLocked, setSaleLocked] = useState(false);
    const totalSupply = 9900;

    const unityContext = useUnityContext({
      loaderUrl: `${baseUrl}/Build/${buildVersion}.loader.js`,
      dataUrl: `${baseUrl}/Build/${buildVersion}.data${
        useCompressed ? '.br' : ''
      }`,
      frameworkUrl: `${baseUrl}/Build/${buildVersion}.framework.js${
        useCompressed ? '.br' : ''
      }`,
      codeUrl: `${baseUrl}/Build/${buildVersion}.wasm${
        useCompressed ? '.br' : ''
      }`,
      streamingAssetsUrl: `${baseUrl}/StreamingAssets`,
      companyName: 'NiftyLeague',
      productName: 'NiftyCreator',
      productVersion: buildVersion,
    });

    useEffect(() => {
      setLoaded(unityContext.isLoaded);
    }, [unityContext.isLoaded]);

    useEffect(() => {
      setProgress(unityContext.loadingProgression * 100);
    }, [unityContext.loadingProgression]);

    useEffect(() => {
      const count = totalSupply ?? 0;
      if (count < 3 || count >= 9900) {
        setSaleLocked(true);
      } else {
        setSaleLocked(false);
      }
    }, [totalSupply, address]);

    useEffect(() => {
      window.unityInstance = unityContext.UNSAFE__unityInstance;
      (window.unityInstance as UnityInstance).SendMessage =
        unityContext.sendMessage;
    }, []);

    const stashMintState = useCallback((e) => {
      setTimeout(() => e.detail.callback('false'), 1000);
    }, []);

    const mintCharacter = useCallback(
      async (e) => {
        const { character, head, clothing, accessories, items } =
          getMintableTraits(e.detail);
        const nftContract = writeContracts[DEGEN_CONTRACT];
        const args = [character, head, clothing, accessories, items];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const value = (await nftContract.getNFTPrice()) as BigNumber;
        const minimumGas = BigNumber.from('250000');
        const txCallback: NotifyCallback = (mintTx) => {
          if (mintTx.status === 'pending') e.detail.callback('true');
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = await submitTxWithGasEstimate(
          tx,
          nftContract,
          'purchase',
          args,
          { value },
          minimumGas,
          txCallback,
        );
        if (!res) e.detail.callback('false');
      },
      [writeContracts, tx],
    );

    return (
      <>
        {window.unityInstance && (
          <CharacterCreator
            isLoaded={unityContext.isLoaded}
            isPortrait={isPortrait}
            onMintCharacter={
              writeContracts[DEGEN_CONTRACT] && !saleLocked
                ? mintCharacter
                : stashMintState
            }
            unityContext={unityContext}
          />
        )}
      </>
    );
  },
);

export default withOrientationChange(CharacterCreatorContainer);
