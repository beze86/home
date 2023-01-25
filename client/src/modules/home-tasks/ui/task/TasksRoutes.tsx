import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { TasksList } from 'client/modules/home-tasks/ui/task/TasksList';

export const TasksRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<TasksList />} />
      </Routes>
    </>
  );
};
