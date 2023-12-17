import { BrowserProvider, Provider } from 'ethers';

import { UnityContext } from 'react-unity-webgl';
import type { Ethereumish } from '@/types/web3';

interface BSC {
  bbcSignTx?: (e) => void;
  bnbSign?: (n, i) => void;
  chainId?: string;
  delegate?: (n) => void;
  enable?: () => void;
  isConnected?: () => void;
  on?: (e, n) => void;
  redelegate?: (n) => void;
  request?: (e) => void;
  requestAccounts?: () => void;
  requestAddresses?: () => void;
  send?: (e, n) => void;
  sendAsync?: (e, n) => void;
  switchNetwork?: (e) => void;
  transfer?: (n) => void;
  undelegate?: (n) => void;
}

interface UnityInstance extends UnityContext {
  SendMessage?: (
    gameObjectName: string,
    methodName: string,
    parameter?: string | number | boolean,
  ) => void;
}

declare global {
  interface Window {
    gtag: Gtag.Gtag;
    BinanceChain?: BSC;
    createUnityInstance: (
      canvasHtmlElement: HTMLCanvasElement,
      parameters: any,
      onProgress?: (progression: number) => void,
    ) => Promise<UnityInstance>;
    ethereum?: Ethereumish;
    ReactUnityWebGL: {
      canvas: () => {};
      error: () => {};
      loaded: () => {};
      [eventName: string]: () => {};
    };
    unityInstance: UnityInstance | null;
    Web3?: {
      providers?: {
        HttpProvider?: BrowserProvider;
        IpcProvider?: Provider;
      };
    };
  }
}
