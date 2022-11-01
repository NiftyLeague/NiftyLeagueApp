import React, { memo, useContext, useState } from 'react';
import useInterval from 'hooks/useInterval';
import IMXContext, { Context } from 'contexts/IMXContext';
import MachineFrame from './machine-frame';

import MachineMain from 'assets/images/comics/burner/machine/machine_main_1.png';
import MachineFX1 from 'assets/images/comics/burner/machine/fx_combined_01.png';
import MachineFX2 from 'assets/images/comics/burner/machine/fx_combined_02.png';
import MachineFX3 from 'assets/images/comics/burner/machine/fx_combined_03.png';
import MachineFX4 from 'assets/images/comics/burner/machine/fx_combined_04.png';
import MachineFX5 from 'assets/images/comics/burner/machine/fx_combined_05.png';
import MachineFX6 from 'assets/images/comics/burner/machine/fx_combined_06.png';
import MachineFX7 from 'assets/images/comics/burner/machine/fx_combined_07.png';
import MachineFX8 from 'assets/images/comics/burner/machine/fx_combined_08.png';
import ButtonConnect1 from 'assets/images/comics/burner/machine/button_connectwallet_01.png';
import ButtonConnect2 from 'assets/images/comics/burner/machine/button_connectwallet_02.png';
import ButtonHelp from 'assets/images/comics/burner/machine/button_help_1.png';
import ButtonArrowComicsL1 from 'assets/images/comics/burner/machine/button_arrow_left_01_1.png';
import ButtonArrowComicsL2 from 'assets/images/comics/burner/machine/button_arrow_left_01_2.png';
import ButtonArrowComicsR1 from 'assets/images/comics/burner/machine/button_arrow_right_01_1.png';
import ButtonArrowComicsR2 from 'assets/images/comics/burner/machine/button_arrow_right_01_2.png';
import ButtonArrowCountL1 from 'assets/images/comics/burner/machine/button_arrow_left_02_1.png';
import ButtonArrowCountL2 from 'assets/images/comics/burner/machine/button_arrow_left_02_2.png';
import ButtonArrowCountR1 from 'assets/images/comics/burner/machine/button_arrow_right_02_1.png';
import ButtonArrowCountR2 from 'assets/images/comics/burner/machine/button_arrow_right_02_2.png';
import ButtonBurn1 from 'assets/images/comics/burner/machine/button_burn_1.png';
import ButtonBurn2 from 'assets/images/comics/burner/machine/button_burn_2.png';
import ButtonBurn3 from 'assets/images/comics/burner/machine/button_burn_3.png';
import ButtonBurn4 from 'assets/images/comics/burner/machine/button_burn_4.png';
import ButtonBurn5 from 'assets/images/comics/burner/machine/button_burn_5.png';
import ButtonQ from 'assets/images/comics/burner/machine/button_q_1.png';

// Placeholders
import PlaceholderText from 'assets/images/comics/burner/machine/placeholder_text_1.png';
import PlaceholderWearables from 'assets/images/comics/burner/machine/placeholder_wearables_1.png';

const ComicsBurnerMachine: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<{ imx: Context }>>
> = memo(({ imx }) => {
  const [fastCount, setFastCount] = useState<number>(0);
  const [slowCount, setSlowCount] = useState<number>(0);

  useInterval(() => {
    setFastCount(fastCount + 1);
    // }, 10000);
  }, 100);

  useInterval(() => {
    setSlowCount(slowCount + 1);
    // }, 30000);
  }, 300);

  return (
    <>
      <MachineFrame frames={[MachineMain]} />
      <MachineFrame
        frames={[
          MachineFX1,
          MachineFX2,
          MachineFX3,
          MachineFX4,
          MachineFX5,
          MachineFX6,
          MachineFX7,
          MachineFX8,
        ]}
        interval={fastCount}
      />
      {imx.wallet === 'undefined' ? (
        <MachineFrame
          frames={[ButtonConnect1, ButtonConnect2]}
          interval={slowCount}
        />
      ) : null}
      <MachineFrame frames={[ButtonHelp]} />
      <MachineFrame
        frames={[ButtonArrowComicsL1, ButtonArrowComicsL2]}
        interval={slowCount}
      />
      <MachineFrame
        frames={[ButtonArrowComicsR1, ButtonArrowComicsR2]}
        interval={slowCount}
      />
      <MachineFrame
        frames={[ButtonArrowCountL1, ButtonArrowCountL2]}
        interval={slowCount}
      />
      <MachineFrame
        frames={[ButtonArrowCountR1, ButtonArrowCountR2]}
        interval={slowCount}
      />
      <MachineFrame
        frames={[
          ButtonBurn1,
          ButtonBurn2,
          ButtonBurn3,
          ButtonBurn4,
          ButtonBurn5,
        ]}
        interval={slowCount}
      />
      <MachineFrame frames={[ButtonQ]} />
      {/* Placeholders */}
      <MachineFrame frames={[PlaceholderText]} />
      <MachineFrame frames={[PlaceholderWearables]} />
    </>
  );
});

const ComicsBurnerMachineWithContext = () => {
  const imx = useContext(IMXContext);
  return <ComicsBurnerMachine imx={imx} />;
};

export default ComicsBurnerMachineWithContext;
