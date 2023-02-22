/* eslint-disable camelcase */
import { createJsonQuery, declareParams } from '@farfetched/core'
import { runtypeContract } from '@farfetched/runtypes'
import { Token } from '@/entities/session'
import { combineUrl } from '@/shared'
import { TelegramLoginWidgetData } from '@/shared/ui'

export const getTokenQuery = createJsonQuery({
  params: declareParams<TelegramLoginWidgetData>(),
  request: {
    url: (params) => {
      const qs = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join('&')
      return `${combineUrl(`users/token?${qs}`)}`
    },
    method: 'GET',
  },
  response: {
    contract: runtypeContract(Token),
  },
})
