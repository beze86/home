import axios from 'axios';

import { TaskRepository } from 'client/modules/main/type/task';

const PATH = '/api/v1/tasks';

export function tasksApi(): TaskRepository {
  return {
    getAllTasks() {
      return axios.get(PATH);
    },
    createWeeklyTask() {
      return axios.post(PATH);
    },
  };
}
