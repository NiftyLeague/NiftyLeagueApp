/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import {
  Box,
  FormControl,
  // List,
  // ListItemButton,
  // ListItemText,
  MenuItem,
  Stack,
  // Theme,
  // Typography,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { makeStyles } from '@mui/styles';
import { TableType } from 'types/leaderboard';
import {
  LEADERBOARD_GAME_LIST,
  LEADERBOARD_TIME_FILTERS,
  NiftySmashersTables,
  WenGameTables,
} from 'constants/leaderboard';
import EnhancedTable from 'components/leaderboards/EnhancedTable/EnhancedTable';
// import { EmojiEvents, Paid, CrisisAlert } from '@mui/icons-material';
// import TopModal from './TopModal';
import './navigation.css';

// const useStyles = makeStyles((theme: Theme) => ({
//   listItemButtonStyle: {
//     padding: `${theme.spacing(0.25)} ${theme.spacing(1.5)}`,
//     '&.Mui-selected': {
//       backgroundColor: 'transparent !important',
//     },
//   },
// }));

export default function LeaderBoards(): JSX.Element {
  // const { listItemButtonStyle } = useStyles();
  const [selectedGame, setGame] = useState<string>(
    LEADERBOARD_GAME_LIST[0].key,
  );
  const [selectedTable, setTable] = useState<TableType>(NiftySmashersTables[0]);
  const [selectedType, setType] = useState<string>(NiftySmashersTables[0].key);
  // const [selectedTimeFilter, setTimeFilter] = useState<string>(
  //   LEADERBOARD_TIME_FILTERS[2].key,
  // );

  const handleChangeGame = (event: SelectChangeEvent) => {
    const game = event.target.value;
    setGame(game);
    if (game === 'nifty_smashers') {
      setTable(NiftySmashersTables[0]);
      setType(NiftySmashersTables[0].key);
    } else {
      setTable(WenGameTables[0]);
      setType(WenGameTables[0].key);
    }
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    const table = NiftySmashersTables.find(
      (t: TableType) => t.key === event.target.value,
    );
    if (table) {
      setTable(table);
      setType(table.key);
    }
  };

  // const handleChangeTimeFilter = (selected: string) => {
  //   setTimeFilter(selected);
  // };

  return (
    <Box sx={{ margin: 'auto' }}>
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        alignItems={{ sm: 'center', xs: 'inherit' }}
        mb={4}
        spacing={{ md: 2, xs: 1 }}
      >
        <FormControl sx={{ minWidth: '180px' }}>
          <Select
            value={selectedGame}
            onChange={handleChangeGame}
            inputProps={{ sx: { paddingY: 0.75 } }}
          >
            {LEADERBOARD_GAME_LIST.map((item) => (
              <MenuItem value={item.key} key={item.key}>
                {item.display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedGame === 'nifty_smashers' && (
          <FormControl sx={{ minWidth: '140px' }}>
            <Select
              value={selectedType}
              onChange={handleChangeType}
              inputProps={{
                sx: { paddingY: 0.75 },
              }}
            >
              {NiftySmashersTables.map((item) => (
                <MenuItem value={item.key} key={item.key}>
                  {item.display}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {/* Hide for now since api is not implemented well */}
        {/* <List sx={{ display: 'flex' }}>
          {LEADERBOARD_TIME_FILTERS.map((item) => (
            <ListItemButton
              key={item.key}
              selected={item.key === selectedTimeFilter}
              onClick={() => handleChangeTimeFilter(item.key)}
              classes={{ root: listItemButtonStyle }}
            >
              <ListItemText>
                <Typography
                  variant="body1"
                  color="inherit"
                  sx={{ fontWeight: 700, textTransform: 'uppercase' }}
                >
                  {item.display}
                </Typography>
              </ListItemText>
            </ListItemButton>
          ))}
        </List> */}
      </Stack>
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
      <EnhancedTable
        selectedGame={selectedGame}
        selectedTable={selectedTable}
        selectedTimeFilter={LEADERBOARD_TIME_FILTERS[2].key}
      />
    </Box>
  );
}
