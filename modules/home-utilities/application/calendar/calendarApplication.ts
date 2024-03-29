import { CalendarRepository, CreateEvent, DeleteEvent, GetEvents } from '../../domain/calendar/calendar';

class CalendarApplication {
  private readonly repository: CalendarRepository;

  constructor(repository: CalendarRepository) {
    this.repository = repository;
  }

  getEvents({ userId }: GetEvents) {
    return this.repository.getEvents({ userId });
  }

  createEvent(data: CreateEvent) {
    return this.repository.createEvent(data);
  }

  deleteEvent({ id }: DeleteEvent) {
    return this.repository.deleteEvent({ id });
  }
}

export default CalendarApplication;
