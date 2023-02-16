import s from './s.module.sass'

export type ButtonProps = {
  text?: string
}

export const Button = (props: ButtonProps) => {
  const a = 3
  return <button classList={{ [s.button]: true }}>{props.text}</button>
}
