import { useContext } from 'react';
import {
  Stack,
  Typography,
  Grid,
  useTheme,
  Skeleton,
  Button,
  Link,
} from '@mui/material';

import ProgressGamer from './ProgressGamer';
import GameCard from 'components/cards/GameCard';
import LeftInfo from './LeftInfo';
import WenGameContent from './WenGameContent';
import { GamerProfileContext } from '../index';

import { ProfileNiftySmsher, ProfileWenGame } from 'types/account';
import NiftySmashers from 'assets/images/games/nifty-smashers.gif';
import WenGame from 'assets/images/games/wen.gif';

interface BottomInfoProps {
  nifty_smashers: ProfileNiftySmsher | undefined;
  wen_game: ProfileWenGame | undefined;
}

const BottomInfo = ({
  nifty_smashers,
  wen_game,
}: BottomInfoProps): JSX.Element => {
  const { isLoadingProfile } = useContext(GamerProfileContext);

  const theme = useTheme();

  return (
    <Grid container flexDirection="row" flexWrap="wrap" spacing={2}>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          image={NiftySmashers}
          contents={
            <Stack padding="16px" gap={2}>
              {nifty_smashers && (
                <ProgressGamer size="sm" data={nifty_smashers} />
              )}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" component="div">
                  Nifty Smashers
                </Typography>
                <Typography variant="h4" component="div">
                  {isLoadingProfile ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{ display: 'inline-block' }}
                      width="15%"
                      height="19.76px"
                    />
                  ) : (
                    `${Math.round(nifty_smashers?.xp || 0)}/${
                      nifty_smashers?.rank_xp_next
                    }`
                  )}
                  <Typography
                    variant="h4"
                    component="div"
                    color={theme.palette.grey[400]}
                    display="inline"
                    ml="4px"
                  >
                    XP
                  </Typography>
                </Typography>
              </Stack>
              <LeftInfo data={nifty_smashers} />
              <Button
                color="secondary"
                component={Link}
                href="/leaderboards"
                target="_blank"
              >
                View Leaderboards
              </Button>
            </Stack>
          }
        />
      </Grid>
      <Grid item sm={12} md={6} lg={4} xl={3}>
        <GameCard
          image={WenGame}
          contents={
            <Stack
              padding="16px"
              gap={2}
              flex={1}
              justifyContent="space-between"
            >
              {wen_game && <ProgressGamer size="sm" data={wen_game} />}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" component="div">
                  WEN?
                </Typography>
                <Typography variant="h4" component="div">
                  {isLoadingProfile ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{ display: 'inline-block' }}
                      width="15%"
                      height="19.76px"
                    />
                  ) : (
                    `${Math.round(wen_game?.xp || 0)}/${wen_game?.rank_xp_next}`
                  )}
                  <Typography
                    variant="h4"
                    component="div"
                    color={theme.palette.grey[400]}
                    display="inline"
                    ml="4px"
                  >
                    XP
                  </Typography>
                </Typography>
              </Stack>
              <WenGameContent data={wen_game} />
              <Button
                color="secondary"
                component={Link}
                href="/leaderboards"
                target="_blank"
              >
                View Leaderboards
              </Button>
            </Stack>
          }
        />
      </Grid>
    </Grid>
  );
};

export default BottomInfo;
