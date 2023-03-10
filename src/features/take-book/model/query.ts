import { Null } from 'runtypes'
import { createAuthorizedMutation } from '@/entities/session'
import { combineUrl } from '@/shared'

export const takeBookMutation = createAuthorizedMutation<
  { isbn: number },
  null
>({
  url: ({ isbn }) => combineUrl(`users/me/books/${isbn}/`),
  contract: Null,
  method: 'POST',
})

export const returnBookMutation = createAuthorizedMutation<
  { rating: number },
  null
>({
  url: () => combineUrl('users/me/books'),
  contract: Null,
  method: 'PUT',
  body: (params) => ({ rating: params.rating }),
})
