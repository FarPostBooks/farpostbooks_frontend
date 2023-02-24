import { combineStatic, IBookCompact } from '@/shared'
import { FlexBox, Header, Image, Paragraph } from '@/shared/ui'
import s from './s.module.sass'

export type CardProps = IBookCompact & {
  onClick: () => void
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
    </div>
  )
}
