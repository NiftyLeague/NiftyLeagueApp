import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import comics from 'constants/comics';
import ComicCard from 'components/cards/ComicCard';
import EmptyState from 'components/EmptyState';
import { cardSpacing } from 'store/constant';

const DashboardComicsPage = (): JSX.Element => {
  const theme = useTheme();
  if (!comics.length)
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        display="flex"
        height="100%"
      >
        <EmptyState
          message="You don't own any Comics yet."
          buttonText="Buy a Comic"
        />
      </Grid>
    );
  return (
    <Grid container spacing={cardSpacing}>
      <Grid item md={8} xs={12}>
        <Grid
          container
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          spacing={cardSpacing}
        >
          {comics.map((comic) => (
            <Grid key={comic.id} item xs={12} sm={6} md={6} lg={6} xl={4}>
              <ComicCard {...comic} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item md={4} xs={12}>
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
