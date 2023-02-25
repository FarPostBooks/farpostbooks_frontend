import { createMemo, Show } from 'solid-js'
import { combineStatic, IBookCompact } from '@/shared'
import { FlexBox, Header, Image, Paragraph } from '@/shared/ui'
import s from './s.module.sass'

export type CardProps = IBookCompact & {
  onClick: () => void
  taken?: string
  returned?: string
}

export const Card = (props: CardProps) => {
  const takenDateTime = createMemo(() => {
    if (!props.taken) return undefined
    const dateTime = new Date(props.taken)

    return `${dateTime.toLocaleDateString(
      'ru-Ru'
    )} ${dateTime.toLocaleTimeString('ru-Ru')}`
  })
  const returnedDateTime = createMemo(() => {
    if (!props.returned) return undefined
    const dateTime = new Date(props.returned)

    return `${dateTime.toLocaleDateString(
      'ru-Ru'
    )} ${dateTime.toLocaleTimeString('ru-Ru')}`
  })

  return (
    <div classList={{ [s.bookCard]: true }} onClick={() => props.onClick()}>
      <Image
        src={combineStatic(props.image)}
        alt={props.name + ' обложка'}
        variant={'compact'}
      />
      <Header variant="h3" text={props.name} />
      <FlexBox
        direction="toright"
        wrap="nowrap"
        vFilling="fit"
        hFilling="fill"
        gap="10px"
        padding="0"
        justifyContent="center"
      >
        <Header variant="h4" text="ISBN:" />
        <Paragraph>{`${props.id}`}</Paragraph>
      </FlexBox>
      <Show when={takenDateTime()}>
        <FlexBox
          direction="toright"
          wrap="nowrap"
          vFilling="fit"
          hFilling="fill"
          gap="10px"
          padding="0"
          justifyContent="center"
        >
          <Header variant="h4" text="Взята:" />
          <Paragraph>{`${takenDateTime()}`}</Paragraph>
        </FlexBox>
      </Show>
      <Show when={returnedDateTime()}>
        <FlexBox
          direction="toright"
          wrap="nowrap"
          vFilling="fit"
          hFilling="fill"
          gap="10px"
          padding="0"
          justifyContent="center"
        >
          <Header variant="h4" text="Возвращена:" />
          <Paragraph>{`${returnedDateTime()}`}</Paragraph>
        </FlexBox>
      </Show>
    </div>
  )
}
