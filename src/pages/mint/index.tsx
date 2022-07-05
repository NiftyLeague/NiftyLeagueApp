import React, { useState } from 'react';
import ErrorBoundary from 'components/ErrorBoundary';
import Preloader from 'components/Preloader';
import CharacterCreator from './components/CharacterCreator';

const MintPage = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  return (
    <div style={{ textAlign: 'center', overflowX: 'hidden' }}>
      <ErrorBoundary>
        <Preloader ready={isLoaded} progress={progress} />
        <CharacterCreator
          isLoaded={isLoaded}
          setLoaded={setLoaded}
          setProgress={setProgress}
        />
      </ErrorBoundary>
    </div>
  );
};

export default MintPage;
