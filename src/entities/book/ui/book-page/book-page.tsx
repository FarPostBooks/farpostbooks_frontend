import { children, JSXElement, onCleanup, onMount, Show } from 'solid-js'
import { combineStatic, IBook } from '@/shared'
import { Button, FlexBox, Header, Image, Paragraph, Section } from '@/shared/ui'
import { TakesHistory } from '../takes-history'
import s from './s.module.sass'

export type BookPageProps = IBook & {
  actionElement: JSXElement
  onBack: () => void
}
export const BookPage = (props: BookPageProps) => {
  const c = children(() => props.actionElement)

  const popstateHandler = (url: string) => {
    window.history.pushState({ url }, '', url)
    props.onBack()
  }

  onMount(() => {
    const url = window.location.href
    window.history.pushState({ url }, '', url)
    window.onpopstate = () => popstateHandler(url)
  })

  onCleanup(() => {
    window.onpopstate = null
    window.history.back()
  })

  return (
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
          <Show when={props.user_books?.length}>
            <Section name="История:" headerVariant="h3">
              <TakesHistory books={props.user_books ?? []} />
            </Section>
          </Show>
        </FlexBox>
      </div>
    </div>
  )
}
