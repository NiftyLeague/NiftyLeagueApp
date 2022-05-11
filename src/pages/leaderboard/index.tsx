import { Typography } from '@mui/material';
import LeaderBoards from 'components/leaderboards';

const LeaderboardPage = () => {
  return (
    <>
      <Typography mb={2} variant="h3">
        Leader Board
      </Typography>
      <LeaderBoards />
    </>
  );
};
export default LeaderboardPage;
