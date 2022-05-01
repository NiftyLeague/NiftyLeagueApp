import { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Grid, Button, Stack, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@apollo/client';

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
import { GAME_ACCOUNT_CONTRACT, NFTL_CONTRACT } from 'constants/contracts';
import { CHARACTERS_SUBGRAPH_INTERVAL, DEBUG } from '../../../../constants';
import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';
import { MY_PROFILE_API_URL } from 'constants/url';

interface MyNFTLProps {
  onWithdraw?: React.MouseEventHandler<HTMLButtonElement>;
  onClaimAll?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyNFTL = ({ onWithdraw, onClaimAll }: MyNFTLProps): JSX.Element => {
  const theme = useTheme();
  const { address, writeContracts, tx } = useContext(NetworkContext);
  const userNFTLBalance = useNFTLBalance(address);

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

  const [mockAccumulated, setMockAccumulated] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const totalAccumulated = useClaimableNFTL(
    writeContracts,
    tokenIndices,
    refreshKey,
  );

  useEffect(() => {
    if (totalAccumulated) setMockAccumulated(totalAccumulated);
  }, [totalAccumulated]);

  const amountParsed = mockAccumulated.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const walletBal = userNFTLBalance.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const auth = window.localStorage.getItem('authentication-token');
  const [account, setAccount] = useState<Account>();
  const [accError, setAccError] = useState(false);
  const [profile, setProfile] = useState<Profile>();
  const [profileError, setProfileError] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      if (auth) {
        const result = await fetch(
          'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/accounts/account',
          {
            headers: { authorizationToken: auth },
          },
        )
          .then((res) => {
            if (res.status === 404) setAccError(true);
            return res.text();
          })
          .catch(() => {
            setAccError(true);
          });
        if (result) setAccount(JSON.parse(result));
      }
    };

    const fetchProfile = async () => {
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
    };

    if (auth) {
      fetchAccount();
      fetchProfile();
    }
  }, [auth]);

  const gameBal = account?.balance
    ? parseFloat(
        account.balance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      )
    : 0;

  const totalNFTL = account?.balance || 0 + mockAccumulated;
  const totalNFTLFormatted = totalNFTL.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('claim', tokenIndices, totalAccumulated);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    setMockAccumulated(0);
    setTimeout(() => setRefreshKey(Math.random() + 1), 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIndices, totalAccumulated, tx, writeContracts]);

  const handleDepositNFTL = useCallback(
    async (amount: number) => {
      // eslint-disable-next-line no-console
      if (DEBUG) console.log('deposit', amount);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await tx(writeContracts[GAME_ACCOUNT_CONTRACT].deposit(amount));
    },
    [tx, writeContracts],
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
                  Claim All {totalNFTLFormatted} NFTL
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
                  primary={!profileError ? profile?.stats?.total?.earnings : 0}
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
                    !profileError ? profile?.stats?.total?.rental_earnings : 0
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
              title="Game & Rental Balance"
              primary={`${
                accError
                  ? 'Error fetching balance'
                  : `${gameBal || '0.00'} NFTL`
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
                      dialogTitle="Withdraw Game & Rental Earnings"
                      sx={{
                        '& h2': {
                          textAlign: 'center',
                        },
                        '& .MuiDialogContent-root': {
                          textAlign: 'center',
                        },
                      }}
                    >
                      <WithdrawForm balance={gameBal} />
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
              primary={`${mockAccumulated ? amountParsed : '0.00'} NFTL`}
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
                    !(mockAccumulated > 0.0 && writeContracts[NFTL_CONTRACT])
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
