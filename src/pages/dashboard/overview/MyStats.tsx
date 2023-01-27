import { Link } from 'react-router-dom';
import { Button, Grid, Stack } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import { sectionSpacing } from 'store/constant';
import { useGamerProfile } from 'hooks/useGamerProfile';
import { GamerProfileContext } from '../gamer-profile';
import LeftInfo from '../gamer-profile/Stats/LeftInfo';
import { Profile } from 'types/account';

const MyStats = ({ profile }: { profile?: Profile }): JSX.Element => {
  return (
    <Grid container spacing={sectionSpacing} sx={{ height: '100%' }}>
      <Grid item xs={12}>
        <SectionTitle
          firstSection
          actions={
            <Stack direction="row" gap={2}>
              <Button
                variant="outlined"
                component={Link}
                to="/dashboard/gamer-profile"
              >
                View All Stats
              </Button>
            </Stack>
          }
        >
          My Stats
        </SectionTitle>
      </Grid>
      <Grid item xs={12} sx={{ height: '100%' }}>
        <Stack direction="row" spacing={5}>
          <LeftInfo data={profile?.stats?.total} />
        </Stack>
      </Grid>
    </Grid>
  );
};

const MyStatsContext = () => {
  const { profile, error, loadingProfile } = useGamerProfile();
  return !error && (profile || loadingProfile) ? (
    <GamerProfileContext.Provider
      value={{
        isLoadingProfile: loadingProfile,
        isLoadingDegens: false,
        isLoadingComics: false,
      }}
    >
      <MyStats profile={profile} />
    </GamerProfileContext.Provider>
  ) : null;
};

export default MyStatsContext;
