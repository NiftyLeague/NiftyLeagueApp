import { Stack, Typography, Button, useTheme } from '@mui/material';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Rentals, RentalType } from 'types/rentals';
// import RenameRentalDialogContent from './RenameRentalDialogContent';
import { transformRentals } from 'pages/dashboard/utils';
import usePlayerProfile from 'hooks/usePlayerProfile';
import Countdown from 'react-countdown';

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
  // const [selectedRowForEditing, setSelectedRowForEditing] = useState<any>();
  // const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] = useState(false);

  const { profile } = usePlayerProfile();
  const newRows = transformRentals(rows, profile?.id || '', category);

  // const handleOpenRenameDegen = (params: GridRenderCellParams) => {
  //   setSelectedRowForEditing(params.row);
  //   setIsRenameDegenModalOpen(true);
  // };

  // const handleUpdateRentalName = (name: string, id: string) => {
  //   updateRentalName(name, id);
  //   setIsRenameDegenModalOpen(false);
  // };

  const commonColumnProp = {
    minWidth: 100,
  };

  const columns: GridColDef[] = [
    {
      field: 'renter',
      headerName: 'Renter',
      renderCell: (params) => (
        <Stack direction="row" columnGap={1} alignItems="center">
          <Typography>{params.value}</Typography>
          {/* {!params.row.action && (
            <IconButton
              aria-label="edit"
              onClick={() => handleOpenRenameDegen(params)}
              sx={{ display: 'none' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )} */}
        </Stack>
      ),
    },
    {
      field: 'degenId',
      headerName: 'Degen ID',
      renderCell: (params) => <span>#{params.value}</span>,
    },
    { field: 'multiplier', headerName: 'Multiplier', ...commonColumnProp },
    {
      field: 'winLoss',
      headerName: 'Win Rate',
      ...commonColumnProp,
      renderCell: (params) => <span>{params.value}%</span>,
    },
    // {
    //   field: 'timePlayed',
    //   headerName: 'Time Played',
    //   ...commonColumnProp,
    //   width: 150,
    // },
    {
      field: 'weeklyRentalFee',
      headerName: 'Weekly Rental Fee',
      ...commonColumnProp,
    },
    {
      field: 'dailyRentalFee',
      headerName: 'Daily Rental Fee',
      ...commonColumnProp,
    },
    {
      field: 'totalEarnings',
      headerName: 'Total Earnings',
      ...commonColumnProp,
      width: 150,
    },
    {
      field: 'yourEarnings',
      headerName: 'Your Earnings',
      ...commonColumnProp,
      width: 150,
    },
    { field: 'costs', headerName: 'Costs', ...commonColumnProp },
    { field: 'profits', headerName: 'Profits', ...commonColumnProp },
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
      {/* <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameRentalDialogContent
          updateRentalName={handleUpdateRentalName}
          rental={selectedRowForEditing}
        />
      </Dialog> */}
    </>
  );
};

export default MyRentalsDataGrid;
