// import { ChangeEvent } from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMXContext from 'contexts/IMXContext';
import { Comic } from 'types/comic';

import { Button } from '@mui/material';
// import useInterval from 'hooks/useInterval';

import Machine from './components/machine';
import MachineButton from './components/machine-button';
import HelpDialog from './components/help-dialog';
import ComicsGrid from './components/comics-grid';
import SatoshiAnimations from './components/satoshi-animations';

const ComicsBurner = () => {
  const navigate = useNavigate();
  const imx = useContext(IMXContext);
  console.log('CONTEXT', imx);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [selectedComics, setSelectedComics] = useState<Comic[]>([]);
  const [burning, setBurning] = useState(false);
  const burnDisabled = burning || selectedComics.length < 1;

  // // The counters
  // const [count, setCount] = useState<number>(0);
  // // Dynamic delay
  // const [delay, setDelay] = useState<number>(1000);
  // // ON/OFF
  // const [isPlaying, setPlaying] = useState<boolean>(false);

  // useInterval(
  //   () => {
  //     setCount(count + 1);
  //   },
  //   // Delay in milliseconds or null to stop it
  //   isPlaying ? delay : null,
  // );

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setDelay(Number(event.target.value));
  // };

  const handleReturnPage = () => navigate('/dashboard/items');

  return (
    <>
      <Button
        variant="contained"
        sx={{ height: 28 }}
        onClick={handleReturnPage}
      >
        ← Back to Comics &amp; Wearables
      </Button>
      {/* <>
        <h1>{count}</h1>
        <button onClick={() => setPlaying(!isPlaying)}>
          {isPlaying ? 'pause' : 'play'}
        </button>
        <p>
          <label htmlFor="delay">Delay: </label>
          <input
            type="number"
            name="delay"
            onChange={handleChange}
            value={delay}
          />
        </p>
      </> */}
      <Machine burnDisabled={burnDisabled} />
      <MachineButton
        disabled={imx.wallet !== 'undefined'}
        height={25}
        name="Connect Wallet"
        onClick={imx.linkSetup}
        width={135}
        top={45}
        left={-200}
      />
      <HelpDialog open={helpDialogOpen} setOpen={setHelpDialogOpen} />
      <MachineButton
        height={20}
        name="Help Button"
        onClick={() => setHelpDialogOpen(true)}
        width={120}
        top={100}
        left={220}
      />
      <ComicsGrid
        selectedComics={selectedComics}
        setSelectedComics={setSelectedComics}
      />
      <SatoshiAnimations burning={burning} />
      <MachineButton
        disabled={burnDisabled}
        height={48}
        name="Burn Button"
        onClick={() => setBurning(true)}
        width={360}
        top={850}
        left={0}
      />
    </>
  );
};

export default ComicsBurner;
