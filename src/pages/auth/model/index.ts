import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-solid'
import { $$session } from '@/entities/session'
import { TelegramLoginWidgetData } from '@/shared/ui'
import { updateToken } from './query'

export const authtorizationModel = () => {
  const AuthorizationGate = createGate()

  const onAuthComplete = createEvent<TelegramLoginWidgetData>()
  const $authorizationData = createStore<TelegramLoginWidgetData | null>(null)

  sample({
    clock: AuthorizationGate.open,
    source: $$session.$token,
  })

  sample({
    clock: onAuthComplete,
    target: $authorizationData,
  })

  return { onAuthComplete, $authorizationData }
}

export const $$authorization = authtorizationModel()
