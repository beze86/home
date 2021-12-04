const { dbConnect } = require('./db');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/users', usersRoutes);

dbConnect(() => {
  let port = process.env.PORT;
  if (port == null || port == '') {
    port = 3003;
  }
  app.listen(port);
});
