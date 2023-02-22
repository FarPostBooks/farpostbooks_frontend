import { createJsonMutation, declareParams } from '@farfetched/core'
import { runtypeContract } from '@farfetched/runtypes'
import { Token } from '@/entities/session'
import { combineUrl } from '@/shared'
import { ISignupUser } from '@/shared/types'
import { TelegramLoginWidgetData } from '@/shared/ui'

export const createUserMutation = createJsonMutation({
  params: declareParams<{
    telegram: TelegramLoginWidgetData
    user: ISignupUser
  }>(),
  request: {
    url: combineUrl('users'),
    method: 'POST',
    body: ({ telegram, user }) => ({
      user: { ...user, name: `${user.name} ${user.surname}` },
      telegram,
    }),
  },
  response: { contract: runtypeContract(Token), status: { expected: 200 } },
})
