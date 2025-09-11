import express from 'express';
import authorsRouter from './routes/authors';
import { logger } from './middleware/logger';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/authors', authorsRouter);

export default app;
