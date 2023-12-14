import { useContext } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import NetworkContext from '@/contexts/NetworkContext';
import useImportNFTLToWallet from '@/hooks/useImportNFTLToWallet';

const AddNFTLToMetamask = (): JSX.Element | null => {
  const { isConnected } = useContext(NetworkContext);
  const { handleImportNFTLToWallet } = useImportNFTLToWallet();

  return isConnected ? (
    <Button
      onClick={handleImportNFTLToWallet}
      variant="outlined"
      startIcon={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/NFTL.png"
            alt="NFTL logo"
            width={20}
            height={20}
          />
        </div>
      }
    >
      Add NFTL to MetaMask
    </Button>
  ) : null;
};

export default AddNFTLToMetamask;
