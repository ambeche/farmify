import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FarmOptions, YearOptions } from '../types';
import { Divider, Typography } from '@mui/material';
import { isYearOption } from '../utils';

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  menuItems: string[] | FarmOptions[] | YearOptions[];
  anchorId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelection?: (selectedItem?: any) => void;
  onClose: () => void;
}

const AppMenu = ({
  anchorEl,
  menuItems,
  anchorId,
  onClose,
  handleSelection,
}: AppMenuProps) => {
  const open = Boolean(anchorEl);

  const setMenuItems = (
    rendered: string | number,
    selected: boolean,
    item: string | FarmOptions | YearOptions
  ) => {
    return (
      <>
        <MenuItem
          key={rendered}
          selected={selected}
          onClick={
            (handleSelection && (() => handleSelection(item))) ||
            (() => onClose())
          }
        >
          <Typography variant="inherit" noWrap>
            {rendered}
          </Typography>
        </MenuItem>
        <Divider />
      </>
    );
  };

  return (
    <div>
      <Menu
        id="app-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => onClose()}
        MenuListProps={{
          'aria-labelledby': anchorId,
        }}
        PaperProps={{
          style: {
            maxHeight: 200,
          },
        }}
      >
        {menuItems.map((item) => {
          if (typeof item === 'string') return setMenuItems(item, true, item);

          if (isYearOption(item))
            return setMenuItems(item.year, item.selected, item);

          return setMenuItems(item.farmname, item.selected, item);
        })}
      </Menu>
    </div>
  );
};

export default AppMenu;
