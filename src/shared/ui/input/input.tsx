import { Component, splitProps, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { ContrastSign } from '../contrast-sign'
import { InputText } from './input-text'
import { InputTextarea } from './input-textarea'
import { InputProps, PureInputProps, VariantsMap } from './types'

const variants: VariantsMap<Component<PureInputProps>> = {
  text: InputText,
  textarea: InputTextarea,
}

export const Input = (props: InputProps) => {
  const [local, pureProps] = splitProps(props, ['variant'])
  return (
    <>
      <Show when={props.error !== undefined}>
        <ContrastSign text={props.error as string} variant={'error'} />
      </Show>
      <Dynamic
        component={variants[local.variant]}
        {...pureProps}
        style={{
          '--width': props.width ? `${props.width}px` : '200px',
          '--height': props.height ? `${props.height}px` : '200px',
        }}
      />
    </>
  )
}
