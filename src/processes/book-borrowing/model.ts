import { sample } from 'effector'
import { debug } from 'patronum'
import { $$profile } from '@/features/profile'
import { returnBookMutation, takeBookMutation } from '@/features/take-book'

sample({
  clock: [
    returnBookMutation.finished.success,
    takeBookMutation.finished.success,
  ],
  target: $$profile.reload,
})

debug({})
