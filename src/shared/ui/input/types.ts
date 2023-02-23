import { IFormControl } from 'solid-forms'
import { JSX, JSXElement } from 'solid-js'
import { FillingStrategy } from '../types'

export type Variant = 'text' | 'textarea' | 'withIcon'
export type VariantsMap<T> = { [key in Variant]: T }

export type InputProps = {
  dirty: boolean
  control: IFormControl<string>
  placeholder: string
  variant: Variant
  filling: FillingStrategy
  verticalFilling: FillingStrategy
  width?: number
  height?: number
  icon?: JSXElement
}
export type PureInputProps = Omit<
  InputProps,
  'variant' | 'width' | 'height'
> & {
  hasError: boolean
  value: string
  style: JSX.CSSProperties
}
export type NamedEvent<T extends HTMLElement> = Event & {
  currentTarget: T
  target: Element
}
