import { sample } from 'effector'
import { $$openBook } from '@/features/open-book'
import { $$takeBook } from '@/features/take-book'

sample({
  clock: $$openBook.closeBook,
  fn: () => false,
  target: $$takeBook.$rateModalOpened,
})
