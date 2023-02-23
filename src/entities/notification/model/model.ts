import { createEffect, createEvent, createStore, sample } from 'effector'
import { Notification } from '../types'

export const notificationsModel = () => {
  const notificationTimeout = 3000

  const $notifications = createStore<Array<Notification>>([])
  const addNotification = createEvent<Notification>()
  const $current = createStore<Notification | null>(null)
  const popNotification = createEvent()

  const notificationsLoopFx = createEffect(async () => {
    setTimeout(popNotification, notificationTimeout)
  })

  sample({
    clock: $notifications,
    fn: (notifications) => notifications.at(0) ?? null,
    target: $current,
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
    filter: Boolean,
    fn: (notifications) => notifications.slice(1),
    target: $notifications,
  })

  sample({
    clock: $notifications,
    source: notificationsLoopFx.pending,
    filter: (pending, notifications) =>
      !pending && Boolean(notifications.length),
    target: notificationsLoopFx,
  })

  return {
    $currentNotification: $current,
    addNotification,
    notificationTimeout,
  }
}

export const $$notifications = notificationsModel()
