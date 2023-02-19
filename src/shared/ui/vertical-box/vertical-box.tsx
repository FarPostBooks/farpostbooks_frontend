import { children, JSXElement } from 'solid-js'
import s from './s.module.sass'

export type VerticalBoxProps = {
  components: () => JSXElement[]
  gap: number
  padding: number | string
}

export const VerticalBox = (props: VerticalBoxProps) => {
  const c = children(() => props.components)
  return (
    <div
      classList={{ [s.verticalBox]: true }}
      style={{
        gap: `${props.gap}px`,
        padding:
          typeof props.padding === 'number'
            ? `${props.padding}px`
            : props.padding,
      }}
    >
      {c()}
    </div>
  )
}
