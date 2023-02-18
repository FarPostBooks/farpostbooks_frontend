import { JSX } from 'solid-js/jsx-runtime'
import { FillingStrategy } from '../types'

export type Variant = 'text' | 'textarea'
export type VariantsMap<T> = { [key in Variant]: T }
export type InputProps = {
  value: string
  placeholder: string
  error?: string
  onInput?: (value: string) => void
  variant: 'text' | 'textarea'
  filling: FillingStrategy
  verticalFilling: FillingStrategy
  width?: number
  height?: number

  style: JSX.CSSProperties
}
export type PureInputProps = Omit<InputProps, 'variant'>
export type NamedEvent<T extends HTMLElement> = Event & {
  currentTarget: T
  target: Element
}
