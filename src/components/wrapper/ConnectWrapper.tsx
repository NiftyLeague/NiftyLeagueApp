import { Button } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import React, { useCallback, useContext } from 'react';
import useAuth from 'hooks/useAuth';

export interface ConnectWrapperProps {
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
  const { address, loadWeb3Modal } = useContext(NetworkContext);
  const { isLoggedIn, signMsg } = useAuth();

  const handleConnectWallet = useCallback(() => {
    if (!address) {
      loadWeb3Modal();
      return;
    }

    signMsg();
  }, [address, signMsg, loadWeb3Modal]);

  return isLoggedIn ? (
    children
  ) : (
    <Button variant="contained" {...otherProps} onClick={handleConnectWallet}>
      {buttonText || 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWrapper;
