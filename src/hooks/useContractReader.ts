'use client';

/* eslint-disable no-console */
import { useCallback, useState, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { Contracts } from '@/types/web3';
import useAsyncInterval from './useAsyncInterval';

/*
  Enables you to read values from contracts and keep track of them in the local React states

  ~ How can I use? ~

  const purpose = useContractReader(readContracts,"YourContract", "purpose")

  ~ Features ~

  - Provide readContracts by loading contracts from useContractLoader
  - Specify the name of the target contract
  - Specify the name of the function name to call from the contract
  - Pass in any args necessary
  - Provide a formatter to format the result
  - Provide a refreshKey if you wish to manually trigger a refetch
*/

export default function useContractReader(
  contracts: Contracts,
  contractName: string,
  functionName: string,
  args?: unknown[],
  pollTime?: number,
  formatter?: (unknown) => void,
  refreshKey?: string | number,
  skip: boolean = false,
): unknown {
  const [value, setValue] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const argsMemoized = useMemo(() => args, [JSON.stringify(args)]);

  const readContract = useCallback(async () => {
    if (!skip && contracts && contracts[contractName]) {
      try {
        let newValue;
        if (args && args.length > 0) {
          newValue = await contracts[contractName][functionName](...args);
        } else {
          newValue = await contracts[contractName][functionName]();
        }
        if (formatter && typeof formatter === 'function')
          newValue = formatter(newValue);
        if (!isEqual(newValue, value)) setValue(newValue);
        return;
      } catch (e) {
        console.log('Read Contract Error:', contractName, e);
      }
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    argsMemoized,
    contractName,
    contracts,
    formatter,
    functionName,
    refreshKey,
    skip,
    value,
  ]);

  useAsyncInterval(readContract, pollTime, true, JSON.stringify(args));

  return value;
}
