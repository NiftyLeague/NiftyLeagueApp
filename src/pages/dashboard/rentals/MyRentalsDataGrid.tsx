/* eslint-disable @typescript-eslint/no-unused-vars */
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
import EditIcon from '@mui/icons-material/Edit';
import { Rentals } from 'types/rentals';
import { RentalDataGrid } from 'types/rentalDataGrid';
import RenameRentalDialogContent from './RenameRentalDialogContent';
import { format } from 'date-fns';
import { transformRentals } from '../utils';

interface Props {
  rows: Rentals[];
  loading: boolean;
  handleTerminalRental: (rentalId: string) => void;
}

const MyRentalsDataGrid = ({
  rows,
  loading,
  handleTerminalRental,
}: Props): JSX.Element => {
  const { palette } = useTheme();
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedRowForEditing, setSelectedRowForEditing] =
    useState<RentalDataGrid | null>(null);
  const [isRenameDegenModalOpen, setIsRenameDegenModalOpen] = useState(false);

  const tranformRentails = transformRentals(rows);

  // const handleRowMouseEnter = (event: Event) => {
  //   event.preventDefault();
  //   const htmlRow = event.currentTarget as HTMLDivElement;
  //   setSelectedRowId(htmlRow?.getAttribute('data-id'));
  // };

  // const handleRowMouseLeave = () => {
  //   setSelectedRowId(null);
  // };

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
      width: 360,
      // renderCell: (params) => (
      //   <Stack direction="row" columnGap={1} alignItems="center">
      //     {selectedRowId && +params.row.id === +selectedRowId && (
      //       <IconButton
      //         aria-label="edit"
      //         onClick={() => handleRenameDegen(params)}
      //       >
      //         <EditIcon fontSize="small" />
      //       </IconButton>
      //     )}
      //     <Typography>
      //       {params.value} {selectedRowId}
      //     </Typography>
      //   </Stack>
      // ),
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
        rows={tranformRentails}
        columns={columns}
        autoPageSize
        rowsPerPageOptions={[10, 25, 100]}
        // Page size and handler required to set default to 10
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // componentsProps={{
        //   row: {
        //     onMouseEnter: handleRowMouseEnter,
        //     onMouseLeave: handleRowMouseLeave,
        //   },
        // }}
      />
      {/* Rename Degen Dialog */}
      {/* <Dialog
        open={isRenameDegenModalOpen}
        onClose={() => setIsRenameDegenModalOpen(false)}
      >
        <RenameRentalDialogContent rental={selectedRowForEditing} />
      </Dialog> */}
    </>
  );
};

export default MyRentalsDataGrid;
