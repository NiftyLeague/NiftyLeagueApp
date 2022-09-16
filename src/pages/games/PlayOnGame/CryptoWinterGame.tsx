import { UnityContext } from 'react-unity-webgl';
import GameWithAuth from './GameWithAuth';

const baseUrl = process.env.REACT_APP_UNITY_CRYPTO_WINTER_BASE_URL as string;
const buildVersion = process.env
  .REACT_APP_UNITY_CRYPTO_WINTER_BASE_VERSION as string;

export const cryptoWinterContext = new UnityContext({
  loaderUrl: `${baseUrl}/Build/${buildVersion}.loader.js`,
  dataUrl: `${baseUrl}/Build/${buildVersion}.data.br`,
  frameworkUrl: `${baseUrl}/Build/${buildVersion}.framework.js.br`,
  codeUrl: `${baseUrl}/Build/${buildVersion}.wasm.br`,
  streamingAssetsUrl: `${baseUrl}/StreamingAssets`,
  companyName: 'NiftyLeague',
  productName: 'CryptoWinter',
  productVersion: buildVersion,
});

const CryptoWinterGame = () => (
  <GameWithAuth unityContext={cryptoWinterContext} arcadeTokenRequired />
);

export default CryptoWinterGame;
