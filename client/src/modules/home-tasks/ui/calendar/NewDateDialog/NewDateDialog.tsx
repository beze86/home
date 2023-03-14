import { differenceInBusinessDays, format, formatISO } from 'date-fns';
import { useState } from 'react';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { TimePickerValue } from 'react-time-picker';

import { DateSelectArg } from '@fullcalendar/core';
import { Button, Dialog, DialogActions, DialogContent, Stack, Box, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { calendarApi } from 'client/modules/home-tasks/api/calendar/calendar';
import { EventCreation } from 'client/modules/home-tasks/domain/calendar/calendar';
import { NewDateDialogNote } from 'client/modules/home-tasks/ui/calendar/NewDateDialog/NewDateDialogNote';
import { NewDateDialogTimeSelector } from 'client/modules/home-tasks/ui/calendar/NewDateDialog/NewDateDialogTimeSelector';

const formatToIsoDate = (date: Date, hourTime: string) => {
  const dateFormatted = format(date, 'yyyy-MM-dd');
  return new Date(formatISO(new Date(`${dateFormatted}T${hourTime}`)));
};

type Event = {
  allDay: boolean;
  title: string;
  note: string;
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
  const { start, end } = dateData;

  const startHourFormatted = format(start, 'hh:mm');
  const endHourFormatted = format(end, 'hh:mm');

  const [valueStart, onChangeStart] = useState<TimePickerValue>(startHourFormatted);
  const [valueEnd, onChangeEnd] = useState<TimePickerValue>(endHourFormatted);

  const isSameDay = differenceInBusinessDays(end, start) <= 1;

  const formMethods = useForm<Event>({
    defaultValues: {
      allDay: dateData.allDay,
      title: '',
      note: '',
      start: valueStart,
      end: valueEnd,
      textColor: '',
      backgroundColor: '',
    },
  });

  const { handleSubmit, control } = formMethods;

  const { mutate: mutateCreateEvent } = useMutation((data: EventCreation) => createEvent(data), {
    onSuccess: () => {
      alert('success');
    },
  });

  const handleSubmitCreateEvent = (data: Event) => {
    const newEndDate = isSameDay ? start : end;

    const newData = {
      ...data,
      start: !data.allDay ? formatToIsoDate(start, data.start.toString()) : start,
      end: !data.allDay ? formatToIsoDate(newEndDate, data.end.toString()) : end,
    };

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
              <NewDateDialogTimeSelector dateData={dateData} isSameDay={isSameDay} onChangeStart={onChangeStart} onChangeEnd={onChangeEnd} />
              <NewDateDialogNote />
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
