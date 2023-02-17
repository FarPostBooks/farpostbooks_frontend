import { JSX, splitProps } from 'solid-js'
import s from './s.module.sass'

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string
  filling: 'fix' | 'fill' | 'fit'
  width?: number
}

export const Button = (props: ButtonProps) => {
  const [local, attributes] = splitProps(props, ['text', 'filling', 'width'])

  return (
    <button
      classList={{ [s.button]: true, [s[local.filling]]: true }}
      style={{ '--width': local.width ? `${local.width}px` : '200px' }}
      {...attributes}
    >
      {local.text}
    </button>
  )
}
