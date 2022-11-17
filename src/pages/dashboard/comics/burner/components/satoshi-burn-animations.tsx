import React, { memo } from 'react';
// import useInterval from 'hooks/useInterval';
import SatoshiFrame from './satoshi-frame';

// import BurnAnimations1 from 'assets/images/comics/burner/burning-animations/burnanim_001.png';
// import BurnAnimations2 from 'assets/images/comics/burner/burning-animations/burnanim_002.png';
// import BurnAnimations3 from 'assets/images/comics/burner/burning-animations/burnanim_003.png';
// import BurnAnimations4 from 'assets/images/comics/burner/burning-animations/burnanim_004.png';
// import BurnAnimations5 from 'assets/images/comics/burner/burning-animations/burnanim_005.png';
// import BurnAnimations6 from 'assets/images/comics/burner/burning-animations/burnanim_006.png';
// import BurnAnimations7 from 'assets/images/comics/burner/burning-animations/burnanim_007.png';
// import BurnAnimations8 from 'assets/images/comics/burner/burning-animations/burnanim_008.png';
// import BurnAnimations9 from 'assets/images/comics/burner/burning-animations/burnanim_009.png';
// import BurnAnimations10 from 'assets/images/comics/burner/burning-animations/burnanim_010.png';
// import BurnAnimations11 from 'assets/images/comics/burner/burning-animations/burnanim_011.png';
// import BurnAnimations12 from 'assets/images/comics/burner/burning-animations/burnanim_012.png';
// import BurnAnimations13 from 'assets/images/comics/burner/burning-animations/burnanim_013.png';
// import BurnAnimations14 from 'assets/images/comics/burner/burning-animations/burnanim_014.png';
// import BurnAnimations15 from 'assets/images/comics/burner/burning-animations/burnanim_015.png';
// import BurnAnimations16 from 'assets/images/comics/burner/burning-animations/burnanim_016.png';
// import BurnAnimations17 from 'assets/images/comics/burner/burning-animations/burnanim_017.png';
// import BurnAnimations18 from 'assets/images/comics/burner/burning-animations/burnanim_018.png';
// import BurnAnimations19 from 'assets/images/comics/burner/burning-animations/burnanim_019.png';
// import BurnAnimations20 from 'assets/images/comics/burner/burning-animations/burnanim_020.png';
// import BurnAnimations21 from 'assets/images/comics/burner/burning-animations/burnanim_021.png';
// import BurnAnimations22 from 'assets/images/comics/burner/burning-animations/burnanim_022.png';
// import BurnAnimations23 from 'assets/images/comics/burner/burning-animations/burnanim_023.png';
// import BurnAnimations24 from 'assets/images/comics/burner/burning-animations/burnanim_024.png';
// import BurnAnimations25 from 'assets/images/comics/burner/burning-animations/burnanim_025.png';
// import BurnAnimations26 from 'assets/images/comics/burner/burning-animations/burnanim_026.png';
// import BurnAnimations27 from 'assets/images/comics/burner/burning-animations/burnanim_027.png';
import BurnAnimations from 'assets/images/comics/burner/burning-animations/burnanim.gif';

const SatoshiBurnAnimations: React.FC = memo(() => {
  // const [count, setCount] = useState<number>(0);

  // useInterval(() => {
  //   setCount(count + 1);
  // }, 100);
  // // }, 100);

  return <SatoshiFrame frames={[BurnAnimations]} />;
});

export default SatoshiBurnAnimations;
