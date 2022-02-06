const { dbConnect } = require('./db');

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const areaRoutes = require('./routes/area');
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/areas', areaRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

dbConnect(() => {
  let port = process.env.PORT;
  if (port == null || port == '') {
    port = 8000;
  }
  app.listen(port);
});
