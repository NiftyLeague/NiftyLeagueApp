import {
  Stack,
  Typography,
  Button,
  useTheme,
  IconButton,
  Dialog,
} from '@mui/material';
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { Rentals, RentalType } from 'types/rentals';
import RenameRentalDialogContent from './RenameRentalDialogContent';
import { transformRentals } from 'pages/dashboard/utils';
import usePlayerProfile from 'hooks/usePlayerProfile';
import Countdown from 'react-countdown';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  rows: Rentals[];
  loading: boolean;
  category: RentalType;
  handleTerminalRental: (rentalId: string) => void;
  updateRentalName: (name: string, id: string) => void;
}

const MyRentalsDataGrid = ({
  rows,
  loading,
  category,
  handleTerminalRental,
  updateRentalName,
}: Props): JSX.Element => {
  const { palette } = useTheme();
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowForEditing, setSelectedRowForEditing] = useState<any>();
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] = useState(false);

  const { profile } = usePlayerProfile();
  const newRows = transformRentals(rows, profile?.id || '', category);

  const handleOpenRenameDegen = (params: GridRenderCellParams) => {
    setSelectedRowForEditing(params.row);
    setIsRenameDegenModalOpen(true);
  };

  const handleUpdateRentalName = (name: string, id: string) => {
    updateRentalName(name, id);
    setIsRenameDegenModalOpen(false);
  };

  const commonColumnProp = {
    minWidth: 100,
  };

  const columns: GridColDef[] = [
    {
      field: 'renter',
      headerName: 'Player Address',
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" columnGap={1} alignItems="center">
          <Typography>{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: 'nickname',
      headerName: 'Player Nickname',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" columnGap={1} alignItems="center">
          <Typography>{params.value}</Typography>
          {params.isEditable && (
            <IconButton
              aria-label="edit"
              onClick={() => handleOpenRenameDegen(params)}
              sx={{ display: 'none' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      ),
    },
    {
      field: 'rentalCategory',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'player',
      headerName: "Who's playing?",
      width: 130,
    },
    {
      field: 'degenId',
      headerName: 'Degen ID',
      renderCell: (params) => <span>#{params.value}</span>,
    },
    {
      field: 'background',
      headerName: 'Background',
    },
    {
      field: 'tribe',
      headerName: 'Tribe',
    },
    {
      field: 'multiplier',
      headerName: 'Degen Multiplier',
      width: 150,
      ...commonColumnProp,
    },
    {
      field: 'timePlayed',
      headerName: 'Time Played',
      ...commonColumnProp,
      width: 120,
    },
    {
      field: 'matches',
      headerName: 'Matches',
    },
    {
      field: 'wins',
      headerName: 'Wins',
    },
    {
      field: 'winRate',
      headerName: 'Win Rate',
      ...commonColumnProp,
      renderCell: (params) => <span>{params.value}%</span>,
    },
    {
      field: 'weeklyFee',
      headerName: 'Weekly Fee',
      ...commonColumnProp,
    },
    {
      field: 'dailyFee',
      headerName: 'Current Daily Fee',
      width: 150,
      ...commonColumnProp,
    },
    {
      field: 'dailyFeesToDate',
      headerName: 'Daily Fees To Date',
      width: 150,
      ...commonColumnProp,
    },
    {
      field: 'costs',
      headerName: 'My Rental Fee Costs',
      width: 150,
      ...commonColumnProp,
    },
    {
      field: 'rentalFeeEarning',
      headerName: 'Rental Fees Earned',
      width: 150,
      ...commonColumnProp,
    },
    {
      field: 'profits',
      headerName: 'Gross Gameplay Earnings',
      width: 180,
      ...commonColumnProp,
    },
    {
      field: 'netGameEarning',
      headerName: 'Your NET Gameplay Earnings',
      width: 200,
      ...commonColumnProp,
    },
    {
      field: 'netEarning',
      headerName: 'Your NET Earnings',
      width: 150,
      ...commonColumnProp,
    },
    {
      field: 'roi',
      headerName: 'ROI %',
      ...commonColumnProp,
      renderCell: (params) => {
        let color;
        if (params.value === 0) color = palette.text.primary;
        if (params.value > 0) color = palette.success.main;
        if (params.value < 0) color = palette.error.main;
        return <Typography color={color}>{params.value}%</Typography>;
      },
    },
    {
      field: 'rentalRenewsIn',
      headerName: 'Rental Renews In',
      ...commonColumnProp,
      width: 150,
      renderCell: (params) => (
        <Countdown date={new Date(params.value * 1000)} />
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      ...commonColumnProp,
      renderCell: (params) => (
        <Button
          onClick={() => handleTerminalRental(params.row.id)}
          variant="outlined"
          color="secondary"
          disabled={params.value}
        >
          {params.value ? 'Terminated' : 'Terminate'}
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        loading={loading}
        rows={newRows}
        columns={columns}
        autoPageSize
        rowsPerPageOptions={[10, 25, 100]}
        // Page size and handler required to set default to 10
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        sx={{
          '& .MuiDataGrid-row:hover': {
            '& button': {
              display: 'block',
            },
          },
        }}
      />
      {/* Rename Degen Dialog */}
      <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameRentalDialogContent
          updateRentalName={handleUpdateRentalName}
          rental={selectedRowForEditing}
        />
      </Dialog>
    </>
  );
};

export default MyRentalsDataGrid;
