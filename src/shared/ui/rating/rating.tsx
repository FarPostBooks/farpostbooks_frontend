import { createMemo, createSignal, For } from 'solid-js'
import s from './s.module.sass'

export type RatingProps = {
  submit: (rating: number) => void
  maximum: number
}

export const Rating = (props: RatingProps) => {
  const [hoveredRating, setHoveredRating] = createSignal(0)
  const [submited, setSubmited] = createSignal(false)
  const stars = createMemo(() =>
    new Array(props.maximum).fill(0).map((_, index) => ({ id: index + 1 }))
  )
  const mouseEnterHandler = (id: number) => {
    if (submited()) {
      return
    }

    setHoveredRating(id)
  }

  const mouseLeaveHandler = () => {
    if (submited()) {
      return
    }

    setHoveredRating(0)
  }

  const submitHandler = (rating: number) => {
    setSubmited(true)
    setHoveredRating(rating)
    props.submit(rating)
  }

  return (
    <ul class={s.rating}>
      <For each={stars()}>
        {(star) => (
          <li
            class={s.star}
            onMouseEnter={[mouseEnterHandler, star.id]}
            onMouseLeave={mouseLeaveHandler}
            onClick={() => submitHandler(star.id)}
          >
            <img
              src={
                star.id > hoveredRating()
                  ? '/StarStroked.svg'
                  : '/StarFilled.svg'
              }
            />
          </li>
        )}
      </For>
    </ul>
  )
}
