import { ChangeEvent, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useInterval from 'hooks/useInterval';

import Machine from './machine';

const ComicsBurner = () => {
  const navigate = useNavigate();

  // The counters
  const [count, setCount] = useState<number>(0);
  // Dynamic delay
  const [delay, setDelay] = useState<number>(1000);
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useInterval(
    () => {
      setCount(count + 1);
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

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
      <>
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
      </>
      <Machine />
    </>
  );
};

export default ComicsBurner;
