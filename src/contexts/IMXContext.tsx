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
import { IMX_NL_ITEMS } from 'constants/contracts';
import useItemsBalance from 'hooks/useItemsBalance';
import { Item } from 'types/comic';

export interface Context {
  balance?: ImmutableMethodResults.ImmutableGetBalanceResult;
  client?: ImmutableXClient;
  inventory?: ImmutableMethodResults.ImmutableGetAssetsResult;
  itemsBalance: Item[];
  link: Link;
  linkSetup: () => Promise<void>;
  loading: boolean;
  setIMXRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  wallet: string;
}

const CONTEXT_INITIAL_STATE: Context = {
  balance: undefined,
  client: undefined,
  inventory: undefined,
  itemsBalance: [],
  link: new Link(process.env.REACT_APP_SANDBOX_LINK_URL),
  linkSetup: async () => new Promise(() => null),
  loading: true,
  setIMXRefreshKey: () => {},
  wallet: 'undefined',
};

const IMXContext = createContext(CONTEXT_INITIAL_STATE);

export const IMXProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const { address, selectedChainId } = useContext(NetworkContext);
  // initialise Immutable X Link SDK
  const link = useMemo(
    () => new Link(process.env.REACT_APP_SANDBOX_LINK_URL),
    [],
  );

  const [wallet, setWallet] = useState('undefined');
  const [balance, setBalance] =
    useState<ImmutableMethodResults.ImmutableGetBalanceResult>(Object);
  const [inventory, setInventory] =
    useState<ImmutableMethodResults.ImmutableGetAssetsResult>(Object);
  const [client, setClient] = useState<ImmutableXClient>(Object);
  const [loading, setLoading] = useState(true);
  const { itemsBalance } = useItemsBalance(inventory);
  const [imxRefreshKey, setIMXRefreshKey] = useState(0);

  // set user wallet and balance from IMX or ETH network context
  const updateUser = useCallback(
    async (user) => {
      setWallet(user);
      setBalance(await client.getBalance({ user, tokenAddress: 'eth' }));
      if (selectedChainId)
        setInventory(
          await client.getAssets({
            user,
            collection: IMX_NL_ITEMS[selectedChainId],
          }),
        );
      setLoading(false);
    },
    [client, selectedChainId],
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
  }, [address, client, updateUser, imxRefreshKey]);

  // register and/or setup a user
  const linkSetup = useCallback(async () => {
    const res = await link.setup({});
    updateUser(res.address);
  }, [link, updateUser]);

  return (
    <IMXContext.Provider
      value={{
        balance,
        client,
        inventory,
        itemsBalance,
        link,
        linkSetup,
        loading,
        setIMXRefreshKey,
        wallet,
      }}
    >
      {children}
    </IMXContext.Provider>
  );
};

export default IMXContext;
