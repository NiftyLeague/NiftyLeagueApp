// material-ui
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { GenericCardProps } from 'types';

// ============================|| HOVER DATA CARD ||============================ //

interface TokenInfoCardProps extends GenericCardProps {
  customStyle?: React.CSSProperties;
  actions?: React.ReactNode;
  isLoading?: boolean;
}

const TokenInfoCard = ({
  title,
  secondary,
  customStyle,
  actions,
  isLoading,
}: TokenInfoCardProps) => (
  <Box sx={customStyle}>
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
        <Box
          alignItems="center"
          justifyContent="space-around"
          paddingX={1.5}
          paddingY={1.5}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={100}
                  sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              ) : (
                <Typography variant="h5" color="inherit" textAlign="center">
                  {title}
                </Typography>
              )}
            </Grid>
            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={80}
                  sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  textAlign="center"
                >
                  {secondary}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
        {actions}
      </Grid>
    </Grid>
  </Box>
);

export default TokenInfoCard;
