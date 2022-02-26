import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

// import { Area } from 'client/modules/main/ui/Tasks/Task';
import { TasksList } from 'client/modules/main/ui/tasks/TasksList';

export const TasksRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<TasksList />} />
        {/* <Route path=":id" element={<Area />} /> */}
      </Routes>
      <Outlet />
    </>
  );
};
