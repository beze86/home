import { differenceInBusinessDays, format, formatISO } from 'date-fns';
import { Controller, useForm, FormProvider } from 'react-hook-form';

import { DateSelectArg } from '@fullcalendar/core';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, Stack, Box, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EventCreation } from 'client/modules/home-utilities/domain/calendar/calendar';
import { eventColorsMap } from 'client/modules/home-utilities/domain/calendar/calendar-colors';
import { Api } from 'client/modules/home-utilities/ui';
import { NewDateDialogColorSelector } from 'client/modules/home-utilities/ui/calendar/NewDateDialog/NewDateDialogColorSelector';
import { NewDateDialogNote } from 'client/modules/home-utilities/ui/calendar/NewDateDialog/NewDateDialogNote';
import { NewDateDialogTimeSelector } from 'client/modules/home-utilities/ui/calendar/NewDateDialog/NewDateDialogTimeSelector';
import { useSnackbar } from 'client/shared/hooks';

const formatToIsoDate = (date: Date, hourTime: Date) => {
  const dateFormatted = format(date, 'yyyy-MM-dd');
  const timeFormatted = format(hourTime, 'HH:mm');
  return new Date(formatISO(new Date(`${dateFormatted}T${timeFormatted}`)));
};

type Event = {
  allDay: boolean;
  title: string;
  note: string;
  start: Date;
  end: Date;
  backgroundColor: string;
};

type NewDateDialogType = {
  onClose: () => void;
  dateData: DateSelectArg;
};

const NewDateDialog = ({ onClose, dateData }: NewDateDialogType) => {
  const eventQueryClient = useQueryClient();
  const { snackbar } = useSnackbar();

  const { start, end, startStr, endStr } = dateData;

  const isSameDay = differenceInBusinessDays(end, start) <= 1;

  const formMethods = useForm<Event>({
    defaultValues: {
      allDay: dateData.allDay,
      title: '',
      note: '',
      start: start,
      end: end,
      backgroundColor: eventColorsMap['option-five'],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const mutateCreateEvent = useMutation((data: EventCreation) => Api.createEvent(data), {
    onSuccess: () => {
      onClose();
      snackbar('Event created', 'success');
      eventQueryClient.invalidateQueries(['calendar', 'events']);
    },
    onError: () => {
      snackbar('Error on creating event', 'error');
    },
  });

  const handleSubmitCreateEvent = (data: Event) => {
    const endDate = isSameDay ? startStr : endStr;

    const newData = {
      ...data,
      end: !data.allDay ? formatToIsoDate(new Date(endDate), data.end) : end,
      borderColor: data.backgroundColor,
    };

    mutateCreateEvent.mutate(newData);
  };

  const titleHasErrors = errors.title?.type === 'required';

  return (
    <Dialog open onClose={onClose}>
      <FormProvider {...formMethods}>
        <Box component="form" onSubmit={handleSubmit(handleSubmitCreateEvent)}>
          <DialogContent>
            <Stack gap={5} paddingY={4}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: {
                    message: 'Title is required',
                    value: true,
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField
                      autoFocus
                      {...field}
                      fullWidth
                      variant="standard"
                      label="Add title"
                      helperText={titleHasErrors && errors.title?.message}
                      error={titleHasErrors}
                    />
                  );
                }}
              />
              <NewDateDialogTimeSelector dateData={dateData} isSameDay={isSameDay} />
              <NewDateDialogNote />
              <NewDateDialogColorSelector />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <LoadingButton variant="contained" loading={mutateCreateEvent.isLoading} type="submit">
              Create event
            </LoadingButton>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export { NewDateDialog };
