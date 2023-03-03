import { Switch, Match, createMemo, createEffect } from 'solid-js'
import { BookPage } from '@/entities/book'
import { IBook } from '@/shared'
import { Button, ContrastSign } from '@/shared/ui'
import { Modal } from '@/shared/ui/modal'
// eslint-disable-next-line boundaries/element-types
import { RatingModal } from '../rating-modal/rating-modal'
export type BookModalProps = {
  currentBook?: IBook
  bookOpened: boolean
  closeBook: () => void
  currentUserBook: number | null
  takeBook: () => void
  returnBook: () => void
}
export const BookModal = (props: BookModalProps) => {
  const opened = createMemo(() => props.currentBook && props.bookOpened)
  const alreadyTaken = createMemo(
    () =>
      !!props.currentBook?.user_books?.at(0) &&
      !props.currentBook?.user_books?.at(0)?.back_timestamp
  )
  const canReturn = createMemo(
    () => props.currentUserBook === props.currentBook?.id
  )

  const canTake = createMemo(
    () => props.currentUserBook !== props.currentBook?.id
  )

  const haveTakenBook = createMemo(
    () =>
      props.currentUserBook && props.currentUserBook !== props.currentBook?.id
  )

  createEffect(() => {
    console.log('last sign:', props.currentBook?.user_books?.at(0))
    console.log('already taken:', alreadyTaken())
  })

  return (
    <Modal opened={opened()}>
      <BookPage
        {...(props.currentBook as IBook)}
        onBack={props.closeBook}
        actionElement={
          <Switch>
            <Match when={canReturn()}>
              <Button
                variant="common"
                text="Вернуть"
                onClick={props.returnBook}
                filling="fill"
              />
            </Match>

            <Match when={haveTakenBook()}>
              <ContrastSign variant="warning" text="Вы уже взяли книгу!" />
            </Match>
            <Match when={alreadyTaken()}>
              <ContrastSign
                variant="warning"
                text="Эту книгу уже кто-то взял!"
              />
            </Match>

            <Match when={canTake()}>
              <Button
                variant="common"
                text="Взять"
                onClick={props.takeBook}
                filling="fill"
              />
            </Match>
          </Switch>
        }
      />

      <RatingModal />
    </Modal>
  )
}
