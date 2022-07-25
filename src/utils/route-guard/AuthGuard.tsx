import { useNavigate } from 'react-router-dom';

// project imports
import { GuardProps } from 'types';
import { useContext, useEffect, useState } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { ADDRESS_VERIFICATION } from 'constants/url';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
  const navigate = useNavigate();
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
    // eslint-disable-next-line no-void
    if (auth && address) void checkAddress();

    if (!auth && !success) {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, success]);

  return children;
};

export default AuthGuard;
