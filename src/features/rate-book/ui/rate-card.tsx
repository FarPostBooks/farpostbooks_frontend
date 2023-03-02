import { Header, Rating } from '@/shared/ui'
import s from './s.module.sass'

export type RateCardProps = {
  submit: (rating: number) => void
}
export const RateCard = (props: RateCardProps) => {
  return (
    <div class={s.ratingCard}>
      <Header variant="h2" text="Как вам книга?" />
      <Rating maximum={5} submit={props.submit} />
    </div>
  )
}
