import { Grid, Button } from '@mui/material';
import SectionSlider from 'components/sections/SectionSlider';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { cardSpacing } from 'store/constant';
import useVersion from 'hooks/useVersion';
import ArcadeGameList from './ArcadeGameList';
import GameList from './GameList';

const GamesPage = () => {
  const { isWindows, downloadURL, version } = useVersion();
  const { enableWenGame } = useFlags();
  return (
    <>
      <SectionSlider
        firstSection
        isSlider={false}
        title="Games"
        actions={
          <Button
            href={downloadURL}
            disabled={!isWindows || !version}
            variant="outlined"
          >
            {!version && isWindows
              ? 'Fetching installer version...'
              : `Download for ${
                  isWindows ? 'Windows' : 'Mac OS will be added soon!'
                }`}
          </Button>
        }
      >
        <Grid
          container
          flexDirection="row"
          flexWrap="wrap"
          spacing={cardSpacing}
        >
          <GameList />
        </Grid>
      </SectionSlider>
      {enableWenGame && (
        <SectionSlider isSlider={false} title="Arcade Games">
          <Grid
            container
            flexDirection="row"
            flexWrap="wrap"
            spacing={cardSpacing}
          >
            <ArcadeGameList />
          </Grid>
        </SectionSlider>
      )}
    </>
  );
};

export default GamesPage;
