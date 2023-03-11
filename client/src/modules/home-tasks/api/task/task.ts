import { authenticationToken } from 'client/modules/authentication-token/application/authentication-token';
import { TaskRepository } from 'client/modules/home-tasks/domain/task/task';

const PATH = '/api/v1/tasks';

const API = authenticationToken(PATH);

export function tasksApi(): TaskRepository {
  return {
    async getAllTasksByUser() {
      try {
        const { data } = await API.get('/');
        return data;
      } catch {
        throw new Error('Failed to fetch tasks list');
      }
    },
    async createWeeklyTask() {
      try {
        await API.post('/');
      } catch {
        throw new Error('Failed to create weekly task');
      }
    },
    async deleteWeeklyTask(id) {
      try {
        await API.delete(`/${id}`);
      } catch {
        throw new Error('Faild to delete weekly task');
      }
    },
  };
}
