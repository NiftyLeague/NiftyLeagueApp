import { useContext, useEffect, useState } from 'react';
import { Button, Typography, Container } from '@mui/material';

import { NetworkContext } from 'NetworkProvider';
import { ADDRESS_VERIFICATION } from 'constants/url';
import useAuth from 'hooks/useAuth';

const ProfileVerification = (): JSX.Element => {
  const { web3Modal, loadWeb3Modal } = useContext(NetworkContext);
  const { isLoggedIn, signMsg } = useAuth();

  const handleConnectWallet = () => {
    if (!web3Modal.cachedProvider) {
      loadWeb3Modal();
      return;
    }

    signMsg();
  };

  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      {!isLoggedIn ? (
        'Please connect your wallet to play'
      ) : (
        <>
          <Typography mb={2}>Please connect your wallet</Typography>
          <Button variant="contained" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        </>
      )}
    </Container>
  );
};

export default function withVerification(
  Component: (props: any) => JSX.Element,
) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props: any): JSX.Element | null => {
    const { address } = useContext(NetworkContext);
    const [success, setSuccess] = useState(false);
    const [auth, setAuth] = useState(
      window.localStorage.getItem('authentication-token'),
    );

    useEffect(() => {
      const checkAddress = async () => {
        if (auth) {
          const result = await fetch(ADDRESS_VERIFICATION, {
            headers: { authorizationToken: auth },
          })
            .then((res) => {
              if (res.status === 404) setSuccess(false);
              return res.text();
            })
            .catch(() => {
              setSuccess(false);
            });
          if (result && result.slice(1, -1) === address.toLowerCase()) {
            setSuccess(true);
          } else {
            window.localStorage.removeItem('authentication-token');
            window.localStorage.removeItem('uuid-token');
            window.localStorage.removeItem('nonce');
            window.localStorage.removeItem('user-id');
            setAuth(null);
          }
        }
      };
      if (auth && address) checkAddress();
    }, [auth, address, setSuccess]);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (auth && !success) return null;
    return success ? (
      <Component {...props} auth={auth} />
    ) : (
      <ProfileVerification />
    );
  };
}
