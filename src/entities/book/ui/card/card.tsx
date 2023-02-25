import { Show } from 'solid-js'
import { combineStatic, IBookCompact } from '@/shared'
import { FlexBox, Header, Image, Paragraph } from '@/shared/ui'
import s from './s.module.sass'

export type CardProps = IBookCompact & {
  onClick: () => void
  taken?: string
  returned?: string
}

export const Card = (props: CardProps) => {
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
      <Show when={props.taken}>
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
          <Paragraph>{`${props.taken}`}</Paragraph>
        </FlexBox>
      </Show>
      <Show when={props.returned}>
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
          <Paragraph>{`${props.returned}`}</Paragraph>
        </FlexBox>
      </Show>
    </div>
  )
}
