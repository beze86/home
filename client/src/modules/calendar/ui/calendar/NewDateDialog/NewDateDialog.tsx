import { differenceInBusinessDays, formatISO, sub } from 'date-fns';
import { useState } from 'react';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { TimePickerValue } from 'react-time-picker';

import { DateSelectArg } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';
import { Button, Dialog, DialogActions, DialogContent, Stack, Box, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { calendarApi } from 'client/modules/calendar/api/calendar';
import { EventCreation } from 'client/modules/calendar/domain/calendar';
import { NewDateDialogDescription } from 'client/modules/calendar/ui/calendar/NewDateDialog/NewDateDialogDescription';
import { NewDateDialogTimeSelector } from 'client/modules/calendar/ui/calendar/NewDateDialog/NewDateDialogTimeSelector';

const formatToIsoDate = (date: string, hourTime: string) => new Date(formatISO(new Date(`${date}T${hourTime}`)));

type Event = {
  allDay: boolean;
  title: string;
  description: string;
  start: TimePickerValue;
  end: TimePickerValue;
  textColor: string;
  backgroundColor: string;
};

type NewDateDialogType = {
  onClose: () => void;
  dateData: DateSelectArg;
};

const NewDateDialog = ({ onClose, dateData }: NewDateDialogType) => {
  const { createEvent } = calendarApi();
  const [valueStart, onChangeStart] = useState<TimePickerValue>('11:00');
  const [valueEnd, onChangeEnd] = useState<TimePickerValue>('12:00');

  const { startStr, endStr, start, end } = dateData;

  const isSameDay = differenceInBusinessDays(end, start) === 1;
  const formMethods = useForm<Event>({
    defaultValues: {
      allDay: dateData.allDay,
      title: '',
      description: '',
      start: valueStart,
      end: valueEnd,
      textColor: '#fff',
      backgroundColor: 'red',
    },
  });

  const { handleSubmit, control } = formMethods;

  const { mutate: mutateCreateEvent } = useMutation((data: EventCreation) => createEvent(data), {
    onSuccess: () => {
      alert('success');
    },
  });

  const handleSubmitCreateEvent = (data: Event) => {
    const newEndDate = isSameDay ? startStr : endStr;
    console.log(data);
    const newData = {
      ...data,
      start: !data.allDay ? formatToIsoDate(startStr, data.start.toString()) : start,
      end: !data.allDay ? formatToIsoDate(newEndDate, data.end.toString()) : end,
    };

    console.log(newData);
    mutateCreateEvent({ ...newData });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm">
      <FormProvider {...formMethods}>
        <Box component="form" onSubmit={handleSubmit(handleSubmitCreateEvent)}>
          <DialogContent>
            <Stack gap={4} marginBottom={4}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => {
                  return <TextField {...field} fullWidth variant="standard" label="Add title" />;
                }}
              />
              <NewDateDialogTimeSelector dateData={dateData} onChangeStart={onChangeStart} onChangeEnd={onChangeEnd} />
              <NewDateDialogDescription />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit">Create event</Button>
          </DialogActions>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

export { NewDateDialog };
