import { Grid, Button } from '@mui/material';
import SectionSlider from 'components/sections/SectionSlider';
import useVersion from 'hooks/useVersion';
import GameList from './GameList';

const GamesPage = () => {
  const { isWindows, isMacOs, downloadURL, version, message } = useVersion();
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
          rowSpacing={8}
          columnSpacing={2}
        >
          <GameList />
        </Grid>
      </SectionSlider>
    </>
  );
};

export default GamesPage;
