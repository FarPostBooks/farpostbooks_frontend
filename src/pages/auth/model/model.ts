import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-solid'
import { getMeQuery } from '@/entities/me/query'
import { $$session } from '@/entities/session'
import { TelegramLoginWidgetData } from '@/shared/ui'
import { getTokenQuery } from './query'

export const authtorizationModel = () => {
  const AuthorizationGate = createGate()

  const onAuthComplete = createEvent<TelegramLoginWidgetData>()

  const redirectToSignup = createEvent()

  const $authorizationData = createStore<TelegramLoginWidgetData | null>(null)

  sample({
    clock: [
      AuthorizationGate.open,
      $$session.removeToken,
      $$session.updateToken,
      getTokenQuery.finished.success,
    ],
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
    AuthorizationGate,
  }
}

export const $$authorization = authtorizationModel()
