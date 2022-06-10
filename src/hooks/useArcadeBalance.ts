import { useContext, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import { formatBalance } from 'helpers';
import { ARCADE_CONTRACT } from 'constants/contracts';

/*
  ~ What it does? ~

  Gets your arcade balance

  ~ How can I use? ~

  const {balance, loading} = useArcadeBalance();
*/

export default function useArcadeBalance(): {
  arcadeBalance: string;
  loading: boolean;
} {
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { address, readContracts } = useContext(NetworkContext);

  useEffect(() => {
    async function getArcadeBalance() {
      if (address && readContracts && readContracts[ARCADE_CONTRACT]) {
        const value: BigNumber = await readContracts[ARCADE_CONTRACT].balanceOf(
          address,
        );
        setBalance(formatBalance(value));
        setLoading(false);
      }
    }
    if (!address) {
      setBalance('');
      setLoading(false);
    }

    getArcadeBalance();
    const interval = setInterval(() => {
      getArcadeBalance();
    }, 10000);

    return () => clearInterval(interval);
  }, [address, readContracts]);

  return { arcadeBalance: balance, loading };
}
