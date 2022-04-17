import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';
import Default from './Default';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const LoggedOutItems: { items: NavItemType[] } = {
  items: [LoggedOut],
};

const LoggedInItems: { items: NavItemType[] } = {
  items: [LoggedIn],
};

const DefaultItems: { items: NavItemType[] } = {
  items: [Default],
};

export default DefaultItems;

export { LoggedInItems, LoggedOutItems, DefaultItems };
