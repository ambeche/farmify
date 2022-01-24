import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FarmOptions } from '../types';
import { Typography } from '@mui/material';

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  menuItems: string[] | FarmOptions[];
  anchorId: string;
  handleSelection?: (selectedItem?: FarmOptions) => void;
  onClose: (item?: string) => void;
}

const AppMenu = ({
  anchorEl,
  menuItems,
  anchorId,
  onClose,
  handleSelection,
}: AppMenuProps) => {
  const open = Boolean(anchorEl);
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
        {menuItems.map((item: string | FarmOptions) => {
          if (typeof item === 'string')
            return (
              <MenuItem key={item} onClick={() => onClose(item)}>
                {item}
              </MenuItem>
            );
          return (
            <MenuItem
              key={item.farmname}
              selected={item.selected}
              onClick={handleSelection && (() => handleSelection(item))}
            >
              <Typography variant="inherit" noWrap>
                {item.farmname}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default AppMenu;
