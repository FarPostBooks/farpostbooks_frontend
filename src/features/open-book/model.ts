import { createEvent, createStore, sample } from 'effector'
import { openBookQuery } from '@/entities/book'

export const openBookModel = () => {
  const openBook = createEvent<{ isbn: number }>()
  const closeBook = createEvent()
  const $opened = createStore(false)

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

  return { openBook, closeBook, $opened }
}

export const $$openBook = openBookModel()
