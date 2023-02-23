import { createQueryResource } from '@farfetched/solid'
import { useGate, useUnit } from 'effector-solid'
import { createFormControl } from 'solid-forms'
import { createEffect, For, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { PageTemplate } from '@/widgets/page-template'
import {
  Card,
  getBooksQuery,
  IBook,
  Modal,
  openBookQuery,
} from '@/entities/book'
import { $$session } from '@/entities/session'
import { Button, Headbar, Input } from '@/shared/ui'
import { $$main } from './model'

export type MainProps = {
  redirectToProfile: () => void
  redirectToAdmin: () => void
}

export const Main = (props: MainProps) => {
  useGate($$main.gate)
  const hasAdminRules = useUnit($$session.$admin)
  const bookOpened = useUnit($$main.$opened)
  const books = useUnit($$main.$books)

  const searchControl = createFormControl('')

  createEffect(() => {
    if (!searchControl.isValid) {
      searchControl.markDirty(true)
    }
  })

  // const [books] = createQueryResource(getBooksQuery)
  const [currentBook] = createQueryResource(openBookQuery)

  return (
    <PageTemplate>
      <Headbar title="Главное меню" onLogout={$$session.removeToken} />
      <Show when={hasAdminRules()}>
        <Button
          variant="common"
          text="Админ-панель"
          filling="fill"
          onClick={props.redirectToAdmin}
        />
      </Show>

      <Button
        variant="common"
        text="Профиль"
        filling="fill"
        onClick={props.redirectToProfile}
      />
      <Input
        dirty={searchControl.isDirty}
        placeholder="Поиск"
        variant="withIcon"
        icon={<img src="/Search.svg" />}
        filling="fill"
        verticalFilling="fit"
        control={searchControl}
      />

      <Show when={books()}>
        <For each={books()}>
          {(book) => (
            <Card
              {...book}
              onClick={() => {
                console.log('here')
                $$main.openBook({ isbn: book.id })
              }}
            />
          )}
        </For>

        <Button
          variant="common"
          text="Загрузить еще"
          onClick={() => $$main.loadMore()}
        />
      </Show>

      <Portal>
        <Modal
          {...(currentBook() as IBook)}
          opened={currentBook() && bookOpened()}
          onBack={$$main.closeBook}
          actionElement={<></>}
        />
      </Portal>
    </PageTemplate>
  )
}
