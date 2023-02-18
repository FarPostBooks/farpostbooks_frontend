import { PureInputProps } from './types'

export const InputTextarea = (props: PureInputProps) => {
  const inputHandler = (
    event: Event & { currentTarget: HTMLTextAreaElement; target: Element }
  ) => {
    props.onInput && props.onInput(event.target.nodeValue ?? '')
  }
  return <textarea {...props} onInput={inputHandler} />
}
