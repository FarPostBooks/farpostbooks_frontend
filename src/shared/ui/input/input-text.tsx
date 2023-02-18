import s from './s.module.sass'
import { NamedEvent, PureInputProps } from './types'

export const InputText = (props: PureInputProps) => {
  const inputHandler = (event: NamedEvent<HTMLInputElement>) => {
    props.onInput && props.onInput(event.currentTarget.value ?? '')
  }

  return (
    <input
      classList={{
        [s.input]: true,
        [s.inputText]: true,
        [s.error]: !!props.error,
        [s[props.filling]]: true,
      }}
      {...props}
      onInput={inputHandler}
    />
  )
}
