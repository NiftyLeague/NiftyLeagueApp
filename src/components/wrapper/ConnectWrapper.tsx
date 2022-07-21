import { Button } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import React, { useCallback, useContext } from 'react';
import { sendEvent } from 'utils/google-analytics';
import { GOOGLE_ANALYTICS } from 'constants/google-analytics';

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
  const { loadWeb3Modal, web3Modal } = useContext(NetworkContext);

  const handleConnectWallet = useCallback(() => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.LOGIN,
      GOOGLE_ANALYTICS.CATEGORIES.ENGAGEMENT,
      'method',
    );
    loadWeb3Modal();
  }, [loadWeb3Modal]);

  return web3Modal.cachedProvider ? (
    children
  ) : (
    <Button variant="contained" {...otherProps} onClick={handleConnectWallet}>
      {buttonText || 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWrapper;
