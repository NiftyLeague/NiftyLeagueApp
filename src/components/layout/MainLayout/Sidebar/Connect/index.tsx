import { Button, Typography } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import { useCallback, useContext } from 'react';
import { sendEvent } from 'utils/google-analytics';

export interface ConnectProps {}

const Connect: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<ConnectProps>>
> = () => {
  const { logoutOfWeb3Modal, web3Modal, loadWeb3Modal } =
    useContext(NetworkContext);

  const handleConnectWallet = useCallback(() => {
    sendEvent('login', 'engagement', 'method');
    loadWeb3Modal();
  }, [loadWeb3Modal]);

  if (web3Modal && web3Modal.cachedProvider) {
    return (
      <Button variant="outlined" onClick={logoutOfWeb3Modal} fullWidth>
        <Typography variant="paragraphP2XXSmall">Log Out</Typography>
      </Button>
    );
  }

  if (web3Modal) {
    return (
      <Button variant="contained" fullWidth onClick={handleConnectWallet}>
        <Typography variant="paragraphP2XXSmall">Connect</Typography>
      </Button>
    );
  }

  return null;
};

export default Connect;
