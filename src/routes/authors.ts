import express from 'express';
import { authors, getNextAuthorId } from '../data/authors';
import { Author } from '../models/author';

const router = express.Router();

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newAuthor: Author = { id: getNextAuthorId(), name };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

router.get('/', (req, res) => {
    res.json(authors);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(a => a.id === id);
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    author.name = name;
    res.json(author);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ error: 'Author not found' });

    authors.splice(index, 1);
    res.status(204).send();
});

export default router;
