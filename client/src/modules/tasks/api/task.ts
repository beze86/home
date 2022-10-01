import axios from 'axios';

import { profileStorageKey } from 'client/modules/auth/type/auth';
import { TaskRepository } from 'client/modules/tasks/type/task';

const PATH = '/api/v1/tasks';

const API = axios.create({ baseURL: PATH });

API.interceptors.request.use((req) => {
  const storedItem = localStorage.getItem(profileStorageKey);
  if (storedItem) {
    if (req.headers) {
      req.headers.authorization = `Bearer ${JSON.parse(storedItem).token}`;
    }
  }
  return req;
});

export function tasksApi(): TaskRepository {
  return {
    getAllTasks() {
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
