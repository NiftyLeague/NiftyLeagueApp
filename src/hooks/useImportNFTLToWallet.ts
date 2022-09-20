import { useCallback, useContext } from 'react';
import NetworkContext from 'contexts/NetworkContext';
import { NFTL_CONTRACT } from 'constants/contracts';

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
  const { userProvider, writeContracts } = useContext(NetworkContext);
  const NFTLAddress =
    writeContracts[NFTL_CONTRACT] && writeContracts[NFTL_CONTRACT].address;

  const handleImportNFTLToWallet = useCallback(async () => {
    if (!userProvider) return;
    const params = {
      type: 'ERC20',
      options: {
        address: NFTLAddress,
        symbol: 'NFTL',
        decimals: 18,
        image:
          'https://raw.githubusercontent.com/NiftyLeague/Nifty-League-Images/main/NFTL.png',
      },
    };
    if (userProvider?.provider?.request)
      try {
        const success = await userProvider.provider
          // @ts-expect-error ts-migrate(2740) FIXME: Type '{ type: string; options: { address: string; ... Remove this comment to see the full error message
          .request({ method: 'wallet_watchAsset', params });
        if (success) {
          console.log('Successfully added NFTL to MetaMask');
        } else {
          throw new Error('Something went wrong.');
        }
      } catch (err) {
        console.log(err);
      }
  }, [NFTLAddress, userProvider]);

  return {
    handleImportNFTLToWallet,
  };
}
