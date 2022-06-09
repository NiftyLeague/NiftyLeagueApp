import GameWithAuth, { wenContext } from './GameWithAuth';

const WenGame = () => (
  <GameWithAuth unityContext={wenContext} arcadeTokenRequired={true} />
);

export default WenGame;
