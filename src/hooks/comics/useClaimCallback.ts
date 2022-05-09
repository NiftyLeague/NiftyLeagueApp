import { useContext } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { submitTxWithGasEstimate } from 'helpers/Notifier';
import useMerkleDistributorContract from './useMerkleDistributorContract';
import useUserClaimData from './useUserClaimData';

export default function useClaimCallback(): {
  claimCallback: () => Promise<void>;
} {
  const { selectedChainId, address: account, tx } = useContext(NetworkContext);
  // get claim data for this account
  const claimData = useUserClaimData();
  const distributorContract = useMerkleDistributorContract();

  const claimCallback = async () => {
    if (!claimData || !account || !selectedChainId || !distributorContract)
      return;
    const args = [
      claimData.index,
      account,
      claimData.amount0,
      claimData.amount1,
      claimData.proof,
    ];
    await submitTxWithGasEstimate(tx, distributorContract, 'claim', args);
  };

  return { claimCallback };
}
