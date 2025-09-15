import { Book } from '../models/books';

export const books: Book[] = [];

let currentId = 1;
export const getNextBookId = () => currentId++;
