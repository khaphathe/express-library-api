import express from 'express';
import { authors, getNextAuthorId } from '../data/authors';
import { Author } from '../models/author';
import { HttpError } from '../utils/errorhelper';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throw new HttpError(400, 'Name is required');

    const newAuthor: Author = { id: getNextAuthorId(), name };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
});

router.get('/', (req, res, next) => {
  try {
    res.json(authors);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);
    if (!author) throw new HttpError(404, 'Author not found');
    res.json(author);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);
    if (!author) throw new HttpError(404, 'Author not found');

    const { name } = req.body;
    if (!name) throw new HttpError(400, 'Name is required');

    author.name = name;
    res.json(author);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) throw new HttpError(404, 'Author not found');

    authors.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
