import { JSXElement } from 'solid-js'
import { FlexBox } from '../flex-box'
import { Header } from '../header'

export type SectionProps = {
  name: string
  headerVariant: 'h2' | 'h3'
  children: JSXElement
}
export const Section = (props: SectionProps) => {
  return (
    <FlexBox
      direction="tobottom"
      vFilling="fit"
      hFilling="fill"
      wrap="nowrap"
      gap="5px"
      padding="0"
      alignItems="center"
    >
      <Header variant={props.headerVariant} text={props.name} />
      {props.children}
    </FlexBox>
  )
}
