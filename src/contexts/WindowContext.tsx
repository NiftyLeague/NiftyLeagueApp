/* eslint-disable no-console */
import React, { createContext, useCallback, useEffect, useState } from 'react';

interface Context {
  active: boolean;
}

const CONTEXT_INITIAL_STATE: Context = {
  active: true,
};

const WindowContext = createContext(CONTEXT_INITIAL_STATE);

export const WindowProvider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): JSX.Element => {
  const [active, setActive] = useState(true);

  const context = {
    active,
  };

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    setActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener(
      'beforeunload',
      () => {
        localStorage.removeItem('active_rental');
      },
      false,
    );

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <WindowContext.Provider value={context}>{children}</WindowContext.Provider>
  );
};

export default WindowContext;
