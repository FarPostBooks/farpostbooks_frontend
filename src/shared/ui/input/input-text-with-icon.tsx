import { children, Show } from 'solid-js'
import s from './s.module.sass'
import { NamedEvent, PureInputProps } from './types'

export const InputTextWithIcon = (props: PureInputProps) => {
  const inputHandler = (event: NamedEvent<HTMLInputElement>) => {
    props.onInput && props.onInput(event.currentTarget.value ?? '')
  }
  const icon = children(() => props.icon)

  return (
    <div classList={{ [s.wrapper]: true }}>
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
      <Show when={icon()}>{icon()}</Show>
    </div>
  )
}
