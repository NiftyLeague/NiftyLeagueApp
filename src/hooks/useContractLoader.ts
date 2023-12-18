'use client';

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import { Contract, JsonRpcSigner } from 'ethers6';
import type { Contracts, Provider } from '@/types/web3';
import { getProviderAndSigner } from '@/utils/ethers';
import { SUPPORTED_CHAIN_IDS } from '@/constants/networks';
import CONTRACTS from '@/contracts/deployments';
import EXTERNAL_CONTRACTS from '@/contracts/externalContracts';

/*
  ~ What it does? ~

  Loads your local contracts and gives options to read values from contracts
  or write transactions into them

  ~ How can I use? ~

  const readContracts = useContractLoader(publicProvider) // or
  const writeContracts = useContractLoader(signer)

  ~ Features ~

  - publicProvider enables reading values from contracts
  - signers enable writing transactions into contracts
  - Example of using setPurpose function from our contract and writing transactions by Transactor.js helper:
    await tx( writeContracts.YourContract.setPurpose(newPurpose) )

  config can include:
  - chainId - to hardcode the chainId, irrespective of the providerOrSigner chainId
*/

interface Config {
  chainId?: number;
}

export default function useContractLoader(
  providerOrSigner: Provider | JsonRpcSigner | undefined,
  config: Config = {},
): Contracts {
  const [contracts, setContracts] = useState<Contracts>({});

  useEffect(() => {
    let active = true;
    async function loadContracts() {
      if (providerOrSigner && typeof providerOrSigner !== 'undefined') {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          const { provider, signer } =
            await getProviderAndSigner(providerOrSigner);
          // if no signer is returned we can still use the provider
          let signerOrProvider: Provider | JsonRpcSigner =
            signer as JsonRpcSigner;
          if (!signer) signerOrProvider = provider as Provider;

          const { chainId } = await (provider as Provider).getNetwork();
          // eslint-disable-next-line no-underscore-dangle
          const _chainId = Number(config.chainId || chainId);
          if (!SUPPORTED_CHAIN_IDS.includes(_chainId)) return;
          // eslint-disable-next-line no-underscore-dangle
          const deployedContractList = CONTRACTS[_chainId];
          const hardhatContracts = Object.keys(deployedContractList).reduce(
            (accumulator, contractName) => {
              accumulator[contractName] = new Contract(
                deployedContractList[contractName].address,
                deployedContractList[contractName].abi,
                signerOrProvider,
              );
              return accumulator;
            },
            {},
          );
          // eslint-disable-next-line no-underscore-dangle
          const externalContractList = EXTERNAL_CONTRACTS[_chainId];
          const externalContracts = Object.keys(externalContractList).reduce(
            (accumulator, contractName) => {
              accumulator[contractName] = new Contract(
                externalContractList[contractName].address,
                externalContractList[contractName].abi,
                signerOrProvider,
              );
              return accumulator;
            },
            {},
          );
          if (active)
            setContracts({ ...hardhatContracts, ...externalContracts });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('ERROR LOADING CONTRACTS!!', e);
        }
      }
    }
    // eslint-disable-next-line no-void
    void loadContracts();
    return () => {
      active = false;
    };
  }, [providerOrSigner, config.chainId]);

  return contracts;
}
