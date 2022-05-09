import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';

import logo from 'assets/images/logo.png';

import { useDispatch } from 'store';
import { activeItem } from 'store/slices/menu';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO PNG/SVG ||============================== //

const Logo = () => {
  const dispatch = useDispatch();

  const handleClickActive = () => {
    dispatch(activeItem(['']));
  };

  return (
    <Link component={RouterLink} to="/" onClick={handleClickActive}>
      <img src={logo} alt="NiftyLogo" width="32" />
    </Link>
  );
};

export default Logo;
