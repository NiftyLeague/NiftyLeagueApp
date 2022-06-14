import { Stack, Typography } from '@mui/material';
import { useContext } from 'react';

import { DialogDegenContext } from 'components/dialog/DegenDialogV3';

interface Props {
  firstText: string;
  secondText: string | React.ReactNode;
  secondTextUnderline?: boolean;
}
const ContentWithTwoLabels = ({
  firstText,
  secondText,
  secondTextUnderline = false,
}: Props) => {
  const { isDialog } = useContext(DialogDegenContext);
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography
        variant={isDialog ? 'paragraphSmall' : 'paragraphXXSmall'}
        fontWeight="500"
      >
        {firstText}
      </Typography>
      {typeof secondText !== 'string' ? (
        secondText
      ) : (
        <Typography
          variant={isDialog ? 'paragraphSmall' : 'paragraphXXSmall'}
          sx={{ textDecoration: secondTextUnderline ? 'underline' : 'none' }}
        >
          {secondText}
        </Typography>
      )}
    </Stack>
  );
};

export default ContentWithTwoLabels;
