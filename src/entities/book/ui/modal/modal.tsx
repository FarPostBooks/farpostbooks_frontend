import { children, JSXElement } from 'solid-js'
import { combineStatic } from '@/shared'
import { Button, FlexBox, Header, Image } from '@/shared/ui'
import { IBook } from '../../model'
import s from './s.module.sass'

export type ModalProps = IBook & {
  actionElement: JSXElement
  onBack: () => void
}
export const Modal = (props: ModalProps) => {
  const c = children(() => props.actionElement)
  return (
    <div classList={{ [s.bookModal]: true }}>
      <Button
        variant="circled"
        icon={() => <img src="/Arrow.svg" />}
        onClick={props.onBack}
        light
      />
      <FlexBox
        direction="tobottom"
        padding="20px"
        gap="10px"
        wrap="nowrap"
        hFilling="fill"
        vFilling="fill"
      >
        <Image
          src={combineStatic(props.image)}
          alt={props.name + ' обложка'}
          variant="filling"
        />
        <Header variant="h2" text={props.name} />
        {c()}
      </FlexBox>
    </div>
  )
}
