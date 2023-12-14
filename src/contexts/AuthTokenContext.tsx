'use client';

import { createContext, useCallback, useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

import { AuthTokenContextType } from '@/types/auth';
import { useSelector } from '@/store';
import useCheckAuth from '@/hooks/useCheckAuth';
import useLocalStorageContext from '@/hooks/useLocalStorageContext';
import useSignAuthMsg from '@/hooks/useSignAuthMsg';

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const AuthTokenContext = createContext<AuthTokenContextType | null>(null);

export const AuthTokenProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const modal = useWeb3Modal();
  const { isConnected } = useAccount();

  const { checkAddress } = useCheckAuth();
  const { signMessage } = useSignAuthMsg();
  const { isLoggedIn } = useSelector((state) => state.account);
  const [msgSent, setMsgSent] = useState(false);
  const { authToken } = useLocalStorageContext();

  const signMsg = useCallback(async () => {
    const initialized = await checkAddress();
    if (!initialized) await signMessage();
    setMsgSent(true);
  }, [checkAddress, signMessage]);

  const handleConnectWallet = useCallback(async () => {
    if (!isConnected) {
      modal.open();
      return;
    }
    await signMsg();
  }, [isConnected, signMsg, modal]);

  useEffect(() => {
    if (!msgSent && isConnected && !isLoggedIn) handleConnectWallet();
  }, [isConnected, isLoggedIn, msgSent, handleConnectWallet]);

  return (
    <AuthTokenContext.Provider
      value={{
        authToken,
        handleConnectWallet,
        isConnected,
        isLoggedIn,
      }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};

export default AuthTokenContext;
