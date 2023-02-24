import { createEvent, createStore, sample } from 'effector'
import { debug } from 'patronum'
import { getUserBooksQuery } from '@/entities/book'
import { $$session } from '@/entities/session'
import { IUserBook } from '@/shared'
import { createPaginationControls } from '@/shared/lib'

export const profileModel = () => {
  const $userBooks = createStore<Array<IUserBook>>([])
  const $currentBook = createStore<IUserBook | null>(null)

  const loaded = sample({
    clock: getUserBooksQuery.finished.success,
    fn: () => null,
  })

  const willLoad = createEvent<{ offset: number; limit: number }>()

  const { load, reload } = createPaginationControls({
    limit: 5,
    updateParamsClock: loaded,
    loadAction: willLoad,
  })

  sample({
    clock: $$session.telegramIdSetupCompleted,
    target: reload,
  })

  sample({
    clock: reload,
    target: load,
  })

  sample({
    clock: willLoad,
    source: $$session.$telegramId,
    filter: Boolean,
    fn: (telegramId, { offset, limit }) => ({ telegramId, offset, limit }),
    target: getUserBooksQuery.start,
  })

  sample({
    clock: getUserBooksQuery.$data,
    fn: (data) => data?.books ?? [],
    target: $userBooks,
  })

  sample({
    clock: getUserBooksQuery.$data,
    fn: (data) => data?.current ?? null,
    target: $currentBook,
  })

  debug({
    reload,
    load,
    willLoad,
  })

  return { load, reload, $currentBook, $userBooks }
}

export const $$profile = profileModel()
