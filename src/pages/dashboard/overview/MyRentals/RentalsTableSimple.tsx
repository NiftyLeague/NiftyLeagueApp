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
import { Rental } from 'types/rental';
import { ColumnType } from '.';

interface RentalsTableSimpleProps {
  rentals: Rental[];
  columns: ColumnType[];
}

const RentalsTableSimple = ({
  rentals,
  columns,
}: RentalsTableSimpleProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {rentals.map((rental) => (
              <TableRow hover key={rental.id}>
                {columns.map((column: ColumnType) => {
                  const value = rental[column.id];
                  if (column.id === 'roi') {
                    let color;
                    if (rental.roi === 0) color = palette.text.primary;
                    if (rental.roi > 0) color = palette.success.main;
                    if (rental.roi < 0) color = palette.error.main;
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Typography color={color}>{value}%</Typography>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RentalsTableSimple;
