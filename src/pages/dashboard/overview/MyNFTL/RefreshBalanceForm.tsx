import {
  Alert,
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
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DialogContext } from 'components/dialog';
import useWithdrawalHistory from 'hooks/useWithdrawalHistory';
import { WithdrawalHistory } from 'types/account';
import { formatDateTime } from 'helpers/dateTime';

const HistoryTable = ({
  withdrawalHistory,
}: {
  withdrawalHistory: WithdrawalHistory[];
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
  const hasPendingTxs =
    withdrawalHistory.filter((tx) => tx.state === 'pending').length > 0;

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
              <HistoryTable withdrawalHistory={withdrawalHistory} />
            ) : (
              <Alert severity="error">No withdrawal history found</Alert>
            )}
            {refreshEnabled && !hasPendingTxs ? (
              <Alert severity="error">No pending transactions found</Alert>
            ) : null}
          </>
        )}
        <LoadingButton
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          fullWidth
          disabled={!refreshEnabled || !hasPendingTxs || disabled}
        >
          Refresh game balance
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default RefreshForm;
