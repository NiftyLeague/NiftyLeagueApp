'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { sendEvent } from '@/utils/google-analytics';
import { GOOGLE_ANALYTICS } from '@/constants/google-analytics';

// reducer - state management
import { useDispatch, useSelector } from '@/store';
import { login, logout } from '@/store/slices/account';

// types
import { AuthTokenContextType } from '@/types/auth';
import NetworkContext from '@/contexts/NetworkContext';
import { getProviderAndSigner } from '@/utils/ethers';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { ADDRESS_VERIFICATION, WALLET_VERIFICATION } from '@/constants/url';
import useLocalStorage from '@/hooks/useLocalStorage';

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const AuthTokenContext = createContext<AuthTokenContextType | null>(null);

export const AuthTokenProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const dispatch = useDispatch();
  const { address, userProvider } = useContext(NetworkContext);
  const { isLoggedIn } = useSelector((state) => state.account);
  const token = `${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}`;
  const [authToken, setAuthToken] = useLocalStorage<string>(
    'authentication-token',
    '',
  );
  const [uuidToken, setUUIDToken] = useLocalStorage<string>(
    'uuid-token',
    token,
  );
  const [userId, setUserId] = useLocalStorage<string>('user-id', '');
  const [nonce, setNonce] = useLocalStorage<string>(
    'nonce',
    `0x${crypto.randomBytes(4).toString('hex')}`,
  );

  const checkAddress = useCallback(async () => {
    if (authToken?.length && address?.length) {
      const result = await fetch(ADDRESS_VERIFICATION, {
        headers: { authorizationToken: authToken },
      })
        .then((res) => {
          if (res.status === 404) return null;
          return res.text();
        })
        .catch(() => null);
      if (result && result.slice(1, -1) === address.toLowerCase()) {
        setAuthToken(authToken);
        dispatch(login());
        return true;
      }
      setAuthToken('');
      setUUIDToken('');
      setNonce('');
      setUserId('');
      return false;
    }
    return false;
  }, [
    address,
    authToken,
    dispatch,
    setAuthToken,
    setNonce,
    setUserId,
    setUUIDToken,
  ]);

  const signMsg = useCallback(async () => {
    try {
      const initialized = await checkAddress();
      if (!initialized && address?.length && userProvider && nonce && token) {
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
              if (res.status === 404) {
                dispatch(logout());
                throw Error('Failed to verify signature!');
              }
              return res.text();
            })
            .catch(() => {
              dispatch(logout());
              throw Error('Failed to verify signature!');
            });

          if (result?.length) {
            sendEvent(
              GOOGLE_ANALYTICS.EVENTS.LOGIN,
              GOOGLE_ANALYTICS.CATEGORIES.ENGAGEMENT,
              'method',
            );

            const auth = result.slice(1, -1);
            setAuthToken(auth);
            setUUIDToken(token);
            setNonce(nonce);

            dispatch(login());

            return auth;
          }
          return null;
        }
        return null;
      }
      return null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      dispatch(logout());
      return null;
    }
  }, [
    address,
    checkAddress,
    dispatch,
    nonce,
    setAuthToken,
    setNonce,
    setUUIDToken,
    token,
    userProvider,
  ]);

  useEffect(() => {
    if (address?.length && isLoggedIn) return;
    if (address?.length) {
      setTimeout(signMsg, 0);
    } else if (isLoggedIn) {
      dispatch(logout());
    }
  }, [address, dispatch, isLoggedIn, signMsg]);

  return (
    <AuthTokenContext.Provider
      value={{
        isLoggedIn,
        signMsg,
        authToken,
      }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};

export default AuthTokenContext;
