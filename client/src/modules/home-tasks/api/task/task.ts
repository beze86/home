import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { TaskRepository } from 'client/modules/home-tasks/domain/task/task';

const PATH = '/api/v1/tasks';

const API = authenticationToken(PATH);

export function tasksApi(): TaskRepository {
  return {
    getAllTasksByUser() {
      return API.get('/');
    },
    createWeeklyTask() {
      return API.post('/');
    },
    deleteWeeklyTask(id) {
      return API.delete(`/${id}`);
    },
  };
}
