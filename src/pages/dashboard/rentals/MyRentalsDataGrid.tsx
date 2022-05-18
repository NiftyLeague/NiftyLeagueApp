import {
  Stack,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogContent,
  Link,
  IconButton,
} from '@mui/material';
import {
  GridColDef,
  DataGrid,
  GridRenderCellParams,
  GridCallbackDetails,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useMemo } from 'react';
import { Rentals, RentalType } from 'types/rentals';
import { transformRentals } from 'pages/dashboard/utils';
import usePlayerProfile from 'hooks/usePlayerProfile';
import Countdown from 'react-countdown';
import { formatNumberToDisplayWithCommas } from 'utils/numbers';

import DegenDialog from 'components/dialog/DegenDialog';
import ChangeNicknameDialog from './ChangeNicknameDialog';

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
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isTerminateRentalModalOpen, setIsTerminalRentalModalOpen] =
    useState(false);
  const [isDegenModalOpen, setIsDegenModalOpen] = useState<boolean>(false);
  const [selectedDegen, setSelectedDegen] = useState();
  const [isRentDialog, setIsRentDialog] = useState<boolean>(false);

  const getColumnVisibilityModel = localStorage.getItem(
    RENTAL_COLUMN_VISIBILITY,
  );
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(
      getColumnVisibilityModel ? JSON.parse(getColumnVisibilityModel) : {},
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

  const handleOpenNickname = (params: GridRenderCellParams) => {
    setSelectedRowForEditing(params.row);
    setIsNicknameModalOpen(true);
  };

  const handleUpdateNickname = (name: string, rentalId: string) => {
    updateRentalName(name, rentalId);
    setIsNicknameModalOpen(false);
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

  const handleClickDegenId = (params: GridRenderCellParams) => {
    setSelectedDegen({
      ...params?.row,
      id: params?.row?.degenId,
    });
    setIsRentDialog(false);
    setIsDegenModalOpen(true);
  };

  const commonColumnProp = {
    minWidth: 100,
  };

  const columns: GridColDef[] = [
    {
      field: 'action',
      headerName: 'Actions',
      width: 130,
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
      headerName: 'Player',
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" columnGap={1} alignItems="center">
          <Typography>{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: 'playerNickname',
      headerName: 'Player Nickname',
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" columnGap={1} alignItems="center">
            <Typography>{params.value}</Typography>
            {params.row.isEditable && (
              <IconButton
                aria-label="edit"
                onClick={() => handleOpenNickname(params)}
                sx={{ display: 'none' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        );
      },
    },
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
      renderCell: (params) => (
        <Link
          component="button"
          variant="body2"
          sx={{ color: 'white', textDecorationColor: 'white' }}
          onClick={() => handleClickDegenId(params)}
        >
          #{params.value}
        </Link>
      ),
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
      headerName: 'Multiplier',
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
      headerName: 'Rental Fee Costs',
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
      headerName: 'Net Gameplay Earnings',
      width: 200,
      renderCell: (params) => formatNumberToDisplayWithCommas(params.value),
      ...commonColumnProp,
    },
    {
      field: 'netEarning',
      headerName: 'Net Earnings',
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
      {/* Nickname Degen Dialog */}
      <Dialog
        open={isNicknameModalOpen}
        onClose={() => setIsNicknameModalOpen(false)}
      >
        <ChangeNicknameDialog
          updateNickname={handleUpdateNickname}
          rental={selectedRowForEditing}
        />
      </Dialog>
      {/* Terminal Rental Dialog */}
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
      {/* Degen Traits Dialog */}
      <DegenDialog
        open={isDegenModalOpen}
        degen={selectedDegen}
        isRent={isRentDialog}
        setIsRent={setIsRentDialog}
        onClose={() => setIsDegenModalOpen(false)}
      />
    </>
  );
};

export default MyRentalsDataGrid;
