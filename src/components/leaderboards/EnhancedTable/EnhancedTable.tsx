import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';
import { toast } from 'react-toastify';
import { ReturnDataType, DataType, TableProps } from 'types/leaderboard';
import EnhancedTableHead from './EnhancedTableHead';
import { fetchScores, fetchRankByUserId } from 'utils/leaderboard';
import makeStyles from '@mui/styles/makeStyles';
import { NetworkContext } from 'NetworkProvider';
import usePlayerProfile from 'hooks/usePlayerProfile';

const useStyles = makeStyles({
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    height: '70%',
  },
  paperStyle: {
    width: '100%',
    overflowX: 'auto',
    mb: 2,
    '& .MuiTablePagination-selectLabel, & .MuiInputBase-root': {
      display: 'none',
    },
  },
});

export default function EnhancedTable(props: TableProps): JSX.Element | null {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { selectedTable } = props;
  const [rows, setData] = useState<DataType[]>();
  const { web3Modal } = useContext(NetworkContext);
  const { palette } = useTheme();
  const { profile } = usePlayerProfile();

  const classes = useStyles();

  const fetchTopData = async () => {
    setPage(0);
    const returnValue: ReturnDataType = await fetchScores(
      selectedTable.key,
      rowsPerPage * 3,
      0,
    );
    setData(returnValue.data);
    setCount(returnValue.count);
  };

  useEffect(() => {
    void fetchTopData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTable.key]);

  const handleChangePage = async (event: unknown, newPage: number) => {
    if (rows && (newPage + 3) * rowsPerPage > rows?.length) {
      const returnValue: ReturnDataType = await fetchScores(
        selectedTable.key,
        rowsPerPage,
        (newPage + 2) * rowsPerPage,
      );
      setData([...rows, ...returnValue.data]);
      setCount(returnValue.count);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckYourRank = async () => {
    // Call API here
    if (profile?.id) {
      try {
        const result: any = await fetchRankByUserId(profile?.id);
        if (!result.ok) {
          const errMsg = await result.text();
          toast.error(errMsg, {
            theme: 'dark',
          });
          return;
        }
        const res = await result.json();
        if (res < 1) {
          toast.error(
            'You have not played the WEN Game yet! Play the game to see your rank on the leaderboard.',
            {
              theme: 'dark',
            },
          );
          return;
        }
        // TODO: will implement FE-362
      } catch (error) {
        toast.error(error, {
          theme: 'dark',
        });
      }
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = rows
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - rows.length)
      : 0
    : 0;

  return (
    <Box>
      {!rows ? (
        <Box className={classes.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper className={classes.paperStyle}>
          <TableContainer sx={{ minWidth: '850px' }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead rows={selectedTable.rows} />
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: DataType, index: number) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.rank}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                        >
                          {row.rank}
                        </TableCell>
                        <TableCell align="left">{row.user_id}</TableCell>
                        {selectedTable.rows.map((cell) => (
                          <TableCell key={cell.key} align="left">
                            {row.stats[cell.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ minWidth: '850px' }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to }) => (
              <Stack
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                {!!web3Modal.cachedProvider && (
                  <Typography
                    variant="body2"
                    color={palette.primary.main}
                    sx={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={handleCheckYourRank}
                  >
                    CHECK YOUR RANK
                  </Typography>
                )}
                {`${from}–${to}`}
              </Stack>
            )}
          />
        </Paper>
      )}
    </Box>
  );
}
