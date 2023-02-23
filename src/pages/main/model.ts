import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-solid'
import { openBookQuery, getBooksQuery, IBooks } from '@/entities/book'

export const mainModel = () => {
  const gate = createGate()

  const openBook = createEvent<{ isbn: number }>()
  const closeBook = createEvent()

  const loadMore = createEvent()

  const $opened = createStore(false)
  const $offset = createStore(0)
  const $limit = createStore(2)
  const $books = createStore<IBooks>([])

  sample({
    clock: gate.open,
    source: { offset: $offset, limit: $limit },
    fn: (params) => params,
    target: getBooksQuery.start,
  })

  sample({
    clock: loadMore,
    source: { offset: $offset, limit: $limit },
    fn: ({ offset, limit }) => offset + limit,
    target: $offset,
  })

  sample({
    clock: $offset,
    source: $limit,
    fn: (limit, offset) => ({ limit, offset }),
    target: getBooksQuery.start,
  })

  sample({
    clock: getBooksQuery.finished.success,
    source: $books,
    fn: (books, fetchedBooks) => [...books, ...fetchedBooks.result],
    target: $books,
  })

  sample({
    clock: openBook,
    fn: ({ isbn }) => isbn,
    target: openBookQuery.start,
  })

  sample({
    clock: closeBook,
    fn: () => false,
    target: $opened,
  })

  sample({
    clock: openBookQuery.finished.success,
    fn: () => true,
    target: $opened,
  })

  $offset.watch(console.log)
  return { gate, openBook, closeBook, $opened, $books, loadMore }
}

export const $$main = mainModel()
