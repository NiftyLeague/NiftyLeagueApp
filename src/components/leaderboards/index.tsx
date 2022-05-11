/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import EnhancedTable from 'components/leaderboards/EnhancedTable/EnhancedTable';
import './navigation.css';
import { DataType, TableType } from 'types/leaderboard';
import { tables } from 'constants/leaderboard';
import { fetchScores } from 'utils/leaderboard';
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
            ModalIcon={<EmojiEvents className="leaderboard-icon win-rate" />}
          />
          <TopModal ModalIcon={<Paid className="leaderboard-icon xp" />} />
          <TopModal
            ModalIcon={<CrisisAlert className="leaderboard-icon kills" />}
          />
        </Stack>
      </Stack>
      {data && <EnhancedTable rows={data} selectedTable={selectedTable} />}
    </div>
  );
}
