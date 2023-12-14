import { useContext } from 'react';
import NetworkContext from '@/contexts/NetworkContext';
import { submitTxWithGasEstimate } from '@/utils/Notifier';
import useMerkleDistributorContract from './useMerkleDistributorContract';
import useUserClaimData from './useUserClaimData';

export default function useClaimCallback(): {
  claimCallback: () => Promise<void>;
} {
  const { address, tx, selectedNetworkId } = useContext(NetworkContext);
  // get claim data for this account
  const claimData = useUserClaimData();
  const distributorContract = useMerkleDistributorContract();

  const claimCallback = async () => {
    if (!claimData || !address || !selectedNetworkId || !distributorContract)
      return;
    const args = [
      claimData.index,
      address,
      claimData.amount0,
      claimData.amount1,
      claimData.proof,
    ];
    await submitTxWithGasEstimate(tx, distributorContract, 'claim', args);
  };

  return { claimCallback };
}
