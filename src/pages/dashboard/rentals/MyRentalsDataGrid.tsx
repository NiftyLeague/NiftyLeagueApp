import {
  Stack,
  Typography,
  Button,
  useTheme,
  // IconButton,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  GridColDef,
  DataGrid,
  GridRenderCellParams,
  GridCallbackDetails,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';
import { useState, useMemo } from 'react';
import { Rentals, RentalType } from 'types/rentals';
import RenameRentalDialogContent from './RenameRentalDialogContent';
import { transformRentals } from 'pages/dashboard/utils';
import usePlayerProfile from 'hooks/usePlayerProfile';
import Countdown from 'react-countdown';
// import EditIcon from '@mui/icons-material/Edit';
import { formatNumberToDisplayWithCommas } from 'utils/numbers';

const RENTAL_COLUMN_VISIBILITY = 'rental-column-visibility-model';

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
  const [isTerminateRentalModalOpen, setIsTerminalRentalModalOpen] =
    useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(
      JSON.parse(localStorage.getItem(RENTAL_COLUMN_VISIBILITY) || ''),
    );

  const { profile } = usePlayerProfile();
  const rentals = transformRentals(rows, profile?.id || '', category);

  const filteredRows = useMemo(() => {
    switch (category) {
      case 'direct-rental':
        return rentals.filter((rental) => rental.category === 'direct-rental');
      case 'owned-sponsorship':
        return rentals.filter(
          (rental) => rental.category === 'owned-sponsorship',
        );
      case 'non-owned-sponsorship':
        return rentals.filter(
          (rental) => rental.category === 'non-owned-sponsorship',
        );
      case 'recruited':
        return rentals.filter((rental) => rental.category === 'recruited');
      case 'direct-renter':
        return rentals.filter((rental) => rental.category === 'direct-renter');
      case 'all':
      default:
        return rentals;
    }
  }, [rentals, category]);

  // const handleOpenRenameDegen = (params: GridRenderCellParams) => {
  //   setSelectedRowForEditing(params.row);
  //   setIsRenameDegenModalOpen(true);
  // };

  const handleUpdateRentalName = (name: string, rentalId: string) => {
    updateRentalName(name, rentalId);
    setIsRenameDegenModalOpen(false);
  };

  const handleOpenTerminateRental = (params: GridRenderCellParams) => {
    setSelectedRowForEditing(params.row);
    setIsTerminalRentalModalOpen(true);
  };

  const handleConfirmTerminateRental = () => {
    if (selectedRowForEditing) {
      handleTerminalRental(selectedRowForEditing.rentalId);
      setIsTerminalRentalModalOpen(false);
    }
  };

  const handleColumnVisibilityChange = (
    model: GridColumnVisibilityModel,
    details: GridCallbackDetails,
  ) => {
    localStorage.setItem(RENTAL_COLUMN_VISIBILITY, JSON.stringify(model));
    setColumnVisibilityModel(model);
  };

  const commonColumnProp = {
    minWidth: 100,
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      ...commonColumnProp,
      renderCell: (params) => (
        <Button
          onClick={() => handleOpenTerminateRental(params)}
          variant="outlined"
          color="secondary"
          disabled={params.value}
        >
          {params.value ? 'Terminated' : 'Terminate'}
        </Button>
      ),
    },
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
    // {
    //   field: 'nickname',
    //   headerName: 'Player Nickname',
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <Stack direction="row" columnGap={1} alignItems="center">
    //         <Typography>{params.value}</Typography>
    //         {params.row.isEditable && (
    //           <IconButton
    //             aria-label="edit"
    //             onClick={() => handleOpenRenameDegen(params)}
    //             sx={{ display: 'none' }}
    //           >
    //             <EditIcon fontSize="small" />
    //           </IconButton>
    //         )}
    //       </Stack>
    //     );
    //   },
    // },
    {
      field: 'rentalCategory',
      headerName: 'Category',
      width: 150,
    },
    // {
    //   field: 'player',
    //   headerName: "Who's playing?",
    //   width: 130,
    // },
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
    // {
    //   field: 'timePlayed',
    //   headerName: 'Time Played',
    //   ...commonColumnProp,
    //   width: 120,
    // },
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
      renderCell: (params) => (
        <span>{formatNumberToDisplayWithCommas(params.value)}%</span>
      ),
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
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
      ...commonColumnProp,
    },
    {
      field: 'dailyFeesToDate',
      headerName: 'Daily Fees To Date',
      width: 150,
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
      ...commonColumnProp,
    },
    {
      field: 'costs',
      headerName: 'My Rental Fee Costs',
      width: 150,
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
      ...commonColumnProp,
    },
    {
      field: 'rentalFeeEarning',
      headerName: 'Rental Fees Earned',
      width: 150,
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
      ...commonColumnProp,
    },
    {
      field: 'profits',
      headerName: 'Gross Gameplay Earnings',
      width: 180,
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
      ...commonColumnProp,
    },
    {
      field: 'netGameEarning',
      headerName: 'Your NET Gameplay Earnings',
      width: 200,
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
      ...commonColumnProp,
    },
    {
      field: 'netEarning',
      headerName: 'Your NET Earnings',
      width: 150,
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
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
        return (
          <Typography color={color}>
            {formatNumberToDisplayWithCommas(params.value)}%
          </Typography>
        );
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
  ];

  return (
    <>
      <DataGrid
        loading={loading}
        rows={filteredRows}
        columns={columns}
        autoPageSize
        checkboxSelection={false}
        disableSelectionOnClick={true}
        rowsPerPageOptions={[10, 25, 100]}
        // Page size and handler required to set default to 10
        pageSize={pageSize}
        columnVisibilityModel={columnVisibilityModel}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onColumnVisibilityModelChange={handleColumnVisibilityChange}
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
      <Dialog
        open={isTerminateRentalModalOpen}
        onClose={() => setIsTerminalRentalModalOpen(false)}
      >
        <DialogContent>
          <Typography variant="h4" align="center">
            Are you sure you want to terminate this rental?
          </Typography>
          <Stack mt={3} direction="column" justifyContent="center" gap={1}>
            <Button
              onClick={handleConfirmTerminateRental}
              autoFocus
              variant="contained"
              fullWidth
            >
              Terminate Rental
            </Button>
            <Button
              onClick={() => setIsTerminalRentalModalOpen(false)}
              fullWidth
            >
              Cancel
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyRentalsDataGrid;
