import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import usersRoutes from './routes/users.js'

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/v1/users', usersRoutes);


app.listen(5000)