import React, { memo, useContext, useState } from 'react';
import useInterval from 'hooks/useInterval';
import IMXContext, { Context } from 'contexts/IMXContext';
import SatoshiFrame from './satoshi-frame';
import SatoshiBurnAnim from './satoshi-burn-animations';

import IdleAnimations1 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_01.png';
import IdleAnimations2 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_02.png';
import IdleAnimations3 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_03.png';
import IdleAnimations4 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_04.png';
import IdleAnimations5 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_05.png';
import IdleAnimations6 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_06.png';
import IdleAnimations7 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_07.png';
import IdleAnimations8 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_08.png';
import IdleAnimations9 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_09.png';
import IdleAnimations10 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_10.png';
import IdleAnimations11 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_11.png';
import IdleAnimations12 from 'assets/images/comics/burner/idle-animations/burnanim_idle_loop_12.png';

const SatoshiAnimations: React.FC<
  React.PropsWithChildren<
    React.PropsWithChildren<{ burning: boolean; imx: Context }>
  >
> = memo(({ burning, imx }) => {
  const [count, setCount] = useState<number>(0);

  useInterval(() => {
    setCount(count + 1);
  }, 100);
  // }, 100);

  return (
    <>
      {burning ? (
        <SatoshiBurnAnim />
      ) : (
        <SatoshiFrame
          frames={[
            IdleAnimations1,
            IdleAnimations2,
            IdleAnimations3,
            IdleAnimations4,
            IdleAnimations5,
            IdleAnimations6,
            IdleAnimations7,
            IdleAnimations8,
            IdleAnimations9,
            IdleAnimations10,
            IdleAnimations11,
            IdleAnimations12,
          ]}
          interval={count}
        />
      )}
    </>
  );
});

const SatoshiAnimationsWithContext = ({ burning = false }) => {
  const imx = useContext(IMXContext);
  return <SatoshiAnimations burning={burning} imx={imx} />;
};

export default SatoshiAnimationsWithContext;
