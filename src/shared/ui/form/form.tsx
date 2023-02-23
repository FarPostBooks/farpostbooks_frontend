import { splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { FlexBox } from '../flex-box'
import { FillingStrategy } from '../types'
import s from './s.module.sass'

export type FormProps = JSX.FormHTMLAttributes<HTMLFormElement> & {
  vFilling: FillingStrategy
  hFilling: FillingStrategy
  width?: number
  height?: number
}

export const Form = (props: FormProps) => {
  const [local, attributes] = splitProps(props, [
    'vFilling',
    'hFilling',
    'children',
    'width',
    'height',
  ])
  return (
    <form
      {...attributes}
      classList={{
        [s[`h-${props.hFilling}`]]: true,
        [s[`v-${props.vFilling}`]]: true,
      }}
      style={{
        '--width': local.width ? local.width : undefined,
        '--height': local.height ? local.height : undefined,
      }}
    >
      <FlexBox
        direction="tobottom"
        gap="24px"
        padding="0"
        wrap="nowrap"
        hFilling="fill"
        vFilling="fill"
        alignItems="center"
      >
        {local.children}
      </FlexBox>
    </form>
  )
}
