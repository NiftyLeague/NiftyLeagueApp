import Image from 'next/image';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { EnhancedTableProps } from '@/types/leaderboard';
import { useTheme, Typography } from '@mui/material';

export default function EnhancedTableHead(
  props: EnhancedTableProps,
): JSX.Element | null {
  const { rows, handleCheckYourRank } = props;
  const { palette } = useTheme();
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" padding="normal">
          RANK
        </TableCell>
        <TableCell align="left" padding="normal">
          USERNAME
        </TableCell>
        {rows.map((headCell) => (
          <TableCell key={headCell.key} align="left" padding="normal">
            {headCell.display}
          </TableCell>
        ))}
        <TableCell sx={{ pr: '0px' }} align="right" padding="normal">
          <Typography
            variant="h4"
            color={palette.primary.main}
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
              display: 'flex',
              lineHeight: '24px',
              justifyContent: 'flex-end',
              fontWeight: 700,
              svg: {
                mr: '3px',
              },
            }}
            onClick={handleCheckYourRank}
          >
            <Image
              src="/images/icons/rank_icon.svg"
              alt="Rank Icon"
              width={25}
              height={20}
              style={{ marginRight: 4 }}
            />
            RANK
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
