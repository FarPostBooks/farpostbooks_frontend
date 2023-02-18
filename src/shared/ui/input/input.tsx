import { Component, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { InputText } from './input-text'
import { InputTextarea } from './input-textarea'
import { InputProps, PureInputProps, VariantsMap } from './types'

const variants: VariantsMap<Component<PureInputProps>> = {
  text: InputText,
  textarea: InputTextarea,
}

export const Input = (props: InputProps) => {
  const [local, pureProps] = splitProps(props, ['variant'])
  return <Dynamic component={variants[local.variant]} {...pureProps} />
}
