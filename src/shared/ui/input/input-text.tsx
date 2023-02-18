import { Show } from 'solid-js'
import { ContrastSign } from '../contrast-sign'
import s from './s.module.sass'
import { InputProps, NamedEvent } from './types'

export const InputText = (props: Omit<InputProps, 'variant'>) => {
  const inputHandler = (event: NamedEvent<HTMLInputElement>) => {
    props.onInput && props.onInput(event.currentTarget.value ?? '')
  }

  const mouseDownHandler = () => {
    props.onMouseDown && props.onMouseDown()
  }

  return (
    <>
      <Show when={props.error !== undefined}>
        <ContrastSign text={props.error as string} variant={'error'} />
      </Show>
      <input
        classList={{
          [s.input]: true,
          [s.inputText]: true,
          [s.error]: !!props.error,
        }}
        {...props}
        onInput={inputHandler}
        onMouseDown={mouseDownHandler}
      />
    </>
  )
}
