import { Record, Static, String, Number } from 'runtypes'

export const User = Record({
  id: Number,
  name: String,
  position: String,
  about: String,
})

export type IUser = Static<typeof User>

export type ISignupUser = Omit<IUser, 'id'> & { surname: string }
