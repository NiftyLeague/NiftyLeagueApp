'use client';

import { useContext, useState, useCallback, useEffect } from 'react';
import { Grid, Button, Stack, IconButton } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { useTheme } from '@mui/material/styles';
import { BigNumber, providers, utils } from 'ethers';

import { sectionSpacing } from '@/themes/constant';
import SectionTitle from '@/components/sections/SectionTitle';
import HoverDataCard from '@/components/cards/HoverDataCard';
import { Dialog, DialogTrigger, DialogContent } from '@/components/dialog';
import NetworkContext from '@/contexts/NetworkContext';
import useAccount from '@/hooks/useAccount';
import { formatNumberToDisplay } from '@/utils/numbers';
import { GAME_ACCOUNT_CONTRACT, NFTL_CONTRACT } from '@/constants/contracts';
import { DEBUG } from '@/constants/index';
import { WITHDRAW_NFTL_SIGN, WITHDRAW_NFTL_REFRESH } from '@/constants/url';
import RefreshBalanceForm from '@/app/(private-routes)/dashboard/overview/_MyNFTL/RefreshBalanceForm';
import WithdrawForm from '@/app/(private-routes)/dashboard/overview/_MyNFTL/WithdrawForm';
import BalanceContext from '@/contexts/BalanceContext';
import useAuth from '@/hooks/useAuth';

const MyNFTL = (): JSX.Element => {
  const theme = useTheme();
  const { authToken } = useAuth();
  const { address, writeContracts, tx } = useContext(NetworkContext);
  const [refreshTimeout, setRefreshTimeout] = useState(0);
  const [refreshAccKey, setRefreshAccKey] = useState(0);
  const { account, error: accError } = useAccount(refreshAccKey);
  const [mockAccrued, setMockAccrued] = useState(0);
  const {
    totalAccrued,
    refreshClaimableNFTL,
    userNFTLBalance,
    refreshNFTLBalance,
    tokenIndices,
    loading,
  } = useContext(BalanceContext);

  useEffect(() => {
    if (totalAccrued) setMockAccrued(totalAccrued);
  }, [totalAccrued]);

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('claim', tokenIndices, totalAccrued);
    const res = await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    if (res) {
      setMockAccrued(0);
      setTimeout(refreshClaimableNFTL, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIndices, totalAccrued, tx, writeContracts]);

  const handleWithdrawNFTL = useCallback(
    async (
      amount: number,
    ): Promise<{
      txRes: providers.TransactionResponse | null;
      error?: Error;
    }> => {
      const amountWEI = utils.parseEther(`${amount}`);
      const body = JSON.stringify({
        amount: amountWEI.toString(),
        address,
      });
      try {
        const response = await fetch(WITHDRAW_NFTL_SIGN, {
          headers: { authorizationToken: authToken as string },
          method: 'POST',
          body,
        });
        if (!response.ok) {
          const errMsg = await response.text();
          throw new Error(errMsg);
        }
        const signData = await response.json();
        // eslint-disable-next-line no-console
        if (DEBUG) console.log('SIG_REQ_DATA', signData);
        const { expire_at, signature, nonce } = signData as {
          expire_at: number;
          signature: string;
          nonce: number;
        };
        const txRes = await tx(
          writeContracts[GAME_ACCOUNT_CONTRACT].withdraw(
            amountWEI,
            BigNumber.from(nonce),
            expire_at,
            signature,
          ),
        );
        // eslint-disable-next-line no-console
        if (DEBUG) console.log('TX_DATA', txRes);
        refreshNFTLBalance();
        setRefreshAccKey(Math.random());
        return { txRes };
      } catch (error) {
        console.error('error', error);
        return { txRes: null, error: error as Error };
      }
    },
    [address, authToken, tx, writeContracts, refreshNFTLBalance],
  );

  const handleRefreshBal = useCallback(async () => {
    try {
      const response = await fetch(WITHDRAW_NFTL_REFRESH, {
        headers: { authorizationToken: authToken as string },
        method: 'POST',
      });
      if (!response.ok) throw new Error(response.statusText);
      setRefreshTimeout(1);
      setRefreshAccKey(Math.random());
    } catch (error) {
      console.error('error', error);
    }
  }, [authToken]);

  return (
    <Grid container spacing={sectionSpacing}>
      <Grid item xs={12}>
        <SectionTitle firstSection>My NFTL</SectionTitle>
      </Grid>
      <Grid item xs={12}>
        <HoverDataCard
          title="Wallet Balance"
          primary={`${formatNumberToDisplay(userNFTLBalance)} NFTL`}
          customStyle={{
            backgroundColor: theme.palette.background.default,
            border: '1px solid',
            borderColor: theme.palette.grey[800],
          }}
          secondary="Available to Spend"
          isLoading={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={sectionSpacing}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <HoverDataCard
              title={
                <>
                  Game &amp; Rental Balance
                  <Dialog>
                    <DialogTrigger>
                      <IconButton
                        color="primary"
                        component="span"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                      >
                        <HistoryIcon />
                      </IconButton>
                    </DialogTrigger>
                    <DialogContent
                      aria-labelledby="refresh-dialog"
                      dialogTitle="Withdrawal Request History"
                      sx={{
                        '& h2': {
                          textAlign: 'center',
                        },
                        '& .MuiDialogContent-root': {
                          textAlign: 'center',
                        },
                      }}
                    >
                      <RefreshBalanceForm
                        refreshTimeout={refreshTimeout}
                        onRefresh={handleRefreshBal}
                      />
                    </DialogContent>
                  </Dialog>
                </>
              }
              primary={`${
                accError
                  ? 'Error fetching balance'
                  : `${
                      account
                        ? formatNumberToDisplay(account?.balance! ?? 0)
                        : '0.00'
                    } NFTL`
              }`}
              isLoading={loading}
              customStyle={{
                backgroundColor: theme.palette.background.default,
                border: '1px solid',
                borderColor: theme.palette.grey[800],
                position: 'relative',
              }}
              secondary="Available to Withdraw"
              actions={
                <Stack direction="row" gap={2}>
                  <Dialog>
                    <DialogTrigger>
                      <Button fullWidth variant="contained">
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-labelledby="customized-dialog-title"
                      dialogTitle="Withdraw Game &amp; Rental Earnings"
                      sx={{
                        '& h2': {
                          textAlign: 'center',
                        },
                        '& .MuiDialogContent-root': {
                          textAlign: 'center',
                        },
                      }}
                    >
                      <WithdrawForm
                        balance={account?.balance! || 0}
                        onWithdrawEarnings={handleWithdrawNFTL}
                      />
                    </DialogContent>
                  </Dialog>
                </Stack>
              }
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <HoverDataCard
              title="Daily NFTL Accrued"
              primary={`${
                mockAccrued ? formatNumberToDisplay(mockAccrued) : '0.00'
              } NFTL`}
              customStyle={{
                backgroundColor: theme.palette.background.default,
                border: '1px solid',
                borderColor: theme.palette.grey[800],
              }}
              secondary="Available to Claim"
              isLoading={loading}
              actions={
                <Button
                  variant="contained"
                  disabled={
                    !(mockAccrued > 0.0 && writeContracts[NFTL_CONTRACT])
                  }
                  onClick={handleClaimNFTL}
                >
                  Claim NFTL
                </Button>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyNFTL;
