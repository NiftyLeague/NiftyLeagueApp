import {
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@mui/material';
import { RentalDataGrid } from 'types/rentalDataGrid';
import { ColumnType } from '.';
import { v4 as uuidv4 } from 'uuid';
import Countdown from 'react-countdown';
import { formatNumberToDisplayWithCommas } from 'utils/numbers';

interface RentalsTableSimpleProps {
  rentals: RentalDataGrid[];
  columns: ColumnType[];
}

const RentalsTableSimple = ({
  rentals,
  columns,
}: RentalsTableSimpleProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        borderRadius: 0,
        height: '100%',
      }}
    >
      <TableContainer
        sx={{
          maxHeight: 750,
          backgroundColor: palette.background.default,
          borderRadius: 2,
          border: '1px solid',
          borderColor: '#2f2f2f',
          height: '100%',
        }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column: ColumnType) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals?.length > 0 ? (
              rentals.map((rental: any) => (
                <TableRow hover key={uuidv4()}>
                  {columns.map((column: ColumnType) => {
                    const value = rental[column.id];
                    if (column.id === 'roi') {
                      let color;
                      if (rental.roi === 0) color = palette.text.primary;
                      if (rental.roi > 0) color = palette.success.main;
                      if (rental.roi < 0) color = palette.error.main;
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Typography color={color}>
                            {formatNumberToDisplayWithCommas(value)}%
                          </Typography>
                        </TableCell>
                      );
                    }

                    if (column.id === 'rentalRenewsIn') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Countdown date={new Date(value * 1000)} />
                        </TableCell>
                      );
                    }

                    if (column.id === 'winRate') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {formatNumberToDisplayWithCommas(value)}%
                        </TableCell>
                      );
                    }

                    if (column.id === 'profits' || column.id === 'netEarning') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {formatNumberToDisplayWithCommas(value)}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ height: '100%' }}>
                  <Typography color={palette.grey[500]}>
                    You don&apos;t have any rentals yet
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RentalsTableSimple;
