import React, { createContext, useEffect, useReducer, useContext } from 'react';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'components/Loader';

// types
import { InitialLoginContextProps, TokenContextType } from 'types/auth';
import { NetworkContext } from 'NetworkProvider';
import { getProviderAndSigner } from 'helpers';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { address, userProvider } = useContext(NetworkContext);
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const nonce = `0x${crypto.randomBytes(4).toString('hex')}`;
  const token = `${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}`;

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const init = async () => {
      try {
        if (address && userProvider && nonce && token) {
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

            const result = await fetch(
              'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/verification',
              {
                method: 'POST',
                body: JSON.stringify({
                  token,
                  nonce,
                  verification,
                  address: addressToLower,
                }),
              },
            )
              .then((res) => {
                if (res.status === 404) {
                  dispatch({
                    type: LOGOUT,
                  });
                  throw Error('Failed to verify signature!');
                }
                return res.text();
              })
              .catch(() => {
                dispatch({
                  type: LOGOUT,
                });
                throw Error('Failed to verify signature!');
              });

            if (result?.length) {
              dispatch({
                type: LOGIN,
                payload: {
                  isLoggedIn: true,
                },
              });

              const auth = result.slice(1, -1);
              window.localStorage.setItem('authentication-token', auth);
              window.localStorage.setItem('uuid-token', token);
              window.localStorage.setItem('nonce', nonce);

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
        dispatch({
          type: LOGOUT,
        });
        return null;
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <TokenContext.Provider
      value={{
        ...state,
        logout,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
