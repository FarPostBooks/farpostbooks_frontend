/* eslint-disable camelcase */
import { Record, String, Array, Static, Null } from 'runtypes'
import { BookCompact } from './book'

export const UserBook = Record({
  book: BookCompact,
  get_timestamp: String,
  back_timestamp: String.Or(Null),
})

export const UserBooks = Record({
  current: UserBook.Or(Null),
  books: Array(UserBook),
})

export type IUserBook = Static<typeof UserBook>
export type IUserBooks = Static<typeof UserBooks>
