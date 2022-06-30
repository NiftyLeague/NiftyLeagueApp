import { Stack, Typography } from '@mui/material';
import LeaderBoards from 'components/leaderboards';

const LeaderboardPage = () => {
  return (
    <>
      <Stack mb={4}>
        <Typography variant="paragraphP2Small">Leaderboards</Typography>
      </Stack>
      <LeaderBoards />
    </>
  );
};
export default LeaderboardPage;
