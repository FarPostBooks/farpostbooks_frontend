import { createEffect, JSXElement, Show } from 'solid-js'

export type ProtectedProps = {
  redirect: () => void
  children: JSXElement
  hasAccess: boolean
  checking: boolean
}
export const Protected = (props: ProtectedProps) => {
  createEffect(() => {
    if (!props.hasAccess && !props.checking) {
      props.redirect()
    }
  })

  return (
    <Show when={props.hasAccess} fallback={<>Проверка прав доступа...</>}>
      {props.children}
    </Show>
  )
}
