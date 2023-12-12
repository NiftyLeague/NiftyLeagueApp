import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { Button, Typography, Container } from '@mui/material';
import useAuth from '@/hooks/useAuth';

const ProfileVerification = (): JSX.Element => {
  const modal = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const { signMsg } = useAuth();

  const handleConnectWallet = () => {
    if (!isConnected) {
      modal.open();
      return;
    }
    signMsg();
  };

  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      <Typography mb={2}>Please connect your wallet</Typography>
      <Button variant="contained" onClick={handleConnectWallet}>
        Connect Wallet
      </Button>
    </Container>
  );
};

export default function withVerification(
  Component: (props: any) => JSX.Element,
) {
  // eslint-disable-next-line react/display-name
  return (props: any): JSX.Element | null => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Component {...props} /> : <ProfileVerification />;
  };
}
