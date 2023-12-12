'use client';

import { useContext, useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import NetworkContext from '@/contexts/NetworkContext';
import useContractReader from './useContractReader';
import { NFTL_CONTRACT } from '@/constants/contracts';

/*
  ~ What it does? ~

  Gets your balance in NFTL from given address via user provider

  ~ How can I use? ~

  const yourBalance = useNFTLBalance(address);
*/

export default function useNFTLBalance(
  address: string = '',
  refreshKey?: string | number,
): number {
  const { readContracts } = useContext(NetworkContext);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const result = useContractReader(
    readContracts,
    NFTL_CONTRACT,
    'balanceOf',
    [address],
    undefined,
    undefined,
    refreshKey,
    !address.length,
  ) as BigNumber;
  useEffect(() => {
    if (result && result !== balance) setBalance(result);
  }, [result, balance]);
  return parseFloat(utils.formatEther(balance));
}
