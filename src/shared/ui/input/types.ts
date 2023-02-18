export type Variant = 'text' | 'textarea'
export type VariantsMap<T> = { [key in Variant]: T }
export type InputProps = {
  value: string
  placeholder: string
  error?: string
  onInput?: (value: string) => void
  onMouseDown?: () => void
  variant: 'text' | 'textarea'
}
export type PureInputProps = Omit<InputProps, 'variant'>
export type NamedEvent<T extends HTMLElement> = Event & {
  currentTarget: T
  target: Element
}
