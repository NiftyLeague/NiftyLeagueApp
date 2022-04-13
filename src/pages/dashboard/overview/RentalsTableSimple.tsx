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
import { ColumnType } from './MyRentals';

interface RentalsTableSimpleProps {
  retails: Rental[];
  columns: ColumnType[];
}

const RentalsTableSimple = ({
  retails,
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
            {retails.map((retail) => (
              <TableRow hover key={retail.id}>
                {columns.map((column: ColumnType) => {
                  const value = retail[column.id];
                  if (column.id === 'roi') {
                    let color;
                    if (retail.roi === 0) color = palette.text.primary;
                    if (retail.roi > 0) color = palette.success.main;
                    if (retail.roi < 0) color = palette.error.main;
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
