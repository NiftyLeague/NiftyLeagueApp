import { useContext } from 'react';
import { Button, Typography, Container } from '@mui/material';

import { NetworkContext } from 'NetworkProvider';
import useAuth from 'hooks/useAuth';

const ProfileVerification = (): JSX.Element => {
  const { address, loadWeb3Modal } = useContext(NetworkContext);
  const { signMsg } = useAuth();

  const handleConnectWallet = () => {
    if (!address) {
      loadWeb3Modal();
      return;
    }

    signMsg();
  };

  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      <Typography mb={2}>Please connect your wallet</Typography>
      <Button variant="contained" onClick={handleConnectWallet}>
        Connect Wallet
      </Button>
    </Container>
  );
};

export default function withVerification(
  Component: (props: any) => JSX.Element,
) {
  return (props: any): JSX.Element | null => {
    const { isLoggedIn } = useAuth();
    const auth = window.localStorage.getItem('authentication-token');
    return isLoggedIn ? (
      <Component {...props} auth={auth} />
    ) : (
      <ProfileVerification />
    );
  };
}
