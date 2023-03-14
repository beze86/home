import { parseISO } from 'date-fns';
import React, { useState } from 'react';

import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { calendarApi } from 'client/modules/home-tasks/api/calendar/calendar';
import { CalendarEvent } from 'client/modules/home-tasks/domain/calendar/calendar';
import { CalendarProvider } from 'client/modules/home-tasks/ui/calendar/CalendarProvider';
import { EventDialog } from 'client/modules/home-tasks/ui/calendar/EventDialog';
import { NewDateDialog } from 'client/modules/home-tasks/ui/calendar/NewDateDialog/NewDateDialog';
import { Page } from 'client/shared/layouts/Page/Page';

const STALE_TIME_5_MIN = 300000;

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    allDay: false,
    title: 'All-day event',
    start: parseISO('2023-03-03T10:10:00'),
    end: parseISO('2023-03-06T22:00:00'),
    note: 'this is a test',
    textColor: 'green',
    backgroundColor: '',
  },
  {
    id: '2',
    allDay: false,
    title: 'Timed event',
    start: parseISO('2023-03-04T13:43:50.476+0000'),
    end: parseISO('2023-03-04T13:43:50.476+0000'),
    note: 'this is a test 2',
    textColor: '',
    backgroundColor: '',
  },
  {
    id: '3',
    allDay: true,
    title: 'Full day event',
    start: parseISO('2023-03-06T22:43:50.476+0000'),
    end: parseISO('2023-03-06T23:43:50.476+0000'),
    note: 'this is a test 2',
    textColor: '',
    backgroundColor: '',
  },
];

const renderEventContent = (eventContent: EventContentArg) => {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
};

export const Calendar = () => {
  const [isEventDialogVisible, setEventDialogVisible] = useState<EventClickArg | null>(null);
  const [isNewDateDialogVisible, setNewDateDialogVisible] = useState<DateSelectArg | null>(null);

  const { getEvents } = calendarApi();
  const { data: eventsData } = useQuery(['calendar', 'events'], () => getEvents(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const handleEventClickOpenEventDialog = (data: EventClickArg) => {
    console.log(data);
    setEventDialogVisible(data);
  };

  const handleCloseEventDialog = () => {
    setEventDialogVisible(null);
  };

  const handleSelectOpenDateDialog = (data: DateSelectArg) => {
    console.log(data);
    setNewDateDialogVisible(data);
  };

  const handleCloseNewDateDialog = () => {
    setNewDateDialogVisible(null);
  };

  return (
    <Page>
      <Page.Main>
        <CalendarProvider>
          <Box
            sx={(theme) => ({
              height: '100%',
              '& .fc-daygrid-more-link': {
                width: '100%',
              },
              '.fc-popover': {
                zIndex: theme.zIndex.modal - 1,
                borderRadius: '8px',
                '& .fc-popover-header': {
                  backgroundColor: 'unset',
                  padding: theme.spacing(2),
                },
                boxShadow: theme.shadows['4'],
                '& .fc-popover-body': {
                  padding: theme.spacing(2),
                  '& .fc-daygrid-block-event': {
                    margin: theme.spacing(0),
                    marginBottom: '2px',
                    borderRadius: '4px',
                  },
                },
              },
            })}
          >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev today next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              selectable
              height="100%"
              events={eventsData}
              select={handleSelectOpenDateDialog}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClickOpenEventDialog}
              dayMaxEventRows={3}
            />
            {isNewDateDialogVisible && <NewDateDialog onClose={handleCloseNewDateDialog} dateData={isNewDateDialogVisible} />}
            {isEventDialogVisible && <EventDialog onClose={handleCloseEventDialog} eventData={isEventDialogVisible} />}
          </Box>
        </CalendarProvider>
      </Page.Main>
    </Page>
  );
};
