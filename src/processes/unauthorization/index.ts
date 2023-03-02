import { sample } from 'effector'
import { returnBookMutation, takeBookMutation } from '@/features/take-book'
import {
  addBookMutation,
  checkBookQuery,
  getBooksQuery,
  getUserBooksQuery,
  openBookQuery,
} from '@/entities/book'
import { getMeQuery } from '@/entities/me'
import { $$session } from '@/entities/session'

const failures = [
  checkBookQuery,
  openBookQuery,
  addBookMutation,
  getBooksQuery,
  getUserBooksQuery,
  getMeQuery,
  takeBookMutation,
  returnBookMutation,
].map((query) => query.finished.failure)

sample({
  clock: [...failures],
  filter: (result) => (result?.error as { status: number }).status === 401,
  target: $$session.removeToken,
})
