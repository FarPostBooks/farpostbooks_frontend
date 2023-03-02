import { useUnit } from 'effector-solid'
import { RateCard } from '@/features/rate-book'
import { $$takeBook } from '@/features/take-book'
import { Modal } from '@/shared/ui'

// export type RatingModalProps = {}
export const RatingModal = () => {
  const opened = useUnit($$takeBook.$rateModalOpened)
  return (
    <Modal opened={opened()}>
      <RateCard submit={(rating) => $$takeBook.rateBook({ rating })} />
    </Modal>
  )
}
