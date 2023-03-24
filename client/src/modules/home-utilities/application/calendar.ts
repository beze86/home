import { CalendarRepository } from 'client/modules/home-utilities/domain/calendar/calendar';

const CalendarService = (repository: CalendarRepository): CalendarRepository => {
  return {
    getEvents: () => repository.getEvents(),
    createEvent: (data) => repository.createEvent(data),
    deleteEvent: (id) => repository.deleteEvent(id),
  };
};

export { CalendarService };
