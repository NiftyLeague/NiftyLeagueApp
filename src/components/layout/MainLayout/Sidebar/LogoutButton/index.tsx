import { Button } from '@mui/material';
import { NetworkContext } from 'NetworkProvider';
import { useContext } from 'react';

export interface LogoutButtonProps {
  sx?: React.CSSProperties;
}

const LogoutButton: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<LogoutButtonProps>>
> = ({ sx }) => {
  const { logoutOfWeb3Modal, web3Modal } = useContext(NetworkContext);
  if (web3Modal && web3Modal.cachedProvider) {
    return (
      <Button sx={sx} variant="outlined" onClick={logoutOfWeb3Modal}>
        Log Out
      </Button>
    );
  }
  return null;
};

export default LogoutButton;
