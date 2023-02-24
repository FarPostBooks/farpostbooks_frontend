import { children, createEffect, JSXElement, Show } from 'solid-js'
import { combineStatic } from '@/shared'
import { Button, FlexBox, Header, Image, Paragraph, Section } from '@/shared/ui'
import { IBook } from '../../model'
import s from './s.module.sass'

export type ModalProps = IBook & {
  actionElement: JSXElement
  onBack: () => void
  opened?: boolean
}
export const Modal = (props: ModalProps) => {
  const c = children(() => props.actionElement)

  createEffect(() => {
    if (props.opened) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.setProperty('overflow', 'auto')
    }
  })

  return (
    <Show when={props.opened}>
      <div classList={{ [s.modalBase]: true }}>
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
            <Section name="Автор:" headerVariant="h3">
              <Paragraph>{props.author}</Paragraph>
            </Section>
            <Section name="Опубликована:" headerVariant="h3">
              <Paragraph>{props.publish}</Paragraph>
            </Section>
            <Section name="ISBN:" headerVariant="h3">
              <Paragraph>{`${props.id}`}</Paragraph>
            </Section>
            <Section name="Описание:" headerVariant="h3">
              <Paragraph>{props.description}</Paragraph>
            </Section>
          </FlexBox>
        </div>
      </div>
    </Show>
  )
}
