import { createJsonMutation, declareParams } from '@farfetched/core'
import { runtypeContract } from '@farfetched/runtypes'
import { Token } from '@/entities/session/contract'
import { IUser } from '@/shared'
import { TelegramLoginWidgetData } from '@/shared/ui'

export const createUserMutation = createJsonMutation({
  params: declareParams<{ telegram: TelegramLoginWidgetData; user: IUser }>(),
  request: {
    url: 'http://localhost:8000/api/users',
    method: 'POST',
    body: ({ telegram, user }) => ({
      user,
      telegram,
    }),
  },
  response: { contract: runtypeContract(Token), status: { expected: 200 } },
})
