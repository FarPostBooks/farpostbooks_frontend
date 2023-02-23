/* eslint-disable camelcase */
import { Record, Static, String } from 'runtypes'

const Token = Record({
  access_token: String,
  token_type: String,
})

export type IToken = Static<typeof Token>

export { Token }
