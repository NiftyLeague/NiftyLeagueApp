import { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Grid, Button, Stack, Skeleton, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@apollo/client';
import { BigNumber, utils } from 'ethers';

import { sectionSpacing } from 'store/constant';
import SectionTitle from 'components/sections/SectionTitle';
import HoverDataCard from 'components/cards/HoverDataCard';
import { Dialog, DialogTrigger, DialogContent } from 'components/dialog';
import { NetworkContext } from 'NetworkProvider';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { Owner } from 'types/graph';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import useNFTLBalance from 'hooks/useNFTLBalance';
import useGameBalance from 'hooks/useGameBalance';
import usePlayerProfile from 'hooks/usePlayerProfile';
import { formatNumberToDisplay } from 'utils/numbers';
import { GAME_ACCOUNT_CONTRACT, NFTL_CONTRACT } from 'constants/contracts';
import {
  BALANCE_INTERVAL,
  CHARACTERS_SUBGRAPH_INTERVAL,
  DEBUG,
} from 'constants/index';
import { WITHDRAW_NFTL_SIGN, WITHDRAW_NFTL_REFRESH } from 'constants/url';
import DepositForm from './DepositForm';
import RefreshBalanceForm from './RefreshBalanceForm';
import WithdrawForm from './WithdrawForm';

const MyNFTL = (): JSX.Element => {
  const theme = useTheme();
  const auth = window.localStorage.getItem('authentication-token');
  const { address, writeContracts, tx } = useContext(NetworkContext);
  const [refreshTimeout, setRefreshTimeout] = useState(0);
  const [refreshBalKey, setRefreshBalKey] = useState(0);
  const [refreshAccKey, setRefreshAccKey] = useState(0);
  const { profile, error: profileError } = usePlayerProfile();
  const { gameBal, error: accError } = useGameBalance(refreshAccKey);
  const userNFTLBalance = useNFTLBalance(
    address,
    BALANCE_INTERVAL,
    refreshBalKey,
  );

  const { loading, data }: { loading: boolean; data?: { owner: Owner } } =
    useQuery(OWNER_QUERY, {
      pollInterval: CHARACTERS_SUBGRAPH_INTERVAL,
      variables: { address: address?.toLowerCase() },
      skip: !address,
    });

  const characters = useMemo(() => {
    const characterList = data?.owner?.characters
      ? [...data.owner.characters]
      : [];
    return characterList.sort(
      (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10),
    );
  }, [data]);

  const tokenIndices = useMemo(
    () => characters.map((char) => parseInt(char.id, 10)),
    [characters],
  );

  const [mockAccrued, setMockAccrued] = useState(0);
  const [refreshClaimKey, setRefreshClaimKey] = useState(0);
  const totalAccrued = useClaimableNFTL(
    writeContracts,
    tokenIndices,
    refreshClaimKey,
  );
  useEffect(() => {
    if (totalAccrued) setMockAccrued(totalAccrued);
  }, [totalAccrued]);

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('claim', tokenIndices, totalAccrued);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const res = await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    if (res) {
      setMockAccrued(0);
      setTimeout(() => setRefreshClaimKey(Math.random() + 1), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIndices, totalAccrued, tx, writeContracts]);

  const handleDepositNFTL = useCallback(
    async (amount: number) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('deposit', amount);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const txRes = await tx(
        writeContracts[GAME_ACCOUNT_CONTRACT].deposit(
          utils.parseEther(`${amount}`),
        ),
      );
      setRefreshAccKey(Math.random());
      setRefreshBalKey(Math.random());
      return txRes;
    },
    [tx, writeContracts],
  );

  const handleWithdrawNFTL = useCallback(
    async (amount: number) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('withdraw', amount);
      const amountWEI = utils.parseEther(`${amount}`);
      const body = JSON.stringify({
        amount: amountWEI.toString(),
        address,
      });
      try {
        const response = await fetch(WITHDRAW_NFTL_SIGN, {
          headers: { authorizationToken: auth as string },
          method: 'POST',
          body,
        });
        if (!response.ok) throw new Error(response.statusText);
        const signData = await response.json();
        // eslint-disable-next-line no-console
        if (DEBUG) console.log('signData', signData);
        const { signature, nonce } = signData as {
          signature: string;
          nonce: number;
        };
        const txRes = await tx(
          writeContracts[GAME_ACCOUNT_CONTRACT].withdraw(
            amountWEI,
            BigNumber.from(nonce),
            signature,
          ),
        );
        // eslint-disable-next-line no-console
        if (DEBUG) console.log('txRes', txRes);
        setRefreshBalKey(Math.random());
        setRefreshAccKey(Math.random());
        return txRes;
      } catch (error) {
        console.error('error', error);
        return null;
      }
    },
    [address, auth, tx, writeContracts],
  );

  const handleRefreshBal = useCallback(async () => {
    try {
      const response = await fetch(WITHDRAW_NFTL_REFRESH, {
        headers: { authorizationToken: auth as string },
        method: 'POST',
      });
      if (!response.ok) throw new Error(response.statusText);
      setRefreshTimeout(1);
      setRefreshAccKey(Math.random());
    } catch (error) {
      console.error('error', error);
    }
  }, [auth]);

  return (
    <Grid container spacing={sectionSpacing}>
      <Grid item xs={12}>
        <SectionTitle
          firstSection
          actions={
            <Stack direction="row" gap={2}>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={120}
                  height={40}
                />
              ) : (
                <Button variant="outlined" onClick={handleClaimNFTL}>
                  Claim All {formatNumberToDisplay(mockAccrued)} NFTL
                </Button>
              )}
            </Stack>
          }
        >
          My NFTL
        </SectionTitle>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={sectionSpacing}>
          <Grid item sm={6} xs={12}>
            <HoverDataCard
              title="NFTL in Wallet"
              primary={formatNumberToDisplay(userNFTLBalance)}
              isLoading={loading}
              customStyle={{
                backgroundColor: theme.palette.background.default,
                border: '1px solid',
                borderColor: theme.palette.grey[800],
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Grid container spacing={sectionSpacing}>
              <Grid item xs={12}>
                <HoverDataCard
                  title="All-Time Rental Earnings"
                  primary={
                    !profileError
                      ? formatNumberToDisplay(
                          profile?.stats?.total?.rental_earnings || 0,
                        )
                      : 0
                  }
                  isLoading={loading}
                  customStyle={{
                    backgroundColor: theme.palette.background.default,
                    border: '1px solid',
                    borderColor: theme.palette.grey[800],
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <HoverDataCard
                  title="All-Time Game Earnings"
                  primary={
                    !profileError
                      ? formatNumberToDisplay(
                          profile?.stats?.total?.earnings || 0,
                        )
                      : 0
                  }
                  isLoading={loading}
                  customStyle={{
                    backgroundColor: theme.palette.background.default,
                    border: '1px solid',
                    borderColor: theme.palette.grey[800],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={sectionSpacing}>
          <Grid item sm={6} xs={12}>
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
                        <RefreshIcon />
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
                  : `${formatNumberToDisplay(gameBal) || '0.00'} NFTL`
              }`}
              isLoading={loading}
              customStyle={{
                backgroundColor: theme.palette.background.default,
                border: '1px solid',
                borderColor: theme.palette.grey[800],
                position: 'relative',
              }}
              secondary="Available to Claim"
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
                        balance={gameBal}
                        onWithdrawEarnings={handleWithdrawNFTL}
                      />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <Button fullWidth variant="outlined">
                        Deposit
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-labelledby="deposit-dialog"
                      dialogTitle="Deposit into Game Account"
                      sx={{
                        '& h2': {
                          textAlign: 'center',
                        },
                        '& .MuiDialogContent-root': {
                          textAlign: 'center',
                        },
                      }}
                    >
                      <DepositForm
                        balance={userNFTLBalance}
                        onDeposit={handleDepositNFTL}
                      />
                    </DialogContent>
                  </Dialog>
                </Stack>
              }
            />
          </Grid>
          <Grid item sm={6} xs={12}>
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
                  fullWidth
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
