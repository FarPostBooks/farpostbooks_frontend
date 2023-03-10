import { JSXElement } from 'solid-js'
import { FlexBox } from '@/shared/ui'
import { FillingStrategy } from '@/shared/ui/types'

export type PageTemplateProps = {
  children: JSXElement
  vFilling?: FillingStrategy
}
export const PageTemplate = (props: PageTemplateProps) => {
  return (
    <FlexBox
      direction="tobottom"
      gap="20px"
      padding="20px"
      wrap="nowrap"
      hFilling="fill"
      vFilling={props.vFilling ?? 'fit'}
      alignItems="center"
    >
      {props.children}
    </FlexBox>
  )
}
