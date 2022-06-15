import { DataType, ReturnDataType, Order } from 'types/leaderboard';
import { LEADERBOARD_SCORE_API_URL } from 'constants/leaderboard';
import { LEADERBOARD_USERNAMES_API_URL } from 'constants/leaderboardUsernames';
import { GET_RANK_BY_USER_ID_API } from 'constants/url';

export const fetchUserNames = async (items: any): Promise<DataType[]> => {
  try {
    const res = await fetch(
      `${LEADERBOARD_USERNAMES_API_URL}?ids=${items}&include_stats=false`,
    );
    return await res.json();
  } catch (e) {
    return [];
  }
};

export const fetchScores = async (
  gameType: string,
  scoreType: string,
  timeFilter: string,
  count: number,
  offset: number,
): Promise<ReturnDataType> => {
  let url = `${
    LEADERBOARD_SCORE_API_URL as string
  }?score_type=${scoreType}&count=${count}&offset=${offset}`;
  if (scoreType === 'score') {
    url = `${
      LEADERBOARD_SCORE_API_URL as string
    }?game=${gameType}&score_type=${scoreType}&time_window=${timeFilter}&count=${count}&offset=${offset}`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  const addAvg = json.data.map((data: DataType) => {
    const { earnings, matches, wins } = data?.stats || {};
    let earningsParsed = earnings
      ? Math.round(parseFloat(earnings) * 10) / 10
      : 0;
    let avg =
      earnings && matches
        ? Math.round((parseFloat(earnings) * 100) / parseFloat(matches)) / 100
        : 0;
    let rate =
      wins && matches
        ? Math.round((parseFloat(wins) * 10000) / parseFloat(matches)) / 100
        : 0;
    return {
      ...data,
      stats: {
        ...data.stats,
        score: data.score,
        'avg_NFTL/match': avg,
        win_rate: `${rate}%`,
        earnings: earningsParsed,
      },
    };
  });
  // get names
  let items: DataType[] = [];
  for (let i = 0; i < json.data.length; i++) {
    items.push(json.data[i].user_id);
  }
  const dd: DataType[] = await fetchUserNames(items);
  let a = Object.entries(dd);
  for (let i = 0; i < addAvg.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (addAvg[i].user_id === a[j][0]) {
        addAvg[i].user_id = a[j][1]?.name_cased;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return { data: addAvg, count: json.count };
};

function descendingComparator(a: DataType, b: DataType, orderBy: any) {
  const [numberOfA, numberOfB] =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    orderBy !== 'rank'
      ? [parseFloat(a.stats[orderBy]), parseFloat(b.stats[orderBy])]
      : [a.rank, b.rank];
  if (numberOfB < numberOfA) {
    return -1;
  }
  if (numberOfB > numberOfA) {
    return 1;
  }
  return 0;
}

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key,
): ((a: DataType, b: DataType) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export const stableSort = <T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const fetchRankByUserId = async (userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${GET_RANK_BY_USER_ID_API}?${new URLSearchParams({
        user_id: userId,
        game: 'wen_game',
        time_window: 'all_time',
      })}`,
    );
    return res;
  } catch (e) {
    return e;
  }
};
