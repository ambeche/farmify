import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {CHART_COLORS} from '../utils';

export interface AppDialogProps {
  id?: string;
  children?: React.ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
}

export type AppDialogTitleProps = Omit<AppDialogProps, 'open' | 'title'>;

const AppDialogTitle = ({
  children,
  onClose,
  ...other
}: AppDialogTitleProps) => {
  return (
    <DialogTitle sx={{ m: 0, p: 3, pt: 6 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: CHART_COLORS.ph.max,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const AppDialog = ({ children, onClose, open, title }: AppDialogProps) => {
  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open}>
        <AppDialogTitle id="dialog-title" onClose={onClose}>
          {title}
        </AppDialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
export default AppDialog;
