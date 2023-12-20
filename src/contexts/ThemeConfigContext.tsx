'use client';

import { createContext, ReactNode } from 'react';

// project import
import defaultConfig from '@/config';
import useLocalStorage from '@/hooks/useLocalStorage';

// types
import type { ConfigProps, CustomizationProps } from '@/types/config';
import type { PaletteMode } from '@mui/material';

// initial state
const initialState: CustomizationProps = {
  ...defaultConfig,
  onChangeMenuType: () => {},
  onChangePresetColor: () => {},
  onChangeLocale: () => {},
  onChangeRTL: () => {},
  onChangeContainer: () => {},
  // onChangeFontFamily: () => {},
  onChangeBorderRadius: () => {},
  onChangeOutlinedField: () => {},
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ThemeConfigContext = createContext(initialState);

type ThemeConfigProviderProps = {
  children: ReactNode;
};

function ThemeConfigProvider({ children }: ThemeConfigProviderProps) {
  const [config, setConfig] = useLocalStorage<ConfigProps>('berry-config', {
    // fontFamily: initialState.fontFamily,
    borderRadius: initialState.borderRadius,
    outlinedFilled: initialState.outlinedFilled,
    navType: initialState.navType,
    presetColor: initialState.presetColor,
    locale: initialState.locale,
    rtlLayout: initialState.rtlLayout,
    container: initialState.container,
  });

  const onChangeMenuType = (navType: PaletteMode) => {
    setConfig({ ...(config as ConfigProps), navType });
  };

  const onChangePresetColor = (presetColor: string) => {
    setConfig({ ...(config as ConfigProps), presetColor });
  };

  const onChangeLocale = (locale: string) => {
    setConfig({ ...(config as ConfigProps), locale });
  };

  const onChangeRTL = (rtlLayout: boolean) => {
    setConfig({ ...(config as ConfigProps), rtlLayout });
  };

  const onChangeContainer = () => {
    setConfig({ ...(config as ConfigProps), container: !config?.container });
  };

  // const onChangeFontFamily = (fontFamily: string) => {
  //   setConfig({ ...config as ConfigProps, fontFamily });
  // };

  const onChangeBorderRadius = (event: Event, newValue: number | number[]) => {
    setConfig({ ...(config as ConfigProps), borderRadius: newValue as number });
  };

  const onChangeOutlinedField = (outlinedFilled: boolean) => {
    setConfig({ ...(config as ConfigProps), outlinedFilled });
  };

  return (
    <ThemeConfigContext.Provider
      value={{
        ...(config as ConfigProps),
        onChangeMenuType,
        onChangePresetColor,
        onChangeLocale,
        onChangeRTL,
        onChangeContainer,
        // onChangeFontFamily,
        onChangeBorderRadius,
        onChangeOutlinedField,
      }}
    >
      {children}
    </ThemeConfigContext.Provider>
  );
}

export { ThemeConfigProvider, ThemeConfigContext };
