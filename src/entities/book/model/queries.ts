// eslint-disable-next-line boundaries/element-types
import {
  createAuthorizedMutation,
  createAuthorizedQuery,
} from '@/entities/session'
import { combineUrl } from '@/shared'
import { Book, Books, IBook, IBooks } from './contracts'

export const checkBookQuery = createAuthorizedQuery<number, IBook>({
  url: (isbn) => combineUrl(`books/${isbn}`),
  contract: Book,
  method: 'GET',
})

export const openBookQuery = createAuthorizedQuery<number, IBook>({
  url: (isbn) => combineUrl(`books/${isbn}`),
  contract: Book,
  method: 'GET',
})

export const addBookMutation = createAuthorizedMutation<number, IBook>({
  url: (isbn) => combineUrl(`books/${isbn}`),
  contract: Book,
  method: 'POST',
})

export const getBooksQuery = createAuthorizedQuery<
  { limit: number; offset: number },
  IBooks
>({
  url: ({ limit, offset }) =>
    combineUrl(`books/?limit=${limit}&offset=${offset}`),
  contract: Books,
  method: 'GET',
})
