import express from 'express';
import logger from './utils/logger/index.js';

import usersRouter from './routes/users/index.js';
import healthRouter from './routes/health/index.js';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', usersRouter);
app.use('/health', healthRouter);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});