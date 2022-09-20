import { Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import NetworkContext from 'contexts/NetworkContext';
import { useContext } from 'react';

export interface LogoutButtonProps {
  sx?: React.CSSProperties;
}

const LogoutButton: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<LogoutButtonProps>>
> = ({ sx }) => {
  const { logoutOfWeb3Modal } = useContext(NetworkContext);
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return (
      <Button sx={sx} variant="outlined" onClick={logoutOfWeb3Modal}>
        Log Out
      </Button>
    );
  }
  return null;
};

export default LogoutButton;
