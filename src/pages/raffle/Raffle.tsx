import { useCallback, useContext, useEffect, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { sectionSpacing } from 'store/constant';
import HoverDataCard from 'components/cards/HoverDataCard';
import { formatNumberToDisplay } from 'utils/numbers';
import BalanceContext from 'contexts/BalanceContext';
import NetworkContext from 'contexts/NetworkContext';
import useContractReader from 'hooks/useContractReader';
import { NFTL_RAFFLE_CONTRACT } from 'constants/contracts';
import TicketDialog from './TicketDialog';

function useDepositBalance(refreshKey = 0): number {
  const { address, readContracts } = useContext(NetworkContext);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const result = useContractReader(
    readContracts,
    NFTL_RAFFLE_CONTRACT,
    'userDeposits',
    [address],
    undefined,
    undefined,
    refreshKey,
    !address,
  ) as BigNumber;
  useEffect(() => {
    if (result && result !== balance) setBalance(result);
  }, [result, balance]);
  return parseFloat(utils.formatEther(balance));
}

function useTicketBalance(): {
  ticketCount: number;
  refetchBalance: () => void;
} {
  const [refreshKey, setRefreshKey] = useState(0);
  const userDeposits = useDepositBalance(refreshKey);
  const refetchBalance = useCallback(() => setRefreshKey(Math.random), []);
  return {
    ticketCount: Math.floor(
      userDeposits && userDeposits >= 1000 ? userDeposits / 1000 : 0,
    ),
    refetchBalance,
  };
}

const Raffle = (): JSX.Element => {
  const theme = useTheme();
  const { loading } = useContext(BalanceContext);
  const { ticketCount } = useTicketBalance();
  const [mockTickets, setMockTickets] = useState(0);
  useEffect(() => setMockTickets(ticketCount), [ticketCount]);

  const handleRefreshTicketBalance = useCallback(
    (depositAmount: number) => {
      setMockTickets(ticketCount + Math.floor(depositAmount / 1000));
    },
    [ticketCount],
  );

  return (
    <Grid container spacing={sectionSpacing}>
      <Grid item xs={12}>
        <HoverDataCard
          title="Ticket Balance"
          primary={`${formatNumberToDisplay(mockTickets, 0)} Tickets`}
          customStyle={{
            backgroundColor: theme.palette.background.default,
            border: '1px solid',
            borderColor: theme.palette.grey[800],
          }}
          secondary="1000 NFTL Buys 1 Ticket"
          isLoading={loading}
          actions={
            <TicketDialog refreshTicketBalance={handleRefreshTicketBalance} />
          }
        />
      </Grid>
    </Grid>
  );
};

export default Raffle;
