import { combine, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-solid'
import { debug } from 'patronum'
import { returnBookMutation, takeBookMutation } from '@/features/take-book'
import { openBookQuery, getBooksQuery } from '@/entities/book'
import { IBook, IBooks } from '@/shared'
import { createPaginationControls } from '@/shared/lib'

export const mainModel = () => {
  const gate = createGate()

  const openBook = createEvent<{ isbn: number }>()
  const closeBook = createEvent()
  const takeBook = createEvent<{ isbn: number }>()
  const returnBook = createEvent()

  const willLoad = createEvent<{ offset: number; limit: number }>()
  const loaded = sample({
    clock: getBooksQuery.finished.success,
    filter: (response) => response.result.length > 0,
    fn: () => null,
  })

  const { load, reload } = createPaginationControls({
    limit: 5,
    updateParamsClock: loaded,
    loadAction: willLoad,
  })

  const searchChanged = createEvent<string>()

  const $opened = createStore(false)
  const $books = createStore<IBooks>([])
  const $search = createStore('')
  const $filteredBooks = combine($books, $search, (books, search) =>
    books.filter((book) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    )
  )

  sample({
    clock: gate.open,
    target: reload,
  })
  $books.reset(reload)

  sample({
    clock: willLoad,
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

  sample({
    clock: takeBook,
    target: takeBookMutation.start,
  })

  sample({
    clock: returnBook,
    fn: () => null,
    target: returnBookMutation.start,
  })

  sample({
    clock: searchChanged,
    target: $search,
  })

  sample({
    clock: [
      takeBookMutation.finished.success,
      returnBookMutation.finished.success,
    ],
    source: openBookQuery.$data,
    filter: Boolean,
    fn: (book: IBook) => book.id,
    target: openBookQuery.start,
  })

  debug({
    takeBook,
    returnBook,
    takeFinished: takeBookMutation.finished.failure,
    returnFinished: returnBookMutation.finished.failure,
  })

  return {
    gate,
    openBook,
    closeBook,
    $opened,
    $books,
    loadMore: load,
    takeBook,
    returnBook,
    searchChanged,
    $filteredBooks,
  }
}

export const $$main = mainModel()
