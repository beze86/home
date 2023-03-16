import { format } from 'date-fns';
import React, { useState } from 'react';

import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { calendarApi } from 'client/modules/home-tasks/api/calendar/calendar';
import { CalendarProvider } from 'client/modules/home-tasks/ui/calendar/CalendarProvider';
import { EventDialog } from 'client/modules/home-tasks/ui/calendar/EventDialog';
import { NewDateDialog } from 'client/modules/home-tasks/ui/calendar/NewDateDialog/NewDateDialog';
import { Page } from 'client/shared/layouts/Page/Page';

const STALE_TIME_5_MIN = 300000;

const renderEventContent = (eventContent: EventContentArg) => {
  const startTimeFormat = eventContent.event.start ? format(eventContent.event.start, 'HH:mm') : null;

  return (
    <>
      <Box
        sx={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: eventContent.backgroundColor,
          marginX: 1,
        }}
      ></Box>
      {eventContent.timeText && (
        <Typography component="span" variant="caption" marginRight={2}>
          {startTimeFormat}
        </Typography>
      )}
      <Typography component="span" variant="caption">
        {eventContent.event.title}
      </Typography>
    </>
  );
};

export const Calendar = () => {
  const [eventDataDialog, setEventDataDialog] = useState<EventClickArg | null>(null);
  const [newDateDataDialog, setNewDateDataDialog] = useState<DateSelectArg | null>(null);

  const { getEvents } = calendarApi();
  const { data: eventsData } = useQuery(['calendar', 'events'], () => getEvents(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  const handleEventClickOpenEventDialog = (data: EventClickArg) => setEventDataDialog(data);

  const handleCloseEventDialog = () => setEventDataDialog(null);

  const handleSelectOpenDateDialog = (data: DateSelectArg) => setNewDateDataDialog(data);

  const handleCloseNewDateDialog = () => setNewDateDataDialog(null);

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
              '& .fc-event': {
                cursor: 'pointer',
                color: 'white',
              },
              '& .fc-event:not(.fc-daygrid-dot-event) .fc-event-main > span': {
                color: 'white',
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
                left: 'today prev next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              selectable
              height="100%"
              events={eventsData}
              select={handleSelectOpenDateDialog}
              eventContent={renderEventContent}
              eventClick={handleEventClickOpenEventDialog}
              dayMaxEventRows={3}
              longPressDelay={1}
            />
            {newDateDataDialog && <NewDateDialog onClose={handleCloseNewDateDialog} dateData={newDateDataDialog} />}
            {eventDataDialog && <EventDialog onClose={handleCloseEventDialog} eventData={eventDataDialog} />}
          </Box>
        </CalendarProvider>
      </Page.Main>
    </Page>
  );
};
