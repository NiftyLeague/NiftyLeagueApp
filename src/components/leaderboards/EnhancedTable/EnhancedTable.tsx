/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  CircularProgress,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ReactComponent as RankIcon } from 'assets/images/icons/rank_icon.svg';
import { GOOGLE_ANALYTICS } from 'constants/google-analytics';
import usePlayerProfile from 'hooks/usePlayerProfile';
import ResponsiveTable from 'material-ui-responsive-table';
import { NetworkContext } from 'NetworkProvider';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DataType, ReturnDataType, TableProps } from 'types/leaderboard';
import { sendEvent } from 'utils/google-analytics';
import { fetchRankByUserId, fetchScores } from 'utils/leaderboard';
import TopModal from '../TopModal';

const useStyles = makeStyles((theme: Theme) => ({
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    height: '70%',
  },
  paperStyle: {
    width: '100%',
    overflowX: 'auto',
    mb: 2,
    '& .MuiTablePagination-selectLabel, & .MuiInputBase-root': {
      display: 'none',
    },
  },
  paginationSpacer: {
    [theme.breakpoints.down('sm')]: {
      flex: 'none',
    },
  },
}));

export default function EnhancedTable({
  selectedGame,
  selectedTable,
  selectedTimeFilter,
}: TableProps): JSX.Element | null {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setData] = useState<DataType[] | null>();
  const [myRank, setMyRank] = useState<number>();
  const { web3Modal } = useContext(NetworkContext);
  const { breakpoints, palette } = useTheme();
  const { profile } = usePlayerProfile();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const classes = useStyles();

  const flatObject = (obj) => {
    const keys = Object.keys(obj);
    return keys.reduce((acc, k) => {
      const value = obj[k];
      return typeof value === 'object'
        ? { ...acc, ...flatObject(value) }
        : { ...acc, [k]: value };
    }, {});
  };

  const fetchTopData = async () => {
    setPage(0);
    const returnValue: ReturnDataType = await fetchScores(
      selectedGame,
      selectedTable.key,
      selectedTimeFilter,
      rowsPerPage * 3,
      0,
    );
    const leaderBoardValue: any = [];
    returnValue.data.forEach((value: any) => {
      leaderBoardValue.push(flatObject(value));
    });
    setData(leaderBoardValue);
    setCount(returnValue.count);
  };

  useEffect(() => {
    setData(null);
    fetchTopData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame, selectedTable.key, selectedTimeFilter]);
  const handleChangePage = async (newPage: number) => {
    if (rows && (newPage + 3) * rowsPerPage > rows?.length) {
      const returnValue: ReturnDataType = await fetchScores(
        selectedGame,
        selectedTable.key,
        selectedTimeFilter,
        rowsPerPage,
        (newPage + 2) * rowsPerPage,
      );
      const leaderBoardValue: any = [];
      returnValue.data.forEach((value: any) => {
        leaderBoardValue.push(flatObject(value));
      });
      setData([...rows, ...leaderBoardValue]);
      setCount(returnValue.count);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCheckYourRank = async () => {
    sendEvent(
      GOOGLE_ANALYTICS.EVENTS.LEADERBOARD_CHECK_YOUR_RANK_CLICKED,
      GOOGLE_ANALYTICS.CATEGORIES.LEADERBOARD,
    );
    const errorMes =
      'You have not played the WEN Game yet! Play the game to see your rank on the leaderboard.';

    if (!profile?.id) {
      toast.error(errorMes, { theme: 'dark' });
      return;
    }
    try {
      const result: any = await fetchRankByUserId(
        profile?.id,
        selectedGame,
        selectedTable.key,
      );
      if (!result.ok) {
        const errMsg = await result.text();
        toast.error(errMsg, { theme: 'dark' });
        return;
      }
      const res = await result.json();
      if (res < 1) {
        toast.error(errorMes, { theme: 'dark' });
        return;
      }
      setMyRank(res);
      document?.querySelector('.wen-game-modal')?.parentElement?.click();
    } catch (error) {
      toast.error(error, { theme: 'dark' });
      return;
    }
  };

  const getColumns = () => {
    let columns: any = [
      { field: 'rank', headerName: 'RANK', width: 100, primary: true },
      {
        field: 'user_id',
        headerName: 'USERNAME',
        width: 250,
        primary: true,
      },
    ];
    selectedTable.rows.forEach((headerCell: any) => {
      columns.push({
        field: headerCell.key,
        headerName: headerCell.display,
        width: 250,
      });
    });
    return columns;
  };
  return (
    <Box mb={{ xs: 10, sm: 0 }}>
      {!rows ? (
        <Box className={classes.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ position: 'relative' }}>
          {!!web3Modal.cachedProvider && (
            <>
              <TopModal
                selectedGame={selectedGame}
                selectedTimeFilter={selectedTimeFilter}
                flag={selectedTable.key}
                ModalIcon={
                  <Box className="wen-game-modal" sx={{ display: 'none' }}>
                    N/A
                  </Box>
                }
                myRank={myRank}
              />
            </>
          )}
          <Typography
            variant="h4"
            color={palette.primary.main}
            sx={{
              position: {
                lg: 'absolute',
              },
              textDecoration: 'underline',
              right: {
                lg: '0px',
              },
              cursor: 'pointer',
              display: 'flex',
              lineHeight: '24px',
              justifyContent: 'flex-end',
              fontWeight: 700,
              svg: {
                mr: '3px',
              },
              transform: {
                lg: 'translate(0px, 50%)',
              },
              mb: {
                xs: '1rem',
                lg: '0px',
              },
              zIndex: 1000,
            }}
            onClick={handleCheckYourRank}
          >
            <RankIcon />
            RANK
          </Typography>
          <ResponsiveTable
            page={page}
            rowsPerPage={10}
            columns={getColumns()}
            showPagination={true}
            onChangePage={handleChangePage}
            data={rows}
            count={count}
          />
        </Box>
      )}
    </Box>
  );
}
