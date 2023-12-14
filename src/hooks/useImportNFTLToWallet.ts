import { useCallback, useContext } from 'react';
import { useWalletClient } from 'wagmi';
import NetworkContext from '@/contexts/NetworkContext';
import { NFTL_CONTRACT } from '@/constants/contracts';

/*
  ~ What it does? ~

  Import NFTL Token to Wallet

  ~ How can I use? ~

  const {handleImportNFTLToWallet} = useTokenUSDPrice();
*/

interface ImportNFTLToWalletState {
  handleImportNFTLToWallet: () => void;
}

export default function useImportNFTLToWallet(): ImportNFTLToWalletState {
  const { data: walletClient } = useWalletClient();
  const { writeContracts } = useContext(NetworkContext);
  const NFTLAddress =
    writeContracts[NFTL_CONTRACT] && writeContracts[NFTL_CONTRACT].address;

  const handleImportNFTLToWallet = useCallback(async () => {
    if (!walletClient || !NFTLAddress) return;
    try {
      const success = await walletClient.watchAsset({
        type: 'ERC20',
        options: {
          address: NFTLAddress,
          symbol: 'NFTL',
          decimals: 18,
          image:
            'https://raw.githubusercontent.com/NiftyLeague/Nifty-League-Images/main/NFTL.png',
        },
      });
      if (success) {
        console.log('Successfully added NFTL to MetaMask');
      } else {
        throw new Error('Something went wrong.');
      }
    } catch (err) {
      console.log(err);
    }
  }, [NFTLAddress, walletClient]);

  return {
    handleImportNFTLToWallet,
  };
}
