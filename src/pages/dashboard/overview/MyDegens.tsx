import { Grid, Stack, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';
import SectionTitle from 'components/sections/SectionTitle';

interface MyDegensProps {
  onViewAllDegens?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyDegens = ({ onViewAllDegens }: MyDegensProps): JSX.Element => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <SectionTitle
        firstSection
        actions={
          <Stack direction="row" gap={2}>
            <Button variant="outlined" onClick={onViewAllDegens}>
              View All Degens
            </Button>
          </Stack>
        }
      >
        My Degens
      </SectionTitle>
    </Grid>
  </Grid>
);

export default MyDegens;
