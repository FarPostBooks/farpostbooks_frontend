import { sample } from 'effector'
import { $$notifications } from '@/entities/notification'
import { IError } from '@/shared'
import { returnBookMutation, takeBookMutation } from './query'

sample({
  clock: takeBookMutation.finished.success,
  fn: () => ({ message: 'Вы успешно взяли книгу' }),
  target: $$notifications.addNotification,
})

sample({
  clock: returnBookMutation.finished.success,
  fn: () => ({ message: 'Книга успешно возвращена' }),
  target: $$notifications.addNotification,
})

sample({
  clock: takeBookMutation.finished.failure,
  fn: (error) => ({ message: (error as IError).error.response.detail }),
  // fn: (result) => ({ message: (result.error as IError).error.response.detail }),
  // fn: () => ({ message: 'Что-то пошло не так' }),
  target: $$notifications.addNotification,
})
