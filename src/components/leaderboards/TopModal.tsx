import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Box } from '@mui/system';
// import { relative } from 'path';
import CustomModal from './CustomModal';
// import EnhancedTable from './EnhancedTable/EnhancedTable';

import './navigation.css';

const style = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

const Table = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [auth, setAuth] = useState(
    window.localStorage.getItem('authentication-token'),
  );
  // const [data, setData] = useState([]);
  const fetchTopData = () => {
    if (auth) {
      fetch(
        'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/scores',
      )
        .then((res) => res.json())
        .then((jsonData) => {
          // eslint-disable-next-line no-console
          console.log(jsonData);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e);
        });
    }
  };
  useEffect(() => {
    fetchTopData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={style}>
      <div className="title">Leader Boards</div>
      <table className="modal-table">
        <thead className="header">
          <tr className="row">
            <th className="cell index">Rank</th>
            <th className="cell ellipsis">Name</th>
            <th className="cell ellipsis">TOTAL NFLT EARNED</th>
            <th className="cell ellipsis">MATCH PLAYS</th>
            <th className="cell ellipsis">
              AVG, TOTAL NFLT EARNED/MATCH PLAYS
            </th>
            <th className="cell ellipsis">KILLS</th>
          </tr>
        </thead>
        <tbody className="body">
          <tr className="row first">
            <td className="cell index" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis end" />
          </tr>
          {
            // data.slice(0, 10).map((row, index) => <tr key={row.name} className='row'>
            //   <td className='cell index'>
            //     {index + 1}
            //   </td>
            //   <td className='cell ellipsis'>
            //     {row.name}
            //   </td>
            //   <td className='cell ellipsis'>{row.winRate}</td>
            //   <td className='cell ellipsis end'>{row.plays}</td>
            // </tr>)
          }
          <tr className="row last">
            <td className="cell index" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis" />
            <td className="cell ellipsis end" />
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

const TopModal = ({ ModalIcon }): JSX.Element | null => {
  return <CustomModal ModalIcon={ModalIcon} child={<Table />} />;
};
export default TopModal;
