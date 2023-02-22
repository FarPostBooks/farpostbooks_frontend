import { combineUrl } from '@/shared'
// eslint-disable-next-line boundaries/element-types
import { createAuthorizedQuery } from '../session'
import { IMe, Me } from './contract'

export const getMeQuery = createAuthorizedQuery<null, IMe>({
  url: combineUrl('users/me'),
  contract: Me,
  method: 'GET',
})
