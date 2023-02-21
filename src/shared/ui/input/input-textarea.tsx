import s from './s.module.sass'
import { PureInputProps } from './types'

export const InputTextarea = (props: PureInputProps) => {
  return (
    <textarea
      {...props}
      classList={{
        [s.input]: true,
        [s.textarea]: true,
        [s.error]: !!props.hasError,
      }}
      onInput={(e) => props.control?.setValue(e.currentTarget.value)}
      onBlur={() => props.control?.markTouched(true)}
    />
  )
}
