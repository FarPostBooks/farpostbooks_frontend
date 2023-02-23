import { createEvent, createStore, sample } from 'effector'
import { addBookMutation, checkBookQuery } from '@/entities/book'
import { $$notifications } from '@/entities/notification'
import { IError } from '@/shared'

export const adminPanelModel = () => {
  const checkBook = createEvent<{ isbn: number }>()
  const addBook = createEvent<{ isbn: number }>()
  const closeClicked = createEvent()

  const additionFinished = sample({
    clock: addBookMutation.finished.finally,
  })

  const $modalOpened = createStore(false)

  sample({
    clock: checkBook,
    fn: ({ isbn }) => isbn,
    target: checkBookQuery.start,
  })

  sample({
    clock: checkBook,
    fn: () => true,
    target: $modalOpened,
  })

  sample({
    clock: addBook,
    fn: ({ isbn }) => isbn,
    target: addBookMutation.start,
  })

  sample({
    clock: [closeClicked, additionFinished],
    fn: () => false,
    target: $modalOpened,
  })

  sample({
    clock: checkBookQuery.finished.failure,
    fn: (error) => ({
      message: (error as IError).error.response.detail,
    }),
    target: $$notifications.addNotification,
  })

  sample({
    clock: addBookMutation.finished.success,
    fn: () => ({ message: 'Книга успешно добавлена' }),
    target: $$notifications.addNotification,
  })

  return { checkBook, addBook, $modalOpened, closeClicked }
}

export const $$adminPanel = adminPanelModel()
