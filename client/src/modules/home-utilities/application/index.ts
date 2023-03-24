import { AreaService } from 'client/modules/home-utilities/application/area';
import { CalendarService } from 'client/modules/home-utilities/application/calendar';
import { ContactService } from 'client/modules/home-utilities/application/contact';
import { TaskService } from 'client/modules/home-utilities/application/task';
import { AreaRepository } from 'client/modules/home-utilities/domain/area/area';
import { CalendarRepository } from 'client/modules/home-utilities/domain/calendar/calendar';
import { ContactRepository } from 'client/modules/home-utilities/domain/contact/contact';
import { TaskRepository } from 'client/modules/home-utilities/domain/task/task';

type ApplicationRepositories = {
  area: AreaRepository;
  contact: ContactRepository;
  calendar: CalendarRepository;
  task: TaskRepository;
};

type Application = {
  repositories: ApplicationRepositories;
};

const application = ({ repositories: { area, contact, calendar, task } }: Application) => {
  return {
    getAreas: AreaService(area).getAreas,
    createArea: AreaService(area).createArea,
    deleteArea: AreaService(area).deleteArea,
    getContacts: ContactService(contact).getContacts,
    createContact: ContactService(contact).createContact,
    deleteContact: ContactService(contact).deleteContact,
    getEvents: CalendarService(calendar).getEvents,
    createEvent: CalendarService(calendar).createEvent,
    deleteEvent: CalendarService(calendar).deleteEvent,
    getTasks: TaskService(task).getTasks,
    createWeeklyTask: TaskService(task).createWeeklyTask,
    deleteWeeklyTask: TaskService(task).deleteWeeklyTask,
  };
};

export { application };
