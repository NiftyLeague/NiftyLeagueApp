import {
  Alert,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Skeleton,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ReplayIcon from '@mui/icons-material/Replay';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BigNumber, utils } from 'ethers';
import { DialogContext } from 'components/dialog';
import useWithdrawalHistory from 'hooks/useWithdrawalHistory';
import useContractReader from 'hooks/useContractReader';
import { WithdrawalHistory } from 'types/account';
import { formatDateTime } from 'helpers/dateTime';
import { NetworkContext } from 'NetworkProvider';
import { GAME_ACCOUNT_CONTRACT } from 'constants/contracts';

function useBalanceManagerNonce(address: string): number {
  const { writeContracts } = useContext(NetworkContext);
  const [nonce, setNonce] = useState(BigNumber.from(0));
  const result = useContractReader(
    writeContracts,
    GAME_ACCOUNT_CONTRACT,
    'nonce',
    [address],
  ) as BigNumber;
  useEffect(() => {
    if (result && result !== nonce) setNonce(result);
  }, [result, nonce]);
  return parseFloat(utils.formatEther(nonce));
}

const HistoryTable = ({
  withdrawalHistory,
  resetForm,
}: {
  withdrawalHistory: WithdrawalHistory[];
  resetForm: () => void;
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { writeContracts, tx } = useContext(NetworkContext);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRetryWithdraw = async (data) => {
    const { amount, expire_at, signature, nonce } = data as {
      amount: number;
      expire_at: number;
      signature: string;
      nonce: number;
    };
    const res = await tx(
      writeContracts[GAME_ACCOUNT_CONTRACT].withdraw(
        utils.parseEther(`${amount}`),
        BigNumber.from(nonce),
        expire_at,
        signature,
      ),
    );
    if (res) resetForm();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Nonce</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Retry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {withdrawalHistory
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.request_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {formatDateTime(row.created_at)}
                  </TableCell>
                  <TableCell align="right">{row.nonce}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.state}</TableCell>
                  <TableCell align="right">
                    {row.state === 'pending' ? (
                      <IconButton
                        aria-label="retry"
                        onClick={() => handleRetryWithdraw(row)}
                      >
                        <ReplayIcon />
                      </IconButton>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        sx={{ marginTop: '-16px' }}
        count={withdrawalHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

interface RefreshFormProps {
  refreshTimeout: number;
  onRefresh: () => Promise<void>;
}

const RefreshForm = ({
  refreshTimeout,
  onRefresh,
}: RefreshFormProps): JSX.Element => {
  const [, setIsOpen] = useContext(DialogContext);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(refreshTimeout > 0);
  const { handleSubmit, reset } = useForm();
  const { loading: historyLoading, withdrawalHistory } = useWithdrawalHistory();
  const refreshEnabled = withdrawalHistory.length;
  const { address } = useContext(NetworkContext);
  const nonce = useBalanceManagerNonce(address);
  const pendingTxs = withdrawalHistory.filter((tx) => tx.state === 'pending');
  const hasPendingTxs = pendingTxs.length > 0;
  const hasOldPendingTxs =
    pendingTxs.filter((tx) => tx.nonce < nonce).length > 0;

  const resetForm = () => {
    reset();
    setLoading(false);
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<{}> = async () => {
    setLoading(true);
    setDisabled(true);
    await onRefresh();
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="center" gap={2}>
        {historyLoading ? (
          <Skeleton variant="rectangular" width="100%" height={320} />
        ) : (
          <>
            {refreshEnabled ? (
              <HistoryTable
                withdrawalHistory={withdrawalHistory}
                resetForm={resetForm}
              />
            ) : (
              <Alert severity="error">No withdrawal history found</Alert>
            )}
            {refreshEnabled && !hasPendingTxs ? (
              <Alert severity="info">No pending transactions found</Alert>
            ) : null}
            {refreshEnabled && hasPendingTxs && !hasOldPendingTxs ? (
              <Alert severity="info">
                Can only void pending transactions with nonce less than {nonce}
              </Alert>
            ) : null}
          </>
        )}
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          fullWidth
          disabled={!refreshEnabled || !hasOldPendingTxs || disabled}
        >
          Void pending transactions
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default RefreshForm;
