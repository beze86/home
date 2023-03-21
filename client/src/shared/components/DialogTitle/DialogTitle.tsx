import { FC, PropsWithChildren } from 'react';

import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { Box, IconButton, Stack, DialogTitle as MuiDialogTitle } from '@mui/material';

import { Icon } from 'client/shared/components/Icon';

const DialogTitle: FC<PropsWithChildren<{ onClose?: () => void }>> = ({ children, onClose }) => {
  return (
    <MuiDialogTitle>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box>{children}</Box>
        {onClose && (
          <IconButton onClick={onClose}>
            <Icon icon={faTimes} />
          </IconButton>
        )}
      </Stack>
    </MuiDialogTitle>
  );
};

export { DialogTitle };
