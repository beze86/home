import { RefObject, useState, useEffect, ChangeEvent } from 'react';

import { faChevronLeft, faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import FullCalendar from '@fullcalendar/react';
import { Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';

import { Icon } from 'client/shared/components';

type CalendarViewType = 'timeGridDay' | 'timeGridWeek' | 'dayGridMonth' | 'multiMonthYear';

const CalendarActions = ({ calendar }: { calendar: RefObject<FullCalendar> }) => {
  const [calendarTitle, setCalendarTitle] = useState('');
  const [calendarView, setCalendarView] = useState<CalendarViewType>('dayGridMonth');
  const calendarApi = calendar.current?.getApi();

  useEffect(() => {
    calendarApi?.changeView(calendarView);
    calendarApi && setCalendarTitle(calendarApi.view.title);
  }, [calendarView, calendarApi]);

  const handleClickToday = () => {
    calendarApi?.today();
    calendarApi && setCalendarTitle(calendarApi.view.title);
  };
  const handleClickPrev = () => {
    calendarApi?.prev();
    calendarApi && setCalendarTitle(calendarApi.view.title);
  };
  const handleClickNext = () => {
    calendarApi?.next();
    calendarApi && setCalendarTitle(calendarApi.view.title);
  };

  const handleChangeCalendarView = (evt: ChangeEvent<HTMLInputElement>) => {
    setCalendarView(evt.target.value as CalendarViewType);
  };

  return (
    <Stack flexDirection={['column', 'row']} justifyContent="space-between" gap={2} marginBottom={4}>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Button variant="text" color="info" onClick={handleClickToday}>
          Today
        </Button>
        <IconButton onClick={handleClickPrev}>
          <Icon icon={faChevronLeft} />
        </IconButton>
        <IconButton onClick={handleClickNext}>
          <Icon icon={faChevronRight} size={20} />
        </IconButton>
        <Typography variant="h5" marginLeft="auto">
          {calendarTitle}
        </Typography>
      </Stack>
      <TextField select value={calendarView} onChange={handleChangeCalendarView} sx={{ flex: '0 1 auto', marginLeft: 'auto' }}>
        <MenuItem value="timeGridDay">Day</MenuItem>
        <MenuItem value="timeGridWeek">Week</MenuItem>
        <MenuItem value="dayGridMonth">Month</MenuItem>
        <MenuItem value="multiMonthYear">Year</MenuItem>
      </TextField>
    </Stack>
  );
};

export { CalendarActions };
