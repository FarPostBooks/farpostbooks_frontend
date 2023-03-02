import { createEvent, createStore, sample } from 'effector'
import { $$notifications } from '@/entities/notification'
import { IError } from '@/shared'
import { returnBookMutation, takeBookMutation } from './query'

export const takeBookModel = () => {
  const takeBook = createEvent<{ isbn: number }>()
  const returnBook = createEvent()
  const bookWillRated = createEvent()
  const rateBook = createEvent<{ rating: number }>()

  const $rateModalOpened = createStore(false)

  sample({
    clock: takeBookMutation.finished.success,
    fn: () => ({ message: 'Вы успешно взяли книгу' }),
    target: $$notifications.addNotification,
  })

  sample({
    clock: returnBookMutation.finished.success,
    fn: (data) => ({
      message: `Книга успешно возвращена! Ваша оценка: ${data.params.rating}`,
    }),
    target: $$notifications.addNotification,
  })

  sample({
    clock: takeBookMutation.finished.failure,
    fn: (error) => ({ message: (error as IError).error.response.detail }),
    target: $$notifications.addNotification,
  })
  sample({
    clock: takeBook,
    target: takeBookMutation.start,
  })

  sample({
    clock: returnBook,
    fn: () => null,
    target: bookWillRated,
  })

  sample({
    clock: bookWillRated,
    fn: () => true,
    target: $rateModalOpened,
  })

  sample({
    clock: rateBook,
    target: returnBookMutation.start,
  })

  sample({
    clock: rateBook,
    fn: () => false,
    target: $rateModalOpened,
  })

  return {
    takeBook,
    returnBook,

    rateBook,
    $rateModalOpened,
  }
}

export const $$takeBook = takeBookModel()
