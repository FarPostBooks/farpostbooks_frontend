import s from './s.module.sass'
import { PureInputProps } from './types'

export const InputText = (props: PureInputProps) => {
  return (
    <input
      {...props}
      classList={{
        [s.input]: true,
        [s.inputText]: true,
        [s.error]: !!props.hasError,
      }}
      onInput={(e) => props.control?.setValue(e.currentTarget.value)}
      onBlur={() => props.control?.markTouched(true)}
    />
  )
}
