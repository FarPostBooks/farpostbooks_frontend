import { JSXElement } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { FillingStrategy } from '../types'

export type Variant = 'text' | 'textarea' | 'withIcon'
export type VariantsMap<T> = { [key in Variant]: T }
export type InputProps = {
  value: string
  placeholder: string
  error?: string
  onInput?: (value: string) => void
  variant: Variant
  filling: FillingStrategy
  verticalFilling: FillingStrategy
  width?: number
  height?: number
  icon?: JSXElement
  style?: JSX.CSSProperties
}
export type PureInputProps = Omit<InputProps, 'variant'>
export type NamedEvent<T extends HTMLElement> = Event & {
  currentTarget: T
  target: Element
}
