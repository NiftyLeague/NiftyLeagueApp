'use client';

import { useCallback, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { Button, Stack, Typography } from '@mui/material';
import BalanceContext from '@/contexts/BalanceContext';
import useAuth from '@/hooks/useAuth';
import ErrorBoundary from '@/components/wrapper/ErrorBoundary';
import Preloader from '@/components/Preloader';
import { DEGEN_OPENSEA_URL } from '@/constants/url';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const CharacterCreator = dynamic(() => import('./_CharacterCreator'), {
  ssr: false,
});

const MintPage = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isDegenOwner } = useContext(BalanceContext);
  const { isLoggedIn, signMsg } = useAuth();
  const modal = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();

  const searchParams = useSearchParams();
  const { nifty_artists: isForNiftyArtists } = Object.fromEntries(
    searchParams.entries(),
  );

  const handleConnectWallet = useCallback(() => {
    if (!isConnected) {
      modal.open();
      return;
    }
    signMsg();
  }, [isConnected, modal, signMsg]);

  if (!isForNiftyArtists) {
    if (!isLoggedIn) {
      return (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h1" component="div" textAlign="center">
            Please connect your wallet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConnectWallet}
            sx={{ mt: 4 }}
          >
            Connect Wallet
          </Button>
        </Stack>
      );
    }

    if (!isDegenOwner) {
      return (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h1" component="div" textAlign="center">
            This page is accessible to DEGEN owners only.
          </Typography>
          <Link href={DEGEN_OPENSEA_URL} target="_blank" rel="noreferrer">
            <Button variant="contained" color="primary" sx={{ mt: 4 }}>
              Buy A DEGEN
            </Button>
          </Link>
        </Stack>
      );
    }
  }

  return (
    <div style={{ textAlign: 'center', overflowX: 'hidden' }}>
      <ErrorBoundary>
        <Preloader ready={isLoaded} progress={progress} />
        <CharacterCreator
          isLoaded={isLoaded}
          setLoaded={setLoaded}
          setProgress={setProgress}
        />
      </ErrorBoundary>
    </div>
  );
};

export default MintPage;
