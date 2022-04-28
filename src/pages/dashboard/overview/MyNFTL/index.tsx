import { useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Grid, Button, Stack, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { sectionSpacing } from 'store/constant';
import SectionTitle from 'components/sections/SectionTitle';
import HoverDataCard from 'components/cards/HoverDataCard';
import WithdrawForm from './WithdrawForm';
import { Dialog, DialogTrigger, DialogContent } from 'components/dialog';
import { NetworkContext } from 'NetworkProvider';
import { useQuery } from '@apollo/client';
import { OWNER_QUERY } from 'queries/OWNER_QUERY';
import { Owner } from 'types/graph';
import { CHARACTERS_SUBGRAPH_INTERVAL } from '../../../../constants';
import useClaimableNFTL from 'hooks/useClaimableNFTL';
import { NFTL_CONTRACT } from 'constants/contracts';
import useNFTLBalance from 'hooks/useNFTLBalance';
import { Account } from 'types/account';

interface MyNFTLProps {
  onWithdraw?: React.MouseEventHandler<HTMLButtonElement>;
  onDeposit?: React.MouseEventHandler<HTMLButtonElement>;
  onClaimAll?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyNFTL = ({
  onWithdraw,
  onDeposit,
  onClaimAll,
}: MyNFTLProps): JSX.Element => {
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
    // eslint-disable-next-line no-void
    if (auth) void fetchAccount();
  }, [auth]);

  const gameBal = account?.balance
    ? account.balance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : 0;
  const totalNFTL = amountParsed + gameBal;

  const handleClaimNFTL = useCallback(async () => {
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('claim', tokenIndices, totalAccumulated);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
    setMockAccumulated(0);
    setTimeout(() => setRefreshKey(Math.random() + 1), 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIndices, totalAccumulated, tx, writeContracts]);

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
                <Button variant="outlined" onClick={onClaimAll}>
                  Claim All {totalNFTL} NFTL
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
                  primary="300,573"
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
                  primary="300,573"
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
                      <WithdrawForm balance={114893} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={onDeposit}
                  >
                    Deposit
                  </Button>
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
