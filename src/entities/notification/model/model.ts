import { createEffect, createEvent, createStore, sample } from 'effector'
import { Notification } from '../types'

export const notificationsModel = () => {
  const NOTIFICATIONS_TIMEOUT = 2500

  const $notifications = createStore<Array<Notification>>([])
  const addNotification = createEvent<Notification>()
  const $current = createStore<Notification | null>(null)
  const popNotification = createEvent()

  const notificationsLoopFx = createEffect(async () => {
    setTimeout(popNotification, NOTIFICATIONS_TIMEOUT)
  })

  sample({
    clock: $notifications,
    fn: (notifications) => notifications.at(0) ?? null,
    target: $current,
  })

  sample({
    clock: addNotification,
    source: $notifications,
    filter: (notifications) => !notifications.length,
    target: notificationsLoopFx,
  })

  sample({
    clock: addNotification,
    source: $notifications,
    fn: (notifications, notification) => notifications.concat(notification),
    target: $notifications,
  })

  sample({
    clock: popNotification,
    source: $notifications,
    fn: (notifications) => notifications.slice(1),
    target: $notifications,
  })

  sample({
    clock: popNotification,
    source: $notifications,
    filter: (notifications) => Boolean(notifications.length),
    target: notificationsLoopFx,
  })

  return {
    $currentNotification: $current,
    addNotification,
    notificationsTimeout: NOTIFICATIONS_TIMEOUT,
  }
}

export const $$notifications = notificationsModel()
