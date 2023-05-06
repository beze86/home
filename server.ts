import path from 'path';

import cors from 'cors';
import { config } from 'dotenv';
import express, { static as expressStatic, json } from 'express';

// eslint-disable-next-line import/order
import database from './Database';

config();

import { protectedRoute } from './middlewares/authMiddleware';
import areaRoutes from './modules/home-utilities/infrastructure/area/router/area-router';
import calendarRoutes from './modules/home-utilities/infrastructure/calendar/router/calendar-router';
import contactRoutes from './modules/home-utilities/infrastructure/contact/router/contact-router';
import taskRoutes from './modules/home-utilities/infrastructure/task/router/task-router';
import userRoutes from './routes/user';

const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/areas', protectedRoute, areaRoutes);
app.use('/api/v1/contacts', protectedRoute, contactRoutes);
app.use('/api/v1/tasks', protectedRoute, taskRoutes);
app.use('/api/v1/calendar/events', protectedRoute, calendarRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(expressStatic(path.join(__dirname, '../client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
}

async function startServer() {
  try {
    await database.connect();
    const port = process.env.PORT || 8000;
    const server = app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

    server.on('close', async () => {
      try {
        await database.close();
      } catch (error) {
        console.error(`Failed to disconnect from database: ${error}`);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
}

startServer();
