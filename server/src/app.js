const express = require('express');
const cors = require('cors');
const config = require('./config');

const errorHandler = require('./middleware/errorHandler');

const authRouter = require('./routes/auth');
const workoutsRouter = require('./routes/workouts');
const exercisesRouter = require('./routes/exercises');
const summaryRouter = require('./routes/summary');

const app = express();

app.use(cors(config.corsOptions));
app.use(express.json());

/* Подключаем роуты */
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workouts', workoutsRouter);
app.use('/api/v1/exercises', exercisesRouter);
app.use('/api/v1/summary', summaryRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

module.exports = app;
