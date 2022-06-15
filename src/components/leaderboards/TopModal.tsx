/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import CustomModal from './CustomModal';
import makeStyles from '@mui/styles/makeStyles';
import { fetchScores } from 'utils/leaderboard';
import { DataType, ReturnDataType } from 'types/leaderboard';
import './navigation.css';
import {
  TableBody,
  TableHead,
  TableRow,
  Table,
  TableCell,
  CircularProgress,
} from '@mui/material';

const useStyles = makeStyles({
  title: {
    position: 'absolute',
    top: '-38px',
    zIndex: 4444,
    width: '100%',
    fontSize: 45,
    textAlign: 'center',
    color: '#1b152c',
    fontWeight: 'bold',
  },
  time: {
    color: '#8c9cb4',
    height: '50px',
    display: 'flex',
    fontSize: '20px',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    position: 'absolute',
    width: '525px',
  },
  lineTop: {
    position: 'absolute',
    top: '-9px',
    right: '-2px',
    height: 15,
    borderRight: 'solid 2px #8c9cb4',
  },
  lineBottom: {
    position: 'absolute',
    bottom: '-9px',
    right: '-2px',
    height: 15,
    borderRight: 'solid 2px #8c9cb4',
  },
  rankBody: {
    padding: '10px',
    borderRadius: '50px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  rank: {
    color: '#9ba5bf !important',
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '525px',
    position: 'absolute',
    display: 'flex',
    height: '255px',
  },
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    '& thead': {
      position: 'initial !important',
      display: 'contents !important',
    },
    '& table': {
      width: 525,
      margin: '397px auto auto',
    },
    '& .cell': {
      height: '40px !important',
      overflow: 'initial !important',
      position: 'relative',
    },
    '& th': {
      color: '#9ba5bf !important',
      maxWidth: '60px !important',
    },
    '& tbody': {
      maxWidth: 525,
      position: 'initial !important',
      '& tr': {
        '&:first-child': {
          borderTop: 'solid 2px #8c9cb4',
        },
      },
    },
    '& tr': {
      '& th': {
        '&:last-child': {
          borderRight: 'none !important',
          color: '#9ba5bf !important',
        },
      },
      '& td': {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        '&:last-child': {
          borderRight: 'none !important',
        },
      },
    },
  },
});

interface TableModalProps {
  selectedGame: string;
  flag: string;
  selectedTimeFilter: string;
}

const TableModal = ({
  selectedGame,
  flag,
  selectedTimeFilter,
}: TableModalProps): JSX.Element | null => {
  let d = new Date(),
    t = d.toDateString().split(' ');
  const classes = useStyles();
  const [data, setData] = useState<DataType[]>();

  // get the top ten items
  const fetchDataItems = async () => {
    // TODO: We should update game and time_window param later accordingly
    const ret: ReturnDataType = await fetchScores(
      selectedGame,
      flag,
      selectedTimeFilter,
      10,
      0,
    );
    setData(ret.data.filter((i: { rank: number }) => i.rank <= 10));
  };

  useEffect(() => {
    fetchDataItems();
  }, []);

  const handleSetBackground = (rate: number) => {
    if (rate === 1) {
      return { fontSize: 15, background: '#ffcd1c', width: '100%' };
    } else if (rate === 2) {
      return { fontSize: 15, background: '#d8d8d8', width: '100%' };
    } else if (rate === 3) {
      return { fontSize: 15, background: '#e49c8e', width: '100%' };
    }
    return { fontSize: 14, background: '' };
  };

  const handleSetTopPeople = (rate: number) => {
    if (rate === 1) {
      return {
        border: 'solid 1px #ffcd1c',
        background: '#ffcd1c',
        color: 'white',
      };
    } else if (rate === 2) {
      return {
        border: 'solid 1px rgb(216, 216, 216)',
        background: 'rgb(216, 216, 216)',
        color: 'white',
      };
    } else if (rate === 3) {
      return {
        border: 'solid 1px rgb(228, 156, 142)',
        background: 'rgb(228, 156, 142)',
        color: 'white',
      };
    }
    return {};
  };

  // shorten user id letters
  const handleShortenUserId = (userId: string) => {
    const firstChar = userId.slice(-4);
    const lastChar = userId.slice(0, 4);
    const user = lastChar.concat('***', firstChar);
    return user;
  };

  return (
    <Box className={classes.root}>
      <code className={classes.title}>
        {flag === 'win_rate'
          ? 'WIN RATE'
          : flag === 'xp'
          ? 'TOP EARNERS'
          : 'TOP KILLS'}
      </code>
      <Table className="modal-table">
        <TableHead className="header">
          <TableRow className="row">
            <TableCell component="th" className="cell index">
              <code>RANK</code>
            </TableCell>
            <TableCell component="th" className="cell ellipsis">
              <code>USERNAME</code>
            </TableCell>
            {flag === 'win_rate' && (
              <TableCell component="th" className="cell ellipsis">
                <code>WIN RATE</code>
              </TableCell>
            )}
            {flag === 'xp' && (
              <TableCell component="th" className="cell ellipsis">
                <code>TOTALNFTLEARNED</code>
              </TableCell>
            )}
            {flag !== 'score' && (
              <TableCell
                component="th"
                className="cell ellipsis"
                style={{ fontSize: 12 }}
              >
                <code>MATCHES PLAYED</code>
              </TableCell>
            )}
            {flag === 'xp' && (
              <TableCell component="th" className="cell ellipsis">
                <code>AVG,NFTL/MATCH</code>
              </TableCell>
            )}
            {flag !== 'win_rate' && flag !== 'score' && (
              <TableCell component="th" className="cell ellipsis">
                <code>KILLS</code>
              </TableCell>
            )}
            {flag === 'score' && (
              <TableCell component="th" className="cell ellipsis">
                <code>HIGH SCORE</code>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <Box sx={{ marginTop: '50px' }} />
        <TableBody className="body">
          {data ? (
            data.map((i) => (
              <TableRow className="row first">
                <TableCell className={`cell index ${classes.rank}`}>
                  <span
                    className={classes.rankBody}
                    style={handleSetTopPeople(i.rank)}
                  >
                    {i.rank}
                  </span>
                  {i.rank === 1 && <Box className={classes.lineTop} />}
                  {i.rank === 10 && <Box className={classes.lineBottom} />}
                </TableCell>
                <TableCell
                  style={handleSetBackground(i.rank)}
                  className="cell ellipsis"
                >
                  {handleShortenUserId(i.user_id)}
                  {i.rank === 1 && <Box className={classes.lineTop} />}
                  {i.rank === 10 && <Box className={classes.lineBottom} />}
                </TableCell>
                {flag === 'win_rate' && (
                  <TableCell className="cell ellipsis">
                    {i.stats.win_rate}
                    {i.rank === 1 && <Box className={classes.lineTop} />}
                    {i.rank === 10 && <Box className={classes.lineBottom} />}
                  </TableCell>
                )}
                {flag === 'xp' && (
                  <TableCell className="cell ellipsis end">
                    {i.stats.earnings}
                    {i.rank === 1 && flag === 'xp' && (
                      <Box className={classes.lineTop} />
                    )}
                    {i.rank === 10 && flag === 'xp' && (
                      <Box className={classes.lineBottom} />
                    )}
                  </TableCell>
                )}
                <TableCell className="cell ellipsis end">
                  {i.stats.matches}
                  {i.rank === 1 && flag === 'xp' && (
                    <Box className={classes.lineTop} />
                  )}
                  {i.rank === 10 && flag === 'xp' && (
                    <Box className={classes.lineBottom} />
                  )}
                </TableCell>
                {flag === 'xp' && (
                  <TableCell className="cell ellipsis end">
                    {i.stats['avg_NFTL/match']}
                    {i.rank === 1 && <Box className={classes.lineTop} />}
                    {i.rank === 10 && <Box className={classes.lineBottom} />}
                  </TableCell>
                )}
                {flag !== 'win_rate' && (
                  <TableCell className="cell ellipsis end">
                    {i.stats.kills}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <Box className={classes.loadingBox}>
              <CircularProgress />
            </Box>
          )}
          {data && (
            <code className={classes.time}>
              {t[2] + ' ' + t[1] + ' ' + t[3]}
            </code>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

interface TopModalProps extends TableModalProps {
  ModalIcon: JSX.Element;
}

const TopModal = ({
  ModalIcon,
  selectedGame,
  flag,
  selectedTimeFilter,
}: TopModalProps): JSX.Element | null => {
  return (
    <CustomModal
      ModalIcon={ModalIcon}
      child={
        <TableModal
          selectedGame={selectedGame}
          flag={flag}
          selectedTimeFilter={selectedTimeFilter}
        />
      }
      flag={flag}
    />
  );
};
export default TopModal;
