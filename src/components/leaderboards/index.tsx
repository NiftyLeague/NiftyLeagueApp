/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import EnhancedTable from 'components/leaderboards/EnhancedTable/EnhancedTable';
import './navigation.css';
import { DataType, TableType } from 'types/leaderboard';
import { tables } from 'constants/leaderboard';
import { fetchScores, fetchUserNames } from 'utils/leaderboard';
import { Tabs, Tab, Stack } from '@mui/material';
import { EmojiEvents, Paid, CrisisAlert } from '@mui/icons-material';
import TopModal from './TopModal';

export default function LeaderBoards(): JSX.Element {
  const [selectedTable, setTable] = useState(tables[0]);
  const [data, setData] = useState<DataType[]>();

  const handleMenuClick = (table: TableType) => {
    setTable(table);
  };
  // useEffect(() => {
  //   setData(rows['win-rate']);
  // }, []);
  const fetchTopData = async () => {
    const arrayData: DataType[] = await fetchScores(selectedTable.key, 50);
    let items: DataType[] = [];
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i].rank < 50) {
        items.push(arrayData[i].user_id);
      }
    }
    const dd: DataType[] = await fetchUserNames(items);
    let a = Object.entries(dd);
    for (let i = 0; i < arrayData.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (arrayData[i].user_id === a[j][0]) {
          arrayData[i].user_id = a[j][1].name;
        }
      }
    }
    setData(arrayData);
  };
  useEffect(() => {
    void fetchTopData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTable.key]);
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
        <Stack
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
        </Stack>
      </Stack>
      {data && <EnhancedTable rows={data} selectedTable={selectedTable} />}
    </div>
  );
}
