// project imports
import { Theme } from '@mui/material/styles';

export default function componentStyleOverrides(
  theme: Theme,
  borderRadius: number,
  outlinedFilled: boolean,
) {
  const mode = theme.palette.mode;
  const bgColor =
    mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[50];
  const menuSelected =
    mode === 'dark' ? theme.palette.primary.main : theme.palette.secondary.dark;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '6px 14px',
          fontSize: '10px',
          lineHeight: '20px',
          color: theme.palette.grey[50],
          '&.Mui-disabled': {
            color: theme.palette.grey[50],
            background: theme.palette.grey[500],
          },
        },
        outlinedPrimary: {
          color:
            mode === 'dark'
              ? theme.palette.grey[50]
              : theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `${borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.palette.text.dark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        outlined: {
          border: '1px dashed',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          border: 'none !important',
          color: theme.palette.text.primary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: menuSelected,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: 'transparent',
            color: menuSelected,
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.palette.text.dark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        sizeSmall: {
          input: {
            fontSize: '8px',
            padding: '4px',
          },
        },
        root: {
          '&::before': {
            borderBottom: `1px solid ${theme.palette.grey[800]}`,
          },
        },
        input: {
          color: theme.palette.text.primary,
          fontSize: '12px',
          lineHeight: '20px',
          fontFamily: `'IBM Plex Mono', monospace`,
          padding: '8px',
          '&::placeholder': {
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[600]
                : theme.palette.grey[200],
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        sizeSmall: {
          fontSize: '8px',
        },
        root: {
          margin: 0,
          marginTop: '4px',
          fontSize: '12px',
          lineHeight: '20px',
          fontFamily: `'IBM Plex Mono', monospace`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: outlinedFilled ? bgColor : 'transparent',
          borderRadius: `${borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              mode === 'dark'
                ? theme.palette.text.primary + 28
                : theme.palette.grey[400],
          },
          '&:hover $notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: outlinedFilled ? bgColor : 'transparent',
          padding: '16px',
          borderRadius: `${borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            fontSize: '8px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color:
              mode === 'dark'
                ? theme.palette.text.primary + 50
                : theme.palette.grey[500],
          },
        },
        mark: {
          backgroundColor: theme.palette.background.paper,
          width: '4px',
        },
        valueLabel: {
          color:
            mode === 'dark'
              ? theme.palette.primary.main
              : theme.palette.primary.light,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-tag': {
            background:
              mode === 'dark'
                ? theme.palette.text.primary + 20
                : theme.palette.secondary.light,
            borderRadius: 4,
            color: theme.palette.text.dark,
            '.MuiChip-deleteIcon': {
              color:
                mode === 'dark'
                  ? theme.palette.text.primary + 80
                  : theme.palette.secondary[200],
            },
          },
        },
        popper: {
          borderRadius: `${borderRadius}px`,
          boxShadow:
            '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color:
            mode === 'dark'
              ? theme.palette.dark.main
              : theme.palette.primary.dark,
          background:
            mode === 'dark'
              ? theme.palette.text.primary
              : theme.palette.primary[200],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: theme.palette.text.dark,
          fontSize: '16px',
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          marginTop: 14,
          marginBottom: 14,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor:
            mode === 'dark'
              ? theme.palette.dark[900]
              : theme.palette.primary.light,
          '& .MuiTabs-flexContainer': {
            borderColor:
              mode === 'dark'
                ? theme.palette.text.primary + 20
                : theme.palette.primary[200],
          },
          '& .MuiTab-root': {
            color:
              mode === 'dark'
                ? theme.palette.text.secondary
                : theme.palette.grey[900],
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.dark,
          },
          '& .Mui-selected': {
            color: theme.palette.primary.dark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          borderBottom: '1px solid',
          borderColor:
            mode === 'dark'
              ? theme.palette.text.primary + 20
              : theme.palette.grey[200],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '12px 0 12px 0',
          backgroundColor: theme.palette.background.paper,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          lineHeight: '20px',
          fontFamily: `'IBM Plex Mono', monospace`,
          fontWeight: 500,
          borderColor:
            mode === 'dark'
              ? theme.palette.text.primary + 15
              : theme.palette.grey[200],
          '&.MuiTableCell-head': {
            fontSize: '14px',
            lineHeight: '20px',
            fontFamily: `'IBM Plex Mono', monospace`,
            color: theme.palette.grey[100],
            fontWeight: 500,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        dividers: {
          borderColor: theme.palette.grey[800],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textUnderlineOffset: '1px',
          color:
            mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
          textDecorationColor:
            mode === 'dark' ? theme.palette.grey[50] : theme.palette.grey[800],
        },
      },
    },
  };
}
