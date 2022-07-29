import { Grid, Button } from '@mui/material';
import SectionSlider from 'components/sections/SectionSlider';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { cardSpacing } from 'store/constant';
import useVersion from 'hooks/useVersion';
import MiniGameList from './MiniGameList';
import GameList from './GameList';

const GamesPage = () => {
  const { isWindows, isMacOs, downloadURL, version, message } = useVersion();
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
            disabled={isMacOs || !version}
            variant="outlined"
          >
            {!version && isWindows ? 'Fetching installer version...' : message}
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
        <SectionSlider isSlider={false} title="Mini Games">
          <Grid
            container
            flexDirection="row"
            flexWrap="wrap"
            spacing={cardSpacing}
          >
            <MiniGameList />
          </Grid>
        </SectionSlider>
      )}
    </>
  );
};

export default GamesPage;
