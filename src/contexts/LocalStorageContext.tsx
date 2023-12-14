'use client';

import { createContext, type Dispatch, type SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import useLocalStorage from '@/hooks/useLocalStorage';
import { AUTH_Token, UUID_Token, Nonce, AgreementAccepted } from '@/types/auth';

// ==============================|| Local Storage CONTEXT & PROVIDER ||============================== //

type LocalStorageContextType = {
  // AUTH
  authToken?: AUTH_Token;
  setAuthToken: Dispatch<SetStateAction<AUTH_Token>>;
  clearAuthToken: () => void;
  // UUID
  uuidToken?: UUID_Token;
  setUUIDToken: Dispatch<SetStateAction<UUID_Token>>;
  clearUUIDToken: () => void;
  // NONCE
  nonce?: Nonce;
  setNonce: Dispatch<SetStateAction<Nonce>>;
  clearNonce: () => void;
  // USER ID
  userId?: string;
  setUserId: Dispatch<SetStateAction<string | undefined>>;
  clearUserId: () => void;
  // FAV DEGENS
  favDegens?: string[];
  setFavDegens: Dispatch<SetStateAction<string[] | undefined>>;
  // FAV DEGENS
  agrementAccepted?: AgreementAccepted;
  setAgreementAccepted: Dispatch<SetStateAction<AgreementAccepted>>;
};
const LocalStorageContext = createContext<LocalStorageContextType | null>(null);

export const LocalStorageProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [authToken, setAuthToken, clearAuthToken] = useLocalStorage<AUTH_Token>(
    'authentication-token',
    undefined,
  );
  const [uuidToken, setUUIDToken, clearUUIDToken] = useLocalStorage<UUID_Token>(
    'uuid-token',
    `${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}`,
  );
  const [nonce, setNonce, clearNonce] = useLocalStorage<Nonce>(
    'nonce',
    `0x${crypto.randomBytes(4).toString('hex')}`,
  );
  const [userId, setUserId, clearUserId] = useLocalStorage<string | undefined>(
    'user-id',
    undefined,
  );
  const [favDegens, setFavDegens] = useLocalStorage<string[]>('FAV_DEGENS', []);
  const [agrementAccepted, setAgreementAccepted] =
    useLocalStorage<AgreementAccepted>('aggreement-accepted', 'FALSE');

  return (
    <LocalStorageContext.Provider
      value={{
        authToken,
        setAuthToken,
        clearAuthToken,
        uuidToken,
        setUUIDToken,
        clearUUIDToken,
        nonce,
        setNonce,
        clearNonce,
        userId,
        setUserId,
        clearUserId,
        favDegens,
        setFavDegens,
        agrementAccepted,
        setAgreementAccepted,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageContext;
