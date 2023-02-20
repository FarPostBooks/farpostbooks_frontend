import { Dynamic } from 'solid-js/web'
import s from './s.module.sass'

export type HeaderProps = {
  text: string
  variant: 'h1' | 'h2' | 'h3' | 'h4'
}

type PureHeaderProps = Omit<HeaderProps, 'variant'>

const variants = {
  h1: (props: PureHeaderProps) => (
    <h1 classList={{ [s.h]: true, [s.h1]: true }}>{props.text}</h1>
  ),
  h2: (props: PureHeaderProps) => (
    <h2 classList={{ [s.h]: true, [s.h2]: true }}>{props.text}</h2>
  ),
  h3: (props: PureHeaderProps) => (
    <h3 classList={{ [s.h]: true, [s.h3]: true }}>{props.text}</h3>
  ),
  h4: (props: PureHeaderProps) => (
    <h4 classList={{ [s.h]: true, [s.h4]: true }}>{props.text}</h4>
  ),
}

export const Header = (props: HeaderProps) => {
  return <Dynamic component={variants[props.variant]} text={props.text} />
}
