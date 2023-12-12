import { useContext } from 'react';
import { ThemeConfigContext } from '@/contexts/ThemeConfigContext';

// ==============================|| CONFIG - HOOKS  ||============================== //

const useThemeConfig = () => useContext(ThemeConfigContext);

export default useThemeConfig;
