import { format } from 'date-fns';
import React, { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';

import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { Api } from 'client/modules/home-utilities/ui';
import { CalendarActions } from 'client/modules/home-utilities/ui/calendar/CalendarActions';
import { CalendarProvider } from 'client/modules/home-utilities/ui/calendar/CalendarProvider';
import { EventDialog } from 'client/modules/home-utilities/ui/calendar/EventDialog';
import { NewDateDialog } from 'client/modules/home-utilities/ui/calendar/NewDateDialog/NewDateDialog';
import { Page } from 'client/shared/layouts';

const STALE_TIME_5_MIN = 300000;

const renderEventContent = (eventContent: EventContentArg) => {
  const startTimeFormat = eventContent.event.start ? format(eventContent.event.start, 'HH:mm') : null;

  return (
    <Stack className="fc-event-main__stack" flexDirection="row" gap={2} alignItems="center" paddingX={1}>
      {eventContent.timeText && (
        <>
          <Box
            sx={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: eventContent.backgroundColor,
            }}
          ></Box>
          <Typography component="span" variant="caption">
            {startTimeFormat}
          </Typography>
        </>
      )}
      <Typography component="span" variant="caption">
        {eventContent.event.title}
      </Typography>
    </Stack>
  );
};

const Calendar = () => {
  const [eventDataDialog, setEventDataDialog] = useState<EventClickArg | null>(null);
  const [newDateDataDialog, setNewDateDataDialog] = useState<DateSelectArg | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [calendarApi, setCalendarApi] = useState<RefObject<FullCalendar> | null>(null);

  const { data: eventsData } = useQuery(['calendar', 'events'], () => Api.getEvents(), {
    suspense: false,
    staleTime: STALE_TIME_5_MIN,
  });

  useEffect(() => {
    calendarRef.current && setCalendarApi(calendarRef);
  }, [setCalendarApi]);

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
              '& .fc-header-toolbar': {
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing(2),
              },
              '& .fc-daygrid-more-link': {
                width: '100%',
              },
              '& .fc-event': {
                cursor: 'pointer',
                color: 'white',
                overflow: 'hidden',
              },
              '& .fc-event:not(.fc-daygrid-dot-event) .fc-event-main > .fc-event-main__stack > span': {
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
            {calendarApi ? <CalendarActions calendar={calendarApi} /> : <Stack height={['88px', '40px']} marginBottom={4} />}
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
              headerToolbar={false}
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

export default Calendar;
