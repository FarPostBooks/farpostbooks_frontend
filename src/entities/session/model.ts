import { createLocalStorageItem } from '@/shared/lib'
import { IToken } from './contract'

const sessionModel = () => {
  const {
    $value: $token,
    update: updateToken,
    gate: TokenGate,
  } = createLocalStorageItem<IToken>('token')

  return { $token, updateToken, TokenGate }
}

export const $$session = sessionModel()
