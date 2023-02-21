import { createEffect, JSXElement } from 'solid-js'

export type ProtectedProps = {
  redirect: () => void
  children: JSXElement
  hasAccess: boolean
}
export const Protected = (props: ProtectedProps) => {
  createEffect(() => {
    if (!props.hasAccess) {
      props.redirect()
    }
  })

  return <>{props.children}</>
}
