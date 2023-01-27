import { useContext, useMemo } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import IMXContext from 'contexts/IMXContext';
import NetworkContext from 'contexts/NetworkContext';
import WearableItemCard from 'components/cards/WearableItemCard';
import SectionSlider from 'components/sections/SectionSlider';
import EmptyState from 'components/EmptyState';
import ComicPlaceholder from 'components/cards/Skeleton/ComicPlaceholder';
import { ITEM_PURCHASE_URL } from 'constants/url';

const MyItems = (): JSX.Element => {
  const { selectedChainId } = useContext(NetworkContext);
  const navigate = useNavigate();
  const imx = useContext(IMXContext);
  const filteredItems = useMemo(
    () => imx.itemsBalance.filter((item) => item.balance && item.balance > 0),
    [imx.itemsBalance],
  );

  const handleBuyItems = () => {
    window.open(ITEM_PURCHASE_URL[selectedChainId as number], '_blank');
  };

  const settings = {
    slidesToShow: 4,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 525,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <>
      <SectionSlider
        isSlider={filteredItems.length > 0}
        firstSection
        title="My Items"
        sliderSettingsOverride={settings}
        actions={
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard/items')}
          >
            View All Items
          </Button>
        }
      >
        {imx.loading ? (
          <Box px={1}>
            <ComicPlaceholder />
          </Box>
        ) : filteredItems.length ? (
          filteredItems.map((item) => (
            <Box px={1} key={item.wearableName}>
              <WearableItemCard data={item} />
            </Box>
          ))
        ) : (
          <Stack justifyContent="center" alignItems="center">
            <EmptyState
              message="No Items found. Please check your address or go purchase some if you have not done so already!"
              buttonText="Buy Items"
              onClick={handleBuyItems}
            />
          </Stack>
        )}
      </SectionSlider>
    </>
  );
};

export default MyItems;
