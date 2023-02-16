import { JSX, splitProps } from 'solid-js'
import s from './s.module.sass'

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string
}

export const Button = (props: ButtonProps) => {
  const [local, attributes] = splitProps(props, ['text'])

  return (
    <button classList={{ [s.button]: true }} {...attributes}>
      {local.text}
    </button>
  )
}
