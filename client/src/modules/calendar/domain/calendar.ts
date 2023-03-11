type EventId = string;

type CalendarEvent = {
  id: EventId;
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  textColor: string;
  backgroundColor: string;
  note: string;
};

type EventCreation = {
  allDay: boolean;
  title: string;
  note: string;
  start: Date;
  end: Date;
  textColor: string;
  backgroundColor: string;
};

type CalendarRepository = {
  getEvents: () => Promise<CalendarEvent>;
  createEvent: (data: EventCreation) => Promise<void>;
};

export type { CalendarEvent, EventCreation, CalendarRepository };
