import s from './s.module.sass'
import { PureInputProps } from './types'

export const InputTextarea = (props: PureInputProps) => {
  const inputHandler = (
    event: Event & { currentTarget: HTMLTextAreaElement; target: Element }
  ) => {
    props.onInput && props.onInput(event.target.nodeValue ?? '')
  }
  return (
    <textarea
      {...props}
      classList={{
        [s.input]: true,
        [s.textarea]: true,
        [s.error]: !!props.error,
        [s[props.filling]]: true,
        [s[`vertical-${props.verticalFilling}`]]: true,
      }}
      onInput={inputHandler}
    />
  )
}
