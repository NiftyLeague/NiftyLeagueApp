import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Children, cloneElement, ReactElement, useState } from 'react';
import { MenuItemBaseProps } from 'types';
import { callAll } from 'utils';

interface Props {
  children: ReactElement;
  sortOptions: MenuItemBaseProps[];
  defaultSelectedItemValue?: string | null;
  label?: string;
}

const SortButton = ({
  children,
  sortOptions,
  defaultSelectedItemValue = null,
  label = 'Sort by: ',
}: Props): JSX.Element => {
  if (!Children.only(children))
    console.error('SortButton only accepts one child');

  const [selectedSort, setSelectedSort] = useState(
    defaultSelectedItemValue || sortOptions[0].value,
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSortOpen = Boolean(anchorEl);
  const sortLabel = sortOptions.filter((items) => items.value === selectedSort);

  const handleOpenSortMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    setSelectedSort(value);
    handleCloseSortMenu();
  };

  const Button = cloneElement(
    children as React.ReactElement,
    {
      ...children?.props,
      onClick: callAll(handleOpenSortMenu, children?.props?.onClick),
    },
    sortLabel.length > 0 && sortLabel[0].label,
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <Typography variant="h5">{label}</Typography>
      {Button}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={isSortOpen}
        onClose={handleCloseSortMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            sx={{ p: 1.5 }}
            key={option.value}
            selected={option.value === selectedSort}
            onClick={(event) => handleMenuItemClick(event, option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default SortButton;
