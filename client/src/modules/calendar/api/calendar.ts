import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { CalendarRepository } from 'client/modules/calendar/domain/calendar';

const PATH = '/api/v1/calendar';

const API = authenticationToken(PATH);

export function calendarApi(): CalendarRepository {
  return {
    async getEvents() {
      try {
        const { data } = await API.get('/events');

        return data;
      } catch {
        throw new Error('Failed to load events');
      }
    },
    async createEvent(data) {
      try {
        await API.post('/events', data);
      } catch {
        throw new Error('Failed to create calendar event');
      }
    },
  };
}
