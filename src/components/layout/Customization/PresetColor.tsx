// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Grid } from '@mui/material';
import { IconChecks } from '@tabler/icons';

// project imports
import useConfig from 'hooks/useConfig';
import SubCard from 'components/cards/SubCard';

// color import
import colors from 'assets/scss/_themes-vars.module.scss';
import themeV3 from 'assets/scss/_themeV3.module.scss';

// types
import { StringColorProps } from 'types';

interface Props {
  color: StringColorProps;
  presetColor: string;
  setPresetColor: (s: string) => void;
}

const PresetColorBox = ({ color, presetColor, setPresetColor }: Props) => (
  <Grid item>
    <Avatar
      variant="rounded"
      color="inherit"
      sx={{
        background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
        opacity: presetColor === color.id ? 0.6 : 1,
        cursor: 'pointer',
      }}
      onClick={() => setPresetColor(color?.id!)}
    >
      {presetColor === color.id && <IconChecks color="#fff" />}
    </Avatar>
  </Grid>
);

const PresetColor = () => {
  const theme = useTheme();
  const { presetColor, onChangePresetColor } = useConfig();

  const colorOptions = [
    {
      id: 'default',
      primary:
        theme.palette.mode === 'dark'
          ? colors.darkPrimaryMain
          : colors.primaryMain,
      secondary:
        theme.palette.mode === 'dark'
          ? colors.darkSecondaryMain
          : colors.secondaryMain,
    },
    {
      id: 'themeV3',
      primary:
        theme.palette.mode === 'dark'
          ? themeV3.darkPrimaryMain
          : themeV3.primaryMain,
      secondary:
        theme.palette.mode === 'dark'
          ? themeV3.darkSecondaryMain
          : themeV3.secondaryMain,
    },
  ];

  return (
    <SubCard title="Preset Color">
      <Grid item container spacing={2} alignItems="center">
        {colorOptions.map((color) => (
          <PresetColorBox
            key={color.id}
            color={color}
            presetColor={presetColor}
            setPresetColor={onChangePresetColor}
          />
        ))}
      </Grid>
    </SubCard>
  );
};

export default PresetColor;
