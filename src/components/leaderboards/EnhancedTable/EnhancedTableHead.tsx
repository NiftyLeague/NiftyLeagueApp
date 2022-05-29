import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { EnhancedTableProps } from 'types/leaderboard';

export default function EnhancedTableHead(
  props: EnhancedTableProps,
): JSX.Element | null {
  const { rows } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" padding="normal">
          RANK
        </TableCell>
        <TableCell align="left" padding="normal">
          USER NAME
        </TableCell>
        {rows.map((headCell) => (
          <TableCell key={headCell.key} align="left" padding="normal">
            {headCell.display}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
