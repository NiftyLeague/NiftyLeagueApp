'use client';

import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';

import NetworkContext from '@/contexts/NetworkContext';
import { getProviderAndSigner } from '@/utils/ethers';
import { WALLET_VERIFICATION } from '@/constants/url';
import useLocalStorage from '@/hooks/useLocalStorage';

const GameVerification = (): JSX.Element => {
  const { address, userProvider } = useContext(NetworkContext);
  const [msgSent, setMsgSent] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [authToken, setAuthToken] = useLocalStorage<string>(
    'authentication-token',
    '',
  );
  const [uuidToken, setUUIDToken] = useLocalStorage<string>('uuid-token', '');
  const [nonce, setNonce] = useLocalStorage<string>(
    'nonce',
    searchParams.get('nonce') || '',
  );

  useEffect(() => {
    const signMsg = async () => {
      if (address?.length && userProvider && nonce && token) {
        const { signer } = getProviderAndSigner(userProvider);
        if (signer) {
          const addressToLower = address.toLowerCase();
          const signAddress = `${addressToLower.substr(
            0,
            6,
          )}...${addressToLower.substr(-4)}`;
          const verification = await signer.signMessage(
            `Please sign this message to verify that ${signAddress} belongs to you. ${
              nonce || ''
            }`,
          );
          setMsgSent(true);
          const result = await fetch(WALLET_VERIFICATION, {
            method: 'POST',
            body: JSON.stringify({
              token,
              nonce,
              verification,
              address: addressToLower,
            }),
          })
            .then((res) => {
              if (res.status === 404) setError(true);
              return res.text();
            })
            .catch(() => {
              setError(true);
            });
          if (result && result.length) {
            setSuccess(true);
            setAuthToken(result.slice(1, -1));
            setUUIDToken(token);
            setNonce(nonce);
          }
        }
      }
    };
    // eslint-disable-next-line no-void
    if (!msgSent) void signMsg();
  }, [
    address,
    msgSent,
    nonce,
    setAuthToken,
    setNonce,
    setUUIDToken,
    token,
    userProvider,
  ]);

  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      {error || success ? (
        <>
          {error && 'Error signing message'}
          {success &&
            'Successfully verified account! Please return to the Nifty League desktop app'}
        </>
      ) : (
        <>
          {address
            ? 'Please sign message to verify address ownership'
            : 'Please connect your wallet'}
        </>
      )}
    </Container>
  );
};

export default GameVerification;
