import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FarmOptions, YearOptions } from '../types';
import { Typography } from '@mui/material';
import { isYearOption } from '../utils';

interface AppMenuProps {
  anchorEl: null | HTMLElement;
  menuItems: string[] | FarmOptions[] | YearOptions[];
  anchorId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelection?: (selectedItem?: any) => void;
  onClose: () => void;
}
interface SetMenuProps {
  rendered: string | number;
  selected: boolean;
  item: string | FarmOptions | YearOptions;
}

const AppMenu = ({
  anchorEl,
  menuItems,
  anchorId,
  onClose,
  handleSelection,
}: AppMenuProps) => {
  const open = Boolean(anchorEl);

  const SetMenuItems = ({ rendered, selected, item }: SetMenuProps) => {
    return (
      <>
        <MenuItem
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
          if (typeof item === 'string')
            return (
              <SetMenuItems
                key={item}
                rendered={item}
                selected={false}
                item={item}
              />
            );

          if (isYearOption(item))
            return (
              <SetMenuItems
                key={item.year}
                rendered={item.year}
                selected={item.selected}
                item={item}
              />
            );

          return (
            <SetMenuItems
              key={item.farmname}
              rendered={item.farmname}
              selected={item.selected}
              item={item}
            />
          );
        })}
      </Menu>
    </div>
  );
};

export default AppMenu;
