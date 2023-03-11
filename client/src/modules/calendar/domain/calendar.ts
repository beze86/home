type EventCreation = {
  allDay: boolean;
  title: string;
  description: string;
  start: Date;
  end: Date;
  textColor: string;
  backgroundColor: string;
};

type CalendarRepository = {
  createEvent: (data: EventCreation) => Promise<void>;
};

export type { EventCreation, CalendarRepository };
