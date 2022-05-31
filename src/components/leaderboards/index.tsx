/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import EnhancedTable from 'components/leaderboards/EnhancedTable/EnhancedTable';
import './navigation.css';
import { TableType } from 'types/leaderboard';
import { tables } from 'constants/leaderboard';
import { Tabs, Tab, Stack } from '@mui/material';
// import { EmojiEvents, Paid, CrisisAlert } from '@mui/icons-material';
// import TopModal from './TopModal';

export default function LeaderBoards(): JSX.Element {
  const [selectedTable, setTable] = useState(tables[0]);

  const handleMenuClick = (table: TableType) => {
    setTable(table);
  };
  // useEffect(() => {
  //   setData(rows['win-rate']);
  // }, []);

  return (
    <div
      style={{
        margin: 'auto',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Tabs
          aria-label="table tab"
          textColor="secondary"
          indicatorColor="secondary"
          value={selectedTable.key}
        >
          {tables.map((table) => (
            <Tab
              key={table.key}
              onClick={() => handleMenuClick(table)}
              label={table.display}
              value={table.key}
            />
          ))}
        </Tabs>
        {/* <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TopModal
            flag="win_rate"
            ModalIcon={<EmojiEvents className="leaderboard-icon win-rate" />}
          />
          <TopModal
            flag="xp"
            ModalIcon={<Paid className="leaderboard-icon xp" />}
          />
          <TopModal
            flag="kills"
            ModalIcon={<CrisisAlert className="leaderboard-icon kills" />}
          />
        </Stack> */}
      </Stack>
      <EnhancedTable selectedTable={selectedTable} />
    </div>
  );
}
