import { Grid, Stack, Typography } from '@mui/material';

import usePlayerProfile from 'hooks/usePlayerProfile';

// import SectionSlider from 'components/sections/SectionSlider';
import ImageProfile from './ImageProfile';
import RightInfo from './Stats/RightInfo';
import LeftInfo from './Stats/LeftInfo';
import TopInfo from './Stats/TopInfo';
import EmptyState from 'components/EmptyState';

import { sectionSpacing } from 'store/constant';

const GamerProfile = (): JSX.Element => {
  const { profile } = usePlayerProfile();

  const renderEmptyProfile = () => {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        display="flex"
        height="100%"
      >
        <EmptyState message="You don't own any Gamer Profile yet." />
      </Grid>
    );
  };

  const renderGamerProfile = () => {
    return (
      <Grid container gap={sectionSpacing}>
        <Grid item container spacing={3}>
          <Grid item xs={12} md={3.5}>
            <ImageProfile />
          </Grid>
          <Grid item xs={12} md={8.5}>
            <TopInfo total={profile?.stats?.total} />
            <hr />
            <Stack spacing={1}>
              <Stack>
                <Typography variant="h3" component="div">
                  Nifty League Player Stats
                </Typography>
              </Stack>
              <Stack direction="row" spacing={5}>
                <LeftInfo total={profile?.stats?.total} />
                <RightInfo />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        {/* TODO: NF-249 */}
        {/* <Stack gap={sectionSpacing}>
          <SectionSlider
            firstSection
            title="Player Stats by Game"
          ></SectionSlider>
        </Stack> */}
      </Grid>
    );
  };

  return !profile ? renderEmptyProfile() : renderGamerProfile();
};

export default GamerProfile;
