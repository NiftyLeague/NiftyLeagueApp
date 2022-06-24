import { useState, useEffect, useContext } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { isWindows } from 'react-device-detect';
import { DEGEN_BASE_API_URL } from 'constants/url';

const useVersion = () => {
  const { targetNetwork } = useContext(NetworkContext);
  const [version, setVersion] = useState('');
  const env = targetNetwork.chainId === 1 ? 'prod' : 'stage';
  const isLinux = window?.navigator?.userAgent?.indexOf('Linux') >= 0;
  const os = isWindows || isLinux ? 'win' : 'osx';
  const fileName = `NiftyLauncher-setup-${version.substring(
    0,
    version.indexOf('-'),
  )}.exe`;
  const downloadURL = `https://d7ct17ettlkln.cloudfront.net/launcher/${env}/${os}/${version}/${fileName}`;

  useEffect(() => {
    const fetchVersion = async () => {
      const v: string = await fetch(
        `${DEGEN_BASE_API_URL}/launcher/${env}/${os}/version.bin?t=${Date.now()}`,
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
