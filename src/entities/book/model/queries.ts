// eslint-disable-next-line boundaries/element-types
import {
  createAuthorizedMutation,
  createAuthorizedQuery,
} from '@/entities/session'
import {
  combineUrl,
  Book,
  Books,
  IBook,
  IBooks,
  IUserBooks,
  UserBooks,
} from '@/shared'

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

export const getUserBooksQuery = createAuthorizedQuery<
  { limit: number; offset: number; telegramId: number },
  IUserBooks
>({
  url: ({ limit, offset, telegramId }) =>
    combineUrl(`users/${telegramId}/books?limit=${limit}&offset=${offset}`),
  contract: UserBooks,
  method: 'GET',
})
