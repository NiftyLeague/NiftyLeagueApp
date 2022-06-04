import AppSwitch from 'components/switch/Switch';
import useConfig from 'hooks/useConfig';

// material-ui
import LightModeIcon from '@mui/icons-material/LightMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface ThemeSwitchProps {}

const ThemeSwitch: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<ThemeSwitchProps>>
> = () => {
  const { navType, onChangeMenuType } = useConfig();
  const theme = useTheme();

  const isDark = navType === 'dark';

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        mb: 8,
        '.selected': {
          color: theme.palette.primary.main,
        },
        '.lightIcon': {
          color: theme.palette.grey[600],
        },
      }}
    >
      {isDark ? (
        <LightModeOutlinedIcon
          className="lightIcon"
          sx={{ fontSize: 14, mr: 3 }}
        />
      ) : (
        <LightModeIcon className="selected" sx={{ fontSize: 14, mr: 3 }} />
      )}
      <AppSwitch
        checked={isDark}
        name="theme"
        size="small"
        onChange={() => onChangeMenuType(isDark ? 'light' : 'dark')}
      />
      {isDark ? (
        <DarkModeIcon className="selected" sx={{ fontSize: 14, ml: 3 }} />
      ) : (
        <DarkModeOutlinedIcon sx={{ fontSize: 14, ml: 3 }} />
      )}
    </Stack>
  );
};

export default ThemeSwitch;
