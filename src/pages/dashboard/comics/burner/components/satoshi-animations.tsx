import React, { memo, useContext } from 'react';
import IMXContext, { Context } from 'contexts/IMXContext';
import SatoshiFrame from './satoshi-frame';
import SatoshiBurnAnim from './satoshi-burn-animations';

import IdleAnimations from 'assets/images/comics/burner/idle-animations/idleanim.gif';

const SatoshiAnimations: React.FC<
  React.PropsWithChildren<
    React.PropsWithChildren<{ burning: boolean; imx: Context }>
  >
> = memo(({ burning, imx }) => {
  return (
    <>
      {burning ? (
        <SatoshiBurnAnim />
      ) : (
        <SatoshiFrame frames={[IdleAnimations]} />
      )}
    </>
  );
});

const SatoshiAnimationsWithContext = ({ burning = false }) => {
  const imx = useContext(IMXContext);
  return <SatoshiAnimations burning={burning} imx={imx} />;
};

export default SatoshiAnimationsWithContext;
