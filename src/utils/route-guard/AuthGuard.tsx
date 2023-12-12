'use client';

import { useRouter } from 'next/navigation';

// project imports
import { GuardProps } from '@/types';
import { useContext, useEffect, useState } from 'react';
import NetworkContext from '@/contexts/NetworkContext';
import { ADDRESS_VERIFICATION } from '@/constants/url';
import useLocalStorage from '@/hooks/useLocalStorage';
import useAuth from '@/hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const router = useRouter();
  const { address } = useContext(NetworkContext);
  const [success, setSuccess] = useState(false);
  const { authToken, isLoggedIn } = useAuth();

  useEffect(() => {
    const checkAddress = async () => {
      if (authToken?.length) {
        const result = await fetch(ADDRESS_VERIFICATION, {
          headers: { authorizationToken: authToken },
        })
          .then((res) => {
            if (res.status === 404) setSuccess(false);
            return res.text();
          })
          .catch(() => {
            setSuccess(false);
          });
        if (result && result.slice(1, -1) === address?.toLowerCase()) {
          setSuccess(true);
        } else if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem('authentication-token');
          window.localStorage.removeItem('uuid-token');
          window.localStorage.removeItem('nonce');
          window.localStorage.removeItem('user-id');
        }
      }
    };
    // eslint-disable-next-line no-void
    if (authToken?.length && address?.length) void checkAddress();

    if (!isLoggedIn && !success) {
      router.replace('/');
    }
  }, [address, authToken, isLoggedIn, router, success]);

  return children;
};

export default AuthGuard;
