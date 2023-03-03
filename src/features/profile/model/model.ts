import { createEvent, createStore, sample } from 'effector'
import { getUserBooksQuery } from '@/entities/book'
import { getMeQuery } from '@/entities/me'
import { IUserBook } from '@/shared'
import { createPaginationControls } from '@/shared/lib'

export const profileModel = () => {
  const $userBooks = createStore<Array<IUserBook>>([])
  const $currentBook = createStore<IUserBook | null>(null)

  const loaded = sample({
    clock: getUserBooksQuery.finished.success,
    filter: (response) => response.result.books.length > 0,
    fn: () => null,
  })

  const willLoad = createEvent<{ offset: number; limit: number }>()

  const { load, reload } = createPaginationControls({
    limit: 10,
    updateParamsClock: loaded,
    loadAction: willLoad,
  })

  sample({
    clock: reload,
    target: load,
  })

  $userBooks.reset(reload)

  sample({
    clock: getMeQuery.finished.success,
    target: reload,
  })

  sample({
    clock: willLoad,
    source: getMeQuery.$data,
    filter: Boolean,
    fn: (data, { offset, limit }) => ({ telegramId: data.id, offset, limit }),
    target: getUserBooksQuery.start,
  })

  sample({
    clock: getUserBooksQuery.$data,
    source: $userBooks,
    fn: (userBooks, data) =>
      data?.books ? [...userBooks, ...data.books] : [...userBooks],
    target: $userBooks,
  })

  sample({
    clock: getUserBooksQuery.$data,
    fn: (data) => data?.current ?? null,
    target: $currentBook,
  })

  return { load, reload, $currentBook, $userBooks }
}

export const $$profile = profileModel()
