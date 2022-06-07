import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

const AppSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  margin: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 1,
    transitionDuration: '300ms',

    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(12px)',

      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      border: '6px solid #fff',
    },
    '&.Mui-disabled': {
      opacity: 0.7,
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[400]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[400]
          : theme.palette.grey[600],
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 14,
    height: 14,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[400]
        : theme.palette.grey[600],
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default AppSwitch;