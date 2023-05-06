import { CreateEvent } from '../../../../models/Calendar';
import { CalendarRepository, DeleteEvent, GetEvents } from '../../domain/calendar/calendar';

class CalendarApplication implements CalendarRepository {
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

  deleteEvent({ userId, id }: DeleteEvent) {
    return this.repository.deleteEvent({ userId, id });
  }
}

export default CalendarApplication;
