import { JSXElement } from 'solid-js'
import { FillingStrategy } from '../types'
import s from './s.module.sass'

export type FlexBoxProps = {
  children: JSXElement
  direction: 'totop' | 'tobottom' | 'toleft' | 'toright'
  alignItems?: 'start' | 'end' | 'center'
  justifyContent?: 'start' | 'end' | 'center' | 'space-between'
  wrap: 'nowrap' | 'wrap' | 'wrap-reversed'
  gap: string
  padding: string
  hFilling: FillingStrategy
  vFilling: FillingStrategy
  width?: number
  height?: number
}

export const FlexBox = (props: FlexBoxProps) => {
  return (
    <div
      classList={{
        [s.flexBox]: true,
        [s[props.direction]]: true,
        [s[props.wrap ?? 'wrap']]: true,
        [s[`h-${props.hFilling}`]]: true,
        [s[`v-${props.vFilling}`]]: true,
      }}
      style={{
        gap: props.gap,
        padding: props.padding,
        'justify-content': props.justifyContent,
        'align-items': props.alignItems,
        '--width': props.width ? `${props.width}px` : undefined,
        '--height': props.height ? `${props.height}px` : undefined,
      }}
    >
      {props.children}
    </div>
  )
}
