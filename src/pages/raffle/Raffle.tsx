import { useContext, useEffect, useState } from 'react';
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

function useTicketBalance(refreshKey?: string | number): number {
  const { address, readContracts } = useContext(NetworkContext);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const result = useContractReader(
    readContracts,
    NFTL_RAFFLE_CONTRACT,
    'getTicketCountByUser',
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

const Raffle = (): JSX.Element => {
  const theme = useTheme();
  const [refreshBalKey, setRefreshBalKey] = useState(0);
  const { loading } = useContext(BalanceContext);
  const userTicketBalance = useTicketBalance(refreshBalKey);
  return (
    <Grid container spacing={sectionSpacing}>
      <Grid item xs={12}>
        <HoverDataCard
          title="Ticket Balance"
          primary={`${formatNumberToDisplay(userTicketBalance)} Tickets`}
          customStyle={{
            backgroundColor: theme.palette.background.default,
            border: '1px solid',
            borderColor: theme.palette.grey[800],
          }}
          secondary="1000 NFTL Buys 1 Ticket"
          isLoading={loading}
          actions={
            <TicketDialog
              refreshTicketBalance={() => setRefreshBalKey(Math.random)}
            />
          }
        />
      </Grid>
    </Grid>
  );
};

export default Raffle;
