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
  Typography,
} from '@mui/material';

import { ReactComponent as TwitterIcon } from 'assets/images/icons/twitter.svg';
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
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    display: 'flex',
  },
  root: {
    width: '80%',
    height: '57%',
    margin: '56.6% auto 0',
    position: 'relative',
    overflow: 'hidden',
    '& thead': {
      position: 'initial !important',
      display: 'contents !important',
    },
    '& table': {
      width: '100%',
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
  twitter: {
    width: '100%',
    background: 'white',
    color: '#5E72EB',
    fontWeight: 600,
    display: 'flex',
    fontSize: '14px',
    lineHeight: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0px',
    marginTop: '10px',
    gap: '10px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

interface TableModalProps {
  selectedGame: string;
  flag: string;
  selectedTimeFilter: string;
  myRank?: number;
}

const TableModal = ({
  selectedGame,
  flag,
  selectedTimeFilter,
  myRank,
}: TableModalProps): JSX.Element | null => {
  // let d = new Date(),
  //   t = d.toDateString().split(' ');
  const classes = useStyles();
  const [data, setData] = useState<DataType[]>();

  // get the top ten items
  const fetchDataItems = async () => {
    if (!myRank) {
      return;
    }

    const ret: ReturnDataType = await fetchScores(
      selectedGame,
      flag,
      selectedTimeFilter,
      10,
      myRank < 3 ? 0 : myRank - 3,
    );
    setData(ret.data);
  };

  useEffect(() => {
    fetchDataItems();
  }, [myRank]);

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleShortenUserId = (userId: string) => {
    const firstChar = userId.slice(-4);
    const lastChar = userId.slice(0, 4);
    const user = lastChar.concat('***', firstChar);
    return user;
  };

  const handleShareOnTwitter = () => {
    const obj = {
      original_referer: 'https://app.niftyleague.com/',
      ref_src: 'twsrc^tfw|twcamp^buttonembed|twterm^share|twgr^',
      text: `I ranked #${myRank} on the WEN Game Top Score Leaderboard. Check out @niftyleague games: https://app.niftyleague.com/`,
      hashtags: 'NiftyLeague,NFT,NFTGaming',
    };
    window.open(
      `https://twitter.com/intent/tweet?${`${new URLSearchParams(obj)}`}`,
      '_blank',
    );
  };

  return (
    <Box className={classes.root}>
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
        <Box className="box-table" sx={{ marginTop: '20px' }} />
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
                  {i.user_id}
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
          {/* {data && (
            <code className={classes.time}>
              {t[2] + ' ' + t[1] + ' ' + t[3]}
            </code>
          )} */}
          {data && (
            <Typography
              variant="body2"
              className={classes.twitter}
              onClick={handleShareOnTwitter}
            >
              Share on twitter <TwitterIcon />
            </Typography>
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
  myRank,
}: TopModalProps): JSX.Element | null => {
  return (
    <CustomModal
      ModalIcon={ModalIcon}
      child={
        <TableModal
          selectedGame={selectedGame}
          flag={flag}
          selectedTimeFilter={selectedTimeFilter}
          myRank={myRank}
        />
      }
      flag={flag}
    />
  );
};
export default TopModal;
