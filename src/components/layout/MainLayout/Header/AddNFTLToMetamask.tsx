import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { NetworkContext } from 'NetworkProvider';
import NFTL from 'assets/images/logo.png';
import { NFTL_CONTRACT } from 'constants/contracts';

const AddNFTLToMetamask = (): JSX.Element | null => {
  const { userProvider, writeContracts } = useContext(NetworkContext);
  const NFTLAddress =
    writeContracts[NFTL_CONTRACT] && writeContracts[NFTL_CONTRACT].address;
  const handleAddToken = () => {
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
      userProvider.provider
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ type: string; options: { address: string; ... Remove this comment to see the full error message
        .request({ method: 'wallet_watchAsset', params })
        .then((success) => {
          // eslint-disable-next-line no-console
          if (success) console.log('Successfully added NFTL to MetaMask');
          else throw new Error('Something went wrong.');
        })
        .catch(console.error);
  };

  return userProvider?.provider?.isMetaMask &&
    userProvider?.provider?.request ? (
    <Button
      onClick={handleAddToken}
      variant="outlined"
      startIcon={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={NFTL} alt="NFTL logo" width={20} height={20} />
        </div>
      }
    >
      Add NFTL to MetaMask
    </Button>
  ) : null;
};

export default AddNFTLToMetamask;
