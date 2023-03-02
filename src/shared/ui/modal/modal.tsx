import { createEffect, JSXElement, Show } from 'solid-js'
import { Portal } from 'solid-js/web'

export type ModalProps = {
  opened?: boolean
  children: JSXElement
}
export const Modal = (props: ModalProps) => {
  createEffect(() => {
    if (props.opened) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.setProperty('overflow', 'auto')
    }
  })

  return (
    <Show when={props.opened}>
      <Portal>{props.children}</Portal>
    </Show>
  )
}
