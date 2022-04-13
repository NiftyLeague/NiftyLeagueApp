// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
  IconBrandChrome,
  IconHelp,
  IconSitemap,
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const LoggedOutItems = {
  id: 'support',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'menu-level-subtitle',
      title: <FormattedMessage id="menu-level-subtitle" />,
      caption: <FormattedMessage id="menu-level-subtitle-caption" />,
      type: 'collapse',
      icon: icons.IconHelp,
      children: [
        {
          id: 'sub-menu-level-1.1',
          title: (
            <>
              <FormattedMessage id="level" /> 1
            </>
          ),
          type: 'item',
          url: '#',
        },
        {
          id: 'sub-menu-level-1.1',
          title: (
            <>
              <FormattedMessage id="level" /> 1
            </>
          ),
          type: 'item',
          url: '#',
        },
      ],
    },
    {
      id: 'disabled-menu',
      title: <FormattedMessage id="disabled-menu" />,
      type: 'item',
      url: '#',
      icon: icons.IconHelp,
      disabled: true,
    },
    {
      id: 'oval-chip-menu',
      title: <FormattedMessage id="oval-chip-menu" />,
      type: 'item',
      url: '#',
      icon: icons.IconHelp,
      chip: {
        label: '9',
        color: 'primary',
      },
    },
    {
      id: 'avatar-chip-menu',
      title: <FormattedMessage id="avatar" />,
      type: 'item',
      url: '#',
      icon: icons.IconHelp,
      chip: {
        label: <FormattedMessage id="coded" />,
        color: 'primary',
        avatar: <FormattedMessage id="c" />,
        size: 'small',
      },
    },
    {
      id: 'outline-chip-menu',
      title: <FormattedMessage id="outlined" />,
      type: 'item',
      url: '#',
      icon: icons.IconHelp,
      chip: {
        label: <FormattedMessage id="outlined" />,
        variant: 'outlined',
        color: 'primary',
      },
    },
  ],
};

export default LoggedOutItems;
