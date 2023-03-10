import jwtDecode from 'jwt-decode'
import { createLocalStorageItem } from '@/shared/lib'
import { IToken } from './contract'

const sessionModel = () => {
  const {
    $value: $token,
    $ready: $tokenReady,
    update: updateToken,
    remove: removeToken,
    setupCompleted: tokenSetupCompleted,
    gate: TokenGate,
  } = createLocalStorageItem<IToken>('token')

  const $admin = $token.map((token) => {
    if (!token) return false

    const decoded = jwtDecode(token.access_token) as { scopes: Array<string> }
    return decoded.scopes.includes('admin')
  })

  return {
    $token,
    $tokenReady,
    $admin,
    updateToken,
    removeToken,
    tokenSetupCompleted,
    TokenGate,
  }
}

export const $$session = sessionModel()
