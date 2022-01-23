import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  menuItems: string[];
  anchorId: string;
  onClose: (selectedItem?: string) => void;
}

const AppMenu = ({ anchorEl, menuItems, anchorId, onClose }: AppMenuProps) => {
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
      >
        {menuItems.map((item) => (
          <MenuItem key={item} onClick={() => onClose()}>
           { item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default AppMenu;
