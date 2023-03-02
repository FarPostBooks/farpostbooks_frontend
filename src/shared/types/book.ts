/* eslint-disable camelcase */
import { Array, Null, Number, Record, Static, String } from 'runtypes'
import { User } from '@/shared'

export const BookCompact = Record({
  id: Number,
  name: String,
  image: String,
})

export const BookUsabiliyStamp = Record({
  user: User,
  get_timestamp: String,
  back_timestamp: String.Or(Null),
  rating: Number,
})

export const TakesHistory = Array(BookUsabiliyStamp)

export const Book = BookCompact.extend({
  description: String,
  author: String,
  publish: String,
  added_timestamp: String.Or(Null),
  user_books: Array(BookUsabiliyStamp).Or(Null),
})

export const Books = Array(BookCompact)

export type IBookCompact = Static<typeof BookCompact>
export type IBooks = Static<typeof Books>
export type IBook = Static<typeof Book>
export type ITakesHistory = Static<typeof TakesHistory>
