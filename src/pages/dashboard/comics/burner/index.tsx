import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import IMXContext from 'contexts/IMXContext';
import NetworkContext from 'contexts/NetworkContext';
import { COMICS_BURNER_CONTRACT } from 'constants/contracts';
import { DEBUG } from 'constants/index';
import { Comic } from 'types/comic';

import Machine from './components/machine';
import MachineButton from './components/machine-button';
import HelpDialog from './components/help-dialog';
import ComicsGrid from './components/comics-grid';
import SatoshiAnimations from './components/satoshi-animations';
import ItemsGrid from './components/items-grid';

const ComicsBurner = () => {
  const navigate = useNavigate();
  const imx = useContext(IMXContext);
  const { tx, writeContracts } = useContext(NetworkContext);
  console.log('CONTEXT', imx);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [selectedComics, setSelectedComics] = useState<Comic[]>([]);
  const [burnCount, setBurnCount] = useState([0, 0, 0, 0, 0, 0]);
  const [burning, setBurning] = useState(false);
  const burnDisabled =
    burning || selectedComics.length < 1 || burnCount.every((c) => !c);

  const handleBurn = useCallback(async () => {
    setBurning(true);
    // eslint-disable-next-line no-console
    if (DEBUG) console.log('burn comics', burnCount);
    // TODO: handle setting contract as approver and sending comics
    const res = await tx(
      writeContracts[COMICS_BURNER_CONTRACT].burnComics(burnCount),
    );
    setBurning(false);
    if (res) {
      setBurnCount([0, 0, 0, 0, 0, 0]);
      setSelectedComics([]);
    }
  }, [tx, writeContracts, burnCount]);

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
        setBurnCount={setBurnCount}
        burnCount={burnCount}
        setSelectedComics={setSelectedComics}
      />
      <SatoshiAnimations burning={burning} />
      <MachineButton
        disabled={burnDisabled}
        height={48}
        name="Burn Button"
        onClick={handleBurn}
        width={360}
        top={850}
        left={0}
      />
      <ItemsGrid />
    </>
  );
};

export default ComicsBurner;
