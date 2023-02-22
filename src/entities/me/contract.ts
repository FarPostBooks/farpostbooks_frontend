import { Number, Record, Static, String } from 'runtypes'

export const Me = Record({
  id: Number,
  name: String,
  position: String,
  about: String,
})

export type IMe = Static<typeof Me>
