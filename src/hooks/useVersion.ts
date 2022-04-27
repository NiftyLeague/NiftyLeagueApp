import { useState, useEffect, useContext } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { isWindows } from 'react-device-detect';

const useVersion = () => {
  const { targetNetwork } = useContext(NetworkContext);
  const [version, setVersion] = useState('');
  const env = targetNetwork.chainId === 1 ? 'prod' : 'stage';
  const os = isWindows ? 'win' : 'osx';
  const fileName = `NiftyLauncher-setup-${version.substring(
    0,
    version.indexOf('-'),
  )}.exe`;
  const downloadURL = `https://d7ct17ettlkln.cloudfront.net/launcher/${env}/${os}/${version}/${fileName}`;

  useEffect(() => {
    const fetchVersion = async () => {
      const v: string = await fetch(
        `https://nifty-league.s3.amazonaws.com/launcher/${env}/${os}/version.bin?t=${Date.now()}`,
      )
        .then((res) => {
          if (res.status >= 400) {
            console.error(res.text());
            return '';
          }
          return res.text();
        })
        .catch((e) => {
          console.error(e);
          return '';
        });
      setVersion(v);
    };
    fetchVersion();
  }, [env, os]);

  return {
    downloadURL,
    version,
    isWindows,
  };
};

export default useVersion;
