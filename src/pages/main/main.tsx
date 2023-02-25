import { createQueryResource } from '@farfetched/solid'
import { useGate, useStoreMap, useUnit } from 'effector-solid'
import { createFormControl } from 'solid-forms'
import { createEffect, For, Show } from 'solid-js'
import { BookModal } from '@/widgets/book-modal'
import { PageTemplate } from '@/widgets/page-template'
import { $$openBook } from '@/features/open-book'
import { $$profile } from '@/features/profile'
import { $$takeBook } from '@/features/take-book'
import { Card, openBookQuery } from '@/entities/book'
import { $$session } from '@/entities/session'
import { intersect as intersectDirective } from '@/shared/lib'
import { Button, Headbar, Input } from '@/shared/ui'
import { $$main } from './model'

const intersect = intersectDirective

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Directives {
      intersect: () => void
    }
  }
}

export type MainProps = {
  redirectToProfile: () => void
  redirectToAdmin: () => void
}

export const Main = (props: MainProps) => {
  useGate($$main.gate)
  const hasAdminRules = useUnit($$session.$admin)
  const bookOpened = useUnit($$openBook.$opened)
  const books = useUnit($$main.$filteredBooks)
  const currentUserBook = useStoreMap($$profile.$currentBook, (currentBook) => {
    if (!currentBook) return null
    return currentBook.book.id
  })

  const searchControl = createFormControl('')

  createEffect(() => {
    if (!searchControl.isValid) {
      searchControl.markDirty(true)
    }
  })

  createEffect(() => {
    $$main.searchChanged(searchControl.value)
  })

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
                $$openBook.openBook({ isbn: book.id })
              }}
            />
          )}
        </For>
        <div use:intersect={$$main.loadMore} />
      </Show>
      <BookModal
        currentBook={currentBook()}
        currentUserBook={currentUserBook()}
        bookOpened={bookOpened()}
        closeBook={$$openBook.closeBook}
        takeBook={() =>
          $$takeBook.takeBook({ isbn: currentBook()?.id as number })
        }
        returnBook={$$takeBook.returnBook}
      />
    </PageTemplate>
  )
}
