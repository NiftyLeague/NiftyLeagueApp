/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useEffect, useRef } from 'react';

const usePrevious = (
  value: React.DependencyList,
  initialValue: React.DependencyList,
): React.DependencyList => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (
  effectHook: React.EffectCallback,
  dependencies: React.DependencyList,
  dependencyNames: string[] = [],
): void => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce(
    (
      accum: { [key: number]: { before: unknown; after: unknown } },
      dependency,
      index,
    ) => {
      if (dependency !== previousDeps[index]) {
        const keyName = dependencyNames[index] || index;
        return {
          ...accum,
          [keyName]: {
            before: previousDeps[index],
            after: dependency,
          },
        };
      }

      return accum;
    },
    {},
  ) as { [key: number]: { before: unknown; after: unknown } };

  if (Object.keys(changedDeps).length) {
    // eslint-disable-next-line no-console
    console.log('[use-effect-debugger] ', changedDeps);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectHook, dependencies);
};

export default useEffectDebugger;
