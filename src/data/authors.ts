import { Author } from '../models/author';

export const authors: Author[] = [];

let currentId = 1;
export const getNextAuthorId = () => currentId++;
