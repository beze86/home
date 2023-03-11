import { EventClickArg } from '@fullcalendar/core';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type EventDataType = {
  id: string;
  title: string;
  start: Date;
  end?: Date;
};

type EventDialogType = {
  onClose: () => void;
  eventData: EventClickArg;
};
const EventDialog = ({ onClose, eventData }: EventDialogType) => {
  const { id, title, start, extendedProps }: EventDataType = eventData.event;

  return (
    <Dialog open onClose={onClose} maxWidth="sm">
      <DialogTitle>This is the title</DialogTitle>
      <DialogContent>{new Date(start).getDate()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { EventDialog };
