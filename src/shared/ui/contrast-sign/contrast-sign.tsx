import { Component } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import s from './s.module.sass'

type Variant = 'error' | 'warning'

export type ContrastSignProps = {
  text: string
  variant: Variant
}

const variants: { [key in Variant]: Component<{ text: string }> } = {
  error: (props) => (
    <h4 classList={{ [s.error]: true, [s.sign]: true }}>{props.text}</h4>
  ),
  warning: (props) => (
    <h2 classList={{ [s.warning]: true, [s.sign]: true }}>{props.text}</h2>
  ),
}

export const ContrastSign = (props: ContrastSignProps) => {
  return <Dynamic component={variants[props.variant]} text={props.text} />
}
