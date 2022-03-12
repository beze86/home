const { dbConnect } = require('./db');

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const { protectedRoute } = require('./middlewares/authMiddleware');

const accountRoutes = require('./routes/account');
const areaRoutes = require('./routes/area');
const contactRoutes = require('./routes/contact');
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/areas', protectedRoute, areaRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/tasks', taskRoutes);

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
