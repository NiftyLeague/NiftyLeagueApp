// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project imports
import MainCard from './MainCard';
import { GenericCardProps } from 'types';

// ============================|| HOVER DATA CARD ||============================ //

interface HoverDataCardProps extends GenericCardProps {
  customStyle?: React.CSSProperties;
  actions?: React.ReactNode;
}

const HoverDataCard = ({
  title,
  primary,
  secondary,
  customStyle,
  actions,
}: HoverDataCardProps) => (
  <MainCard sx={customStyle}>
    <Grid
      container
      justifyContent="space-between"
      direction="column"
      alignItems="center"
    >
      <Grid item sm={12}>
        <Typography variant="h5" color="inherit">
          {title}
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ mt: 1.75, mx: 'auto' }}
        >
          <Typography variant="h3">{primary}</Typography>
        </Stack>
      </Grid>
      {secondary && (
        <Grid item sm={12}>
          <Typography sx={{ mb: 1.75 }} variant="body2" color="textSecondary">
            {secondary}
          </Typography>
        </Grid>
      )}
      {actions}
    </Grid>
  </MainCard>
);

export default HoverDataCard;
