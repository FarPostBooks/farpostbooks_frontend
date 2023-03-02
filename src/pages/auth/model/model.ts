import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-solid'
import { getMeQuery } from '@/entities/me/query'
import { $$session } from '@/entities/session'
import { TelegramLoginWidgetData } from '@/shared/ui'
import { getTokenQuery } from './query'

export const authtorizationModel = () => {
  const AuthorizedGate = createGate()

  const onAuthComplete = createEvent<TelegramLoginWidgetData>()

  const redirectToSignup = createEvent()

  const $authorizationData = createStore<TelegramLoginWidgetData | null>(null)

  sample({
    clock: AuthorizedGate.open,

    fn: () => null,
    target: getMeQuery.start,
  })

  sample({
    clock: onAuthComplete,
    target: $authorizationData,
  })

  sample({
    clock: onAuthComplete,
    target: getTokenQuery.start,
  })

  sample({
    clock: getTokenQuery.finished.success,
    fn: (data) => data.result,
    target: $$session.updateToken,
  })

  sample({
    clock: getTokenQuery.finished.failure,
    target: redirectToSignup,
  })

  return {
    redirectToSignup,
    onAuthComplete,
    $authorizationData,
    AuthorizedGate,
  }
}

export const $$authorization = authtorizationModel()
