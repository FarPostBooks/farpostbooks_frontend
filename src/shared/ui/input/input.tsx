import { Component, splitProps, Show, createMemo } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { ContrastSign } from '../contrast-sign'
import { InputText } from './input-text'
import { InputTextWithIcon } from './input-text-with-icon'
import { InputTextarea } from './input-textarea'
import s from './s.module.sass'
import { InputProps, PureInputProps, VariantsMap } from './types'

const variants: VariantsMap<Component<PureInputProps>> = {
  text: InputText,
  textarea: InputTextarea,
  withIcon: InputTextWithIcon,
}

export const Input = (props: InputProps) => {
  const [local, other] = splitProps(props, ['variant', 'width', 'height'])

  const showError = createMemo(() => !other.control.isValid && other.dirty)
  const firstError = createMemo(
    () => Object.values(other.control.errors ?? []).at(0) ?? ''
  )

  return (
    <div
      classList={{
        [s.hasError]: showError(),
        [s[props.filling]]: true,
        [s[`vertical-${props.verticalFilling}`]]: true,
      }}
    >
      <Show when={showError()}>
        <ContrastSign text={firstError()} variant={'error'} />
      </Show>
      <Dynamic
        {...other}
        component={variants[local.variant]}
        hasError={showError()}
        value={other.control.value}
        style={{
          '--width': props.width ? `${props.width}px` : '200px',
          '--height': props.height ? `${props.height}px` : '200px',
        }}
      />
    </div>
  )
}
