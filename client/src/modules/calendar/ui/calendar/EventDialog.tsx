import { EventClickArg } from '@fullcalendar/core';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type EventDialogType = {
  onClose: () => void;
  eventData: EventClickArg;
};
const EventDialog = ({ onClose, eventData: { event } }: EventDialogType) => {
  return (
    <Dialog open onClose={onClose} maxWidth="sm">
      <DialogTitle>{event.title}</DialogTitle>
      <DialogContent>{event.extendedProps.note}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { EventDialog };
