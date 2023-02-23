import { children, Show } from 'solid-js'
import s from './s.module.sass'
import { PureInputProps } from './types'

export const InputTextWithIcon = (props: PureInputProps) => {
  const icon = children(() => props.icon)

  return (
    <div classList={{ [s.wrapper]: true }}>
      <input
        classList={{
          [s.input]: true,
          [s.inputText]: true,
          [s.error]: !!props.hasError,
        }}
        {...props}
        onInput={(e) => props.control?.setValue(e.currentTarget.value)}
        onBlur={() => props.control?.markTouched(true)}
      />
      <Show when={icon()}>{icon()}</Show>
    </div>
  )
}
