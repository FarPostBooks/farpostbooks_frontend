// eslint-disable-next-line boundaries/element-types
import {
  createAuthorizedMutation,
  createAuthorizedQuery,
} from '@/entities/session'
import { combineUrl } from '@/shared'
import { Book, IBook } from './contracts'

export const addBookMutation = createAuthorizedMutation<number, IBook>({
  url: (isbn) => combineUrl(`books/${isbn}`),
  contract: Book,
  method: 'POST',
})

export const checkBookQuery = createAuthorizedQuery<number, IBook>({
  url: (isbn) => combineUrl(`books/${isbn}`),
  contract: Book,
  method: 'GET',
})
