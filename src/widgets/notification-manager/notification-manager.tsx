import { useUnit } from 'effector-solid'
import { Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { $$notifications, NotificationPopup } from '@/entities/notification'

export const NotificationManager = () => {
  const currentNotification = useUnit($$notifications.$currentNotification)

  return (
    <Show when={!!currentNotification()}>
      <Portal>
        <NotificationPopup message={currentNotification()?.message as string} />
      </Portal>
    </Show>
  )
}
