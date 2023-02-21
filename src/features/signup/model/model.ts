import { sample } from 'effector'
import { $$session } from '@/entities/session'
import { createUserMutation } from './mutation'

sample({
  clock: createUserMutation.finished.success,
  fn: (result) => result.result,
  target: $$session.updateToken,
})

$$session.$token.watch(console.log)
