import {
  Stack,
  Typography,
  Button,
  useTheme,
  IconButton,
  Dialog,
} from '@mui/material';
import {
  GridColDef,
  DataGrid,
  GridRowsProp,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Rental } from 'types/rental';
import RenameRentalDialogContent from './RenameRentalDialogContent';

interface Props {
  rows: GridRowsProp<Rental>;
}

const MyRentalsDataGrid = ({ rows }: Props): JSX.Element => {
  const { palette } = useTheme();
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedRowForEditing, setSelectedRowForEditing] =
    useState<Rental | null>(null);
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] = useState(false);

  const handleRowMouseEnter = (event: Event) => {
    event.preventDefault();
    const htmlRow = event.currentTarget as HTMLDivElement;
    setSelectedRowId(htmlRow?.getAttribute('data-id'));
  };

  const handleRowMouseLeave = () => {
    setSelectedRowId(null);
  };

  const handleRenameDegen = (params: GridRenderCellParams) => {
    setSelectedRowForEditing(params.row);
    setIsRenameDegenModalOpen(true);
  };

  const commonColumnProp = {
    minWidth: 100,
  };

  const columns: GridColDef[] = [
    {
      field: 'renter',
      headerName: 'Renter',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" columnGap={1} alignItems="center">
          {selectedRowId && +params.row.id === +selectedRowId && (
            <IconButton
              aria-label="edit"
              onClick={() => handleRenameDegen(params)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          <Typography>
            {params.value} {selectedRowId}
          </Typography>
        </Stack>
      ),
    },
    { field: 'degenId', headerName: 'Degen ID' },
    { field: 'multiplier', headerName: 'Multiplier', ...commonColumnProp },
    { field: 'winLoss', headerName: 'Win-Loss', ...commonColumnProp },
    {
      field: 'timePlayed',
      headerName: 'Time Played',
      ...commonColumnProp,
      width: 150,
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
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      ...commonColumnProp,
      renderCell: (params) => (
        <Button variant="outlined" color="secondary">
          Terminate Rental ID:{params.value}
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        rowsPerPageOptions={[10, 25, 100]}
        // Page size and handler required to set default to 10
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        componentsProps={{
          row: {
            onMouseEnter: handleRowMouseEnter,
            onMouseLeave: handleRowMouseLeave,
          },
        }}
      />
      {/* Rename Degen Dialog */}
      <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameRentalDialogContent rental={selectedRowForEditing} />
      </Dialog>
    </>
  );
};

export default MyRentalsDataGrid;
