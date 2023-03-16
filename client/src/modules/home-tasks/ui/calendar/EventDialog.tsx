import { differenceInBusinessDays, format } from 'date-fns';

import { faGripLines } from '@fortawesome/pro-regular-svg-icons';
import { EventClickArg } from '@fullcalendar/core';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { calendarApi } from 'client/modules/home-tasks/api/calendar/calendar';
import { EventId } from 'client/modules/home-tasks/domain/calendar/calendar';
import { Icon } from 'client/shared/components/Icon';
import { useSnackbar } from 'client/shared/hooks/useSnackbar';

type EventDialogType = {
  onClose: () => void;
  eventData: EventClickArg;
};
const EventDialog = ({ onClose, eventData: { event } }: EventDialogType) => {
  const { deleteEvent } = calendarApi();
  const { snackbar } = useSnackbar();
  const eventQueryClient = useQueryClient();

  const isSameDay = event.start && event.end ? differenceInBusinessDays(event.end, event.start) <= 1 : '';
  const fullDayFormatted = event.start ? format(event.start, 'EEEE, dd MMMM') : '';
  const startDayFormatted = event.start ? format(event.start, 'EEEE, dd MMMM - HH:mm') : '';
  const endDayFormatted = event.end ? format(event.end, 'EEEE, dd MMMM - HH:mm') : '';

  const mutateDeleteEvent = useMutation((id: EventId) => deleteEvent(id), {
    onSuccess: () => {
      onClose();
      eventQueryClient.invalidateQueries(['calendar', 'events']);
      snackbar('Event deleted', 'success');
    },
    onError: () => {
      snackbar('Error on deleting event', 'error');
    },
  });

  const handleClickDeleteEvent = () => mutateDeleteEvent.mutate(event.extendedProps['_id']);

  return (
    <Dialog open onClose={onClose}>
      <DialogContent>
        <Stack gap={4}>
          <Stack flexDirection="row" alignItems="baseline" gap={3} marginBottom={4}>
            <Box
              sx={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: event.backgroundColor,
              }}
            ></Box>
            <Stack>
              <Typography variant="h6">{event.title}</Typography>
              {event.allDay && isSameDay ? (
                <Typography variant="body2">{fullDayFormatted}</Typography>
              ) : (
                <>
                  <Typography variant="body2">{startDayFormatted}</Typography>
                  <Typography variant="body2">{endDayFormatted}</Typography>
                </>
              )}
            </Stack>
          </Stack>
          {event.extendedProps.note && (
            <Stack flexDirection="row" alignItems="baseline" gap={3}>
              <Icon icon={faGripLines} />
              <Typography variant="body2">{event.extendedProps.note}</Typography>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <LoadingButton variant="contained" color="error" onClick={handleClickDeleteEvent}>
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export { EventDialog };
