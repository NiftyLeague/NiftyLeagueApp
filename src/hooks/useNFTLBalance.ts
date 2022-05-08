import { useContext, useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import useContractReader from './useContractReader';
import { BALANCE_INTERVAL } from '../constants';
import { NFTL_CONTRACT } from 'constants/contracts';

/*
  ~ What it does? ~

  Gets your balance in NFTL from given address via user provider

  ~ How can I use? ~

  const yourBalance = useNFTLBalance(address);
*/

export default function useNFTLBalance(
  address: string,
  pollTime = BALANCE_INTERVAL,
  refreshKey?: string | number,
): number {
  const { writeContracts } = useContext(NetworkContext);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const result = useContractReader(
    writeContracts,
    NFTL_CONTRACT,
    'balanceOf',
    [address],
    pollTime,
    undefined,
    refreshKey,
  ) as BigNumber;
  useEffect(() => {
    if (result && result !== balance) setBalance(result);
  }, [result, balance]);
  return parseFloat(utils.formatEther(balance));
}
