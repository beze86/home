const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const usersRoutes = require('./routes/users.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRoutes);

app.listen(5000);
