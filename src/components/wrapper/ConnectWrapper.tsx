import { useCallback } from 'react';
import { Button } from '@mui/material';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import useAuth from '@/hooks/useAuth';

export interface ConnectWrapperProps {
  variant?: 'contained' | 'outlined';
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  fullWidth?: boolean;
  children: React.ReactElement;
  buttonText?: string;
}

const ConnectWrapper = (props: ConnectWrapperProps) => {
  const { children, buttonText, ...otherProps } = props;
  const modal = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const { isLoggedIn, signMsg } = useAuth();

  const handleConnectWallet = useCallback(() => {
    if (!isConnected) {
      modal.open();
      return;
    }
    signMsg();
  }, [isConnected, signMsg, modal]);

  return isLoggedIn ? (
    children
  ) : (
    <Button variant="contained" {...otherProps} onClick={handleConnectWallet}>
      {buttonText || 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWrapper;
