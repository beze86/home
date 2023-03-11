import { useState } from 'react';

import { DateSelectArg, EventClickArg, EventContentArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import { EventDialog } from 'client/modules/calendar/ui/calendar/EventDialog';
import { NewDateDialog } from 'client/modules/calendar/ui/calendar/NewDateDialog/NewDateDialog';
import { Page } from 'client/shared/layouts/Page/Page';

const INITIAL_EVENTS: EventInput[] = [
  {
    id: '1',
    title: 'All-day event',
    start: '2023-03-03T10:10:00',
    end: '2023-03-06T22:00:00',
    test: 'ewfwfw',
    textColor: 'green',
  },

  {
    id: '2',
    title: 'Timed event',
    start: '2023-03-04T13:43:50.476+0000',
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
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev today next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable
          selectable
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleSelectOpenDateDialog}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClickOpenEventDialog}
          //eventsSet={} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
        {isNewDateDialogVisible && <NewDateDialog onClose={handleCloseNewDateDialog} dateData={isNewDateDialogVisible} />}
        {isEventDialogVisible && <EventDialog onClose={handleCloseEventDialog} eventData={isEventDialogVisible} />}
      </Page.Main>
    </Page>
  );
};
