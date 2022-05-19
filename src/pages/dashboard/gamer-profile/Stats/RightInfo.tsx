import Item from './Item';
import { Stack } from '@mui/material';

const RightInfo = (): JSX.Element => {
  return (
    <Stack flex={1} spacing={1}>
      {/* Will update degens owned and comics owned after confirming with Koa on NF-252 */}
      <Item label="Degens Owned" value="240" />
      <Item label="Comics Owned" value="786" />
      <Item label="Wearable Owned" isDisable value="N/A" />
      <Item label="Pets Owned" isDisable value="N/A" />
      <Item label="Land Owned" isDisable value="N/A" />
      <Item label="Land Items Owned" isDisable value="N/A" />
    </Stack>
  );
};

export default RightInfo;
