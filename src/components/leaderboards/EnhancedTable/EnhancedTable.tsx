import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { ReturnDataType, DataType, TableProps } from 'types/leaderboard';
import EnhancedTableHead from './EnhancedTableHead';
import { fetchScores } from 'utils/leaderboard';
import makeStyles from '@mui/styles/makeStyles';
import './custom.css';

const useStyles = makeStyles({
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    height: '70%',
  },
});

export default function EnhancedTable(props: TableProps): JSX.Element | null {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { selectedTable } = props;
  const [rows, setData] = useState<DataType[]>();

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
        <Paper>
          <TableContainer>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
}
