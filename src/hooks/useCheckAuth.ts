'use client';

import { useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';

// reducer - state management
import { useDispatch, useSelector } from '@/store';
import { login, logout } from '@/store/slices/account';

import { ADDRESS_VERIFICATION } from '@/constants/url';
import useLocalStorageContext from '@/hooks/useLocalStorageContext';

const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { authToken, clearAuthToken, clearUUIDToken, clearNonce, clearUserId } =
    useLocalStorageContext();

  const { isLoggedIn } = useSelector((state) => state.account);

  const checkAddress = useCallback(async () => {
    if (authToken && address) {
      const result = await fetch(ADDRESS_VERIFICATION, {
        headers: { authorizationToken: authToken },
      })
        .then((res) => {
          if (res.status === 404) return null;
          return res.text();
        })
        .catch(() => null);
      if (result && result.slice(1, -1) === address.toLowerCase()) {
        return true;
      }
      return false;
    }
    return false;
  }, [address, authToken]);

  const verify = useCallback(async () => {
    const addressVerified = await checkAddress();
    if (addressVerified) {
      dispatch(login());
    } else {
      dispatch(logout());
      clearAuthToken();
      clearUUIDToken();
      clearNonce();
      clearUserId();
    }
  }, [
    checkAddress,
    clearAuthToken,
    clearNonce,
    clearUserId,
    clearUUIDToken,
    dispatch,
  ]);

  useEffect(() => {
    if (isLoggedIn && (!authToken || !address)) dispatch(logout());
    else if (authToken && address) void verify();
  }, [address, authToken, dispatch, isLoggedIn, verify]);

  return { checkAddress, verify };
};

export default useCheckAuth;
