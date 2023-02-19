import { Component, createMemo, JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { FillingStrategy } from '../types'
import s from './s.module.sass'

export type Variant = 'circled' | 'common'

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string
  filling?: FillingStrategy
  width?: number
  variant: Variant
  icon?: Component
  light?: boolean
}

export type CommonButtonProps = Omit<ButtonProps, 'variant'>
export type CircledButtonProps = Omit<
  ButtonProps,
  'variant' | 'filling' | 'width'
>

export const CommonButton = (props: CommonButtonProps) => {
  const [local, attributes] = splitProps(props, ['text', 'filling', 'width'])

  return (
    <button
      classList={{ [s.commonButton]: true, [s[local.filling ?? 'fit']]: true }}
      style={{ '--width': local.width ? `${local.width}px` : '200px' }}
      {...attributes}
    >
      {local.text}
    </button>
  )
}

export const CircledButton = (props: CircledButtonProps) => {
  const [local, attributes] = splitProps(props, ['text', 'light', 'icon'])
  const Icon = createMemo(() => (local.icon ? local.icon({}) : <></>))

  return (
    <button
      classList={{ [s.circledButton]: true, [s.light]: local.light }}
      {...attributes}
    >
      <Icon />
    </button>
  )
}

const variants: { [key in Variant]: Component<Partial<ButtonProps>> } = {
  common: CommonButton,
  circled: CircledButton,
}

export const Button = (props: ButtonProps) => {
  return <Dynamic component={variants[props.variant]} {...props} />
}
