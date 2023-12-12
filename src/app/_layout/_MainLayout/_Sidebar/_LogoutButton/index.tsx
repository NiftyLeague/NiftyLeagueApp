import { useDisconnect, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { Button } from '@mui/material';

export interface LogoutButtonProps {
  sx?: React.CSSProperties;
}

const LogoutButton: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<LogoutButtonProps>>
> = ({ sx }) => {
  const { isConnected } = useWeb3ModalAccount();
  const { disconnect } = useDisconnect();
  if (isConnected) {
    return (
      <Button sx={sx} variant="outlined" onClick={() => disconnect()}>
        Log Out
      </Button>
    );
  }
  return null;
};

export default LogoutButton;
