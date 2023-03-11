import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { CalendarRepository } from 'client/modules/calendar/domain/calendar';

const PATH = '/api/v1/calendar';

const API = authenticationToken(PATH);

export function calendarApi(): CalendarRepository {
  return {
    async createEvent(data) {
      try {
        await API.post('/event', data);
      } catch (err) {
        throw new Error('Failed to create calendar event');
      }
    },
  };
}
