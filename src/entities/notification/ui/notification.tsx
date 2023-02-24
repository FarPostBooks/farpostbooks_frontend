import { createEffect } from 'solid-js'
import { Paragraph } from '@/shared/ui'
import { Notification } from '../types'
import s from './s.module.sass'

export type NotificationPopupProps = Notification

export const NotificationPopup = (props: NotificationPopupProps) => {
  let ref: HTMLDivElement

  const render = () => (
    <div ref={ref} classList={{ [s.notification]: true }}>
      <Paragraph>{props.message}</Paragraph>
    </div>
  )

  createEffect(() => {
    if (props.message) {
      ref.animate([{ bottom: '-10%' }, { bottom: '10%' }], {
        easing: 'ease-out',
        duration: 1000,
        fill: 'forwards',
      })
    }
  })

  return render
}
