import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { GridRowsProp } from '@mui/x-data-grid';
import MyRentalsDataGrid from './MyRentalsDataGrid';

const DashboardRentalPage = (): JSX.Element => {
  const rows: GridRowsProp = [
    {
      id: 1,
      renter: 'SEIYA',
      degenId: '3743',
      multiplier: '12x',
      winLoss: '98%',
      timePlayed: '22:03:17',
      totalEarnings: '187,325',
      yourEarnings: '187,325',
      costs: '187,325',
      profits: '187,325',
      roi: 200,
      rentalRenewsIn: '17:03:17',
      actions: 1,
    },
  ];

  return (
    <Stack spacing={3}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        columnGap={4}
        rowGap={1}
      >
        <Typography variant="h2">My Rentals</Typography>

        {/* Header form */}
        <Stack
          direction="row"
          alignItems="center"
          rowGap={1}
          columnGap={2}
          flexWrap="wrap"
        >
          <FormControl sx={{ flexDirection: 'row' }}>
            <FormLabel
              component="legend"
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '12px',
              }}
              focused={false}
            >
              Show Scholars Only?
            </FormLabel>
            <RadioGroup name="scholars-only" row>
              <FormControlLabel control={<Radio value="yes" />} label="Yes" />
              <FormControlLabel control={<Radio value="no" />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <TextField
              placeholder="Search players by name or email address"
              name="search"
              variant="outlined"
              fullWidth
              sx={{ minWidth: '480px' }}
            />
          </FormControl>
        </Stack>
      </Stack>

      {/* Data grid */}
      {/* Data grid requires container with height set */}
      <Box height={700}>
        <MyRentalsDataGrid rows={rows} />
      </Box>
    </Stack>
  );
};

export default DashboardRentalPage;
