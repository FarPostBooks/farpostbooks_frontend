import { combineUrl, IUser, User } from '@/shared'
// eslint-disable-next-line boundaries/element-types
import { createAuthorizedQuery } from '../session'

export const getMeQuery = createAuthorizedQuery<null, IUser>({
  url: combineUrl('users/me'),
  contract: User,
  method: 'GET',
})
