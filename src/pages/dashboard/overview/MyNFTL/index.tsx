import { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Grid, Button, Stack, Skeleton } from '@mui/material';
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
import { Account, Profile } from 'types/account';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import useNFTLBalance from 'hooks/useNFTLBalance';
import { formatNumberToDisplay } from 'utils/numbers';
import { GAME_ACCOUNT_CONTRACT, NFTL_CONTRACT } from 'constants/contracts';
import {
  BALANCE_INTERVAL,
  CHARACTERS_SUBGRAPH_INTERVAL,
  DEBUG,
} from 'constants/index';
import {
  GAMER_ACCOUNT_API,
  MY_PROFILE_API_URL,
  WITHDRAW_NFTL_SIGN,
} from 'constants/url';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';

interface MyNFTLProps {
  onClaimAll?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyNFTL = ({ onClaimAll }: MyNFTLProps): JSX.Element => {
  const theme = useTheme();
  const { address, writeContracts, tx } = useContext(NetworkContext);
  const [refreshBalKey, setRefreshBalKey] = useState(0);
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

  const mockAccruedStr = formatNumberToDisplay(mockAccrued);
  const walletBal = formatNumberToDisplay(userNFTLBalance);

  const auth = window.localStorage.getItem('authentication-token');
  const [account, setAccount] = useState<Account>();
  const [accError, setAccError] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [profileError, setProfileError] = useState(false);

  const fetchAccount = useCallback(async () => {
    if (auth) {
      const result = await fetch(GAMER_ACCOUNT_API, {
        headers: { authorizationToken: auth },
      })
        .then((res) => {
          if (res.status === 404) setAccError(true);
          return res.text();
        })
        .catch(() => {
          setAccError(true);
        });
      if (result) setAccount(JSON.parse(result));
    }
  }, [auth]);

  const fetchProfile = useCallback(async () => {
    if (auth) {
      const result = await fetch(MY_PROFILE_API_URL, {
        headers: { authorizationToken: auth },
      })
        .then((res) => {
          if (res.status === 404) setProfileError(true);
          return res.text();
        })
        .catch(() => {
          setProfileError(true);
        });
      if (result) setProfile(JSON.parse(result));
    }
  }, [auth]);

  useEffect(() => {
    if (auth) {
      fetchAccount();
      fetchProfile();
    }
  }, [auth, fetchAccount, fetchProfile]);

  const gameBal = account?.balance ? account.balance : 0;

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('claim', tokenIndices, totalAccrued);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    setMockAccrued(0);
    setTimeout(() => setRefreshClaimKey(Math.random() + 1), 5000);
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
      await fetchAccount();
      setRefreshBalKey(Math.random());
      return txRes;
    },
    [tx, writeContracts, fetchAccount],
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
        await fetchAccount();
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
        return txRes;
      } catch (error) {
        console.error('error', error);
        return null;
      }
    },
    [address, auth, tx, writeContracts, fetchAccount],
  );

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
                  Claim All {mockAccruedStr} NFTL
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
              primary={walletBal}
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
              title="Game &amp; Rental Balance"
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
                      <Button fullWidth variant="contained" color="secondary">
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
              primary={`${mockAccrued ? mockAccruedStr : '0.00'} NFTL`}
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
