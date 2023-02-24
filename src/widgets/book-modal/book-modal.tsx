import { Switch, Match } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Modal } from '@/entities/book'
import { IBook } from '@/shared'
import { Button, ContrastSign } from '@/shared/ui'
export type BookModalProps = {
  currentBook?: IBook
  bookOpened: boolean
  closeBook: () => void
  currentUserBook: number | null
  takeBook: () => void
  returnBook: () => void
}
export const BookModal = (props: BookModalProps) => {
  return (
    <Portal>
      <Modal
        {...(props.currentBook as IBook)}
        opened={props.currentBook && props.bookOpened}
        onBack={props.closeBook}
        actionElement={
          <Switch>
            <Match
              when={
                !props.currentUserBook &&
                props.currentBook?.user_books?.at(0) &&
                !props.currentBook?.user_books?.at(0)?.back_timestamp
              }
            >
              <ContrastSign
                variant="warning"
                text="Эту книгу уже кто-то взял!"
              />
            </Match>
            <Match
              when={
                props.currentUserBook &&
                props.currentUserBook !== props.currentBook?.id
              }
            >
              <ContrastSign variant="warning" text="Вы уже взяли книгу!" />
            </Match>
            <Match when={props.currentUserBook !== props.currentBook?.id}>
              <Button
                variant="common"
                text="Взять"
                onClick={
                  props.takeBook
                  // $$main.takeBook({
                  //   isbn: (currentBook() as IBook).id,
                  // })
                }
                filling="fill"
              />
            </Match>
            <Match when={props.currentUserBook === props.currentBook?.id}>
              <Button
                variant="common"
                text="Вернуть"
                onClick={props.returnBook}
                filling="fill"
              />
            </Match>
          </Switch>
        }
      />
    </Portal>
  )
}
