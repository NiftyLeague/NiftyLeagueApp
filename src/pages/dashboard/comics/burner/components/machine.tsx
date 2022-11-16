import React, { memo, useContext, useState } from 'react';
import useInterval from 'hooks/useInterval';
import IMXContext, { Context } from 'contexts/IMXContext';
import MachineFrame from './machine-frame';

import MachineMain from 'assets/images/comics/burner/machine/machine_main_1.png';
import MachineFX from 'assets/images/comics/burner/machine/machinefx.gif';
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
  React.PropsWithChildren<
    React.PropsWithChildren<{ burnDisabled: boolean; imx: Context }>
  >
> = memo(({ burnDisabled, imx }) => {
  const [count, setCount] = useState<number>(0);

  useInterval(() => {
    setCount(count + 1);
    // }, 30000);
  }, 500);

  return (
    <>
      <MachineFrame frames={[MachineMain]} />
      <MachineFrame frames={[MachineFX]} />
      {imx.wallet === 'undefined' ? (
        <MachineFrame
          frames={[ButtonConnect1, ButtonConnect2]}
          interval={count}
        />
      ) : null}
      <MachineFrame frames={[ButtonHelp]} />
      <MachineFrame
        frames={[ButtonArrowComicsL1, ButtonArrowComicsL2]}
        interval={count}
      />
      <MachineFrame
        frames={[ButtonArrowComicsR1, ButtonArrowComicsR2]}
        interval={count}
      />
      <MachineFrame
        frames={[ButtonArrowCountL1, ButtonArrowCountL2]}
        interval={count}
      />
      <MachineFrame
        frames={[ButtonArrowCountR1, ButtonArrowCountR2]}
        interval={count}
      />
      {!burnDisabled && (
        <MachineFrame
          frames={[
            ButtonBurn1,
            ButtonBurn2,
            ButtonBurn3,
            ButtonBurn4,
            ButtonBurn5,
          ]}
          interval={count}
        />
      )}
      <MachineFrame frames={[ButtonQ]} />
      {/* Placeholders */}
      <MachineFrame frames={[PlaceholderText]} />
      <MachineFrame frames={[PlaceholderWearables]} />
    </>
  );
});

const ComicsBurnerMachineWithContext = ({ burnDisabled = false }) => {
  const imx = useContext(IMXContext);
  return <ComicsBurnerMachine imx={imx} burnDisabled={burnDisabled} />;
};

export default ComicsBurnerMachineWithContext;
