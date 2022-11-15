import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, ImmutableXClient, ImmutableMethodResults } from '@imtbl/imx-sdk';
import NetworkContext from 'contexts/NetworkContext';

export interface Context {
  balance?: ImmutableMethodResults.ImmutableGetBalanceResult;
  client?: ImmutableXClient;
  link: Link;
  linkSetup: () => Promise<void>;
  wallet: string;
}

const CONTEXT_INITIAL_STATE: Context = {
  balance: undefined,
  client: undefined,
  link: new Link(process.env.REACT_APP_SANDBOX_LINK_URL),
  linkSetup: async () => new Promise(() => null),
  wallet: 'undefined',
};

const IMXContext = createContext(CONTEXT_INITIAL_STATE);

export const IMXProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const { address } = useContext(NetworkContext);
  // initialise Immutable X Link SDK
  const link = useMemo(
    () => new Link(process.env.REACT_APP_SANDBOX_LINK_URL),
    [],
  );

  const [wallet, setWallet] = useState('undefined');
  const [balance, setBalance] =
    useState<ImmutableMethodResults.ImmutableGetBalanceResult>(Object);
  const [client, setClient] = useState<ImmutableXClient>(Object);

  // set user wallet and balance from IMX or ETH network context
  const updateUser = useCallback(
    async (user) => {
      setWallet(user);
      setBalance(await client.getBalance({ user, tokenAddress: 'eth' }));
    },
    [client],
  );

  useEffect(() => {
    buildIMX();
  }, []);

  // initialise an Immutable X Client to interact with apis more easily
  async function buildIMX() {
    const publicApiUrl: string = process.env.REACT_APP_SANDBOX_ENV_URL ?? '';
    setClient(await ImmutableXClient.build({ publicApiUrl }));
  }

  useEffect(() => {
    if (address) {
      updateUser(address);
    }
  }, [address, client, updateUser]);

  // register and/or setup a user
  const linkSetup = useCallback(async () => {
    const res = await link.setup({});
    updateUser(res.address);
  }, [link, updateUser]);

  return (
    <IMXContext.Provider value={{ balance, client, link, linkSetup, wallet }}>
      {children}
    </IMXContext.Provider>
  );
};

export default IMXContext;
