/* eslint-disable camelcase */
import { createAuthorizedQuery, IToken, Token } from '@/entities/session'
import { TelegramLoginWidgetData } from '@/shared/ui'

export const updateToken = createAuthorizedQuery<
  Pick<TelegramLoginWidgetData, 'id' | 'hash' | 'auth_date'>,
  IToken
>({
  url: ({ id, hash, auth_date }) =>
    `http://localhost:8000/api/users/token?id=${id}&hash=${hash}&auth_date=${auth_date}`,
  contract: Token,
  method: 'GET',
})
