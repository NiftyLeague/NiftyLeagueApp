// material-ui
import { Button, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import PopUpCard from 'components/cards/PopUpCard';

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
    <PopUpCard
      title="Desktop App"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      actions={
        <>
          <Button variant="contained" sx={{ m: 2 }}>
            Get Windows version
          </Button>
          <Button variant="contained" sx={{ m: 2 }}>
            Get MacOS version
          </Button>
        </>
      }
    />
  </>
);

export default SamplePage;
