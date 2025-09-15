import express from 'express';
import { books, getNextBookId } from '../data/book';
import { Book } from '../models/books';
import { authors } from '../data/authors';

const router = express.Router();

router.post('/', (req, res) => {
  const { title, year, authorId } = req.body;
  if (!title || !year || !authorId) {
    return res.status(400).json({ error: 'Both field are required' });
  }

  const authorExists = authors.some(a => a.id === authorId);
  if (!authorExists) {
    return res.status(400).json({ error: 'Author does not exist' });
  }

  const newBook: Book = {
    id: getNextBookId(),
    title,
    year,
    authorId
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

router.get('/', (req, res) => {
  const { title, authorId, year } = req.query;

  let results = books;

  if (title) {
    results = results.filter(b =>
      b.title.toLowerCase().includes((title as string).toLowerCase())
    );
  }

  if (authorId) {
    results = results.filter(b => b.authorId === parseInt(authorId as string));
  }

  if (year) {
    results = results.filter(b => b.year === parseInt(year as string));
  }

  const enrichedResults = results.map(book => {
    const author = authors.find(a => a.id === book.authorId);
    return {
      id: book.id,
      title: book.title,
      year: book.year,
      author: author ? { id: author.id, name: author.name } : null
    };
  });

  res.json(enrichedResults);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const author = authors.find(a => a.id === book.authorId);
  res.json({
    id: book.id,
    title: book.title,
    year: book.year,
    author: author ? { id: author.id, name: author.name } : null
  });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, year, authorId } = req.body;
  if (!title || !year || !authorId) {
    return res.status(400).json({ error: 'Both field are are required' });
  }

  const authorExists = authors.some(a => a.id === authorId);
  if (!authorExists) {
    return res.status(400).json({ error: 'Author does not exist' });
  }

  book.title = title;
  book.year = year;
  book.authorId = authorId;

  const author = authors.find(a => a.id === book.authorId);
  res.json({
    id: book.id,
    title: book.title,
    year: book.year,
    author: author ? { id: author.id, name: author.name } : null
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books.splice(index, 1);
  res.status(204).send();
});

export default router;
