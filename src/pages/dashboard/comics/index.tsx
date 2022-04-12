import { Stack, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import comics from 'constants/comics';
import ComicCard from 'components/cards/ComicCard';

const DashboardComicsPage = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Stack direction="row" flexWrap="wrap" gap={6}>
          {comics.map((degen) => (
            <ComicCard key={degen.id} {...degen} />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          sx={{
            width: '100%',
            height: '100%',
            background: theme.palette.primary.light,
          }}
        >
          Burn Animation area?
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardComicsPage;
