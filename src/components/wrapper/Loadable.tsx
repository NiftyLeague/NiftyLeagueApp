import { Suspense, LazyExoticComponent } from 'react';

// material-ui
import { LinearProgressProps } from '@mui/material/LinearProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

// styles
const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
});

// ==============================|| LOADER ||============================== //

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

interface LoaderProps extends LinearProgressProps {}

const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) =>
  // eslint-disable-next-line react/display-name
  (props: LoaderProps) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
