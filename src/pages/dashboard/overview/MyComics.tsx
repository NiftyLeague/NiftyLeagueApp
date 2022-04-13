import { Grid, Stack, Button } from '@mui/material';
import SectionTitle from 'components/sections/SectionTitle';
import { gridSpacing } from 'store/constant';

interface MyComicsProps {
  onViewAllComics?: React.MouseEventHandler<HTMLButtonElement>;
}

const MyComics = ({ onViewAllComics }: MyComicsProps): JSX.Element => (
  <Grid container spacing={gridSpacing}>
    <Grid item xs={12}>
      <SectionTitle
        firstSection
        actions={
          <Stack direction="row" gap={2}>
            <Button variant="outlined" onClick={onViewAllComics}>
              View All Comics
            </Button>
          </Stack>
        }
      >
        My Comics
      </SectionTitle>
    </Grid>
  </Grid>
);

export default MyComics;
