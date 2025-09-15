import express from 'express';
import authorsRouter from './routes/authors';
import { logger } from './middleware/logger';
import booksRouter from './routes/books';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use(errorHandler)
export default app;
