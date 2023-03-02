import { sample } from 'effector'
import { $$main } from '@/pages/main'
import { profileGate } from '@/pages/profile'
import { getMeQuery } from '@/entities/me'

sample({
  clock: [$$main.gate.open, profileGate.open],
  fn: () => null,
  target: getMeQuery.start,
})
