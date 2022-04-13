// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
// import EmptyStateModal from 'components/EmptyStateComponent';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <>
    <MainCard title="Sample Card">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion
        tempos incident ut laborers et doolie magna alissa. Ut enif ad minim
        venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea
        commons construal. Duos aube grue dolor in reprehended in voltage veil
        esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate
        non president, sunk in culpa qui officiate descent molls anim id est
        labours.
      </Typography>
    </MainCard>
    {/* <EmptyStateModal
      message="You don't have anything here."
      buttonText="Buy stuff!"
    />
    <EmptyStateModal message="Is Wahyu the best?" buttonText="Yes!" />
    <EmptyStateModal message="I love cats" buttonText="Me too!" /> */}
  </>
);

export default SamplePage;
